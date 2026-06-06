'use client';

import React from 'react';
import Link from 'next/link';
import { Bike, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const DeliverySection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section id="delivery" className="relative overflow-hidden bg-primary py-20 text-secondary sm:py-24 md:py-28">
      <div className="absolute inset-y-0 right-0 w-1/2 skew-x-[-10deg] bg-black/5" aria-hidden="true" />
      <div className="site-container relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 bg-secondary px-3 py-2 font-display text-xs font-black uppercase tracking-[0.12em] text-primary">
              <Bike size={16} />
              Delivery activo
            </div>
            <h2 className="font-display text-[clamp(3rem,12vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.02em] [text-wrap:balance]">
              {content.deliveryTitle}
            </h2>
            <p className="mt-6 max-w-xl text-base font-bold leading-relaxed text-secondary/78 sm:text-lg">
              {content.deliveryDescription}
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {content.deliveryPartners.map((partner, index) => (
              <motion.a
                key={partner.id}
                href={partner.orderUrl || '#'}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
                className="group flex min-h-32 items-center justify-between gap-5 border-2 border-secondary bg-white px-6 py-6 text-secondary transition-transform hover:-translate-y-1 sm:px-7"
              >
                <span className="flex min-w-0 flex-col gap-3">
                  <span className="block text-xs font-black uppercase tracking-[0.14em] text-secondary/45">
                    Pide por
                  </span>
                  <img
                    src={partner.logoUrl}
                    alt={`Pedir en ${partner.name}`}
                    className="h-12 w-auto max-w-[15rem] object-contain object-left sm:h-14"
                    loading="lazy"
                  />
                </span>
                <ExternalLink className="shrink-0 text-secondary/45 transition-colors group-hover:text-secondary" size={22} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-2 border-secondary/20 pt-6 text-xs font-black uppercase tracking-[0.12em] text-secondary/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Tambien puedes reservar mesa y pedir en sala.</span>
          <Link href="/menu" className="text-secondary underline underline-offset-4 hover:no-underline">
            Ver carta visual
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
