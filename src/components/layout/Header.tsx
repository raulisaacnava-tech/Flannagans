'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar el estilo de fondo de la cabecera
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menú', href: pathname === '/' ? '#featured-burger' : '/menu' },
    { name: 'Promociones', href: pathname === '/' ? '#promotions' : '/#promotions' },
    { name: 'FlanaCoins', href: pathname === '/' ? '#flanacoins' : '/#flanacoins' },
    { name: 'Sobre Nosotros', href: pathname === '/' ? '#about' : '/#about' },
    { name: 'Reservas', href: pathname === '/' ? '#reservations' : '/#reservations' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-background/95 border-white/10 py-3 shadow-none' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="p-1.5 bg-primary text-secondary transition-transform duration-300">
                <Flame size={20} className="fill-secondary" />
              </span>
              <span className="font-display font-black text-xl tracking-wider text-primary uppercase">
                Flanagans
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-semibold text-cream/70 hover:text-primary transition-colors text-xs uppercase tracking-wider font-mono"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              {/* Botón flotante para administrador */}
              <Link
                href="/admin"
                className="hidden lg:inline-flex text-xs text-white/40 hover:text-primary transition-colors mr-2 uppercase tracking-widest font-mono"
              >
                [Admin]
              </Link>

              <Link
                href="/menu"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 btn-minimalist border border-white/20 text-xs text-black"
              >
                Ver carta
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-cream md:hidden hover:text-primary"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-dark-gray z-50 p-6 flex flex-col justify-between shadow-none border-l border-white/10 rounded-none"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Flame size={20} className="text-primary fill-primary animate-pulse" />
                    <span className="font-display font-black text-lg tracking-wider text-primary uppercase">
                      Flanagans
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-cream hover:text-primary"
                    aria-label="Cerrar menú"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display font-black text-sm text-cream/80 hover:text-primary transition-colors py-2.5 uppercase tracking-wider border-b border-white/[0.04]"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-xs text-white/30 hover:text-primary transition-colors py-2 uppercase tracking-widest mt-4"
                  >
                    Área Admin
                  </Link>
                </nav>
              </div>

              <div className="mt-auto">
                <Link
                  href="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-minimalist inline-flex items-center justify-center py-4 border border-white/20 text-black text-center text-sm"
                >
                  Ver Menú Completo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
