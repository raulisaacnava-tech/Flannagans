import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Euro, ShieldCheck } from 'lucide-react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export const metadata: Metadata = {
  title: 'La oferta piloto',
  description: 'Propuesta piloto para carta digital visual, landing moderna y panel administrativo para restaurante.',
};

const includedItems = [
  'Landing page moderna del restaurante',
  'Carta digital visual adaptada a movil',
  'Categorias de productos',
  'Fotos o videos por producto',
  'Descripcion, precios y destacados',
  'Panel administrativo para editar platos, precios, fotos, videos y promociones',
  'Botones de contacto: WhatsApp, llamada, ubicacion y redes',
  'Integracion con dominio del cliente',
  'Publicacion online',
  'Carga inicial del contenido',
  '1 ronda de ajustes',
  'Mini guia o video corto de uso del panel',
];

const packages = [
  {
    name: 'Piloto Estandar',
    price: '500 €',
    description: 'El cliente entrega logo, textos, fotos, videos, platos y precios.',
    tone: 'bg-cream text-secondary',
  },
  {
    name: 'Piloto Pro',
    price: '700 €',
    description: 'Incluye todo lo anterior y apoyo con contenido visual basico para productos principales.',
    tone: 'bg-primary text-secondary',
  },
];

const extras = [
  ['Alojamiento, seguridad y mantenimiento tecnico anual', '150 €/ano'],
  ['Bolsa minima de cambios para funciones o paginas nuevas', '75 € / 5 horas'],
  ['Hora adicional fuera de bolsa', '15 €/hora'],
  ['Sesion extra de fotos o videos', 'Desde 150 € - 250 €'],
  ['Dominio', 'Del cliente, actual o nuevo'],
];

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-cream selection:bg-primary selection:text-secondary">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-[#080604] pt-36 pb-20 sm:pt-44 md:pb-28">
          <div className="absolute inset-0 hero-fire-wash opacity-45" aria-hidden="true" />
          <div className="site-container relative z-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] lg:items-end">
              <div>
                <p className="mb-5 inline-flex bg-primary px-3 py-2 font-display text-xs font-black uppercase tracking-[0.14em] text-secondary">
                  Propuesta piloto
                </p>
                <h1 className="max-w-5xl font-display text-[clamp(3.35rem,11vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] [text-wrap:balance]">
                  Sistema de carta digital visual para restaurante
                </h1>
                <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-cream/68">
                  Una solucion llave en mano para presentar el restaurante, vender mejor la carta y permitir que el negocio actualice platos, precios, promociones, fotos y videos desde un panel propio.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link href="/menu" className="inline-flex min-h-14 items-center justify-center gap-2 bg-primary px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-secondary premium-cta">
                    Ver carta demo
                    <ArrowRight size={17} />
                  </Link>
                  <Link href="/#reservations" className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-cream hover:bg-white/5">
                    Ver contacto
                  </Link>
                </div>
              </div>

              <div className="border border-primary/35 bg-black/50 p-6">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck size={24} />
                  <span className="font-display text-sm font-black uppercase tracking-[0.14em]">Proyecto piloto</span>
                </div>
                <p className="mt-5 text-sm font-semibold leading-relaxed text-cream/70">
                  Esta propuesta parte de una base ya preparada para publicar, editar y escalar. Si luego el restaurante abre otros locales, se puede replicar con mayor rapidez.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-secondary md:py-24">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1fr]">
              <div>
                <h2 className="font-display text-[clamp(2.8rem,8vw,4.7rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                  Que incluye
                </h2>
                <p className="mt-5 max-w-md text-base font-bold leading-relaxed text-secondary/72">
                  Web, carta visual, panel de gestion y publicacion online preparados para que el restaurante pueda operar sin depender de cambios manuales para cada ajuste diario.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div key={item} className="flex gap-3 border-2 border-secondary/16 bg-secondary px-4 py-4 text-cream">
                    <Check className="mt-0.5 shrink-0 text-primary" size={18} />
                    <span className="text-sm font-black uppercase leading-snug tracking-[0.05em]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-20 md:py-28">
          <div className="site-container">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="font-display text-[clamp(2.8rem,9vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                Dos opciones claras
              </h2>
              <p className="max-w-md text-sm font-semibold leading-relaxed text-cream/58">
                La eleccion depende de quien aporta el material visual inicial.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {packages.map((item) => (
                <article key={item.name} className={`${item.tone} p-7 sm:p-9`}>
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="font-display text-2xl font-black uppercase tracking-[0.05em]">{item.name}</h3>
                    <Euro size={24} />
                  </div>
                  <p className="mt-10 font-display text-[clamp(4rem,14vw,6.5rem)] font-black leading-none tracking-[-0.02em]">{item.price}</p>
                  <p className="mt-6 max-w-lg text-base font-bold leading-relaxed opacity-75">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] py-20 md:py-28">
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
              <div>
                <h2 className="font-display text-[clamp(2.6rem,8vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                  Costes aparte
                </h2>
                <p className="mt-5 max-w-sm text-sm font-semibold leading-relaxed text-cream/58">
                  La implementacion se paga una vez. La parte tecnica queda cubierta con una cuota anual ligera, sin mensualidad pesada.
                </p>
              </div>
              <div className="divide-y divide-white/10 border border-white/10">
                {extras.map(([concept, price]) => (
                  <div key={concept} className="grid gap-2 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <span className="text-sm font-black uppercase tracking-[0.08em] text-cream">{concept}</span>
                    <span className="font-display text-lg font-black uppercase text-primary">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent-red py-20 text-white md:py-28">
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr] lg:items-start">
              <div className="flex gap-4">
                <ShieldCheck className="mt-2 shrink-0" size={28} />
                <div>
                  <h2 className="font-display text-[clamp(2.8rem,9vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                    Resumen de la propuesta
                  </h2>
                </div>
              </div>
              <div className="space-y-5 text-lg font-semibold leading-relaxed text-white/82">
                <p>
                  Esta propuesta entrega una landing moderna, una carta digital visual y un panel administrativo para actualizar productos, precios, promociones, fotos y videos sin depender de cambios externos cada vez.
                </p>
                <p>
                  La opcion de 500 € es ideal cuando el restaurante ya entrega logo, textos, fotos, videos y precios. La opcion de 700 € incluye apoyo con contenido visual basico para productos principales.
                </p>
                <p>
                  El dominio queda a nombre del cliente. El alojamiento, la seguridad y el mantenimiento tecnico se cubren con 150 € al ano. Los cambios especiales fuera del panel se trabajan con una bolsa minima de 5 horas por 75 €.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-16">
          <div className="site-container">
            <div className="grid gap-4 border border-primary/25 bg-[#0A0A0A] p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-3">
                <h2 className="font-display text-2xl font-black uppercase tracking-[0.04em] text-cream">
                  Opcion recomendada para este cliente
                </h2>
                <p className="max-w-2xl text-sm font-semibold leading-relaxed text-cream/60">
                  500 € + 150 € al ano si el restaurante entrega todo el material. 700 € + 150 € al ano si prefiere apoyo con fotos o videos sencillos para arrancar con mejor presencia visual.
                </p>
              </div>
              <div className="flex items-center gap-2 justify-start lg:justify-end text-primary">
                <Clock size={18} />
                <span className="font-display text-sm font-black uppercase tracking-[0.12em]">Entrega piloto</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
