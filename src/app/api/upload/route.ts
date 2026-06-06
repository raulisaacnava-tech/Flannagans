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
    // 2. Parsear form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se ha proporcionado ningún archivo' }, { status: 400 });
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

    // 5. Asegurar que el directorio de destino exista
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 6. Generar nombre de archivo único y seguro
    const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.webp');
    const safeName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_');
    const nameWithoutExt = path.basename(safeName, ext);
    const uniqueFilename = `${nameWithoutExt}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // 7. Escribir archivo en disco
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(filePath, buffer);

    // 8. Responder con la URL pública
    const fileUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error interno al procesar la subida' }, { status: 500 });
  }
}
