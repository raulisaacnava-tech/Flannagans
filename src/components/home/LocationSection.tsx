'use client';

import React from 'react';
import { ArrowUpRight, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

// Google bloquea en iframe el formato "www.google.com/maps?q=...&output=embed".
// Usamos un origen de embed fiable (maps.google.com) derivado de la dirección,
// salvo que el admin haya pegado ya un embed oficial válido.
const buildReliableEmbed = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&hl=es&output=embed`;

export const LocationSection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  const rawEmbed = content.googleMapsEmbedUrl || '';
  const isReliableEmbed =
    rawEmbed.includes('/maps/embed') || rawEmbed.startsWith('https://maps.google.com/maps');
  const mapQuery = content.locationPlaceLabel || restaurant.address || restaurant.name;
  const embedSrc = isReliableEmbed ? rawEmbed : buildReliableEmbed(mapQuery);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  const todayLabel = new Date()
    .toLocaleDateString('es-ES', { weekday: 'long' })
    .toLowerCase();

  return (
    <section id="location" className="relative overflow-hidden bg-[#0A0A0A] py-20 sm:py-24 lg:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]"
        aria-hidden="true"
      />
      {/* Marca de agua tipográfica de fondo */}
      <span
        className="pointer-events-none absolute -right-6 top-8 hidden select-none font-display text-[12rem] font-black uppercase leading-none tracking-tighter text-white/[0.015] lg:block"
        aria-hidden="true"
      >
        Mapa
      </span>

      <div className="site-container relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Columna informativa ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="flex min-w-0 flex-col"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                Mostoles, Madrid
              </p>
            </div>

            <h2 className="font-display text-[clamp(2.6rem,6vw,4.75rem)] font-black uppercase leading-[0.9] tracking-[-0.025em] text-cream [text-wrap:balance]">
              {content.locationTitle}
            </h2>

            <p className="mt-5 max-w-[34rem] text-base font-medium leading-relaxed text-cream/70 sm:text-lg">
              Ven a por la burger en su mejor momento, sin rodeos y con la carta visual lista para pedir al instante.
            </p>

            {/* Tarjeta de dirección */}
            <div className="mt-8 flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                <MapPin size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg font-black uppercase tracking-wide text-cream">
                  {restaurant.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/65 sm:text-[15px]">
                  {content.locationPlaceLabel}
                </p>
              </div>
            </div>

            {/* Horario */}
            {restaurant.openingHours?.length > 0 && (
              <div className="mt-4 border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                  <Clock size={16} className="text-primary" />
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cream/80">
                    Horario
                  </p>
                </div>
                <ul className="space-y-0.5">
                  {restaurant.openingHours.map((entry) => {
                    const isToday = entry.day.toLowerCase() === todayLabel;
                    const isClosed = /cerrado/i.test(entry.hours);
                    return (
                      <li
                        key={entry.day}
                        className={`flex items-baseline justify-between gap-4 px-2.5 py-1.5 text-sm transition-colors ${
                          isToday ? 'border-l-2 border-primary bg-primary/[0.06]' : 'border-l-2 border-transparent'
                        }`}
                      >
                        <span
                          className={`shrink-0 font-bold uppercase tracking-wide ${
                            isToday ? 'text-primary' : 'text-cream/55'
                          }`}
                        >
                          {entry.day}
                          {isToday && <span className="ml-2 text-[9px] font-black tracking-[0.16em]">HOY</span>}
                        </span>
                        <span
                          className={`text-right font-mono text-[13px] ${
                            isClosed ? 'text-cream/30' : isToday ? 'text-cream' : 'text-cream/70'
                          }`}
                        >
                          {entry.hours}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Acciones */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={content.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 border border-primary bg-primary px-6 py-3.5 font-display text-sm font-black uppercase tracking-[0.14em] text-secondary transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span>Abrir mapa</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 border border-white/15 bg-white/[0.03] px-6 py-3.5 font-display text-sm font-black uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-primary/40 hover:text-primary"
              >
                <Navigation size={17} />
                <span>Como llegar</span>
              </a>
            </div>
          </motion.div>

          {/* ── Columna del mapa ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative min-w-0"
          >
            {/* Acentos decorativos contenidos */}
            <div
              className="absolute -left-2.5 -top-2.5 hidden h-20 w-20 border-l-2 border-t-2 border-primary/40 lg:block"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2.5 -right-2.5 hidden h-24 w-24 border-b-2 border-r-2 border-white/10 lg:block"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">
                    Punto de encuentro
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-cream/75">
                    Burgers, sala y recogida
                  </p>
                </div>
                <a
                  href={content.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-black/30 text-cream/70 transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label={`Abrir ubicacion de ${restaurant.name} en Google Maps`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="relative min-h-[20rem] flex-1">
                <iframe
                  src={embedSrc}
                  title={`Mapa de ${restaurant.name}`}
                  className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
