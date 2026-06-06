import { DEFAULT_PROMOTIONS } from '@/lib/default-promotions';
import { syncPromotionsToSupabase } from '@/lib/supabase-sync';

// Cómo se programa la vigencia de la promoción:
// - 'once':   única, dentro de un rango de fechas (startDate–endDate).
// - 'always': permanente, siempre activa mientras isActive sea true.
// - 'weekly': recurrente, solo en los días (weekDays) y franja horaria indicados.
export type PromotionRecurrence = 'once' | 'always' | 'weekly';

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
  recurrence?: PromotionRecurrence;
  weekDays?: number[]; // 0 = domingo ... 6 = sábado
  startTime?: string; // 'HH:MM'
  endTime?: string; // 'HH:MM'
}

const minutesFromTime = (time?: string): number | null => {
  if (!time) return null;
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const isWithinTimeWindow = (now: Date, startTime?: string, endTime?: string): boolean => {
  const start = minutesFromTime(startTime);
  const end = minutesFromTime(endTime);
  if (start === null && end === null) return true; // sin franja => todo el día
  const current = now.getHours() * 60 + now.getMinutes();
  const from = start ?? 0;
  const to = end ?? 24 * 60;
  // Soporta franjas que cruzan medianoche (p. ej. 22:00–02:00).
  if (from <= to) return current >= from && current <= to;
  return current >= from || current <= to;
};

const isWithinDateRange = (now: Date, startDate?: string, endDate?: string): boolean => {
  if (startDate && now < new Date(`${startDate}T00:00:00`)) return false;
  if (endDate && now > new Date(`${endDate}T23:59:59`)) return false;
  return true;
};

// Decide si una promoción debe mostrarse AHORA según su programación.
export const isPromotionLive = (promo: Promotion, now: Date = new Date()): boolean => {
  if (!promo.isActive) return false;
  const recurrence = promo.recurrence ?? 'always';

  if (recurrence === 'once') {
    return isWithinDateRange(now, promo.startDate, promo.endDate);
  }

  if (recurrence === 'weekly') {
    if (promo.weekDays && promo.weekDays.length > 0 && !promo.weekDays.includes(now.getDay())) {
      return false;
    }
    if (!isWithinTimeWindow(now, promo.startTime, promo.endTime)) return false;
    return isWithinDateRange(now, promo.startDate, promo.endDate);
  }

  return true; // 'always'
};

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
  return getPromotions().find((promotion) => promotion.showBanner && isPromotionLive(promotion)) ?? null;
};

export const getHomePromotions = (): Promotion[] => {
  return getPromotions().filter((promotion) => promotion.showOnHome && isPromotionLive(promotion));
};
