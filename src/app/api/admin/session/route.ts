import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from '@/lib/admin-session';

// La contraseña SOLO se lee de una variable de servidor. Nunca usar NEXT_PUBLIC_*
// (se incrustaría en el bundle del navegador) ni un valor por defecto en código.
const getConfiguredPassword = () => process.env.ADMIN_PASSWORD;

export async function GET() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifyAdminSessionToken(token) });
}

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  const configuredPassword = getConfiguredPassword();
  if (!configuredPassword) {
    return NextResponse.json(
      { message: 'El panel no está configurado: falta ADMIN_PASSWORD en el servidor.' },
      { status: 503 },
    );
  }

  if (!password || password !== configuredPassword) {
    return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), adminSessionCookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...adminSessionCookieOptions,
    maxAge: 0,
  });
  return response;
}
