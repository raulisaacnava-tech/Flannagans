'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const FlanaCoinsBlock: React.FC = () => {
  return (
    <section className="bg-primary py-16 md:py-24 overflow-hidden relative select-none">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #000 2px, transparent 2px)', backgroundSize: '24px 24px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-secondary text-primary font-display font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-none mb-6">
            <Star size={12} className="fill-primary" /> Próximamente
          </div>
          
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-secondary leading-[0.9] mb-4">
            Sube de nivel con<br/>FlanaCoins
          </h2>
          <p className="text-secondary/80 font-bold max-w-md mx-auto md:mx-0">
            Muy pronto podrás escanear, sumar monedas y volver por más. Porque la lealtad tiene que saber a gloria.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end"
        >
          {/* Sticker representation */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-secondary text-primary flex flex-col items-center justify-center border-4 border-dashed border-primary/30 shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
            <Star size={64} className="fill-primary mb-2" />
            <span className="font-display font-black text-3xl uppercase tracking-tighter">
              FlanaCoin
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
