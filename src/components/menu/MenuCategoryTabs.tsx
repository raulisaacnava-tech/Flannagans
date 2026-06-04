'use client';

import React, { useRef, useEffect } from 'react';
import { Category } from '@/types/menu';

export const MenuCategoryTabs: React.FC<{
  categories: Category[];
  activeCategory: string;
  onSelect: (slug: string) => void;
}> = ({ categories, activeCategory, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const containerWidth = scrollRef.current.clientWidth;
        const elLeft = activeEl.offsetLeft;
        const elWidth = activeEl.clientWidth;

        scrollRef.current.scrollTo({
          left: elLeft - containerWidth / 2 + elWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#080705]/88 py-2.5 shadow-xl shadow-black/50 backdrop-blur-2xl">
      <div 
        ref={scrollRef}
        className="no-scrollbar flex scroll-smooth gap-2 overflow-x-auto px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))]"
      >
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              data-active={isActive}
              onClick={() => onSelect(cat.slug)}
            className={`min-h-10 flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-sans text-xs transition-[background-color,color,border-color,transform,box-shadow] duration-180 ease-[var(--ease-out-strong)] pressable ${
                isActive 
                  ? 'bg-primary text-secondary font-black shadow-[0_0_24px_rgb(250_204_21_/_0.16)]' 
                  : 'bg-white/[0.055] text-cream/72 hover:text-cream border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
