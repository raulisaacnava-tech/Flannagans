'use client';

import React, { useState, useEffect } from 'react';
import { Product, Category } from '@/types/menu';
import { getExtras, getAllergens, getProducts } from '@/lib/menu-store';
import { X, Save, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFormProps {
  product: Product | null; // Null para añadir nuevo
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> & { id?: string }) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  isOpen,
  onClose,
  onSave
}) => {
  const allExtras = getExtras();
  const allAllergens = getAllergens();
  const allProducts = getProducts();

  // Estados locales para los campos del formulario
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [ingredientsStr, setIngredientsStr] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [tagsStr, setTagsStr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isCampaign, setIsCampaign] = useState(false);
  const [campaignLabel, setCampaignLabel] = useState('');
  const [chefSuggestion, setChefSuggestion] = useState('');
  const [suggestedCombo, setSuggestedCombo] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isProfitable, setIsProfitable] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Sincronizar campos cuando se abre para editar o añadir
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setDescription(product.description);
      setLongDescription(product.longDescription || '');
      setIngredientsStr(product.ingredients ? product.ingredients.join(', ') : '');
      setSelectedAllergens(product.allergens || []);
      setTagsStr(product.tags ? product.tags.join(', ') : '');
      setImageUrl(product.imageUrl);
      setVideoUrl(product.videoUrl || '');
      setPosterImage(product.posterImage || '');
      setIsAvailable(product.isAvailable);
      setIsFeatured(product.isFeatured);
      setIsCampaign(product.isCampaign);
      setCampaignLabel(product.campaignLabel || '');
      setChefSuggestion(product.chefSuggestion || '');
      setSuggestedCombo(product.suggestedCombo || '');
      setDisplayOrder(product.displayOrder || 0);
      setIsProfitable(product.isProfitable || false);
      setSelectedExtras(product.extras || []);
    } else {
      // Campos en blanco para nuevo
      setName('');
      setCategory(categories[0]?.slug || '');
      setPrice(10.00);
      setDescription('');
      setLongDescription('');
      setIngredientsStr('');
      setSelectedAllergens([]);
      setTagsStr('');
      setImageUrl('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800'); // default asset
      setVideoUrl('');
      setPosterImage('');
      setIsAvailable(true);
      setIsFeatured(false);
      setIsCampaign(false);
      setCampaignLabel('');
      setChefSuggestion('');
      setSuggestedCombo('');
      setDisplayOrder(50);
      setIsProfitable(false);
      setSelectedExtras([]);
    }
  }, [product, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parsear strings
    const ingredients = ingredientsStr
      .split(',')
      .map(i => i.trim())
      .filter(i => i !== '');
    
    const tags = tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const dataToSave: Omit<Product, 'id'> & { id?: string } = {
      restaurantId: 'flanagans',
      name,
      slug,
      category,
      price: Number(price),
      description,
      longDescription: longDescription || undefined,
      ingredients: ingredients.length > 0 ? ingredients : undefined,
      allergens: selectedAllergens,
      tags: tags.length > 0 ? tags : undefined,
      imageUrl,
      videoUrl: videoUrl || undefined,
      posterImage: posterImage || undefined,
      isAvailable,
      isFeatured,
      isCampaign,
      campaignLabel: campaignLabel || undefined,
      chefSuggestion: chefSuggestion || undefined,
      suggestedCombo: suggestedCombo || undefined,
      displayOrder: Number(displayOrder),
      isProfitable,
      extras: selectedExtras,
    };

    if (product?.id) {
      dataToSave.id = product.id;
    }

    onSave(dataToSave);
    onClose();
  };

  const handleToggleAllergen = (id: string) => {
    setSelectedAllergens(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleToggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 z-[60] backdrop-blur-sm"
          />

          {/* Form Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-3xl max-h-[90vh] bg-dark-gray border border-white/10 rounded-none shadow-none flex flex-col overflow-hidden pointer-events-auto"
            >
              
              {/* Encabezado */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/20">
                <div className="flex items-center gap-2">
                  <span className="text-primary">🛎️</span>
                  <h3 className="font-display font-black text-lg text-cream uppercase tracking-wider">
                    {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-none bg-black/40 hover:bg-white/5 text-cream border border-white/10 transition-colors cursor-pointer"
                  aria-label="Cerrar formulario"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Formulario (Scrollable) */}
              <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-6 no-scrollbar text-left font-semibold">
                
                {/* 1. Datos Principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Nombre del Plato</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Smash Triple Cheddar"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Precio (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="11.90"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Categoría</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-3 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Orden de Aparición</label>
                    <input
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(Number(e.target.value))}
                      placeholder="10"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>
                </div>

                {/* 2. Descripciones */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripción Corta</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Se muestra en las cards de la carta principal."
                    className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripción Larga (Modal Detallado)</label>
                  <textarea
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Historia del plato, cocción, detalles del sabor artesanal..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none p-4 text-xs focus:outline-none transition-colors duration-300 resize-none font-semibold"
                  />
                </div>

                {/* 3. Ingredientes y Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Ingredientes (Separados por Coma)</label>
                    <input
                      type="text"
                      value={ingredientsStr}
                      onChange={(e) => setIngredientsStr(e.target.value)}
                      placeholder="Carne, Lechuga, Tomate, Cheddar"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Etiquetas / Badges (Separados por Coma)</label>
                    <input
                      type="text"
                      value={tagsStr}
                      onChange={(e) => setTagsStr(e.target.value)}
                      placeholder="Top Ventas, Nuevo, Especial, Recomendado"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>
                </div>

                {/* 4. Assets Multimedia */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL de la Imagen Principal</label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL del Video (Vista Vídeo)</label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://player.vimeo.com/... .mp4"
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL de la Portada del Video (Poster)</label>
                    <input
                      type="url"
                      value={posterImage}
                      onChange={(e) => setPosterImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>
                </div>

                {/* 5. Alérgenos y Extras (Listas Checkbox) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
                  
                  {/* Lista de Alérgenos */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold text-cream/45 uppercase tracking-widest">Alérgenos Presentes</span>
                    <div className="flex flex-wrap gap-2">
                      {allAllergens.map((allg) => {
                        const isChecked = selectedAllergens.includes(allg.id);
                        return (
                          <div
                            key={allg.id}
                            onClick={() => handleToggleAllergen(allg.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none border text-xs font-semibold cursor-pointer transition-all duration-300 ${
                              isChecked 
                                ? 'bg-primary/10 border-primary text-primary' 
                                : 'bg-black/25 border-white/10 text-cream/50'
                            }`}
                          >
                            <span>{allg.icon}</span>
                            <span>{allg.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lista de Extras disponibles */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold text-cream/45 uppercase tracking-widest">Extras Habilitados</span>
                    <div className="flex flex-wrap gap-2">
                      {allExtras.map((extra) => {
                        const isChecked = selectedExtras.includes(extra.id);
                        return (
                          <div
                            key={extra.id}
                            onClick={() => handleToggleExtra(extra.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none border text-xs font-semibold cursor-pointer transition-all duration-300 ${
                              isChecked 
                                ? 'bg-accent/10 border-accent text-accent' 
                                : 'bg-black/25 border-white/10 text-cream/50'
                            }`}
                          >
                            <span>{extra.name}</span>
                            <span className="text-[10px] text-cream/30">(+{extra.price.toFixed(1)}€)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 6. Venta Visual / Campos de Campaña */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={14} /> Ajustes de Venta Visual & Campañas
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Etiqueta de Campaña</label>
                      <input
                        type="text"
                        value={campaignLabel}
                        onChange={(e) => setCampaignLabel(e.target.value)}
                        placeholder="Ej. Burger del Mes, Pack Familiar"
                        className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Combo Sugerido (Venta Cruzada)</label>
                      <select
                        value={suggestedCombo}
                        onChange={(e) => setSuggestedCombo(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-3 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold cursor-pointer"
                      >
                        <option value="">Ninguno</option>
                        {allProducts
                          .filter(p => p.id !== product?.id)
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.price.toFixed(2)} €)
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Recomendación / Sugerencia del Chef</label>
                    <input
                      type="text"
                      value={chefSuggestion}
                      onChange={(e) => setChefSuggestion(e.target.value)}
                      placeholder="Ej. Pruébala con nuestra ración extra de bacon candy al bourbon."
                      className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
                    />
                  </div>
                </div>

                {/* 7. Conmutadores de Estado */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
                  
                  {/* Disponible */}
                  <div
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`p-3.5 border rounded-none cursor-pointer text-center select-none space-y-1 transition-all duration-300 ${
                      isAvailable ? 'bg-green-500/5 border-green-500/20 text-green-500 font-bold' : 'bg-black/25 border-white/10 text-cream/40'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-widest font-bold">Disponible</span>
                    <span className="text-xs">{isAvailable ? 'SÍ' : 'NO (Agotado)'}</span>
                  </div>

                  {/* Destacado */}
                  <div
                    onClick={() => setIsFeatured(!isFeatured)}
                    className={`p-3.5 border rounded-none cursor-pointer text-center select-none space-y-1 transition-all duration-300 ${
                      isFeatured ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500 font-bold' : 'bg-black/25 border-white/10 text-cream/40'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-widest font-bold">Destacado</span>
                    <span className="text-xs">{isFeatured ? 'SÍ' : 'NO'}</span>
                  </div>

                  {/* Campaña */}
                  <div
                    onClick={() => setIsCampaign(!isCampaign)}
                    className={`p-3.5 border rounded-none cursor-pointer text-center select-none space-y-1 transition-all duration-300 ${
                      isCampaign ? 'bg-orange-500/5 border-orange-500/20 text-orange-500 font-bold' : 'bg-black/25 border-white/10 text-cream/40'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-widest font-bold">Campaña Activa</span>
                    <span className="text-xs">{isCampaign ? 'SÍ' : 'NO'}</span>
                  </div>

                  {/* Rentable */}
                  <div
                    onClick={() => setIsProfitable(!isProfitable)}
                    className={`p-3.5 border rounded-none cursor-pointer text-center select-none space-y-1 transition-all duration-300 ${
                      isProfitable ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 font-bold' : 'bg-black/25 border-white/10 text-cream/40'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-widest font-bold">Alto Margen</span>
                    <span className="text-xs">{isProfitable ? 'SÍ' : 'NO'}</span>
                  </div>

                </div>

              </form>

              {/* Botonera de Acción Fija */}
              <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-none bg-black/40 hover:bg-white/5 text-cream border border-white/10 text-xs font-display font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-none bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-none cursor-pointer"
                >
                  <Save size={14} />
                  Guardar Cambios
                </button>
              </div>


            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
export default ProductForm;
