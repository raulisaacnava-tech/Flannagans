'use client';

import React from 'react';
import { CalendarRange, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

export const Reservations: React.FC = () => {
  const hours = [
    { day: 'Lunes', hours: 'Cerrado', highlight: false },
    { day: 'Martes y Miércoles', hours: '20:00 a 23:30', highlight: false },
    { day: 'Jueves', hours: '13:00 a 16:30  /  20:00 a 23:30', highlight: false },
    { day: 'Viernes y Sábado', hours: '13:00 a 16:30  /  20:00 a 00:00', highlight: true },
    { day: 'Domingo', hours: '13:00 a 16:30  /  20:00 a 23:30', highlight: false },
  ];

  return (
    <section id="reservations" className="py-24 bg-dark-gray border-t border-white/5 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#000000] border border-primary/20 text-xs font-mono text-primary uppercase tracking-widest">
            <CalendarRange size={12} className="text-primary" /> VEN A VISITARNOS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-cream uppercase tracking-wide">
            Reservas y Horarios
          </h2>
          <p className="text-cream/60 text-base sm:text-lg">
            Asegúrate una mesa en nuestro local o haz tu pedido para recoger llamando directamente por teléfono. ¡Te esperamos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Horarios Card */}
          <div className="minimalist-card p-6 sm:p-8 flex flex-col justify-between shadow-none">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="p-2 bg-transparent border border-white/10 text-primary rounded-none shrink-0">
                  <Clock size={20} />
                </div>
                <h3 className="font-display font-black text-xl text-cream uppercase tracking-wider">
                  Nuestros Horarios
                </h3>
              </div>

              <div className="space-y-4">
                {hours.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center py-2.5 px-3 rounded-none border transition-colors ${
                      item.highlight
                        ? 'bg-primary/5 border-primary/30 text-cream font-bold'
                        : 'border-transparent text-cream/70 font-semibold'
                    }`}
                  >
                    <span className="text-sm">{item.day}</span>
                    <span className={`text-xs font-mono uppercase tracking-wider ${item.highlight ? 'text-primary' : 'text-cream/60'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-cream/40 font-mono">
              <Sparkles size={12} className="text-primary animate-pulse" /> * Cocina abierta hasta 30 minutos antes del cierre.
            </div>
          </div>

          {/* Reservas & Ubicación Card */}
          <div className="minimalist-card p-6 sm:p-8 flex flex-col justify-between shadow-none">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="p-2 bg-transparent border border-white/10 text-cream rounded-none shrink-0">
                  <MapPin size={20} />
                </div>
                <h3 className="font-display font-black text-xl text-cream uppercase tracking-wider">
                  Reservar o Llamar
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-cream/70 text-sm leading-relaxed font-medium">
                  Para reservas de mesa en el mismo día, te recomendamos llamar por teléfono directamente. También atendemos consultas a través de nuestro perfil oficial en Instagram.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="tel:919401241"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 btn-minimalist border border-white/20 text-xs"
                  >
                    <Phone size={16} className="fill-secondary" />
                    Llamar ahora
                  </a>
                  <a
                    href="https://instagram.com/flanagansburguer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 btn-outline-minimalist border border-white/20 text-xs"
                  >
                    <svg className="w-[16px] h-[16px] fill-current text-primary" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Dirección simulada decorativa */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
              <span className="block text-[10px] text-cream/40 font-mono uppercase tracking-wider">Dirección del Local</span>
              <span className="block text-cream text-sm font-semibold flex items-center gap-1.5 font-sans">
                📍 Calle de Móstoles, 987, 28931 Móstoles, Madrid
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Reservations;
