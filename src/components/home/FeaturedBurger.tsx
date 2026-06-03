'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedBurger: React.FC = () => {
  return (
    <section id="featured-burger" className="py-24 bg-dark-gray border-y border-white/5 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#000000] border border-primary/20 text-xs font-mono text-primary uppercase tracking-widest">
            <Sparkles size={12} className="fill-primary" /> CREACIÓN DEL CHEF
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-cream uppercase tracking-wide">
            Burger Destacada
          </h2>
          <p className="text-cream/60 text-base sm:text-lg">
            Cada mes diseñamos una obra de arte gastronómica combinando ingredientes premium y sabores que te dejarán sin palabras.
          </p>
        </div>

        <div className="minimalist-card p-8 sm:p-12 relative overflow-hidden shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Image */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800"
                  alt="La Tentación del Mes - Flanagans Burger"
                  fill
                  className="object-contain"
                />
              </motion.div>
              {/* Badge Burger del Mes */}
              <div className="absolute top-2 left-2 z-20 bg-accent text-secondary font-display font-black text-xs px-3 py-1.5 rounded-none border border-accent/20 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Flame size={14} className="fill-secondary text-secondary" /> Burger del Mes
              </div>
            </div>

            {/* Right side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-cream uppercase">
                  La Tentación del Mes
                </h3>
                <span className="font-mono text-xl text-primary border border-primary/30 px-3 py-1 bg-transparent">
                  18,00 €
                </span>
              </div>

              <p className="text-cream/70 text-base sm:text-lg leading-relaxed">
                Nuestra obra maestra de esta temporada. 180g de carne de buey madurada durante 45 días en nuestras propias cámaras, coronada con cheddar rojo inglés derretido lentamente sobre la parrilla. Añadimos tiras de bacon premium glaseadas en sirope de arce y bourbon de Kentucky, una corona de cebolla frita crujiente y una generosa dosis de salsa Flanagans Black BBQ sobre pan brioche de patata tostado en mantequilla clarificada.
              </p>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-cream/40 uppercase tracking-widest font-mono">Ingredientes Brutales:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['180g Buey Madurado', 'Cheddar Rojo fundido', 'Bacon al Bourbon 🥓', 'Cebolla Crujiente', 'Salsa Black BBQ', 'Brioche de Patata'].map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-cream/80 font-semibold">
                      <span className="h-1.5 w-1.5 bg-primary shrink-0" />
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/menu?product=tentacion-del-mes"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 btn-minimalist border border-white/20 text-xs group"
                >
                  Ver en carta
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 text-xs text-cream/40 font-mono">
                  🚨 ¡Quedan pocas unidades hoy!
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedBurger;
