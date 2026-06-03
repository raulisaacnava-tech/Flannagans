'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-[#0A0A0A] border border-white/10 text-xs font-mono text-primary uppercase tracking-widest">
                🔥 LA MEJOR HAMBURGUESERÍA ARTESANAL
              </span>
              <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl leading-tight text-cream uppercase">
                Disfruta el sabor de una <span className="text-primary">burguer</span> de verdad
              </h1>
              <p className="text-base sm:text-lg text-cream/70 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Carne de primera calidad, combinaciones brutales y una carta pensada para que siempre quieras repetir.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 btn-minimalist border border-white/20 text-xs group"
              >
                Ver menú
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#reservations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 btn-outline-minimalist border border-white/20 text-xs"
              >
                Reservar ahora
                <Calendar size={18} className="ml-2 text-primary animate-pulse" />
              </a>
            </motion.div>

            {/* Micro características */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-display font-black text-primary">100%</span>
                <span className="text-xs text-cream/40 uppercase tracking-wider font-bold">Ternera Gallega</span>
              </div>
              <div className="text-center lg:text-left border-x border-white/5 px-4">
                <span className="block text-2xl font-display font-black text-primary">Daily</span>
                <span className="text-xs text-cream/40 uppercase tracking-wider font-bold">Pan Brioche</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-display font-black text-primary">Madurada</span>
                <span className="text-xs text-cream/40 uppercase tracking-wider font-bold">Carne Dry Aged</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]"
            >
              {/* Imagen de la hamburguesa flotante */}
              <div className="relative w-full h-full z-10 hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800"
                  alt="Flanagans Burger Especial"
                  fill
                  sizes="(max-w-768px) 280px, 450px"
                  priority
                  className="object-contain"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-4 z-20 bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-none text-center shadow-none"
              >
                <span className="block text-[10px] font-mono text-cream/50 uppercase tracking-wider">Crujiente</span>
                <span className="text-xs font-display font-black text-primary uppercase">Bacon Candy 🥓</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 -left-6 z-20 bg-[#0A0A0A] border border-white/10 px-4 py-2.5 rounded-none text-center shadow-none"
              >
                <span className="block text-[10px] font-mono text-cream/50 uppercase tracking-wider">Artesano</span>
                <span className="text-xs font-display font-black text-white uppercase">Queso Cheddar 🧀</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
