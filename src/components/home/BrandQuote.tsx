'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const BrandQuote: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section className="flex items-center justify-center border-t border-white/5 bg-[#050505] py-24 text-center md:py-44">
      <div className="site-container relative max-w-5xl">
        <span className="absolute -top-12 left-1 text-[7rem] font-display font-black leading-none text-white/5 select-none sm:-left-8 sm:text-[9rem] md:-top-24 md:-left-16 md:text-[12rem]">&ldquo;</span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative z-10 break-words font-display text-[clamp(2.65rem,12vw,5.75rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-cream [text-wrap:balance] md:text-[clamp(4rem,8vw,5.75rem)]"
        >
          {content.brandQuoteText}
          <br />
          <span className="text-primary">{content.brandQuoteAccent}</span>
        </motion.h2>

        <span className="absolute -right-1 -bottom-16 text-[7rem] font-display font-black leading-none text-white/5 select-none sm:-right-8 sm:text-[9rem] md:-right-16 md:-bottom-32 md:text-[12rem]">&rdquo;</span>
      </div>
    </section>
  );
};
