import React from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Control | Flanagans Burguer',
  description: 'Panel administrativo para gestionar la carta digital de Flanagans Burguer.',
};

export default function AdminPage() {
  return <AdminShell />;
}
