'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const NoComplicationsBlock: React.FC = () => {
  return (
    <section className="bg-primary py-24 md:py-32 select-none overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-display font-black text-6xl md:text-8xl lg:text-[120px] uppercase tracking-tighter text-secondary leading-none mb-8"
        >
          Sin complicarte
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-secondary/80 font-display font-bold text-xl md:text-3xl uppercase tracking-wider max-w-3xl mx-auto mb-12"
        >
          Ven con hambre. Nosotros hacemos el resto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#reservations" className="bg-secondary text-primary font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:scale-105 transition-transform w-full sm:w-auto">
            ¿Asegurar mesa?
          </Link>
          <a href="tel:919401241" className="bg-transparent border-2 border-secondary text-secondary font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary/10 transition-colors w-full sm:w-auto">
            Llamar ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};
