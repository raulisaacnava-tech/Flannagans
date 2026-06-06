'use client';

import { useEffect, useState } from 'react';
import { getRestaurant } from '@/lib/menu-store';
import { getRestaurantWithDefaults } from '@/lib/restaurant-content';
import { Restaurant } from '@/types/restaurant';

const RESTAURANT_KEY = 'flanagans_restaurant_v5';

export const useRestaurant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>(() =>
    getRestaurantWithDefaults(getRestaurant()),
  );

  useEffect(() => {
    const sync = () => setRestaurant(getRestaurantWithDefaults(getRestaurant()));
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === RESTAURANT_KEY) {
        sync();
      }
    };

    sync();
    window.addEventListener('flanagans_restaurant_updated', sync);
    window.addEventListener('storage', syncFromStorage);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('flanagans_restaurant_updated', sync);
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener('focus', sync);
    };
  }, []);

  return restaurant;
};
