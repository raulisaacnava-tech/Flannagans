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
  brandQuoteText: 'Una burger bien hecha no se explica demasiado.',
  brandQuoteAccent: 'Se muerde, se disfruta y se recuerda.',
};

export const getRestaurantWithDefaults = (restaurant: Restaurant): Restaurant => ({
  ...restaurant,
  email: restaurant.email || DEFAULT_HOMEPAGE_CONTENT.reservationsEmail,
  homepageContent: {
    ...DEFAULT_HOMEPAGE_CONTENT,
    ...restaurant.homepageContent,
    heroHighlights:
      restaurant.homepageContent?.heroHighlights?.length === 3
        ? restaurant.homepageContent.heroHighlights
        : DEFAULT_HOMEPAGE_CONTENT.heroHighlights,
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
