// src/lib/promotions-store.ts
// Store de promociones con persistencia en localStorage

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
  showBanner: boolean; // Mostrar en el banner del menú
  showOnHome: boolean; // Mostrar en la sección de promociones de la web
}

const PROMOTIONS_KEY = 'flanagans_promotions_v1';

const isClient = () => typeof window !== 'undefined';

const DEFAULT_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-efectivo',
    name: '15% Descuento Efectivo',
    label: '15% dto.',
    description: 'Disfruta de un 15% de descuento directo en toda tu cuenta al consumir en nuestro local y realizar tu pago en efectivo.',
    discountType: 'percent',
    discountValue: 15,
    isActive: true,
    productIds: [],
    color: 'primary',
    showBanner: false,
    showOnHome: true,
  },
  {
    id: 'promo-duo',
    name: 'Pack FlanaDúo para 2',
    label: 'Pack Dúo',
    description: '2 Burgers clásicas o especiales + 1 Entrante a elegir (patatas o nachos) + 2 Bebidas frías a un precio espectacular.',
    discountType: 'none',
    discountValue: 0,
    isActive: true,
    productIds: [],
    color: 'orange',
    showBanner: false,
    showOnHome: true,
  },
  {
    id: 'promo-takeaway',
    name: 'Take Away Dom a Jue',
    label: 'Take Away',
    description: 'Tus pedidos para recoger a domicilio de domingo a jueves tienen premio: llévate patatas fritas gratis con cada burger.',
    discountType: 'none',
    discountValue: 0,
    isActive: true,
    productIds: [],
    color: 'red',
    showBanner: false,
    showOnHome: true,
  },
  {
    id: 'promo-semana',
    name: 'Promo de la Semana',
    label: 'Promo de la semana',
    description: '¡Muestra esto en barra y recibe unas patatas gratis! 🍟',
    discountType: 'none',
    discountValue: 0,
    isActive: true,
    productIds: [],
    color: 'red',
    showBanner: true,
    showOnHome: false,
  },
];

export const getPromotions = (): Promotion[] => {
  if (!isClient()) return DEFAULT_PROMOTIONS;
  const raw = localStorage.getItem(PROMOTIONS_KEY);
  if (!raw) {
    localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(DEFAULT_PROMOTIONS));
    return DEFAULT_PROMOTIONS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROMOTIONS;
  }
};

export const savePromotions = (promotions: Promotion[]) => {
  if (!isClient()) return;
  localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(promotions));
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
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`Promotion ${id} not found`);
  all[idx] = { ...all[idx], ...fields };
  savePromotions(all);
  return all[idx];
};

export const deletePromotion = (id: string): void => {
  const all = getPromotions().filter(p => p.id !== id);
  savePromotions(all);
};

export const getActiveBannerPromo = (): Promotion | null => {
  return getPromotions().find(p => p.isActive && p.showBanner) ?? null;
};

export const getHomePromotions = (): Promotion[] => {
  return getPromotions().filter(p => p.isActive && p.showOnHome);
};
