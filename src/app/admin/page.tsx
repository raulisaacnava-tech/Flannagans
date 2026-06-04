import React from "react";
import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Panel de Control | Flanagans Burguer",
  description: "Panel administrativo para gestionar la carta digital de Flanagans Burguer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminShell />;
}
