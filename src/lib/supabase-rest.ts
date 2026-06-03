const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

const getHeaders = (prefer?: string) => {
  if (!supabaseAnonKey) {
    throw new Error('Supabase anon key is missing');
  }

  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
};

const buildUrl = (table: string, query = '') => {
  if (!supabaseUrl) {
    throw new Error('Supabase URL is missing');
  }

  return `${supabaseUrl}/rest/v1/${table}${query}`;
};

export async function selectRows<T>(table: string, query = '?select=*'): Promise<T[]> {
  const response = await fetch(buildUrl(table, query), {
    headers: getHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase select failed for ${table}: ${response.status}`);
  }

  return response.json() as Promise<T[]>;
}

export async function upsertRows<T>(table: string, rows: T[]) {
  const response = await fetch(buildUrl(table, '?on_conflict=id'), {
    method: 'POST',
    headers: getHeaders('resolution=merge-duplicates'),
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    throw new Error(`Supabase upsert failed for ${table}: ${response.status}`);
  }
}

export async function deleteMissingRows(table: string, ids: string[]) {
  if (ids.length === 0) {
    await fetch(buildUrl(table, '?id=not.is.null'), {
      method: 'DELETE',
      headers: getHeaders(),
    });
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
