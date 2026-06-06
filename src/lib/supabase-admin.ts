// Servidor ONLY. Usa la clave service_role (nunca expuesta al navegador) para
// escribir en Supabase saltándose RLS. No importar desde componentes de cliente.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = () => Boolean(supabaseUrl && serviceRoleKey);

const getHeaders = (prefer?: string) => {
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing on the server');
  }

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
};

const buildUrl = (table: string, query = '') => {
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing on the server');
  }

  return `${supabaseUrl}/rest/v1/${table}${query}`;
};

export async function adminCountRows(table: string): Promise<number> {
  const response = await fetch(buildUrl(table, '?select=id'), {
    headers: { ...getHeaders('count=exact'), Range: '0-0' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase count failed for ${table}: ${response.status}`);
  }

  const contentRange = response.headers.get('content-range');
  const total = contentRange?.split('/')?.[1];
  return total ? Number(total) : 0;
}

export async function adminUpsertRows<T>(table: string, rows: T[]) {
  if (rows.length === 0) return;

  const response = await fetch(buildUrl(table, '?on_conflict=id'), {
    method: 'POST',
    headers: getHeaders('resolution=merge-duplicates'),
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Supabase upsert failed for ${table}: ${response.status} ${detail}`);
  }
}

export async function adminDeleteMissingRows(table: string, ids: string[]) {
  if (ids.length === 0) {
    const response = await fetch(buildUrl(table, '?id=not.is.null'), {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Supabase delete-all failed for ${table}: ${response.status}`);
    }
    return;
  }

  const encoded = ids.map((id) => `"${id}"`).join(',');
  const response = await fetch(buildUrl(table, `?id=not.in.(${encodeURIComponent(encoded)})`), {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Supabase delete failed for ${table}: ${response.status}`);
  }
}
