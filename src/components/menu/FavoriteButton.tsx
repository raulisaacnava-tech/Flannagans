'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useOrderList } from '@/lib/order-list';
import { motion } from 'framer-motion';

export const FavoriteButton: React.FC<{ productId: string; className?: string; size?: number }> = ({ productId, className = '', size = 20 }) => {
  const { favorites, toggleFavorite } = useOrderList();
  const isFav = favorites[productId] || false;

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      className={`flex items-center justify-center transition-colors ${className}`}
      aria-label="Toggle Favorito"
    >
      <Heart 
        size={size} 
        className={isFav ? 'fill-accent-red text-accent-red' : 'text-cream/80'} 
      />
    </motion.button>
  );
};
