'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Beef,
  Flame,
  Globe,
  LayoutDashboard,
  LogOut,
  QrCode,
  RefreshCw,
  Settings,
  Sparkles,
  Tag,
} from 'lucide-react';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  getRestaurant,
  resetDemoData,
  updateProduct,
  updateRestaurant,
} from '@/lib/menu-store';
import { Category, Product } from '@/types/menu';
import { Restaurant } from '@/types/restaurant';
import { AdminDashboard } from './AdminDashboard';
import { HomepageContentManager } from './HomepageContentManager';
import { MenuQrGenerator } from './MenuQrGenerator';
import { ProductForm } from './ProductForm';
import { ProductTable } from './ProductTable';
import { PromotionsManager } from './PromotionsManager';
import { RestaurantSettings } from './RestaurantSettings';
import { VisualSellingPanel } from './VisualSellingPanel';

export const AdminShell: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadStoreData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
    setRestaurant(getRestaurant());
  };

  useEffect(() => {
    let isAlive = true;

    const checkSession = async () => {
      const response = await fetch('/api/admin/session', { cache: 'no-store' }).catch(() => null);
      const data = response?.ok ? await response.json() as { authenticated?: boolean } : null;

      if (!isAlive) return;

      if (data?.authenticated) {
        setIsAuthenticated(true);
        loadStoreData();
      } else {
        setIsAuthenticated(false);
        router.replace('/admin/login');
      }
    };

    void checkSession();

    return () => {
      isAlive = false;
    };
  }, [router]);

  const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: string }) => {
    if (productData.id) {
      updateProduct(productData.id, productData);
    } else {
      createProduct(productData);
    }
    loadStoreData();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Seguro que deseas eliminar este producto?')) {
      deleteProduct(id);
      loadStoreData();
    }
  };

  const handleToggleAvailable = (id: string, isAvailable: boolean) => {
    updateProduct(id, { isAvailable });
    loadStoreData();
  };

  const handleToggleFeatured = (id: string, isFeatured: boolean) => {
    updateProduct(id, { isFeatured });
    loadStoreData();
  };

  const handleToggleProfitable = (id: string, isProfitable: boolean) => {
    updateProduct(id, { isProfitable });
    loadStoreData();
  };

  const handleToggleCampaign = (id: string, isCampaign: boolean) => {
    updateProduct(id, { isCampaign });
    loadStoreData();
  };

  const handleSetBurgerOfTheMonth = (id: string) => {
    const prevBurger = products.find((p) => p.category === 'burger-del-mes');
    if (prevBurger) {
      updateProduct(prevBurger.id, {
        category: 'especiales',
        isCampaign: false,
        campaignLabel: undefined,
      });
    }

    updateProduct(id, {
      category: 'burger-del-mes',
      isCampaign: true,
      campaignLabel: 'Burger del Mes',
    });

    loadStoreData();
  };

  const handleSaveRestaurant = (updatedRest: Restaurant) => {
    updateRestaurant(updatedRest);
    loadStoreData();
    alert('Ajustes del restaurante guardados correctamente.');
  };

  const handleResetDemo = () => {
    if (confirm('Deseas restablecer los datos de demostracion? Perderas cualquier cambio temporal.')) {
      resetDemoData();
      loadStoreData();
    }
  };

  const handleLogout = () => {
    void fetch('/api/admin/session', { method: 'DELETE' }).finally(() => {
      router.refresh();
      router.push('/');
    });
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Flame className="text-primary animate-pulse" size={48} />
        <span className="text-xs text-cream/40 font-mono uppercase tracking-widest">
          Verificando sesion...
        </span>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'productos', label: 'Gestionar Carta', icon: Beef },
    { id: 'promociones', label: 'Promociones', icon: Tag },
    { id: 'venta-visual', label: 'Venta Visual', icon: Sparkles },
    { id: 'qr-menu', label: 'QR Menu', icon: QrCode },
    { id: 'contenido-web', label: 'Contenido Web', icon: Globe },
    { id: 'configuracion', label: 'Configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row select-none overflow-x-hidden">
      <aside className="w-full lg:w-72 bg-dark-gray border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-primary rounded-none text-secondary">
                <Flame size={18} className="fill-secondary text-secondary" />
              </span>
              <span className="font-display font-black text-base tracking-wider text-primary uppercase">
                Panel Admin
              </span>
            </div>

            <Link
              href="/menu"
              className="p-2 rounded-none bg-black/40 hover:bg-white/5 text-cream border border-white/10 transition-colors"
              title="Ver carta publica"
            >
              <Globe size={14} />
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
            {navItems.map((btn) => {
              const Icon = btn.icon;
              const isActive = activeSection === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setActiveSection(btn.id)}
                  className={`w-full flex min-h-11 items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-none font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary text-secondary'
                      : 'text-cream/60 hover:bg-white/5 hover:text-cream'
                  }`}
                >
                  <Icon size={16} />
                  {btn.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-12 lg:mt-0 space-y-4 pt-6 border-t border-white/10">
          <button
            onClick={handleResetDemo}
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-none border border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20 text-cream/70 hover:text-cream font-display font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RefreshCw size={14} />
            Resetear Demo
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-none border border-accent-red/20 bg-accent-red/10 hover:bg-accent-red/20 text-accent-red font-display font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Cerrar Sesion
          </button>
        </div>
      </aside>

      <main className="relative flex-grow overflow-y-auto p-4 sm:p-8 lg:max-h-screen lg:p-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {activeSection === 'dashboard' && (
            <AdminDashboard products={products} categories={categories} onNavigate={setActiveSection} />
          )}

          {activeSection === 'productos' && (
            <ProductTable
              products={products}
              categories={categories}
              onEdit={(prod) => {
                setEditingProduct(prod);
                setIsFormOpen(true);
              }}
              onDelete={handleDeleteProduct}
              onToggleAvailable={handleToggleAvailable}
              onToggleFeatured={handleToggleFeatured}
              onAddNew={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
            />
          )}

          {activeSection === 'promociones' && <PromotionsManager products={products} />}

          {activeSection === 'venta-visual' && (
            <VisualSellingPanel
              products={products}
              onToggleFeatured={handleToggleFeatured}
              onToggleCampaign={handleToggleCampaign}
              onToggleProfitable={handleToggleProfitable}
              onSetBurgerOfTheMonth={handleSetBurgerOfTheMonth}
              onEditProduct={(prod) => {
                setEditingProduct(prod);
                setIsFormOpen(true);
              }}
            />
          )}

          {activeSection === 'qr-menu' && <MenuQrGenerator restaurant={restaurant} products={products} />}

          {activeSection === 'contenido-web' && restaurant && (
            <HomepageContentManager restaurant={restaurant} onSave={handleSaveRestaurant} />
          )}

          {activeSection === 'configuracion' && restaurant && (
            <RestaurantSettings restaurant={restaurant} onSave={handleSaveRestaurant} />
          )}
        </div>
      </main>

      <ProductForm
        product={editingProduct}
        categories={categories}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default AdminShell;
