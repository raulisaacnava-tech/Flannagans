const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

// La clave anónima solo se usa para LECTURA pública. Todas las escrituras pasan
// por /api/admin/persist en el servidor con la clave service_role.
const getHeaders = () => {
  if (!supabaseAnonKey) {
    throw new Error('Supabase anon key is missing');
  }

  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
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
