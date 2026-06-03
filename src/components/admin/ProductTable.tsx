'use client';

import React, { useState } from 'react';
import { Product, Category } from '@/types/menu';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Sparkles, 
  Check, 
  X, 
  Flame, 
  Video, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import Image from 'next/image';

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleAvailable: (id: string, isAvailable: boolean) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onAddNew: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
  onEdit,
  onDelete,
  onToggleAvailable,
  onToggleFeatured,
  onAddNew
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filtrar
  const filtered = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Controles de Búsqueda */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center flex-grow max-w-xl">
          {/* Búsqueda */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cream/30">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream placeholder-cream/30 rounded-none pl-9 pr-4 py-2.5 text-xs focus:outline-none transition-all duration-300 font-medium"
            />
          </div>

          {/* Filtro Categorías */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-3 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-medium cursor-pointer"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Añadir */}
        <button
          onClick={onAddNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-none bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-none hover:scale-[1.01] active:scale-95 shrink-0 cursor-pointer"
        >
          <Plus size={14} strokeWidth={3} />
          Nuevo Producto
        </button>
      </div>


      {/* Listado en Tarjetas (Mobile) / Tabla (Desktop) */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-none">
        
        {/* Vista Mobile (Tarjetas) */}
        <div className="block lg:hidden divide-y divide-white/10">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-cream/40 text-xs font-mono uppercase tracking-wider">
              No se encontraron productos
            </div>
          ) : (
            filtered.map((product) => (
              <div key={product.id} className="p-4 flex gap-4 items-start justify-between">
                <div className="flex gap-3">
                  {/* Miniatura */}
                  <div className="relative w-12 h-12 rounded-none overflow-hidden bg-black/20 shrink-0 border border-white/10">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-sm text-cream uppercase">{product.name}</h4>
                    <span className="block text-[10px] text-cream/40 uppercase tracking-widest">{product.category.replace('-', ' ')}</span>
                    <span className="block text-xs font-mono text-primary font-bold">{product.price.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  {/* Conmutadores rápidos */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleAvailable(product.id, !product.isAvailable)}
                      className={`p-1.5 rounded-none border transition-colors cursor-pointer ${
                        product.isAvailable
                          ? 'bg-green-500/10 border-green-500/20 text-green-500'
                          : 'bg-red-500/10 border-red-500/20 text-red-500'
                      }`}
                      title={product.isAvailable ? 'Disponible' : 'Agotado'}
                    >
                      {product.isAvailable ? <Eye size={12} /> : <EyeOff size={12} />}
                    </button>

                    <button
                      onClick={() => onToggleFeatured(product.id, !product.isFeatured)}
                      className={`p-1.5 rounded-none border transition-colors cursor-pointer ${
                        product.isFeatured
                          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                          : 'bg-zinc-800 border-zinc-700 text-cream/30'
                      }`}
                      title="Destacado"
                    >
                      <Sparkles size={12} />
                    </button>
                  </div>

                  {/* Acciones CRUD */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1 p-2 px-3 bg-black/40 border border-white/10 rounded-none text-cream/70 hover:bg-primary/20 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-pointer text-[10px] uppercase font-bold tracking-widest"
                    >
                      <Edit size={12} />
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 bg-black/40 border border-white/10 rounded-none text-cream/70 hover:bg-accent-red/20 hover:text-accent-red hover:border-accent-red/20 transition-all duration-300 cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Vista Desktop (Tabla) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-black/40 border-b border-white/10 text-cream/40 uppercase tracking-widest font-mono text-[10px]">
                <th className="py-3 px-4">Plato</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Precio</th>
                <th className="py-3 px-4">Disponibilidad</th>
                <th className="py-3 px-4 text-center">Destacado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-semibold text-cream/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center text-cream/40 font-mono uppercase tracking-wider">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Plato info */}
                    <td className="py-2 px-3 flex items-center gap-2">
                      <div className="relative w-9 h-9 rounded-none overflow-hidden bg-black/20 border border-white/10 shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-black text-xs text-cream uppercase leading-snug whitespace-nowrap">{product.name}</h4>
                          <div className="flex gap-0.5">
                            {product.videoUrl && (
                              <span className="text-purple-500" title="Tiene Video"><Video size={10} /></span>
                            )}
                            {product.isCampaign && (
                              <span className="text-orange-500" title="Campaña"><Flame size={10} /></span>
                            )}
                          </div>
                        </div>
                        <span className="text-[9px] text-cream/30 font-medium block truncate max-w-[180px]">{product.description}</span>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="py-2 px-3 uppercase tracking-wider text-cream/60 text-[9px] whitespace-nowrap">
                      {product.category.replace(/-/g, ' ')}
                    </td>

                    {/* Precio */}
                    <td className="py-2 px-3 font-mono text-primary font-black text-xs whitespace-nowrap">
                      {product.price.toFixed(2)} €
                    </td>

                    {/* Disponibilidad */}
                    <td className="py-2 px-3">
                      <button
                        onClick={() => onToggleAvailable(product.id, !product.isAvailable)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-none border text-[9px] uppercase tracking-widest font-black transition-colors cursor-pointer whitespace-nowrap ${
                          product.isAvailable
                            ? 'bg-green-500/10 border-green-500/20 text-green-500'
                            : 'bg-red-500/10 border-red-500/20 text-red-500'
                        }`}
                      >
                        {product.isAvailable ? (
                          <><Check size={9} strokeWidth={4} /> Disp.</>
                        ) : (
                          <><X size={9} strokeWidth={4} /> Agot.</>
                        )}
                      </button>
                    </td>

                    {/* Destacado */}
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => onToggleFeatured(product.id, !product.isFeatured)}
                        className={`p-1.5 rounded-none border transition-all duration-300 cursor-pointer ${
                          product.isFeatured
                            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                            : 'bg-zinc-800/40 border-zinc-700/50 text-cream/20 hover:text-cream/50'
                        }`}
                        title="Destacar en barra superior"
                      >
                        <Sparkles size={11} className={product.isFeatured ? 'fill-yellow-500' : ''} />
                      </button>
                    </td>

                    {/* Acciones CRUD */}
                    <td className="py-2 px-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onEdit(product)}
                          className="flex items-center gap-1 py-1.5 px-2.5 bg-black/40 border border-white/10 rounded-none text-cream/70 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 cursor-pointer text-[9px] uppercase font-bold tracking-widest whitespace-nowrap"
                          title="Editar producto"
                        >
                          <Edit size={11} />
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="p-1.5 bg-black/40 border border-white/10 rounded-none text-cream/70 hover:bg-accent-red hover:text-cream hover:border-accent-red transition-all duration-300 cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>


    </div>
  );
};
export default ProductTable;
