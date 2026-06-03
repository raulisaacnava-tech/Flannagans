'use client';

import React from 'react';
import { Extra } from '@/types/menu';
import { Check } from 'lucide-react';

interface ExtrasSelectorProps {
  availableExtras: string[];
  allExtras: Extra[];
  selectedExtras: Extra[];
  onChange: (extras: Extra[]) => void;
}

export const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({ availableExtras, allExtras, selectedExtras, onChange }) => {
  if (!availableExtras || availableExtras.length === 0) return null;

  const extrasList = allExtras.filter(e => availableExtras.includes(e.id));
  if (extrasList.length === 0) return null;

  const toggleExtra = (extra: Extra) => {
    const isSelected = selectedExtras.some(e => e.id === extra.id);
    if (isSelected) {
      onChange(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      onChange([...selectedExtras, extra]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-display font-black text-xs text-cream/60 uppercase tracking-widest border-b border-white/5 pb-2">
        Añadir Extras
      </h3>
      <div className="flex flex-col gap-2">
        {extrasList.map((extra) => {
          const isSelected = selectedExtras.some(e => e.id === extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => toggleExtra(extra)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
                isSelected ? 'bg-primary/10 border-primary' : 'bg-[#1A1A1A] border-transparent hover:bg-[#222]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-primary border-primary' : 'border-white/20'
                }`}>
                  {isSelected && <Check size={12} className="text-secondary" />}
                </div>
                <span className="text-sm font-semibold text-cream">{extra.name}</span>
              </div>
              <span className="text-sm font-mono text-primary font-bold">+{extra.price.toFixed(2)} €</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
