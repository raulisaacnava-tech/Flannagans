'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const VisualMenuPreview: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;
  const titleParts = content.visualMenuTitle.split(' ');

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter text-cream leading-[0.9] mb-6">
              {titleParts.slice(0, 2).join(' ')}<br />{titleParts.slice(2, 4).join(' ')}<br />{titleParts.slice(4).join(' ')}
            </h2>
            <p className="text-cream/60 font-medium text-lg mb-10 max-w-md">
              {content.visualMenuDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="bg-primary text-secondary font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:scale-105 transition-transform text-center"
              >
                {content.visualMenuPrimaryCtaLabel}
              </Link>
              <Link
                href="/menu"
                className="bg-transparent border border-white/20 text-cream font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:bg-white/10 transition-colors text-center"
              >
                {content.visualMenuSecondaryCtaLabel}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[660px] bg-[#111] rounded-[40px] border-8 border-[#222] shadow-2xl shadow-primary/10 overflow-hidden flex flex-col">
              <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-[#0A0A0A]">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-primary" />
                  <div className="w-20 h-3 bg-white/10 rounded" />
                </div>
                <div className="w-6 h-6 bg-white/10 rounded-full" />
              </div>
              <div className="flex-grow bg-black relative flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <div className="w-full aspect-square rounded-2xl bg-white/5 absolute top-20" />

                <div className="absolute bottom-16 left-6 z-20 space-y-3">
                  <div className="w-32 h-6 bg-white/20 rounded" />
                  <div className="w-24 h-4 bg-primary/80 rounded" />
                </div>
              </div>
              <div className="h-20 bg-[#111] border-t border-white/10 flex items-center justify-center gap-4 px-6 shrink-0">
                <div className="flex-1 h-10 bg-primary/20 rounded-full" />
                <div className="flex-1 h-10 bg-white/5 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
