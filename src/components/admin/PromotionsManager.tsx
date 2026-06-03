'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Flame, X, Edit, Trash2, Save,
  ToggleLeft, ToggleRight, Tag, Monitor, ShoppingBag, Percent
} from 'lucide-react';
import {
  Promotion,
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from '@/lib/promotions-store';
import { Product } from '@/types/menu';

const EMPTY_PROMO: Omit<Promotion, 'id'> = {
  name: '',
  label: '',
  description: '',
  discountType: 'none',
  discountValue: 0,
  isActive: true,
  productIds: [],
  startDate: '',
  endDate: '',
  color: 'primary',
  showBanner: false,
  showOnHome: true,
};

const COLOR_OPTIONS = [
  { key: 'primary', label: 'Amarillo', cls: 'bg-primary', text: 'text-secondary' },
  { key: 'red',     label: 'Rojo',     cls: 'bg-accent-red', text: 'text-white' },
  { key: 'orange',  label: 'Naranja',  cls: 'bg-orange-500', text: 'text-white' },
  { key: 'green',   label: 'Verde',    cls: 'bg-green-500',  text: 'text-white' },
  { key: 'purple',  label: 'Morado',   cls: 'bg-purple-500', text: 'text-white' },
  { key: 'blue',    label: 'Azul',     cls: 'bg-blue-500',   text: 'text-white' },
];

function colorCls(key: string) {
  return COLOR_OPTIONS.find(c => c.key === key) ?? COLOR_OPTIONS[0];
}

interface PromotionsManagerProps {
  products: Product[];
}

export const PromotionsManager: React.FC<PromotionsManagerProps> = ({ products }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState<Omit<Promotion, 'id'>>(EMPTY_PROMO);

  useEffect(() => {
    const load = () => setPromotions(getPromotions());
    load();
    window.addEventListener('flanagans_promotions_updated', load);
    return () => window.removeEventListener('flanagans_promotions_updated', load);
  }, []);

  const openCreate = () => {
    setEditingPromo(null);
    setFormData(EMPTY_PROMO);
    setIsFormOpen(true);
  };

  const openEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormData({ ...promo });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    if (editingPromo) {
      updatePromotion(editingPromo.id, formData);
    } else {
      createPromotion(formData);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta promoción?')) {
      deletePromotion(id);
    }
  };

  const handleToggleField = (id: string, field: 'isActive' | 'showBanner' | 'showOnHome') => {
    const promo = promotions.find(p => p.id === id);
    if (!promo) return;
    updatePromotion(id, { [field]: !promo[field] });
  };

  const toggleProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  const col = colorCls(formData.color);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display font-black text-xl text-cream uppercase tracking-wide">
            Gestionar Promociones
          </h2>
          <p className="text-xs text-cream/40 font-mono uppercase tracking-widest mt-1">
            {promotions.length} promoción{promotions.length !== 1 ? 'es' : ''} · las activas aparecen en la web y en el menú
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
        >
          <Plus size={14} strokeWidth={3} />
          Nueva Promoción
        </button>
      </div>

      {/* Leyenda de dónde aparece */}
      <div className="flex gap-4 text-[10px] text-cream/40 font-mono uppercase tracking-widest border-b border-white/5 pb-3">
        <span className="flex items-center gap-1"><Monitor size={11} /> Portada web</span>
        <span className="flex items-center gap-1"><ShoppingBag size={11} /> Banner menú</span>
      </div>

      {/* Lista de Promociones */}
      {promotions.length === 0 ? (
        <div className="py-20 text-center border border-white/5 bg-black/20">
          <Tag size={40} className="mx-auto mb-4 text-cream/15" />
          <p className="text-cream/30 font-mono text-xs uppercase tracking-widest">No hay promociones. Crea la primera.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {promotions.map(promo => {
            const c = colorCls(promo.color);
            return (
              <motion.div
                key={promo.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#0A0A0A] border ${promo.isActive ? 'border-white/10' : 'border-white/5 opacity-60'} p-4 flex flex-col sm:flex-row gap-4`}
              >
                {/* Badge + info */}
                <div className="flex-grow space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${c.cls} ${c.text} font-display font-black text-[9px] uppercase tracking-widest shrink-0`}>
                      <Flame size={9} /> {promo.label || promo.name}
                    </span>
                    {promo.discountType !== 'none' && (
                      <span className="text-[9px] text-primary font-mono font-bold">
                        <Percent size={9} className="inline" /> {promo.discountType === 'percent' ? `${promo.discountValue}%` : `${promo.discountValue}€`} dto.
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-black text-xs text-cream uppercase">{promo.name}</h3>
                  {promo.description && (
                    <p className="text-cream/40 text-[10px] leading-relaxed line-clamp-2">{promo.description}</p>
                  )}
                  <div className="text-[9px] text-cream/30 font-mono">
                    {promo.productIds.length} producto{promo.productIds.length !== 1 ? 's' : ''}
                    {promo.startDate ? ` · desde ${promo.startDate}` : ''}
                    {promo.endDate ? ` hasta ${promo.endDate}` : ''}
                  </div>
                </div>

                {/* Controles */}
                <div className="flex flex-row sm:flex-col gap-3 items-start sm:items-end justify-between sm:justify-start shrink-0">
                  {/* Toggles de visibilidad */}
                  <div className="space-y-1.5">
                    <button
                      onClick={() => handleToggleField(promo.id, 'isActive')}
                      className={`flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest transition-colors cursor-pointer ${promo.isActive ? 'text-green-400' : 'text-cream/30'}`}
                      title="Activa/Pausa esta promoción"
                    >
                      {promo.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {promo.isActive ? 'Activa' : 'Pausada'}
                    </button>
                    <button
                      onClick={() => handleToggleField(promo.id, 'showOnHome')}
                      className={`flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest transition-colors cursor-pointer ${promo.showOnHome ? 'text-blue-400' : 'text-cream/20'}`}
                      title="Mostrar en portada de la web"
                    >
                      {promo.showOnHome ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      <Monitor size={10} /> Portada
                    </button>
                    <button
                      onClick={() => handleToggleField(promo.id, 'showBanner')}
                      className={`flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest transition-colors cursor-pointer ${promo.showBanner ? 'text-orange-400' : 'text-cream/20'}`}
                      title="Mostrar como banner en el menú"
                    >
                      {promo.showBanner ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      <ShoppingBag size={10} /> Banner menú
                    </button>
                  </div>

                  {/* Editar / Eliminar */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEdit(promo)}
                      className="flex items-center gap-1 py-1.5 px-2.5 bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 hover:border-primary/20 text-cream/60 transition-all cursor-pointer text-[9px] uppercase font-bold tracking-widest"
                    >
                      <Edit size={10} /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="p-1.5 bg-white/5 hover:bg-accent-red/10 hover:text-accent-red border border-white/10 hover:border-accent-red/20 text-cream/40 transition-all cursor-pointer"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Formulario */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              className="bg-[#111] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 sticky top-0 bg-[#111] z-10">
                <h3 className="font-display font-black text-base text-cream uppercase tracking-wide">
                  {editingPromo ? 'Editar Promoción' : 'Nueva Promoción'}
                </h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 text-cream/40 hover:text-cream transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Nombre y Label */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Nombre interno *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Ej. Promo Verano"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream placeholder-cream/20 px-3 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Etiqueta visible</label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={e => setFormData(p => ({ ...p, label: e.target.value }))}
                      placeholder="Ej. ¡Oferta!"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream placeholder-cream/20 px-3 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Descripción / Texto del banner</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    rows={2}
                    placeholder="Describe la promoción o el texto del banner..."
                    className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream placeholder-cream/20 px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Descuento */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Tipo de descuento</label>
                    <select
                      value={formData.discountType}
                      onChange={e => setFormData(p => ({ ...p, discountType: e.target.value as Promotion['discountType'] }))}
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2.5 text-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="none">Sin descuento</option>
                      <option value="percent">Porcentaje (%)</option>
                      <option value="fixed">Importe fijo (€)</option>
                    </select>
                  </div>
                  {formData.discountType !== 'none' && (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">
                        Valor {formData.discountType === 'percent' ? '(%)' : '(€)'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.discountValue}
                        onChange={e => setFormData(p => ({ ...p, discountValue: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2.5 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Dónde aparece */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">¿Dónde se muestra?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${formData.showOnHome ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/10 bg-black/20'}`}>
                      <input type="checkbox" checked={formData.showOnHome} onChange={e => setFormData(p => ({ ...p, showOnHome: e.target.checked }))} className="accent-blue-400 w-4 h-4" />
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cream/80"><Monitor size={13} /> Portada web</div>
                        <p className="text-[9px] text-cream/40 mt-0.5">Sección &ldquo;Promociones&rdquo; en el inicio</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${formData.showBanner ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/10 bg-black/20'}`}>
                      <input type="checkbox" checked={formData.showBanner} onChange={e => setFormData(p => ({ ...p, showBanner: e.target.checked }))} className="accent-orange-400 w-4 h-4" />
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cream/80"><ShoppingBag size={13} /> Banner menú</div>
                        <p className="text-[9px] text-cream/40 mt-0.5">Barra en la parte superior del menú</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Fecha de inicio</label>
                    <input type="date" value={formData.startDate || ''} onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2.5 text-sm focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Fecha de fin</label>
                    <input type="date" value={formData.endDate || ''} onChange={e => setFormData(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2.5 text-sm focus:outline-none transition-colors" />
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">Color del badge</label>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_OPTIONS.map(c => (
                      <button key={c.key} onClick={() => setFormData(p => ({ ...p, color: c.key }))} className={`w-8 h-8 ${c.cls} ${formData.color === c.key ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''} transition-all cursor-pointer`} title={c.label} />
                    ))}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${col.cls} ${col.text} font-display font-black text-[11px] uppercase tracking-widest`}>
                      <Flame size={11} /> {formData.label || formData.name || 'Preview badge'}
                    </span>
                  </div>
                </div>

                {/* Productos incluidos */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-mono text-cream/40">
                    Productos incluidos ({formData.productIds.length} seleccionados)
                  </label>
                  <div className="max-h-44 overflow-y-auto space-y-0.5 no-scrollbar border border-white/5 p-2">
                    {products.filter(p => p.isAvailable).map(prod => (
                      <label key={prod.id} className={`flex items-center gap-3 px-3 py-1.5 cursor-pointer transition-colors hover:bg-white/5 ${formData.productIds.includes(prod.id) ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
                        <input type="checkbox" checked={formData.productIds.includes(prod.id)} onChange={() => toggleProduct(prod.id)} className="accent-yellow-400 w-3 h-3 shrink-0" />
                        <span className="text-xs text-cream/80 font-medium truncate">{prod.name}</span>
                        <span className="text-[9px] text-cream/30 font-mono ml-auto shrink-0">{prod.price.toFixed(2)} €</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="flex gap-3 px-6 py-5 border-t border-white/10 sticky bottom-0 bg-[#111]">
                <button onClick={() => setIsFormOpen(false)} className="flex-1 py-3 border border-white/10 text-cream/50 hover:text-cream hover:border-white/20 text-xs uppercase font-bold tracking-widest transition-colors cursor-pointer">
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.name.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-yellow-400 text-secondary text-xs uppercase font-bold tracking-widest transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Save size={13} />
                  {editingPromo ? 'Guardar cambios' : 'Crear promoción'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromotionsManager;
