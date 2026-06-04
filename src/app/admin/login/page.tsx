import React from "react";
import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Acceso Administrador | Flanagans Burguer",
  description: "Area protegida de administracion de la carta digital de Flanagans Burguer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
