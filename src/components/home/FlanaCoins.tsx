'use client';

import React from 'react';
import { Coins, ShieldAlert, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const FlanaCoins: React.FC = () => {
  return (
    <section id="flanacoins" className="py-24 bg-dark-gray border-y border-white/5 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="minimalist-card p-8 sm:p-12 relative overflow-hidden shadow-none border-primary/20">
          
          {/* Subtle grid pattern background in details */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#000000] border border-yellow-500/20 text-xs font-mono text-primary uppercase tracking-widest">
                🏆 CLUB EXCLUSIVO
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-cream uppercase leading-tight">
                Sube de nivel:<br />
                <span className="text-primary">escanea y suma FlanaCoins</span>
              </h2>
              <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Queremos premiar tu lealtad. En tu próxima visita, escanea el código QR de tu mesa, acumula monedas virtuales con cada bocado y canjéalas por hamburguesas gratis, bebidas y promociones exclusivas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { title: 'Gana Recompensas', desc: 'En cada visita y consumición', icon: Award },
                  { title: 'Escanea y Suma', desc: 'Con un simple código QR', icon: Coins },
                  { title: 'Vuelve por Más', desc: 'Desbloquea regalos directos', icon: Star },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-transparent border border-white/10 rounded-none p-4 text-center space-y-2 hover:border-primary/50 transition-colors duration-300">
                      <div className="inline-flex p-2.5 rounded-none bg-[#121212] border border-white/10 text-primary mb-1">
                        <Icon size={20} />
                      </div>
                      <h4 className="font-display font-black text-sm text-cream uppercase">{item.title}</h4>
                      <p className="text-xs text-cream/40 font-semibold">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Teaser Area */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <motion.div
                initial={{ rotate: -5, scale: 0.95 }}
                whileInView={{ rotate: -3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', duration: 1 }}
                className="relative w-80 h-48 bg-[#0A0A0A] border border-white/10 rounded-none p-6 shadow-none flex flex-col justify-between overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-primary uppercase tracking-widest">Fidelity Card</span>
                    <h3 className="font-display font-black text-base text-cream tracking-wider uppercase">FLANACLUB VIP</h3>
                  </div>
                  <Coins className="text-primary" size={24} />
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] text-cream/40 font-mono uppercase">Tu saldo de monedas</span>
                  <span className="block font-display font-black text-xl text-primary">2,450 FlanaCoins</span>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-cream/40">
                  <span>MÓSTOLES, MADRID</span>
                  <span>ID: #4092-FL</span>
                </div>
              </motion.div>

              <div className="mt-8 flex items-center gap-2 border border-primary/30 px-3 py-1.5 rounded-none text-primary font-display font-black text-xs uppercase tracking-widest font-mono">
                <ShieldAlert size={14} /> PRÓXIMAMENTE
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default FlanaCoins;
