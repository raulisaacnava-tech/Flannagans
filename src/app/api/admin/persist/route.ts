import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-session';
import {
  adminDeleteMissingRows,
  adminUpsertRows,
  isSupabaseAdminConfigured,
} from '@/lib/supabase-admin';

const ALLOWED_TABLES = ['products', 'promotions', 'restaurants'] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];

// Tablas que reflejan exactamente el set local: lo que no llega se elimina.
const SYNC_DELETE_TABLES: AllowedTable[] = ['products', 'promotions'];

type Body = {
  table?: string;
  rows?: Array<Record<string, unknown>>;
};

export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: 'Supabase no está configurado en el servidor (falta SUPABASE_SERVICE_ROLE_KEY).' },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const table = body.table as AllowedTable;
  const rows = Array.isArray(body.rows) ? body.rows : null;

  if (!table || !ALLOWED_TABLES.includes(table) || !rows) {
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 });
  }

  try {
    await adminUpsertRows(table, rows);

    if (SYNC_DELETE_TABLES.includes(table)) {
      const ids = rows
        .map((row) => row.id)
        .filter((id): id is string => typeof id === 'string');
      await adminDeleteMissingRows(table, ids);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Supabase persist failed', error);
    return NextResponse.json(
      { error: (error as Error)?.message || 'Error al guardar en Supabase' },
      { status: 500 },
    );
  }
}
