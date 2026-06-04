import React from "react";
import type { Metadata } from "next";
import { MenuAppShell } from "@/components/menu/MenuAppShell";

export const metadata: Metadata = {
  title: "Carta digital",
  description:
    "Explora la carta digital interactiva de Flanagans Burguer en Mostoles. Hamburguesas premium con fotos, videos cortos y detalles por plato.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Carta digital | Flanagans Burguer",
    description: "Hamburguesas premium con fotos, videos cortos y detalles por plato.",
    url: "/menu",
  },
};

export default function MenuPage() {
  return <MenuAppShell />;
}
