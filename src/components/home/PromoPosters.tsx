'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getHomePromotions, Promotion } from '@/lib/promotions-store';

const colorMap: Record<string, string> = {
  primary: 'bg-primary text-secondary',
  red: 'bg-accent-red text-cream',
  orange: 'bg-orange-500 text-white',
  green: 'bg-green-500 text-white',
  purple: 'bg-purple-500 text-white',
  blue: 'bg-blue-500 text-white',
};

export const PromoPosters: React.FC = () => {
  const [promos, setPromos] = useState<Promotion[]>([]);

  useEffect(() => {
    const sync = () => setPromos(getHomePromotions());
    sync();
    window.addEventListener('flanagans_promotions_updated', sync);
    return () => window.removeEventListener('flanagans_promotions_updated', sync);
  }, []);

  if (promos.length === 0) {
    return null;
  }

  return (
    <section id="promos" className="bg-[#050505] py-24 md:py-32 border-t border-b border-white/5">
      <div className="site-container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-cream mb-4"
          >
            Promos que saben mejor<br />cuando las pillas a tiempo
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`p-8 aspect-square flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 ${colorMap[promo.color] || 'bg-[#1A1A1A] text-primary border border-white/10'}`}
            >
              <div>
                <h3 className="font-display font-black text-3xl uppercase tracking-tighter leading-none mb-2">
                  {promo.label || promo.name}
                </h3>
                <div className="font-bold text-sm mb-3 tracking-widest uppercase opacity-90">
                  {promo.name}
                </div>
                <p className="text-sm font-medium opacity-80 leading-snug">
                  {promo.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/menu" className="font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit hover:opacity-70 transition-opacity">
                  Ver promo {'->'}
                </Link>
                <span className="text-[9px] uppercase tracking-widest font-mono opacity-40">
                  Condiciones aplicables.
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
