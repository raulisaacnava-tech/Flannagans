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
          className="mx-auto mb-8 max-w-[min(100%,58rem)] break-words font-display text-[clamp(2.85rem,13.5vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.02em] text-secondary [text-wrap:balance] sm:text-[clamp(4.2rem,12vw,7rem)] lg:text-[7.5rem]"
        >
          Sin complicarte
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-10 max-w-3xl font-display text-lg font-bold uppercase leading-snug tracking-[0.04em] text-secondary/80 sm:text-xl md:mb-12 md:text-3xl"
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
