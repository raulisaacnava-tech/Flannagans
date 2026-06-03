'use client';

import React, { useState, useEffect } from 'react';
import { Flame, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getActiveBannerPromo, Promotion } from '@/lib/promotions-store';

const bannerEase = [0.23, 1, 0.32, 1] as const;

export const CampaignBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [promo, setPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    const load = () => {
      const active = getActiveBannerPromo();
      setPromo(active);
      setIsVisible(!!active);
    };
    load();
    window.addEventListener('flanagans_promotions_updated', load);
    return () => window.removeEventListener('flanagans_promotions_updated', load);
  }, []);

  if (!promo) return null;

  const colorMap: Record<string, string> = {
    primary: 'bg-primary text-secondary',
    red: 'bg-accent-red text-white',
    orange: 'bg-orange-500 text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    blue: 'bg-blue-500 text-white',
  };
  const colorCls = colorMap[promo.color] ?? 'bg-accent-red text-white';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0, y: -6 }}
          transition={{ duration: 0.18, ease: bannerEase }}
          className={`${colorCls} relative z-20 select-none overflow-hidden shadow-[0_14px_32px_rgb(0_0_0_/_0.28)]`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgb(255_255_255_/_0.2),transparent)] opacity-45" />
          <div className="relative p-3 pr-12 flex flex-col sm:flex-row sm:items-center justify-center gap-1.5 sm:gap-4 text-center">
            <div className="flex items-center justify-center gap-1.5 font-display font-black text-[10px] uppercase tracking-[0.14em]">
              <Flame size={14} className="fill-current" />
              <span>{promo.label || promo.name}</span>
            </div>
            <p className="text-xs font-display font-bold uppercase tracking-[0.08em]">
              {promo.description}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 rounded-full hover:bg-black/20 pressable"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
