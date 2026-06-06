'use client';

import React from 'react';
import { useOrderList } from '@/lib/order-list';
import { Trash2, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';
import { QuantityStepper } from './QuantityStepper';
import { motion, AnimatePresence } from 'framer-motion';

export const MyListView: React.FC = () => {
  const { orderList, updateQuantity, removeFromOrder, clearOrder, orderTotal } = useOrderList();

  const handleWhatsApp = () => {
    // Aquí puedes incluir el prompt para la mesa si es necesario, 
    // pero como dice "No implementar pagos todavía" se deja estático o sin mesa por ahora.
    const link = generateWhatsAppLink(orderList, orderTotal);
    window.open(link, '_blank');
  };

  if (orderList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-6 text-center">
        <div className="w-24 h-24 mb-6 opacity-30 bg-white/5 rounded-full flex items-center justify-center">
          <MessageCircle size={40} className="text-cream" />
        </div>
        <h2 className="font-display font-black text-2xl text-cream uppercase mb-2">Tu lista está vacía</h2>
        <p className="text-cream/50 text-sm max-w-[250px]">
          Explora la carta y añade lo que más se te antoje.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 pt-4 pb-32 flex flex-col min-h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-black text-xl text-cream uppercase tracking-wide">Mi Pedido</h2>
        <button 
          onClick={clearOrder}
          className="text-xs font-bold text-accent-red uppercase tracking-widest flex items-center gap-1 hover:opacity-80"
        >
          <Trash2 size={12} /> Vaciar
        </button>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 w-full flex-grow items-start">
        <div className="space-y-4 w-full md:col-span-2">
          <AnimatePresence>
            {orderList.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#111111] border border-white/5 p-4 rounded-3xl shadow-lg flex gap-4"
              >
                <div className="relative w-20 h-20 bg-black/40 rounded-2xl overflow-hidden shrink-0">
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-black text-cream text-sm uppercase leading-tight line-clamp-2">
                        {item.product.name}
                      </h4>
                      <button onClick={() => removeFromOrder(item.id)} className="text-white/20 hover:text-accent-red transition-colors shrink-0 p-1">
                        <XIcon />
                      </button>
                    </div>
                    
                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <p className="text-[10px] text-cream/40 font-semibold mt-1">
                        + {item.selectedExtras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-[10px] text-accent font-semibold mt-0.5 line-clamp-1">
                        Nota: {item.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="font-mono text-primary font-bold text-sm">
                      {item.subtotal.toFixed(2)} €
                    </div>
                    <QuantityStepper 
                      quantity={item.quantity} 
                      onChange={(q) => updateQuantity(item.id, q - item.quantity)} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 md:mt-0 bg-[#1A1A1A] rounded-3xl p-5 space-y-4 border border-white/5 w-full md:sticky md:top-24 z-20">
          <div className="flex justify-between items-end">
            <span className="text-cream/60 text-sm font-bold uppercase tracking-widest">Total estimado</span>
            <span className="font-display font-black text-2xl text-primary font-mono">{orderTotal.toFixed(2)} €</span>
          </div>
          
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white font-display font-black text-sm uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle size={18} />
            Enviar por WhatsApp
          </button>
          <p className="text-center text-[10px] text-cream/40 font-semibold uppercase tracking-widest">
            No se realizará ningún cobro ahora
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
