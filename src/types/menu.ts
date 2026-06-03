export interface Allergen {
  id: string;
  name: string;
  icon: string; // Nombre del icono de Lucide o emoji
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
  icon: string; // Nombre del icono
}

export interface Product {
  id: string;
  restaurantId: string;
  name: string;
  slug: string;
  category: string; // slug de la categoría
  price: number;
  description: string;
  longDescription?: string;
  ingredients?: string[];
  allergens?: string[]; // IDs de alérgenos
  tags?: string[]; // Badges como "Nuevo", "Top Ventas", "Recomendado"
  imageUrl: string;
  posterImage?: string;
  videoUrl?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isCampaign: boolean;
  campaignLabel?: string; // Ej. "Burger del Mes", "Promo Domingo"
  chefSuggestion?: string; // Mensaje de recomendación del chef
  suggestedCombo?: string; // ID de producto recomendado para combo
  availableUnits?: number;
  displayOrder: number;
  isProfitable: boolean; // Si tiene alto margen de ganancia para venta visual
  extras?: string[]; // IDs de extras disponibles
}

export interface CartItem {
  id: string; // Identificador único de la línea (para distinguir productos con diferentes extras)
  productId: string;
  product: Product;
  quantity: number;
  selectedExtras: Extra[];
  notes?: string;
  subtotal: number;
}
