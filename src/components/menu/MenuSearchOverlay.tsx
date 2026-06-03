'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/menu';
import { getAllergens } from '@/lib/menu-store';

interface MenuSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onViewDetails: (product: Product) => void;
}

export const MenuSearchOverlay: React.FC<MenuSearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onViewDetails,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const allergenMap = useMemo(() => {
    const map: Record<string, string> = {};
    getAllergens().forEach(a => { map[a.id] = a.name.toLowerCase(); });
    return map;
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(p => {
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.description.toLowerCase().includes(q)) return true;
      if (p.ingredients?.some(i => i.toLowerCase().includes(q))) return true;
      if (p.allergens?.some(a => allergenMap[a]?.includes(q))) return true;
      return false;
    });
  }, [query, products, allergenMap]);

  const allergenLabels = useMemo(() => getAllergens(), []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 z-50 bg-[#050505]/98 backdrop-blur-md flex flex-col"
        >
          {/* Header de búsqueda */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 shrink-0">
            <Search size={20} className="text-primary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Busca por nombre, ingrediente o alérgeno..."
              className="flex-grow bg-transparent text-cream placeholder-cream/30 text-sm font-medium outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 text-cream/50 hover:text-cream pressable shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sugerencias rápidas de alérgenos */}
          {!query && (
            <div className="px-4 pt-5 pb-3 shrink-0">
              <p className="text-cream/30 text-[10px] uppercase tracking-widest font-mono mb-3">
                Buscar por alérgeno
              </p>
              <div className="flex flex-wrap gap-2">
                {allergenLabels.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setQuery(a.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-cream/70 hover:bg-primary/10 hover:border-primary/30 hover:text-cream pressable"
                  >
                    <span>{a.icon}</span>
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="flex-grow overflow-y-auto no-scrollbar px-4 py-2">
            {query.trim() && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <AlertCircle size={40} className="text-cream/20" />
                <p className="text-cream/40 font-medium text-sm">
                  Sin resultados para «{query}»
                </p>
                <p className="text-cream/25 text-xs max-w-[200px]">
                  Prueba con otro nombre, ingrediente o alérgeno.
                </p>
              </div>
            )}

            {results.map(product => {
              const matchedAllergens = product.allergens
                ?.filter(a => allergenMap[a]?.includes(query.toLowerCase()))
                .map(a => allergenLabels.find(al => al.id === a))
                .filter(Boolean);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => { onViewDetails(product); onClose(); }}
                  className="flex items-center gap-3 py-3 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] rounded-xl px-2 -mx-2 pressable"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-display font-black text-sm text-cream uppercase leading-tight truncate">
                      {product.name}
                    </h4>
                    <p className="text-cream/40 text-xs font-medium mt-0.5 line-clamp-1">
                      {product.description}
                    </p>
                    {matchedAllergens && matchedAllergens.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {matchedAllergens.map(a => (
                          <span
                            key={a!.id}
                            className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-full font-bold"
                          >
                            {a!.icon} {a!.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="font-mono font-black text-primary text-sm shrink-0">
                    {product.price.toFixed(2)} €
                  </span>
                </motion.div>
              );
            })}

            {query.trim() && results.length > 0 && (
              <p className="text-center text-cream/20 font-mono text-[10px] uppercase tracking-widest py-4">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
