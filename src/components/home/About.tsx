'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldAlert, Flame, Target } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Grid de imágenes premium asimétrico */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative h-64 rounded-none overflow-hidden shadow-none border border-white/5 group">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600"
                  alt="Preparación de carne artesanal en parrilla"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-44 rounded-none overflow-hidden shadow-none border border-white/5 group">
                <Image
                  src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600"
                  alt="Patatas rústicas crujientes"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-40 rounded-none overflow-hidden shadow-none border border-white/5 group">
                <Image
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600"
                  alt="Ingredientes frescos de hamburguesas"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 rounded-none overflow-hidden shadow-none border border-white/5 group">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600"
                  alt="Nuestras salsas secretas burger"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Sello de Calidad cuadrado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-secondary font-display font-black text-[10px] sm:text-xs h-16 w-16 sm:h-20 sm:w-20 rounded-none flex flex-col justify-center items-center text-center shadow-none border border-secondary uppercase tracking-widest leading-tight font-mono">
              <span>Sabor</span>
              <span>100%</span>
              <span>Real</span>
            </div>
          </div>

          {/* Detalles e Historia de Marca */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#0A0A0A] border border-accent/20 text-xs font-mono text-cream/70 uppercase tracking-widest">
                🔥 HISTORIA DE MARCA
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-cream uppercase leading-tight">
                Somos Flanagans Burguer
              </h2>
            </div>

            <div className="space-y-6 text-cream/70 text-base sm:text-lg leading-relaxed text-center lg:text-left font-medium">
              <p>
                Somos una hamburguesería especializada en crear una experiencia real alrededor de la burger: carne de calidad superior, sabor intenso a la plancha de piedra volcánica y una carta de combinaciones brutales pensada para que siempre quieras repetir.
              </p>
              <p>
                Aquí no hay atajos. Picamos nuestra carne diariamente seleccionando cortes de ternera premium sin aditivos. Horneamos el pan brioche artesano todas las mañanas y elaboramos nuestras salsas en cocina de forma artesanal para darte un bocado inolvidable en cada visita.
              </p>
            </div>

            {/* Warning Sign */}
            <div className="bg-[#0A0A0A] border border-accent-red/20 rounded-none p-5 flex items-start gap-4 max-w-xl mx-auto lg:mx-0">
              <ShieldAlert className="text-accent shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="font-display font-black text-sm text-cream uppercase tracking-wide">
                  Advertencia de Seguridad
                </h4>
                <p className="text-xs text-cream/60 leading-relaxed font-semibold mt-1">
                  Nuestras combinaciones son altamente adictivas. Vas a querer repetir antes de lo que te imaginas. ¡Estás avisado!
                </p>
              </div>
            </div>

            {/* Características */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-none bg-[#0A0A0A] border border-white/10 text-primary shrink-0">
                  <Flame size={18} />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-cream uppercase">Vacuno de Primera</h4>
                  <p className="text-xs text-cream/40 font-semibold mt-0.5">Ternera de pasto gallego libre de aditivos artificiales.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-none bg-[#0A0A0A] border border-white/10 text-primary shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-cream uppercase">Receta Auténtica</h4>
                  <p className="text-xs text-cream/40 font-semibold mt-0.5">Cocinadas en piedra de lava para sellar el sabor y jugosidad.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
