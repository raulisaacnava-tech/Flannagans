'use client';

import React from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/lib/use-restaurant';

export const ReservationsSection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section id="reservations" className="bg-accent-red py-24 md:py-32 text-white border-t border-b border-[#111]">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row gap-16 justify-between">
          <div className="lg:w-1/2">
            <h2 className="font-display mb-8 text-[clamp(3.25rem,14vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] [text-wrap:balance] md:text-[clamp(4.5rem,8vw,6rem)]">
              {content.reservationsTitle.split(' ').slice(0, 2).join(' ')}
              <br />
              {content.reservationsTitle.split(' ').slice(2).join(' ')}
            </h2>
            <div className="space-y-6 max-w-sm">
              <div>
                <h4 className="font-display font-black text-sm uppercase tracking-widest text-white/50 mb-1">Telefono</h4>
                <p className="font-mono text-xl font-bold">{restaurant.phone}</p>
              </div>
              <div>
                <h4 className="font-display font-black text-sm uppercase tracking-widest text-white/50 mb-1">Email</h4>
                <p className="font-mono text-lg font-bold">{content.reservationsEmail}</p>
              </div>
              <div>
                <h4 className="font-display font-black text-sm uppercase tracking-widest text-white/50 mb-1">Reservas por</h4>
                <p className="font-display font-bold text-lg uppercase tracking-wider">{content.reservationsChannelLabel}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-between">
            <div className="mb-12">
              <h4 className="font-display font-black text-lg uppercase tracking-widest mb-6">Horarios</h4>
              <div className="space-y-4 font-bold text-sm uppercase tracking-wider">
                {restaurant.openingHours.map((item) => (
                  <div key={item.day} className="flex justify-between border-b border-white/10 pb-2 gap-4">
                    <span className="font-bold">{item.day}</span>
                    <span className="opacity-70 text-right whitespace-pre-line">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${restaurant.phone}`} className="bg-white text-accent-red font-display font-black text-sm uppercase tracking-widest px-8 py-4 text-center hover:bg-white/90 transition-colors">
                Llamar ahora
              </a>
              <a href={restaurant.instagramUrl} target="_blank" rel="noreferrer" className="bg-transparent border border-white text-white font-display font-black text-sm uppercase tracking-widest px-8 py-4 text-center hover:bg-white/10 transition-colors">
                Abrir Instagram
              </a>
              <Link href="/menu" className="bg-black text-white font-display font-black text-sm uppercase tracking-widest px-8 py-4 text-center hover:bg-black/80 transition-colors">
                Ver carta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
