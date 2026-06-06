import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS, INITIAL_RESTAURANT } from '@/lib/data';
import { DEFAULT_PROMOTIONS } from '@/lib/default-promotions';
import { getRestaurantWithDefaults } from '@/lib/restaurant-content';
import { toProductRow, toPromotionRow, toRestaurantRow } from '@/lib/supabase-sync';
import {
  adminCountRows,
  adminUpsertRows,
  isSupabaseAdminConfigured,
} from '@/lib/supabase-admin';

// Siembra idempotente: solo inserta los datos por defecto si las tres tablas
// están vacías. No requiere sesión porque únicamente restaura defaults y nunca
// sobrescribe datos existentes.
export async function POST() {
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ seeded: false, reason: 'not-configured' }, { status: 503 });
  }

  try {
    const [products, promotions, restaurants] = await Promise.all([
      adminCountRows('products'),
      adminCountRows('promotions'),
      adminCountRows('restaurants'),
    ]);

    if (products > 0 || promotions > 0 || restaurants > 0) {
      return NextResponse.json({ seeded: false, reason: 'not-empty' });
    }

    await adminUpsertRows('products', INITIAL_PRODUCTS.map(toProductRow));
    await adminUpsertRows('promotions', DEFAULT_PROMOTIONS.map(toPromotionRow));
    await adminUpsertRows('restaurants', [
      toRestaurantRow(getRestaurantWithDefaults(INITIAL_RESTAURANT)),
    ]);

    return NextResponse.json({ seeded: true });
  } catch (error) {
    console.error('Supabase seed failed', error);
    return NextResponse.json(
      { seeded: false, error: (error as Error)?.message || 'seed-failed' },
      { status: 500 },
    );
  }
}
