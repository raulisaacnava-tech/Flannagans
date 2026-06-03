'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const LocationSection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section id="location" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter text-cream leading-[0.9] mb-6">
              {content.locationTitle}
            </h2>
            <div className="flex items-start gap-4 mb-8 text-cream/70">
              <MapPin size={24} className="text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg mb-1">{restaurant.name}</p>
                <p className="text-sm">{content.locationPlaceLabel}</p>
              </div>
            </div>
            <a
              href={content.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-primary text-secondary font-display font-black text-sm uppercase tracking-widest px-8 py-4 hover:scale-105 transition-transform"
            >
              Abrir en Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-[4/3] bg-[#111] border-2 border-white/5 relative overflow-hidden"
          >
            <iframe
              src={content.googleMapsEmbedUrl}
              title={`Mapa de ${restaurant.name}`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
