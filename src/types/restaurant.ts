export interface OpeningHours {
  day: string;
  hours: string;
}

export interface BrandColors {
  primary: string; // Hexadecimal para acentos principal
  secondary: string; // Hexadecimal para fondo u otro tono
  accent: string; // Hexadecimal para badge u otros
}

export interface HomepageGalleryItem {
  id: string;
  imageUrl: string;
  label: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  logoUrl: string;
  orderUrl: string;
}

export interface DinerReview {
  id: string;
  name: string;
  quote: string;
  rating: number;
  detail: string;
}

export interface HomepageContent {
  logoScale: number; // multiplicador del tamaño del logo en la cabecera (0.6–1.6)
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroHighlights: string[];
  galleryIntro: string;
  galleryItems: HomepageGalleryItem[];
  locationTitle: string;
  locationPlaceLabel: string;
  googleMapsEmbedUrl: string;
  googleMapsPlaceUrl: string;
  reservationsTitle: string;
  reservationsEmail: string;
  reservationsChannelLabel: string;
  visualMenuTitle: string;
  visualMenuDescription: string;
  visualMenuPrimaryCtaLabel: string;
  visualMenuSecondaryCtaLabel: string;
  deliveryTitle: string;
  deliveryDescription: string;
  deliveryPartners: DeliveryPartner[];
  reviewsTitle: string;
  reviewsDescription: string;
  reviews: DinerReview[];
  brandQuoteText: string;
  brandQuoteAccent: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logoUrl: string;
  brandColors: BrandColors;
  phone: string;
  instagramUrl: string;
  whatsappNumber: string;
  address: string;
  openingHours: OpeningHours[];
  email?: string;
  welcomeMessage?: string;
  homepageContent?: HomepageContent;
}
