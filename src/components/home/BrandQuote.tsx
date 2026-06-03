'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const BrandQuote: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section className="bg-[#050505] py-32 md:py-48 flex items-center justify-center text-center px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto relative">
        <span className="absolute -top-16 -left-8 md:-top-24 md:-left-16 text-[150px] md:text-[200px] text-white/5 font-display font-black leading-none select-none">&ldquo;</span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-display font-black text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-cream leading-[0.95] relative z-10"
        >
          {content.brandQuoteText}
          <br />
          <span className="text-primary">{content.brandQuoteAccent}</span>
        </motion.h2>

        <span className="absolute -bottom-24 -right-8 md:-bottom-32 md:-right-16 text-[150px] md:text-[200px] text-white/5 font-display font-black leading-none select-none">&rdquo;</span>
      </div>
    </section>
  );
};
