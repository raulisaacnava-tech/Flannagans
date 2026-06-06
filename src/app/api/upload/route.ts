import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-session';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const storageBucketName = 'media';

const isHostedEnvironment = () =>
  Boolean(process.env.VERCEL || process.cwd().startsWith('/var/task'));

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string' || !file.name) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningun archivo valido' },
        { status: 400 }
      );
    }

    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
    ];

    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se admiten imagenes y videos.' },
        { status: 400 }
      );
    }

    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `El archivo supera el tamano maximo permitido (${isVideo ? '50MB' : '10MB'})` },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.webp');
    const safeName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_');
    const nameWithoutExt = path.basename(safeName, ext);
    const uniqueFilename = `${nameWithoutExt}_${Date.now()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)) {
      if (isHostedEnvironment() && !supabaseServiceRoleKey) {
        return NextResponse.json(
          {
            error:
              'Falta SUPABASE_SERVICE_ROLE_KEY en Vercel. Sin esa clave el admin no puede subir archivos.',
          },
          { status: 503 }
        );
      }

      const storageKey = supabaseServiceRoleKey || supabaseAnonKey;
      const uploadUrl = `${supabaseUrl}/storage/v1/object/${storageBucketName}/${uniqueFilename}`;

      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            apikey: storageKey!,
            Authorization: `Bearer ${storageKey!}`,
            'Content-Type': file.type,
          },
          body: buffer,
        });

        if (response.ok) {
          const fileUrl =
            `${supabaseUrl}/storage/v1/object/public/${storageBucketName}/${uniqueFilename}`;
          return NextResponse.json({ url: fileUrl });
        }

        const errText = await response.text().catch(() => '');

        if (response.status === 404 || errText.includes('Bucket not found')) {
          throw new Error('El bucket "media" no existe en Supabase Storage.');
        }

        if (response.status === 401 || response.status === 403) {
          throw new Error(
            'Supabase rechazo la subida. Revisa SUPABASE_SERVICE_ROLE_KEY y confirma que el bucket "media" exista.'
          );
        }

        throw new Error(`Error en Supabase Storage (${response.status}): ${errText}`);
      } catch (error) {
        const uploadError = error as Error;

        if (isHostedEnvironment()) {
          throw uploadError;
        }

        if (uploadError.message.includes('bucket "media"')) {
          throw uploadError;
        }
      }
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFilename);
    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${uniqueFilename}` });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: `Error interno al procesar la subida: ${err.message || String(err)}` },
      { status: 500 }
    );
  }
}
