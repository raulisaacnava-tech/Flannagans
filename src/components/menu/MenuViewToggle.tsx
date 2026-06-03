'use client';

import React from 'react';
import { LayoutGrid, PlaySquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const MenuViewToggle: React.FC<{ mode: 'menu' | 'video', onChange: (mode: 'menu' | 'video') => void }> = ({ mode, onChange }) => {
  return (
    <div className="px-4 py-4 flex justify-end">
      <div className="flex bg-[#1A1A1A] rounded-full p-1 border border-white/5 relative">
        <button
          onClick={() => onChange('menu')}
          className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors duration-300 font-display font-bold text-xs uppercase tracking-wider ${
            mode === 'menu' ? 'text-secondary' : 'text-cream/50'
          }`}
        >
          <LayoutGrid size={14} /> Menú
        </button>
        <button
          onClick={() => onChange('video')}
          className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors duration-300 font-display font-bold text-xs uppercase tracking-wider ${
            mode === 'video' ? 'text-secondary' : 'text-cream/50'
          }`}
        >
          <PlaySquare size={14} /> Vídeo
        </button>

        {/* Indicador animado */}
        <motion.div
          className="absolute top-1 bottom-1 bg-primary rounded-full z-0 shadow-lg shadow-primary/20"
          initial={false}
          animate={{
            left: mode === 'menu' ? '4px' : '50%',
            width: 'calc(50% - 4px)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
};
