'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bike, Flame, Percent, Sparkles, Star, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getHomePromotions, Promotion } from '@/lib/promotions-store';

const COLOR_STYLES: Record<string, { badge: string; icon: string; border: string }> = {
  primary: { badge: 'text-primary border-yellow-500/20 bg-yellow-500/5', icon: 'text-primary', border: 'border-yellow-500/10' },
  red:     { badge: 'text-accent-red border-red-500/20 bg-red-500/5', icon: 'text-accent-red', border: 'border-red-500/10' },
  orange:  { badge: 'text-orange-400 border-orange-500/20 bg-orange-500/5', icon: 'text-orange-400', border: 'border-orange-500/10' },
  green:   { badge: 'text-green-400 border-green-500/20 bg-green-500/5', icon: 'text-green-400', border: 'border-green-500/10' },
  purple:  { badge: 'text-purple-400 border-purple-500/20 bg-purple-500/5', icon: 'text-purple-400', border: 'border-purple-500/10' },
  blue:    { badge: 'text-blue-400 border-blue-500/20 bg-blue-500/5', icon: 'text-blue-400', border: 'border-blue-500/10' },
};

function getStyle(color: string) {
  return COLOR_STYLES[color] ?? COLOR_STYLES.primary;
}

function getIcon(color: string) {
  const map: Record<string, React.FC<{ size?: number; className?: string }>> = {
    percent: Percent, red: Flame, orange: Flame, primary: Sparkles, green: Star, purple: Tag, blue: Bike,
  };
  return map[color] ?? Sparkles;
}

export const Promotions: React.FC = () => {
  const [promos, setPromos] = useState<Promotion[]>([]);

  useEffect(() => {
    const load = () => setPromos(getHomePromotions());
    load();
    window.addEventListener('flanagans_promotions_updated', load);
    return () => window.removeEventListener('flanagans_promotions_updated', load);
  }, []);

  if (promos.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } },
  } as const;

  return (
    <section id="promotions" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#0A0A0A] border border-accent/20 text-xs font-mono text-cream/70 uppercase tracking-widest">
            <Sparkles size={12} className="fill-accent" /> GRANDES COMBOS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-cream uppercase tracking-wide">
            Promociones Brutales
          </h2>
          <p className="text-cream/60 text-base sm:text-lg">
            Ahorra a lo grande sin perder un ápice de sabor. Selecciona la promoción que mejor se adapte a tu plan de hoy.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {promos.map((promo, idx) => {
            const style = getStyle(promo.color);
            const Icon = getIcon(promo.color);
            return (
              <motion.div
                key={promo.id}
                variants={itemVariants}
                className="minimalist-card p-6 sm:p-8 flex flex-col justify-between shadow-none group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cream/40 uppercase tracking-widest font-mono">PROMO #{idx + 1}</span>
                    <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-none border uppercase tracking-widest font-mono ${style.badge}`}>
                      {promo.label || promo.name}
                    </span>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className={`p-3.5 rounded-none bg-[#121212] border border-white/10 shrink-0 ${style.icon}`}>
                      <Icon size={24} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-cream group-hover:text-primary transition-colors uppercase">
                        {promo.name}
                      </h3>
                      {promo.discountType !== 'none' && (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 border rounded-none ${style.badge}`}>
                          <Percent size={10} />
                          {promo.discountType === 'percent' ? `${promo.discountValue}% de descuento` : `${promo.discountValue.toFixed(2)} € de descuento`}
                        </span>
                      )}
                      <p className="text-cream/60 text-sm leading-relaxed font-semibold">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-black text-cream hover:text-primary uppercase tracking-widest transition-colors font-mono"
                  >
                    Pedir Ahora <ArrowRight size={12} />
                  </Link>
                  {promo.startDate && promo.endDate && (
                    <span className="text-[10px] text-cream/30 font-mono">
                      {promo.startDate} → {promo.endDate}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center">
          <p className="text-xs text-cream/30 font-mono uppercase tracking-wider italic">
            * Promociones sujetas a condiciones comerciales de Flanagans Burguer. No acumulables con otras ofertas.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Promotions;
