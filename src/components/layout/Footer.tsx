'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 text-cream/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="p-1.5 bg-primary text-secondary transition-transform duration-300">
                <Flame size={20} className="fill-secondary" />
              </span>
              <span className="font-display font-black text-xl tracking-wider text-primary uppercase">
                Flanagans
              </span>
            </Link>
            <p className="text-sm font-medium text-cream/50 leading-relaxed">
              Carne de primera calidad, combinaciones brutales y una experiencia pensada para que siempre quieras repetir.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/flanagansburguer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#0A0A0A] hover:bg-primary hover:text-secondary rounded-none border border-white/10 transition-colors flex items-center justify-center text-cream"
                aria-label="Instagram"
              >
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#0A0A0A] hover:bg-primary hover:text-secondary rounded-none border border-white/10 transition-colors flex items-center justify-center text-cream"
                aria-label="Facebook"
              >
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-cream">Enlaces</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Nuestra Carta
                </Link>
              </li>
              <li>
                <Link href="/#promotions" className="hover:text-primary transition-colors">
                  Promociones
                </Link>
              </li>
              <li>
                <Link href="/#flanacoins" className="hover:text-primary transition-colors">
                  FlanaCoins Teaser
                </Link>
              </li>
              <li>
                <Link href="/#reservations" className="hover:text-primary transition-colors">
                  Reservar Mesa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-cream">Contacto y Dirección</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Calle de Móstoles, 987, 28931 Móstoles, Madrid</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:919401241" className="hover:text-primary transition-colors">
                  919 40 12 41
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@flanagansburguer.com" className="hover:text-primary transition-colors">
                  info@flanagansburguer.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>&copy; {currentYear} Flanagans Burguer. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Aviso Legal</Link>
            <Link href="/" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="/admin/login" className="hover:text-primary transition-colors font-mono">[Admin Login]</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
