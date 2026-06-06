'use client';

import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/lib/menu-store';
import { Product, Category } from '@/types/menu';
import { motion, AnimatePresence } from 'framer-motion';

import { MenuHeader } from './MenuHeader';
import { MenuBottomNav } from './MenuBottomNav';
import { MenuCategoryTabs } from './MenuCategoryTabs';
import { MenuListView } from './MenuListView';
import { VideoFeedView } from './VideoFeedView';
import { ProductBottomSheet } from './ProductBottomSheet';
import { CampaignBanner } from './CampaignBanner';

export const MenuAppShell: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);

  // States
  const [activeView, setActiveView] = useState<'video' | 'menu'>('video');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load data
  useEffect(() => {
    setIsClient(true);
    // FORCE CLEAR CACHE ONCE TO ENSURE USER GETS THE LATEST VIDEO CHANGES
    if (!localStorage.getItem('flanagans_force_clear_v5')) {
      localStorage.clear();
      localStorage.setItem('flanagans_force_clear_v5', 'true');
    }

    const loadData = () => {
      const allProducts = getProducts();
      const allCategories = getCategories();
      setProducts(allProducts);
      setCategories(allCategories);
      
      if (allCategories.length > 0 && !activeCategory) {
        setActiveCategory(allCategories[0].slug);
      }
    };
    loadData();
    window.addEventListener('flanagans_menu_updated', loadData);
    return () => window.removeEventListener('flanagans_menu_updated', loadData);
  }, [activeCategory]);

  // View state persistence
  useEffect(() => {
    if (isClient) {
      const savedMode = localStorage.getItem('flanagans_app_view_mode') as 'menu' | 'video';
      if (savedMode) setActiveView(savedMode);
    }
  }, [isClient]);

  const handleChangeView = (mode: 'menu' | 'video') => {
    setActiveView(mode);
    localStorage.setItem('flanagans_app_view_mode', mode);
  };

  const filteredProducts = products.filter(p => p.category === activeCategory);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgb(250_204_21_/_0.12),transparent_28%),#050505] md:px-4 md:py-8">
      {/* Contenedor Adaptable (En móvil es 100% full viewport, en desktop es un dashboard responsivo de alta gama sin borde grueso de teléfono) */}
      <div className="premium-mobile-shell relative mx-auto flex h-[100dvh] w-full flex-col overflow-hidden md:h-[90vh] md:max-h-[900px] md:max-w-[1000px] lg:max-w-[1200px] md:rounded-3xl md:border md:border-white/10 md:shadow-[0_32px_96px_rgba(0,0,0,0.85),0_0_80px_rgb(250_204_21_/_0.03)]">
        
        <AnimatePresence mode="wait">
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col h-full relative"
          >
            <MenuHeader
              products={products}
              onViewDetails={(p) => {
                setSelectedProduct(p);
                setActiveView('menu');
              }}
            />
            <MenuCategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />

            <div className="flex-grow overflow-y-auto no-scrollbar relative z-10">
              <CampaignBanner />

              {activeView === 'menu' ? (
                <MenuListView products={filteredProducts} onViewDetails={setSelectedProduct} />
              ) : (
                <VideoFeedView products={filteredProducts} onViewDetails={setSelectedProduct} />
              )}
            </div>

            <MenuBottomNav activeView={activeView} onChange={handleChangeView} />

            <ProductBottomSheet
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </motion.div>
        </AnimatePresence>
        
      </div>
    </div>
  );
};
