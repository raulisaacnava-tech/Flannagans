'use client';

import React from 'react';
import { LayoutGrid, PlaySquare } from 'lucide-react';
import { motion } from 'framer-motion';

const navTransition = { type: 'spring', duration: 0.28, bounce: 0.12 } as const;

export const MenuBottomNav: React.FC<{
  activeView: 'menu' | 'video';
  onChange: (view: 'menu' | 'video') => void;
}> = ({ activeView, onChange }) => {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:left-1/2 md:max-w-md md:-translate-x-1/2">
      <div className="bg-[#11100d]/92 backdrop-blur-2xl border border-white/12 rounded-full p-1.5 flex items-center shadow-[0_18px_48px_rgb(0_0_0_/_0.62)] pointer-events-auto">
        <button
          onClick={() => onChange('video')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-full pressable ${
            activeView === 'video' ? 'text-secondary' : 'text-cream/56 hover:text-cream'
          }`}
        >
          {activeView === 'video' && (
            <motion.div
              layoutId="nav-bg"
              transition={navTransition}
              className="absolute inset-0 bg-primary rounded-full z-0 shadow-[0_0_24px_rgb(250_204_21_/_0.2)]"
            />
          )}
          <span className="relative z-10 flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.12em]">
            <PlaySquare size={16} /> Videos
          </span>
        </button>

        <button
          onClick={() => onChange('menu')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-full pressable ${
            activeView === 'menu' ? 'text-secondary' : 'text-cream/56 hover:text-cream'
          }`}
        >
          {activeView === 'menu' && (
            <motion.div
              layoutId="nav-bg"
              transition={navTransition}
              className="absolute inset-0 bg-primary rounded-full z-0 shadow-[0_0_24px_rgb(250_204_21_/_0.2)]"
            />
          )}
          <span className="relative z-10 flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.12em]">
            <LayoutGrid size={16} /> Carta
          </span>
        </button>
      </div>
    </div>
  );
};
