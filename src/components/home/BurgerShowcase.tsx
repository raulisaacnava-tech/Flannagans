'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { getProducts } from '@/lib/menu-store';
import { Product } from '@/types/menu';

export const BurgerShowcase: React.FC = () => {
  const [displayBurgers, setDisplayBurgers] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    // Prioritize Burger del Mes + Featured specials + Top selling
    const burgerDelMes = products.find(p => p.category === 'burger-del-mes');
    const featuredSpecials = products.filter(p => p.isFeatured && p.category === 'especiales' && p.id !== burgerDelMes?.id);
    
    let combined = [];
    if (burgerDelMes) combined.push(burgerDelMes);
    combined = [...combined, ...featuredSpecials].slice(0, 4);

    // Si aún no hay 4, rellenar con clásicas destacadas
    if (combined.length < 4) {
      const featuredClasicas = products.filter(p => p.isFeatured && p.category === 'clasicas');
      combined = [...combined, ...featuredClasicas].slice(0, 4);
    }

    setDisplayBurgers(combined);
    
    // Escuchar cambios
    const handleUpdate = () => {
      // Refresh
      const updatedProducts = getProducts();
      const updatedBurgerDelMes = updatedProducts.find(p => p.category === 'burger-del-mes');
      const updatedFeaturedSpecials = updatedProducts.filter(p => p.isFeatured && p.category === 'especiales' && p.id !== updatedBurgerDelMes?.id);
      
      let updatedCombined = [];
      if (updatedBurgerDelMes) updatedCombined.push(updatedBurgerDelMes);
      updatedCombined = [...updatedCombined, ...updatedFeaturedSpecials].slice(0, 4);
      
      if (updatedCombined.length < 4) {
        const updatedFeaturedClasicas = updatedProducts.filter(p => p.isFeatured && p.category === 'clasicas');
        updatedCombined = [...updatedCombined, ...updatedFeaturedClasicas].slice(0, 4);
      }
      setDisplayBurgers(updatedCombined);
    };
    
    window.addEventListener('flanagans_menu_updated', handleUpdate);
    return () => window.removeEventListener('flanagans_menu_updated', handleUpdate);
  }, []);
    return (
    <section id="burgers" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="site-container">
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-cream mb-4"
          >
            Algunas de<br />nuestras burgers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream/50 max-w-xl font-medium"
          >
            Una pequeña muestra de lo que pasa cuando carne, queso y pan se toman en serio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {displayBurgers.map((burger, i) => (
            <motion.div 
              key={burger.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-[#050505] border border-white/5 overflow-hidden flex flex-col sm:flex-row h-full"
            >
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto bg-[#111] relative flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={burger.imageUrl}
                  alt={burger.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {burger.isCampaign && burger.campaignLabel && (
                  <div className="absolute top-3 left-3 bg-accent text-secondary font-display font-black text-[9px] uppercase tracking-widest px-2 py-1 shadow-lg flex items-center gap-1 z-10">
                    <Flame size={10} className="fill-secondary" /> {burger.campaignLabel}
                  </div>
                )}
                {!burger.isCampaign && burger.isFeatured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-black font-display font-black text-[9px] uppercase tracking-widest px-2 py-1 shadow-lg flex items-center gap-1 z-10">
                    TOP
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-cream mb-2 group-hover:text-primary transition-colors">
                    {burger.name}
                  </h3>
                  <p className="text-cream/50 text-sm font-medium mb-4 line-clamp-3">
                    {burger.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                  <span className="font-mono text-xl font-bold text-primary">{burger.price.toFixed(2)} €</span>
                  <Link href="/menu" className="text-xs font-display font-bold uppercase tracking-widest text-cream/70 hover:text-primary transition-colors">
                    Ver detalle →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link 
            href="/menu"
            className="bg-primary text-secondary font-display font-black text-sm uppercase tracking-widest px-12 py-5 hover:bg-white hover:text-black transition-colors"
          >
            Ver carta completa
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
