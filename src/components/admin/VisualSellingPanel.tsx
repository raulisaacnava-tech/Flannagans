'use client';

import React from 'react';
import { Product } from '@/types/menu';
import { Sparkles, Flame, DollarSign, Video, CheckCircle } from 'lucide-react';

interface VisualSellingPanelProps {
  products: Product[];
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onToggleCampaign: (id: string, isCampaign: boolean) => void;
  onToggleProfitable: (id: string, isProfitable: boolean) => void;
  onSetBurgerOfTheMonth: (id: string) => void;
  onEditProduct: (product: Product) => void;
}

export const VisualSellingPanel: React.FC<VisualSellingPanelProps> = ({
  products,
  onToggleFeatured,
  onToggleProfitable,
  onSetBurgerOfTheMonth,
  onEditProduct
}) => {
  
  // Buscar Burger del Mes activa
  const burgerOfTheMonth = products.find(p => p.category === 'burger-del-mes' && p.isAvailable);
  
  // Platos elegibles para Burger del Mes (vacuno/especiales)
  const monthBurgerCandidates = products.filter(p => 
    p.isAvailable && 
    p.category !== 'postres' && 
    p.category !== 'shakes' && 
    p.category !== 'bebidas'
  );

  // Platos Destacados
  const featuredProducts = products.filter(p => p.isFeatured);
  
  // Platos con Alto Margen (Profitable)
  const profitableProducts = products.filter(p => p.isProfitable);

  // Platos con Vídeo
  const videoProducts = products.filter(p => p.videoUrl && p.videoUrl.trim() !== '');

  return (
    <div className="space-y-8 select-none">
      
      {/* Cabecera */}
      <div className="space-y-1.5">
        <h2 className="font-display font-black text-xl text-cream uppercase tracking-wide">
          Herramientas de Venta Visual
        </h2>
        <p className="text-xs text-cream/40 font-mono uppercase tracking-widest">
          Optimiza la experiencia comercial y el ticket medio de tu menú interactivo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. Selector de Burger del Mes */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 space-y-6 shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Flame className="text-accent fill-accent animate-pulse" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Establecer Burger del Mes
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-cream/60 leading-relaxed font-semibold">
              Elige el plato protagonista de la temporada. Se mostrará en una sección asimétrica premium en la Home y aparecerá primero en las categorías de la carta.
            </p>

            {burgerOfTheMonth && (
              <div className="bg-accent/5 border border-accent/20 rounded-none p-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Activa Hoy</span>
                  <h4 className="font-display font-black text-base text-cream uppercase">{burgerOfTheMonth.name}</h4>
                  <span className="text-xs text-primary font-mono font-bold">{burgerOfTheMonth.price.toFixed(2)} €</span>
                </div>
                <CheckCircle size={20} className="text-accent shrink-0" />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-cream/40 uppercase tracking-widest block">Cambiar a otro plato:</label>
              <select
                value={burgerOfTheMonth?.id || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    onSetBurgerOfTheMonth(e.target.value);
                  }
                }}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-3 py-3 text-xs focus:outline-none cursor-pointer font-semibold"
              >
                <option value="" disabled>Selecciona un plato...</option>
                {monthBurgerCandidates.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price.toFixed(2)} €)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Gestor de Destacados (Rail Superior) */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 space-y-6 shadow-none flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Sparkles className="text-yellow-500 fill-yellow-500" size={18} />
              <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
                Recomendados (Rail Superior)
              </h3>
            </div>

            <p className="text-xs text-cream/60 leading-relaxed font-semibold">
              Actualmente tienes **{featuredProducts.length}** recomendados activos. Aparecen en un carrusel premium al principio de la carta para motivar un añadido rápido en un tap.
            </p>

            <div className="max-h-48 overflow-y-auto divide-y divide-white/10 pr-2 no-scrollbar">
              {featuredProducts.map((p) => (
                <div key={p.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-cream uppercase block">{p.name}</span>
                    <span className="text-[9px] text-cream/40 font-mono">{p.price.toFixed(2)} €</span>
                  </div>
                  <button
                    onClick={() => onToggleFeatured(p.id, false)}
                    className="text-[9px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-none cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-cream/30 font-mono uppercase">
            <span>Para añadir recomendados, hazlo desde la pestaña de &ldquo;Carta&rdquo;.</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 3. Margen y Rentabilidad */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 space-y-6 shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <DollarSign className="text-emerald-500" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Platos de Alto Margen Comercial
            </h3>
          </div>

          <p className="text-xs text-cream/60 leading-relaxed font-semibold">
            Configura qué platos tienen mayor margen de ganancia para darles protagonismo e incentivar la venta cruzada complementaria (como batidos, postres especiales, dobles ingredientes, etc.).
          </p>

          <div className="max-h-60 overflow-y-auto divide-y divide-white/10 pr-2 no-scrollbar">
            {products
              .filter(p => p.isAvailable)
              .slice(0, 8)
              .map((p) => {
                const isProf = profitableProducts.some(pr => pr.id === p.id);
                return (
                  <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-cream uppercase block">{p.name}</span>
                      <span className="text-[9px] text-cream/40 font-mono">{p.category.replace('-', ' ')}</span>
                    </div>
                    <button
                      onClick={() => onToggleProfitable(p.id, !isProf)}
                      className={`text-[9px] font-bold px-3 py-1.5 rounded-none border transition-colors uppercase tracking-widest cursor-pointer ${
                        isProf
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                          : 'bg-zinc-800 border-zinc-700 text-cream/40 hover:text-cream'
                      }`}
                    >
                      {isProf ? 'Rentabilidad Alta SÍ' : 'Marcar rentable'}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 4. Gestor de Vista Vídeo */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 space-y-6 shadow-none flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Video className="text-purple-500" size={18} />
              <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
                Gestionar la Vista Vídeo
              </h3>
            </div>

            <p className="text-xs text-cream/60 leading-relaxed font-semibold">
              La Vista Vídeo es la principal herramienta de atracción. Actualmente tienes **{videoProducts.length}** platos con URL de video activa. Recuerda que para los platos que no tienen video, el sistema dibuja una animación Ken Burns espectacular con su imagen principal.
            </p>

            <div className="max-h-48 overflow-y-auto divide-y divide-white/10 pr-2 no-scrollbar">
              {videoProducts.map((p) => (
                <div key={p.id} className="py-2.5 flex justify-between items-center text-xs gap-4">
                  <div className="flex-grow">
                    <span className="font-semibold text-cream uppercase block">{p.name}</span>
                    <span className="text-[9px] text-purple-500 font-mono truncate max-w-[150px] block">{p.videoUrl}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onEditProduct(p)}
                      className="p-1 bg-white/5 hover:bg-white/10 text-cream rounded-none text-[9px] font-bold uppercase tracking-widest border border-white/10 cursor-pointer transition-colors"
                    >
                      Editar
                    </button>
                    <span className="p-1 bg-purple-500/10 text-purple-500 rounded-none text-[9px] font-bold uppercase tracking-widest border border-purple-500/10">
                      Video SÍ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-cream/30 font-mono uppercase">
            <span>Para vincular videos, edita el plato y añade su URL de vídeo.</span>
          </div>
        </div>

      </div>


    </div>
  );
};
export default VisualSellingPanel;
