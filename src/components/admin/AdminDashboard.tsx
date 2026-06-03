'use client';

import React from 'react';
import { Product, Category } from '@/types/menu';
import { 
  Beef, 
  EyeOff, 
  Tag, 
  Sparkles, 
  Video, 
  Image as ImageIcon,
  FolderOpen,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  onNavigate: (section: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, categories, onNavigate }) => {
  const activeProducts = products.filter(p => p.isAvailable).length;
  const outOfStockProducts = products.filter(p => !p.isAvailable).length;
  const categoryCount = categories.length;
  const featuredCount = products.filter(p => p.isFeatured).length;
  const campaignCount = products.filter(p => p.isCampaign).length;
  const videoCount = products.filter(p => p.videoUrl && p.videoUrl.trim() !== '').length;
  const missingImgCount = products.filter(p => !p.imageUrl || p.imageUrl.trim() === '').length;
  const profitableCount = products.filter(p => p.isProfitable).length;

  const stats = [
    {
      title: 'Productos Activos',
      value: activeProducts,
      desc: 'Disponibles en el menú público',
      icon: Beef,
      color: 'text-green-500 bg-green-500/10 border-green-500/10',
      action: 'productos'
    },
    {
      title: 'Productos Agotados',
      value: outOfStockProducts,
      desc: 'Marcados como fuera de stock',
      icon: EyeOff,
      color: 'text-red-500 bg-red-500/10 border-red-500/10',
      action: 'productos'
    },
    {
      title: 'Categorías Totales',
      value: categoryCount,
      desc: 'Estructura de la carta',
      icon: FolderOpen,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/10',
      action: 'productos'
    },
    {
      title: 'Productos Destacados',
      value: featuredCount,
      desc: 'Aparecen en el rail superior',
      icon: Sparkles,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/10',
      action: 'venta-visual'
    },
    {
      title: 'Campañas Activas',
      value: campaignCount,
      desc: 'Banners y etiquetas especiales',
      icon: Tag,
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/10',
      action: 'venta-visual'
    },
    {
      title: 'Platos con Vídeo',
      value: videoCount,
      desc: 'Disponibles en Vista Vídeo',
      icon: Video,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/10',
      action: 'venta-visual'
    },
    {
      title: 'Mayor Rentabilidad',
      value: profitableCount,
      desc: 'Platos con alto margen',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/10',
      action: 'venta-visual'
    },
    {
      title: 'Sin Imagen',
      value: missingImgCount,
      desc: 'Requieren subir asset visual',
      icon: ImageIcon,
      color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/10',
      action: 'productos'
    },
  ];

  return (
    <div className="space-y-8 select-none">
      
      {/* Saludo y Título */}
      <div className="space-y-1.5">
        <h2 className="font-display font-black text-2xl text-cream uppercase tracking-wide">
          Dashboard de Control
        </h2>
        <p className="text-xs text-cream/40 font-mono uppercase tracking-widest">
          Estadísticas y resumen de tu carta digital en tiempo real
        </p>
      </div>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => onNavigate(stat.action)}
              className="bg-[#0A0A0A] border border-white/10 hover:border-white/20 rounded-none p-6 shadow-none transition-all duration-300 group cursor-pointer flex justify-between items-start"
            >
              <div className="space-y-3">
                <span className="block text-xs font-bold text-cream/40 uppercase tracking-widest">{stat.title}</span>
                <span className="block text-3xl font-display font-black text-cream tracking-wide group-hover:text-primary transition-colors">
                  {stat.value}
                </span>
                <span className="block text-[10px] text-cream/30 font-medium">{stat.desc}</span>
              </div>
              <div className={`p-3 rounded-none bg-black/40 border border-white/10 shrink-0`}>
                <Icon size={20} className={stat.color.split(' ')[0]} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Caja de Consejos de Growth / Venta Visual */}
      <div className="bg-[#0A0A0A] border border-primary/20 rounded-none p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-display font-black text-sm uppercase tracking-widest">
          <Sparkles size={16} className="animate-pulse" />
          <span>Growth Tip: Aumenta tu Ticket Medio</span>
        </div>
        <p className="text-xs text-cream/70 leading-relaxed font-semibold">
          Tienes **{featuredCount}** productos destacados en la carta. Recuerda situar platos de alto margen comercial (como postres caseros, bebidas grandes o combos especiales) en la sección de **Venta Visual** para incentivar compras complementarias desde el modal y el carrito de los usuarios.
        </p>
      </div>


    </div>
  );
};
export default AdminDashboard;
