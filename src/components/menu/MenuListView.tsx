'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/menu';
import { MenuProductCard } from './MenuProductCard';

export const MenuListView: React.FC<{
  products: Product[];
  onViewDetails: (product: Product) => void;
}> = ({ products, onViewDetails }) => {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center px-4">
        <div className="mx-auto mb-5 h-14 w-14 rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_28px_rgb(250_204_21_/_0.1)]" />
        <h3 className="font-display font-black text-cream uppercase tracking-[0.08em]">Nada por aqui</h3>
        <p className="text-cream/58 text-sm mt-2">Prueba otra categoria de la carta.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
      className="px-4 pb-32 pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, delay: Math.min(index * 0.035, 0.18), ease: [0.23, 1, 0.32, 1] }}
        >
          <MenuProductCard product={product} onClick={onViewDetails} />
        </motion.div>
      ))}
    </motion.div>
  );
};
