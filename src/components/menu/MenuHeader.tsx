'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/menu';
import { LanguageSelector } from './LanguageSelector';
import { MenuSearchOverlay } from './MenuSearchOverlay';

interface MenuHeaderProps {
  products?: Product[];
  onViewDetails?: (product: Product) => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ products = [], onViewDetails }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#090806]/82 backdrop-blur-2xl border-b border-white/10 py-3 shrink-0 select-none shadow-[0_14px_32px_rgb(0_0_0_/_0.24)]">
        <div className="px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center pressable">
            <Image 
              src="/logo.webp" 
              alt="Flanagans Logo" 
              width={130} 
              height={44} 
              className="object-contain"
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
