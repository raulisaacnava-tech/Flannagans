'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ quantity, onChange, min = 1, max = 20 }) => {
  return (
    <div className="flex items-center bg-[#1A1A1A] rounded-full p-1 border border-white/10 w-fit">
      <button
        onClick={(e) => { e.stopPropagation(); if (quantity > min) onChange(quantity - 1); }}
        disabled={quantity <= min}
        className={`p-2 rounded-full transition-colors ${quantity <= min ? 'text-white/20' : 'text-cream hover:bg-white/10'}`}
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-display font-black text-cream text-sm select-none">
        {quantity}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); if (quantity < max) onChange(quantity + 1); }}
        disabled={quantity >= max}
        className={`p-2 rounded-full transition-colors ${quantity >= max ? 'text-white/20' : 'text-cream hover:bg-white/10'}`}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
