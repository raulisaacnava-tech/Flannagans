'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Leaf, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from 'framer-motion';
import { Product } from '@/types/menu';
import { getAllergens, getExtras } from '@/lib/menu-store';

export const ProductBottomSheet: React.FC<{
  product: Product | null;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const extras = getExtras();
  const allergens = getAllergens();
  const shouldReduceMotion = useReducedMotion();

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 700) {
      onClose();
    }
  };

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.18, ease: [0.23, 1, 0.32, 1] }}
        onClick={onClose}
        className="fixed inset-0 bg-black/82 z-50 backdrop-blur-md"
      />

      <motion.div
        initial={{ y: shouldReduceMotion ? 0 : '100%' }}
        animate={{ y: 0 }}
        exit={{ y: shouldReduceMotion ? 0 : '100%' }}
        transition={{ type: 'spring', duration: 0.42, bounce: 0.08 }}
        drag={shouldReduceMotion ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.02, bottom: 0.28 }}
        onDragEnd={handleDragEnd}
        className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-md w-full bg-[#11100d] rounded-t-[1.35rem] z-50 flex flex-col max-h-[90vh] shadow-[0_-28px_70px_rgb(0_0_0_/_0.72)] border-t border-x border-white/12 overflow-hidden"
      >
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-white/24 rounded-full" />
        </div>

        <div className="overflow-y-auto no-scrollbar flex-grow pb-32">
          <div className="relative h-64 w-full bg-black">
            {product.videoUrl ? (
              <video
                src={product.videoUrl}
                poster={product.posterImage || product.imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#11100d] via-transparent to-transparent opacity-95" />
            <div className="absolute inset-0 hero-fire-wash opacity-25" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white border border-white/15 pressable z-10"
              aria-label="Cerrar detalle"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5 space-y-6 -mt-6 relative z-10">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-display font-black text-2xl text-cream uppercase tracking-[0.02em] leading-tight [text-wrap:balance]">
                  {product.name}
                </h2>
                <span className="font-display font-black text-lg text-secondary bg-primary rounded-full px-3 py-1 whitespace-nowrap">
                  {product.price.toFixed(2)} EUR
                </span>
              </div>
              <p className="text-cream/68 text-sm font-medium leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {product.extras && product.extras.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-black text-xs text-cream/48 uppercase tracking-[0.14em] flex items-center gap-1.5 border-b border-white/8 pb-2">
                  <Plus size={12} /> Extras disponibles
                </h3>
                <div className="flex flex-col gap-2">
                  {product.extras.map((extraId) => {
                    const extra = extras.find((item) => item.id === extraId);
                    return (
                      <div key={extraId} className="flex justify-between items-center text-sm text-cream/76 bg-white/[0.055] border border-white/8 p-3 rounded-lg">
                        <span>{extra?.name || extraId}</span>
                        {extra && <span className="font-display font-black text-primary">+{extra.price.toFixed(2)} EUR</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {product.allergens && product.allergens.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-black text-xs text-cream/48 uppercase tracking-[0.14em] flex items-center gap-1.5 border-b border-white/8 pb-2">
                  <Leaf size={12} /> Alergenos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allg) => {
                    const allergen = allergens.find((item) => item.id === allg);
                    return (
                      <span key={allg} className="px-3 py-1.5 rounded-full bg-white/[0.055] border border-white/10 text-cream/66 text-[10px] uppercase font-bold tracking-[0.12em]">
                        {allergen ? `${allergen.icon} ${allergen.name}` : allg}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
