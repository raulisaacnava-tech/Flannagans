'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/menu';
import { useRestaurant } from '@/lib/use-restaurant';
import { LanguageSelector } from './LanguageSelector';
import { MenuSearchOverlay } from './MenuSearchOverlay';

interface MenuHeaderProps {
  products?: Product[];
  onViewDetails?: (product: Product) => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ products = [], onViewDetails }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const restaurant = useRestaurant();
  const logoScale = restaurant.homepageContent?.logoScale ?? 1;

  return (
    <>
      <header className="sticky top-0 z-40 shrink-0 select-none border-b border-white/10 bg-[#090806]/82 py-4 shadow-[0_14px_32px_rgb(0_0_0_/_0.24)] backdrop-blur-2xl">
        <div className="flex items-center justify-between px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))]">

          {/* Logo — vuelve a la portada */}
          <Link
            href="/"
            aria-label="Volver a la portada"
            className="flex items-center pressable"
            style={{
              height: `calc(5.65rem * ${logoScale})`,
              width: `calc(min(16.8rem, 55vw) * ${logoScale})`,
            }}
          >
            <img
              src={restaurant.logoUrl || '/logo.webp'}
              alt={`${restaurant.name} logo`}
              className="h-auto max-h-full w-full object-contain"
            />
          </Link>

          {/* Acciones */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-cream/64 hover:text-primary transition-colors duration-[160ms] rounded-lg pressable"
              aria-label="Buscar plato"
            >
              <Search size={20} />
            </button>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Overlay de búsqueda — renderizado dentro del mismo contexto para que cubra el contenedor móvil */}
      <MenuSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onViewDetails={(p) => {
          onViewDetails?.(p);
        }}
      />
    </>
  );
};
