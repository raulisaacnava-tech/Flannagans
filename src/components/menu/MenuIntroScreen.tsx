'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const MenuIntroScreen: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  return (
    <div className="absolute inset-0 bg-[#0A0A0A] z-50 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <div className="absolute inset-x-8 bottom-32 h-px bg-white/10" />

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-8 text-center mt-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <Image 
            src="/logo.webp" 
            alt="Flanagans Logo" 
            width={280} 
            height={120} 
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display font-black text-5xl text-cream uppercase tracking-widest leading-none mb-4"
        >
          Flanagans<br/>
          <span className="text-primary">Burguer</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-cream/50 text-sm font-semibold max-w-[250px] uppercase tracking-widest"
        >
          Disfruta el sabor de una burguer de verdad
        </motion.p>
      </div>

      {/* Bottom Actions */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 p-6 pb-12 space-y-4 w-full"
      >
        <button
          onClick={onEnter}
          className="w-full bg-primary text-secondary font-display font-black text-lg uppercase tracking-widest py-5 rounded-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Ver Carta <ArrowRight size={20} />
        </button>
        
        <Link 
          href="/"
          className="w-full bg-transparent text-cream/60 font-display font-bold text-xs uppercase tracking-widest py-4 rounded-lg flex items-center justify-center hover:bg-white/5 hover:text-cream transition-colors"
        >
          Volver a la web
        </Link>
      </motion.div>
    </div>
  );
};
