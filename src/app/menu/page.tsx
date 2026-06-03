import React from 'react';
import { MenuAppShell } from '@/components/menu/MenuAppShell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Carta | Flanagans Burguer',
  description: 'Explora nuestra carta digital interactiva en Móstoles. Disfruta de nuestras hamburguesas premium clásicas y especiales con vista menú y vista vídeo.',
};

export default function MenuPage() {
  return <MenuAppShell />;
}
