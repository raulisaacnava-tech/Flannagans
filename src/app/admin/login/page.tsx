import React from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceso Administrador | Flanagans Burguer',
  description: 'Área protegida de administración de la carta digital de Flanagans Burguer.',
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
