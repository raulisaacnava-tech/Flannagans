'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { getProducts } from '@/lib/menu-store';
import { Product } from '@/types/menu';

export const FeaturedBurgerSection: React.FC = () => {
  const [burgerDelMes, setBurgerDelMes] = useState<Product | null>(null);

  useEffect(() => {
    const products = getProducts();
    const bmes = products.find(p => p.category === 'burger-del-mes');
    if (bmes) setBurgerDelMes(bmes);

    const handleUpdate = () => {
      const updatedProducts = getProducts();
      const updatedBmes = updatedProducts.find(p => p.category === 'burger-del-mes');
      if (updatedBmes) setBurgerDelMes(updatedBmes);
    };

    window.addEventListener('flanagans_menu_updated', handleUpdate);
    return () => window.removeEventListener('flanagans_menu_updated', handleUpdate);
  }, []);

  if (!burgerDelMes) return null;

  return (
    <section className="bg-[#050505] py-24 md:py-32 overflow-hidden border-b border-white/5">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative aspect-[4/5] bg-[#0A0A0A] rounded-none border border-white/10"
          >
            <div className="relative w-full h-full bg-[#111] overflow-hidden">
              {burgerDelMes.videoUrl ? (
                <video
                  src={burgerDelMes.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={burgerDelMes.imageUrl}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                />
              ) : (
                <Image
                  src={burgerDelMes.imageUrl}
                  alt={burgerDelMes.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                />
              )}
            </div>
            
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-accent-red text-white font-display font-black text-xs uppercase tracking-widest px-4 py-2 border border-accent-red/20 shadow-xl flex items-center gap-2">
                <Flame size={14} className="fill-white" />
                Burger del mes
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="font-display mb-6 text-[clamp(3rem,13vw,5.75rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-cream [text-wrap:balance] md:text-[clamp(4rem,8vw,6rem)]">
              {burgerDelMes.name}
            </h2>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-3xl font-bold text-primary">
                {burgerDelMes.price.toFixed(2)} €
              </span>
              <span className="text-cream/40 font-medium text-sm">Edición limitada</span>
            </div>

            <p className="text-cream/60 text-lg md:text-xl font-medium mb-10 max-w-md">
              {burgerDelMes.description}
            </p>

            <Link 
              href="/menu"
              className="inline-flex items-center gap-2 w-fit bg-transparent border border-primary text-primary font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:bg-primary hover:text-secondary transition-colors"
            >
              Ver en la carta
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
