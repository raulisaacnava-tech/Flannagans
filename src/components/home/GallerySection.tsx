'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const GallerySection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;
  const items = content.galleryItems;

  return (
    <section id="gallery" className="bg-[#050505] py-24 md:py-32">
      <div className="site-container">
        
        <div className="mb-16">
          <p className="font-display font-bold text-xl md:text-3xl text-cream/80 max-w-2xl uppercase tracking-wider leading-relaxed">
            {content.galleryIntro}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {items.map((item, index) => {
            const shape =
              index === 0
                ? 'col-span-2 row-span-2'
                : index === 2
                  ? 'col-span-1 row-span-2'
                  : 'col-span-1 row-span-1';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`${shape} bg-[#111] rounded-none relative overflow-hidden border border-white/5`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute left-4 bottom-4">
                  <span className="font-mono text-cream/85 text-xs uppercase tracking-[0.16em]">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};
