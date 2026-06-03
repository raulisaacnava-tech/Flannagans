import { INITIAL_PRODUCTS, INITIAL_RESTAURANT } from '@/lib/data';
import { DEFAULT_PROMOTIONS } from '@/lib/default-promotions';
import { getRestaurantWithDefaults } from '@/lib/restaurant-content';
import { deleteMissingRows, isSupabaseConfigured, selectRows, upsertRows } from '@/lib/supabase-rest';
import { Product } from '@/types/menu';
import { Restaurant } from '@/types/restaurant';
import type { Promotion } from '@/lib/promotions-store';

const PRODUCTS_KEY = 'flanagans_products_v5';
const RESTAURANT_KEY = 'flanagans_restaurant_v5';
const PROMOTIONS_KEY = 'flanagans_promotions_v1';
const BOOTSTRAP_KEY = 'flanagans_supabase_bootstrap_v1';

type ProductRow = {
  id: string;
  restaurant_id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  long_description?: string | null;
  ingredients?: string[] | null;
  allergens?: string[] | null;
  tags?: string[] | null;
  image_url: string;
  poster_image?: string | null;
  video_url?: string | null;
  is_available: boolean;
  is_featured: boolean;
  is_campaign: boolean;
  campaign_label?: string | null;
  chef_suggestion?: string | null;
  suggested_combo?: string | null;
  available_units?: number | null;
  display_order: number;
  is_profitable: boolean;
  extras?: string[] | null;
};

type PromotionRow = {
  id: string;
  name: string;
  label: string;
  description: string;
  discount_type: Promotion['discountType'];
  discount_value: number;
  is_active: boolean;
  product_ids: string[];
  start_date?: string | null;
  end_date?: string | null;
  color: string;
  show_banner: boolean;
  show_on_home: boolean;
};

type RestaurantRow = {
  id: string;
  name: string;
  logo_url: string;
  brand_colors: Restaurant['brandColors'];
  phone: string;
  instagram_url: string;
  whatsapp_number: string;
  address: string;
  opening_hours: Restaurant['openingHours'];
  email?: string | null;
  welcome_message?: string | null;
  homepage_content?: Restaurant['homepageContent'] | null;
};

const isClient = () => typeof window !== 'undefined';

const toProductRow = (product: Product): ProductRow => ({
  id: product.id,
  restaurant_id: product.restaurantId,
  name: product.name,
  slug: product.slug,
  category: product.category,
  price: product.price,
  description: product.description,
  long_description: product.longDescription ?? null,
  ingredients: product.ingredients ?? null,
  allergens: product.allergens ?? null,
  tags: product.tags ?? null,
  image_url: product.imageUrl,
  poster_image: product.posterImage ?? null,
  video_url: product.videoUrl ?? null,
  is_available: product.isAvailable,
  is_featured: product.isFeatured,
  is_campaign: product.isCampaign,
  campaign_label: product.campaignLabel ?? null,
  chef_suggestion: product.chefSuggestion ?? null,
  suggested_combo: product.suggestedCombo ?? null,
  available_units: product.availableUnits ?? null,
  display_order: product.displayOrder,
  is_profitable: product.isProfitable,
  extras: product.extras ?? null,
});

const fromProductRow = (row: ProductRow): Product => ({
  id: row.id,
  restaurantId: row.restaurant_id,
  name: row.name,
  slug: row.slug,
  category: row.category,
  price: Number(row.price),
  description: row.description,
  longDescription: row.long_description ?? undefined,
  ingredients: row.ingredients ?? undefined,
  allergens: row.allergens ?? undefined,
  tags: row.tags ?? undefined,
  imageUrl: row.image_url,
  posterImage: row.poster_image ?? undefined,
  videoUrl: row.video_url ?? undefined,
  isAvailable: row.is_available,
  isFeatured: row.is_featured,
  isCampaign: row.is_campaign,
  campaignLabel: row.campaign_label ?? undefined,
  chefSuggestion: row.chef_suggestion ?? undefined,
  suggestedCombo: row.suggested_combo ?? undefined,
  availableUnits: row.available_units ?? undefined,
  displayOrder: row.display_order,
  isProfitable: row.is_profitable,
  extras: row.extras ?? undefined,
});

const toPromotionRow = (promo: Promotion): PromotionRow => ({
  id: promo.id,
  name: promo.name,
  label: promo.label,
  description: promo.description,
  discount_type: promo.discountType,
  discount_value: promo.discountValue,
  is_active: promo.isActive,
  product_ids: promo.productIds,
  start_date: promo.startDate ?? null,
  end_date: promo.endDate ?? null,
  color: promo.color,
  show_banner: promo.showBanner,
  show_on_home: promo.showOnHome,
});

const fromPromotionRow = (row: PromotionRow): Promotion => ({
  id: row.id,
  name: row.name,
  label: row.label,
  description: row.description,
  discountType: row.discount_type,
  discountValue: Number(row.discount_value),
  isActive: row.is_active,
  productIds: row.product_ids ?? [],
  startDate: row.start_date ?? undefined,
  endDate: row.end_date ?? undefined,
  color: row.color,
  showBanner: row.show_banner,
  showOnHome: row.show_on_home,
});

const toRestaurantRow = (restaurant: Restaurant): RestaurantRow => ({
  id: restaurant.id,
  name: restaurant.name,
  logo_url: restaurant.logoUrl,
  brand_colors: restaurant.brandColors,
  phone: restaurant.phone,
  instagram_url: restaurant.instagramUrl,
  whatsapp_number: restaurant.whatsappNumber,
  address: restaurant.address,
  opening_hours: restaurant.openingHours,
  email: restaurant.email ?? null,
  welcome_message: restaurant.welcomeMessage ?? null,
  homepage_content: restaurant.homepageContent ?? null,
});

const fromRestaurantRow = (row: RestaurantRow): Restaurant =>
  getRestaurantWithDefaults({
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url,
    brandColors: row.brand_colors,
    phone: row.phone,
    instagramUrl: row.instagram_url,
    whatsappNumber: row.whatsapp_number,
    address: row.address,
    openingHours: row.opening_hours,
    email: row.email ?? undefined,
    welcomeMessage: row.welcome_message ?? undefined,
    homepageContent: row.homepage_content ?? undefined,
  });

async function seedSupabase() {
  await upsertRows('products', INITIAL_PRODUCTS.map(toProductRow));
  await upsertRows('promotions', DEFAULT_PROMOTIONS.map(toPromotionRow));
  await upsertRows('restaurants', [toRestaurantRow(getRestaurantWithDefaults(INITIAL_RESTAURANT))]);
}

export async function bootstrapSupabaseToLocal() {
  if (!isClient() || !isSupabaseConfigured()) return;

  try {
    const [productRows, promotionRows, restaurantRows] = await Promise.all([
      selectRows<ProductRow>('products', '?select=*&order=display_order.asc'),
      selectRows<PromotionRow>('promotions', '?select=*'),
      selectRows<RestaurantRow>('restaurants', '?select=*'),
    ]);

    if (productRows.length === 0 && promotionRows.length === 0 && restaurantRows.length === 0) {
      await seedSupabase();
      localStorage.removeItem(BOOTSTRAP_KEY);
      return bootstrapSupabaseToLocal();
    }

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productRows.map(fromProductRow)));
    localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(promotionRows.map(fromPromotionRow)));

    const restaurant = restaurantRows[0]
      ? fromRestaurantRow(restaurantRows[0])
      : getRestaurantWithDefaults(INITIAL_RESTAURANT);
    localStorage.setItem(RESTAURANT_KEY, JSON.stringify(restaurant));
    localStorage.setItem(BOOTSTRAP_KEY, String(Date.now()));

    window.dispatchEvent(new Event('flanagans_menu_updated'));
    window.dispatchEvent(new Event('flanagans_promotions_updated'));
    window.dispatchEvent(new Event('flanagans_restaurant_updated'));
  } catch (error) {
    console.error('Supabase bootstrap failed', error);
  }
}

export async function syncProductsToSupabase(products: Product[]) {
  if (!isSupabaseConfigured()) return;
  await upsertRows('products', products.map(toProductRow));
  await deleteMissingRows('products', products.map((product) => product.id));
}

export async function syncPromotionsToSupabase(promotions: Promotion[]) {
  if (!isSupabaseConfigured()) return;
  await upsertRows('promotions', promotions.map(toPromotionRow));
  await deleteMissingRows('promotions', promotions.map((promotion) => promotion.id));
}

export async function syncRestaurantToSupabase(restaurant: Restaurant) {
  if (!isSupabaseConfigured()) return;
  await upsertRows('restaurants', [toRestaurantRow(getRestaurantWithDefaults(restaurant))]);
}
