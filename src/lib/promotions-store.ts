import { DEFAULT_PROMOTIONS } from '@/lib/default-promotions';
import { syncPromotionsToSupabase } from '@/lib/supabase-sync';

export interface Promotion {
  id: string;
  name: string;
  label: string;
  description: string;
  discountType: 'none' | 'percent' | 'fixed';
  discountValue: number;
  isActive: boolean;
  productIds: string[];
  startDate?: string;
  endDate?: string;
  color: string;
  showBanner: boolean;
  showOnHome: boolean;
}

const PROMOTIONS_KEY = 'flanagans_promotions_v1';
const isClient = () => typeof window !== 'undefined';

export const getPromotions = (): Promotion[] => {
  if (!isClient()) return DEFAULT_PROMOTIONS;
  const raw = localStorage.getItem(PROMOTIONS_KEY);
  if (!raw) {
    localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(DEFAULT_PROMOTIONS));
    return DEFAULT_PROMOTIONS;
  }
  try {
    return JSON.parse(raw) as Promotion[];
  } catch {
    return DEFAULT_PROMOTIONS;
  }
};

export const savePromotions = (promotions: Promotion[]) => {
  if (!isClient()) return;
  localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(promotions));
  void syncPromotionsToSupabase(promotions).catch((error) => {
    console.error('Error syncing promotions to Supabase', error);
  });
  window.dispatchEvent(new Event('flanagans_promotions_updated'));
};

export const createPromotion = (promo: Omit<Promotion, 'id'>): Promotion => {
  const all = getPromotions();
  const newPromo = { ...promo, id: `promo-${Date.now()}` };
  all.push(newPromo);
  savePromotions(all);
  return newPromo;
};

export const updatePromotion = (id: string, fields: Partial<Promotion>): Promotion => {
  const all = getPromotions();
  const idx = all.findIndex((promotion) => promotion.id === id);
  if (idx === -1) throw new Error(`Promotion ${id} not found`);
  all[idx] = { ...all[idx], ...fields };
  savePromotions(all);
  return all[idx];
};

export const deletePromotion = (id: string): void => {
  const all = getPromotions().filter((promotion) => promotion.id !== id);
  savePromotions(all);
};

export const getActiveBannerPromo = (): Promotion | null => {
  return getPromotions().find((promotion) => promotion.isActive && promotion.showBanner) ?? null;
};

export const getHomePromotions = (): Promotion[] => {
  return getPromotions().filter((promotion) => promotion.isActive && promotion.showOnHome);
};
