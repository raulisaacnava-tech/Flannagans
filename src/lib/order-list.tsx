'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Extra, CartItem } from '@/types/menu';

interface OrderListContextType {
  orderList: CartItem[];
  addToOrder: (product: Product, quantity: number, extras: Extra[], notes?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromOrder: (itemId: string) => void;
  clearOrder: () => void;
  orderTotal: number;
  orderCount: number;
  
  favorites: Record<string, boolean>;
  toggleFavorite: (productId: string) => void;
}

const OrderListContext = createContext<OrderListContextType | undefined>(undefined);

export const OrderListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderList, setOrderList] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedOrder = localStorage.getItem('flanagans_order_list');
    const savedFavs = localStorage.getItem('flanagans_favorites');

    if (savedOrder) setOrderList(JSON.parse(savedOrder));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('flanagans_order_list', JSON.stringify(orderList));
  }, [orderList, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('flanagans_favorites', JSON.stringify(favorites));
  }, [favorites, isMounted]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const addToOrder = (product: Product, quantity: number, extras: Extra[], notes?: string) => {
    setOrderList(prev => {
      // Check if item with exact same extras exists
      const existingItemIndex = prev.findIndex(item => {
        if (item.productId !== product.id) return false;
        if (item.notes !== notes) return false;
        
        // compare extras
        const prevExtras = item.selectedExtras.map(e => e.id).sort().join(',');
        const newExtras = extras.map(e => e.id).sort().join(',');
        return prevExtras === newExtras;
      });

      const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
      const unitPrice = product.price + extrasTotal;

      if (existingItemIndex > -1) {
        const newOrder = [...prev];
        const item = newOrder[existingItemIndex];
        item.quantity += quantity;
        item.subtotal = item.quantity * unitPrice;
        return newOrder;
      }

      const newItem: CartItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        product,
        quantity,
        selectedExtras: extras,
        notes,
        subtotal: quantity * unitPrice
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderList(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        const extrasTotal = item.selectedExtras.reduce((sum, e) => sum + e.price, 0);
        return {
          ...item,
          quantity: newQuantity,
          subtotal: newQuantity * (item.product.price + extrasTotal)
        };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromOrder = (itemId: string) => {
    setOrderList(prev => prev.filter(item => item.id !== itemId));
  };

  const clearOrder = () => setOrderList([]);

  const orderTotal = orderList.reduce((sum, item) => sum + item.subtotal, 0);
  const orderCount = orderList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <OrderListContext.Provider value={{
      orderList,
      addToOrder,
      updateQuantity,
      removeFromOrder,
      clearOrder,
      orderTotal,
      orderCount,
      favorites,
      toggleFavorite
    }}>
      {children}
    </OrderListContext.Provider>
  );
};

export const useOrderList = () => {
  const context = useContext(OrderListContext);
  if (!context) {
    throw new Error('useOrderList must be used within an OrderListProvider');
  }
  return context;
};
