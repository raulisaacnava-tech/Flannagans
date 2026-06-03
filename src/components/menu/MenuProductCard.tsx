'use client';

import React from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types/menu';
import { FavoriteButton } from './FavoriteButton';

export const MenuProductCard: React.FC<{
  product: Product;
  onClick: (product: Product) => void;
}> = ({ product, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onClick(product)}
      className={`menu-card-premium rounded-xl overflow-hidden cursor-pointer flex flex-row p-3 gap-4 relative ${
        !product.isAvailable ? 'opacity-50 grayscale' : ''
      }`}
    >
      <div className="group relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-black/50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 to-transparent" />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
            <span className="font-display font-black text-[10px] uppercase tracking-[0.14em] text-accent-red border border-accent-red px-2 py-1 rounded-sm bg-black/50 rotate-[-8deg]">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between py-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-black text-[15px] text-cream leading-tight uppercase tracking-[0.04em] line-clamp-2">
              {product.name}
            </h3>
            <span className="shrink-0 rounded-full bg-primary text-secondary px-2.5 py-1 font-display font-black text-xs">
              {product.price.toFixed(2)} EUR
            </span>
          </div>
          <p className="text-cream/58 text-xs mt-2 font-medium leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-end pt-2 gap-3">
          <FavoriteButton productId={product.id} size={20} />
          <button className="text-cream/70 hover:text-primary pressable" aria-label="Informacion">
            <Info size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
