import { HomepageContent, Restaurant } from '@/types/restaurant';

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroEyebrow: 'Smash, fuego y pan brutal',
  heroTitle: 'Burgers hechas al fuego para pedir otra',
  heroDescription: 'Carne sellada, cheddar fundido, pan tostado y una carta visual pensada para abrir el apetito desde el movil.',
  heroPrimaryCtaLabel: 'Ver Carta',
  heroSecondaryCtaLabel: 'Reservar',
  heroVideoUrl: '/videomenu/hamburguesas/la_smashzilla.webm',
  heroPosterUrl: '/fotosmenu/Hamburguesas/lasmashzilla.webp',
  heroHighlights: ['Smash al momento', 'Videos por plato', 'Reservas en segundos'],
  galleryIntro: 'Esto no va solo de comer. Va de venir con hambre y salir hablando de la burger.',
  galleryItems: [
    {
      id: 'gallery-1',
      imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
      label: 'Local / Ambiente',
    },
    {
      id: 'gallery-2',
      imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=900&auto=format&fit=crop',
      label: 'Patatas',
    },
    {
      id: 'gallery-3',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop',
      label: 'Burger Macro',
    },
    {
      id: 'gallery-4',
      imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop',
      label: 'Shake',
    },
  ],
  locationTitle: 'Encuentranos',
  locationPlaceLabel: 'Calle Casiopea, 12, 28938 Mostoles, Madrid',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=Calle%20Casiopea%2012%20Mostoles%20Madrid&z=17&output=embed',
  googleMapsPlaceUrl: 'https://maps.google.com/?q=Calle%20Casiopea%2012%20Mostoles%20Madrid',
  reservationsTitle: 'Ven a por tu burger',
  reservationsEmail: 'info@flanagansburguer.com',
  reservationsChannelLabel: 'Llamada o Instagram',
  visualMenuTitle: 'Nuestra carta entra por los ojos',
  visualMenuDescription: 'Explora burgers, extras, shakes y promos en una carta visual interactiva pensada para que elijas rapido y se te antoje todo. Olvidate de los PDF aburridos.',
  visualMenuPrimaryCtaLabel: 'Abrir carta interactiva',
  visualMenuSecondaryCtaLabel: 'Ver destacados',
  deliveryTitle: 'Tu burger tambien llega a casa',
  deliveryDescription: 'Pide Flanagans desde tus apps favoritas y recibe la carta visual con el mismo sabor, sin mover la mesa del sofa.',
  deliveryPartners: [
    {
      id: 'glovo',
      name: 'Glovo',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Glovo_Logo.svg',
      orderUrl: 'https://glovoapp.com/',
    },
    {
      id: 'uber-eats',
      name: 'Uber Eats',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Uber_Eats_2020_logo.svg',
      orderUrl: 'https://www.ubereats.com/',
    },
  ],
  reviewsTitle: 'Lo que se dice despues del primer mordisco',
  reviewsDescription: 'Resenas de ejemplo para la demo. Cuando el cliente apruebe el proyecto, esta zona puede conectarse con sus valoraciones reales de Google.',
  reviews: [
    {
      id: 'review-1',
      name: 'Laura M.',
      quote: 'La smash estaba brutal, pan perfecto y la carne con mucho sabor. Repetimos seguro.',
      rating: 5,
      detail: 'Cena en pareja',
    },
    {
      id: 'review-2',
      name: 'Carlos R.',
      quote: 'Carta facil de ver, pedi rapido y las fotos ayudan mucho a decidir.',
      rating: 5,
      detail: 'Pedido en mesa',
    },
    {
      id: 'review-3',
      name: 'Marta G.',
      quote: 'Buen ambiente, servicio atento y burgers de las que recuerdas al dia siguiente.',
      rating: 5,
      detail: 'Comida con amigos',
    },
  ],
  brandQuoteText: 'Una burger bien hecha no se explica demasiado.',
  brandQuoteAccent: 'Se muerde, se disfruta y se recuerda.',
};

export const getRestaurantWithDefaults = (restaurant: Restaurant): Restaurant => ({
  ...restaurant,
  logoUrl: restaurant.logoUrl && restaurant.logoUrl !== '/images/logo.png' ? restaurant.logoUrl : '/logo.webp',
  email: restaurant.email || DEFAULT_HOMEPAGE_CONTENT.reservationsEmail,
  homepageContent: {
    ...DEFAULT_HOMEPAGE_CONTENT,
    ...restaurant.homepageContent,
    heroHighlights:
      restaurant.homepageContent?.heroHighlights?.length === 3
        ? restaurant.homepageContent.heroHighlights
        : DEFAULT_HOMEPAGE_CONTENT.heroHighlights,
    deliveryPartners:
      restaurant.homepageContent?.deliveryPartners?.length
        ? restaurant.homepageContent.deliveryPartners.map((partner, index) => ({
            id: partner.id || `delivery-${index + 1}`,
            name: partner.name || DEFAULT_HOMEPAGE_CONTENT.deliveryPartners[index]?.name || 'Delivery',
            logoUrl: partner.logoUrl || DEFAULT_HOMEPAGE_CONTENT.deliveryPartners[index]?.logoUrl || '',
            orderUrl: partner.orderUrl || DEFAULT_HOMEPAGE_CONTENT.deliveryPartners[index]?.orderUrl || '#',
          }))
        : DEFAULT_HOMEPAGE_CONTENT.deliveryPartners,
    reviews:
      restaurant.homepageContent?.reviews?.length
        ? restaurant.homepageContent.reviews.map((review, index) => ({
            id: review.id || `review-${index + 1}`,
            name: review.name || DEFAULT_HOMEPAGE_CONTENT.reviews[index]?.name || 'Cliente',
            quote: review.quote || DEFAULT_HOMEPAGE_CONTENT.reviews[index]?.quote || '',
            rating: review.rating || 5,
            detail: review.detail || DEFAULT_HOMEPAGE_CONTENT.reviews[index]?.detail || 'Resena',
          }))
        : DEFAULT_HOMEPAGE_CONTENT.reviews,
    galleryItems:
      restaurant.homepageContent?.galleryItems?.length === 4
        ? restaurant.homepageContent.galleryItems.map((item, index) => ({
            id: item.id || `gallery-${index + 1}`,
            imageUrl: item.imageUrl || DEFAULT_HOMEPAGE_CONTENT.galleryItems[index].imageUrl,
            label: item.label || DEFAULT_HOMEPAGE_CONTENT.galleryItems[index].label,
          }))
        : DEFAULT_HOMEPAGE_CONTENT.galleryItems,
  },
});
