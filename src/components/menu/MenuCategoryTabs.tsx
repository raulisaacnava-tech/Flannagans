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
    <div className="w-full bg-[#080705]/88 backdrop-blur-2xl sticky top-[61px] z-30 py-2.5 border-b border-white/10 shadow-xl shadow-black/50">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 px-4 no-scrollbar scroll-smooth"
      >
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              data-active={isActive}
              onClick={() => onSelect(cat.slug)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-full font-sans text-xs transition-[background-color,color,border-color,transform,box-shadow] duration-180 ease-[var(--ease-out-strong)] flex-shrink-0 pressable ${
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
