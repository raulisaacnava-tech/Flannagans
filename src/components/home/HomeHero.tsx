'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

const easeOutStrong = [0.23, 1, 0.32, 1] as const;

export const HomeHero: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 md:pt-32 pb-14 overflow-hidden bg-[#050302]">
      <div className="absolute inset-0 bg-black">
        <video
          src={content.heroVideoUrl}
          poster={content.heroPosterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-55 scale-[1.03]"
        />
        <div className="absolute inset-0 hero-fire-wash" />
        <div className="hero-ember-field" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgb(0_0_0_/_0.28)_44%,rgb(0_0_0_/_0.9)_100%)]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-primary/70" />
      <div className="absolute inset-x-8 bottom-10 h-px bg-white/10" />

      <div className="site-container relative z-10 flex w-full flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, ease: easeOutStrong }}
          className="mb-6 inline-flex max-w-full items-center justify-center gap-2 border border-primary/25 bg-black/45 px-3 py-2 text-center font-display text-[10px] font-black uppercase tracking-[0.12em] text-primary shadow-[0_0_24px_rgb(250_204_21_/_0.12)] backdrop-blur-md sm:px-4 sm:text-[11px] sm:tracking-[0.18em]"
        >
          <Flame size={14} className="fill-primary" />
          {content.heroEyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.68, delay: 0.05, ease: easeOutStrong }}
          className="max-w-6xl font-display text-[clamp(3rem,15vw,5.75rem)] font-black uppercase leading-[0.9] tracking-normal text-cream [text-wrap:balance] mb-7 drop-shadow-[0_10px_42px_rgb(0_0_0_/_0.75)] sm:text-[clamp(4rem,8vw,6rem)]"
        >
          {content.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, delay: 0.18, ease: easeOutStrong }}
          className="text-cream/78 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed mb-10 [text-wrap:pretty]"
        >
          {content.heroDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, delay: 0.26, ease: easeOutStrong }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="flex min-h-14 w-full items-center justify-center gap-3 bg-primary px-7 py-4 font-display text-sm font-black uppercase tracking-[0.1em] text-secondary pressable premium-cta sm:w-auto sm:px-10 sm:py-5 sm:text-base sm:tracking-[0.12em]"
          >
            {content.heroPrimaryCtaLabel} <ArrowRight size={20} />
          </Link>
          <Link
            href="#reservations"
            className="flex min-h-14 w-full items-center justify-center border border-white/24 bg-black/35 px-7 py-4 font-display text-sm font-black uppercase tracking-[0.1em] text-cream backdrop-blur-md pressable hover:bg-white/10 sm:w-auto sm:px-10 sm:py-5 sm:text-base sm:tracking-[0.12em]"
          >
            {content.heroSecondaryCtaLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.38, ease: easeOutStrong }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl"
        >
          {content.heroHighlights.map((item) => (
            <div key={item} className="border border-white/10 bg-black/28 backdrop-blur-md px-4 py-3 text-center">
              <span className="font-display text-xs font-black uppercase tracking-[0.14em] text-cream/72">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
