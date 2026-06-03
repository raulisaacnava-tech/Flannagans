'use client';

import { useEffect, useState } from 'react';
import { getRestaurant } from '@/lib/menu-store';
import { getRestaurantWithDefaults } from '@/lib/restaurant-content';
import { Restaurant } from '@/types/restaurant';

export const useRestaurant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>(() =>
    getRestaurantWithDefaults(getRestaurant()),
  );

  useEffect(() => {
    const sync = () => setRestaurant(getRestaurantWithDefaults(getRestaurant()));

    sync();
    window.addEventListener('flanagans_restaurant_updated', sync);
    return () => window.removeEventListener('flanagans_restaurant_updated', sync);
  }, []);

  return restaurant;
};
