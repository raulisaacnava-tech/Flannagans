import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-session';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  // 1. Verificar autenticación
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // 2. Parsear form data y validar objeto
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string' || !file.name) {
      return NextResponse.json({ error: 'No se ha proporcionado ningún archivo válido' }, { status: 400 });
    }

    // 3. Validar tipo de archivo
    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime'
    ];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se admiten imágenes y videos.' },
        { status: 400 }
      );
    }

    // 4. Validar tamaño (50MB para videos, 10MB para imágenes)
    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `El archivo supera el tamaño máximo permitido (${isVideo ? '50MB' : '10MB'})` },
        { status: 400 }
      );
    }

    // 5. Generar nombre de archivo único y seguro
    const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.webp');
    const safeName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_');
    const nameWithoutExt = path.basename(safeName, ext);
    const uniqueFilename = `${nameWithoutExt}_${Date.now()}${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 6. Intentar subir a Supabase Storage si está configurado
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const bucketName = 'media';
      const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${uniqueFilename}`;
      
      try {
        console.log(`Attempting to upload file to Supabase bucket "${bucketName}"...`);
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': file.type,
          },
          body: buffer,
        });

        if (response.ok) {
          const fileUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${uniqueFilename}`;
          console.log(`Supabase upload successful! URL: ${fileUrl}`);
          return NextResponse.json({ url: fileUrl });
        } else {
          const errText = await response.text();
          console.error('Supabase storage upload failed status:', response.status, errText);
          
          if (response.status === 404 || errText.includes('Bucket not found')) {
            throw new Error('El bucket de Supabase "media" no existe o no tiene políticas de inserción pública configuradas. Por favor créalo y configúralo en tu consola de Supabase.');
          }
          throw new Error(`Error en Supabase Storage (${response.status}): ${errText}`);
        }
      } catch (supaError: any) {
        console.error('Supabase upload exception:', supaError);
        
        // Si el error es sobre el bucket inexistente, lo propagamos para guiar al usuario
        if (supaError.message && supaError.message.includes('media')) {
          throw supaError;
        }

        // Si estamos en Vercel, no podemos hacer fallback local ya que fallará siempre
        if (process.env.VERCEL || process.cwd().startsWith('/var/task')) {
          throw supaError;
        }
        
        console.log('Falling back to local disk storage...');
      }
    }

    // 7. Fallback Local (solo para desarrollo local en disco)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, uniqueFilename);
    await fs.promises.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    const err = error as Error;
    console.error('Error uploading file:', err);
    try {
      const logMessage = `[${new Date().toISOString()}] Error: ${err?.message || err}\nStack: ${err?.stack}\n\n`;
      fs.appendFileSync(path.join(process.cwd(), 'upload_debug.log'), logMessage);
    } catch (logError) {
      console.error('Failed to write log file:', logError);
    }
    return NextResponse.json(
      { error: `Error interno al procesar la subida: ${err?.message || err}` },
      { status: 500 }
    );
  }
}
