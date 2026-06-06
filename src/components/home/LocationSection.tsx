'use client';

import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const LocationSection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section id="location" className="relative overflow-hidden bg-[#0A0A0A] py-20 sm:py-24 lg:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]"
        aria-hidden="true"
      />
      <div className="site-container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            <div className="max-w-xl">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-primary/90">
                Mostoles, Madrid
              </p>
              <h2 className="font-display text-[clamp(3.35rem,10vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-cream [text-wrap:balance]">
                {content.locationTitle}
              </h2>
              <p className="mt-5 max-w-[33rem] text-base font-medium leading-relaxed text-cream/70 sm:text-lg">
                Ven a por la burger en su mejor momento, sin rodeos y con la carta visual lista para pedir al instante.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-start gap-4 text-cream">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                    <MapPin size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-lg font-black text-cream">{restaurant.name}</p>
                    <p className="mt-2 max-w-[28rem] text-sm leading-relaxed text-cream/68 sm:text-[15px]">
                      {content.locationPlaceLabel}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={content.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-center gap-3 border border-primary bg-primary px-6 py-4 text-center font-display text-sm font-black uppercase tracking-[0.14em] text-secondary transition-transform duration-300 hover:-translate-y-0.5 sm:px-7"
              >
                <span>Abrir mapa</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="w-full"
          >
            <div className="relative">
              <div
                className="absolute -left-3 -top-3 hidden h-24 w-24 border border-primary/35 lg:block"
                aria-hidden="true"
              />
              <div className="absolute -bottom-3 -right-3 hidden h-28 w-28 border border-white/10 lg:block" aria-hidden="true" />

              <div className="overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary/90">
                      Punto de encuentro
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cream/78">
                      Burgers, sala y recogida
                    </p>
                  </div>
                  <a
                    href={content.googleMapsPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-black/20 text-cream/70 transition-colors hover:border-primary/40 hover:text-primary"
                    aria-label={`Abrir ubicacion de ${restaurant.name} en Google Maps`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className="relative aspect-[4/4.5] sm:aspect-[16/11] lg:aspect-[5/4]">
                  <iframe
                    src={content.googleMapsEmbedUrl}
                    title={`Mapa de ${restaurant.name}`}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
