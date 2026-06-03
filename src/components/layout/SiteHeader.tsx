'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navEase = [0.23, 1, 0.32, 1] as const;

const navItems = [
  { href: '#burgers', label: 'Burgers' },
  { href: '#promos', label: 'Promos' },
  { href: '#gallery', label: 'Nosotros' },
  { href: '#location', label: 'Ubicacion' },
];

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-200 ease-[var(--ease-out-strong)] ${
        isScrolled ? 'bg-[#070504]/88 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50 pressable" aria-label="Flanagans inicio">
          <Image
            src="/logo.webp"
            alt="Flanagans Logo"
            width={160}
            height={54}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-bold text-cream/70 hover:text-primary uppercase tracking-[0.14em] transition-colors duration-[160ms]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="#reservations" className="text-xs font-bold text-cream hover:text-primary uppercase tracking-[0.14em] transition-colors duration-[160ms]">
            Reservar
          </Link>
          <Link
            href="/menu"
            className="bg-primary text-secondary px-6 py-2.5 font-display font-black text-xs uppercase tracking-[0.14em] hover:bg-white hover:text-black transition-colors duration-[160ms] pressable premium-cta"
          >
            Ver Carta
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-cream z-50 pressable"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.22, ease: navEase }}
            className="fixed inset-0 bg-[#070504] z-40 flex flex-col pt-24 px-6 pb-6"
          >
            <div className="absolute inset-0 hero-fire-wash opacity-45" aria-hidden="true" />
            <nav className="relative z-10 flex flex-col gap-7 items-center flex-grow">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-black text-cream hover:text-primary uppercase tracking-[0.12em] pressable"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="relative z-10 flex flex-col gap-4 mt-auto">
              <Link
                href="#reservations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 border border-white/20 text-center text-cream font-display font-black uppercase tracking-[0.12em] pressable"
              >
                Reservar
              </Link>
              <Link
                href="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-primary text-secondary text-center font-display font-black uppercase tracking-[0.12em] pressable premium-cta"
              >
                Ver Carta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
