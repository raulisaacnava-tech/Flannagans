'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const NoComplicationsBlock: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 select-none sm:py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 translate-x-1/4 skew-x-12 bg-secondary/5" />

      <div className="site-container relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-8 max-w-[min(100%,17rem)] text-center font-display text-[3.05rem] font-black uppercase leading-[0.9] tracking-normal text-secondary sm:max-w-[38rem] sm:text-[4rem] md:max-w-[48rem] md:text-[5rem] lg:max-w-[58rem] lg:text-[6.25rem]"
        >
          Sin{' '}
          <span className="block sm:inline">complicarte</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-10 max-w-[min(100%,42rem)] px-1 font-display text-base font-bold uppercase leading-snug tracking-[0.035em] text-secondary/80 sm:text-xl md:mb-12 md:text-2xl"
        >
          Ven con hambre. Nosotros hacemos el resto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#reservations"
            className="flex min-h-14 w-full items-center justify-center bg-secondary px-6 py-4 text-center font-display text-sm font-black uppercase tracking-[0.08em] text-primary transition-transform hover:scale-[1.02] sm:w-auto sm:min-w-56"
          >
            Asegurar mesa
          </Link>
          <a
            href="tel:919401241"
            className="flex min-h-14 w-full items-center justify-center border-2 border-secondary bg-transparent px-6 py-4 text-center font-display text-sm font-black uppercase tracking-[0.08em] text-secondary transition-colors hover:bg-secondary/10 sm:w-auto sm:min-w-56"
          >
            Llamar ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};
