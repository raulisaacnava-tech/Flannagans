'use client';

import { useEffect } from 'react';
import { useRestaurant } from '@/lib/use-restaurant';

// Aplica los colores de marca configurados en el panel a las variables CSS.
// Solo tocamos el color principal y el de acento; los neutros (negro/blanco
// estructurales) se dejan intactos para no romper contrastes.
export const BrandTheme = () => {
  const restaurant = useRestaurant();
  const primary = restaurant.brandColors?.primary;
  const accent = restaurant.brandColors?.accent;

  useEffect(() => {
    const root = document.documentElement;
    if (primary) root.style.setProperty('--primary', primary);
    if (accent) root.style.setProperty('--accent-red', accent);
  }, [primary, accent]);

  return null;
};

export default BrandTheme;
