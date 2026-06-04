'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSelector } from '@/components/menu/LanguageSelector';

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-200 ease-[var(--ease-out-strong)] ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#070504]/92 backdrop-blur-xl border-b border-white/10 py-2.5 md:py-3'
          : 'bg-gradient-to-b from-black/72 via-black/28 to-transparent py-4 md:py-5'
      }`}
    >
      <div className="site-container flex items-center justify-between gap-4">
        <Link
          href="/"
          className={`relative z-50 flex items-center pressable transition-[width,height,transform] duration-200 ease-[var(--ease-out-strong)] md:h-[4.5rem] md:w-[12.6rem] ${
            isScrolled || isMobileMenuOpen
              ? 'h-[4.3rem] w-[13.2rem]'
              : 'h-[5.4rem] w-[clamp(13.8rem,44vw,16rem)]'
          }`}
          aria-label="Flanagans inicio"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/logo.webp"
            alt="Flanagans Logo"
            width={240}
            height={82}
            className="h-auto max-h-full w-full object-contain"
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
          <LanguageSelector />
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

        <div className="relative z-50 flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <button
            className="grid h-11 w-11 place-items-center text-cream pressable"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.22, ease: navEase }}
            className="fixed inset-x-0 top-0 z-40 flex h-[100dvh] min-h-[100dvh] flex-col overflow-y-auto bg-[#070504] px-[var(--safe-x)] pt-[calc(env(safe-area-inset-top)+5.75rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          >
            <div className="absolute inset-0 hero-fire-wash opacity-45" aria-hidden="true" />
            <nav className="relative z-10 flex min-h-[18rem] flex-1 flex-col items-center justify-center gap-[clamp(1.15rem,4vh,2rem)] py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-1.5 text-center font-display text-[clamp(1.45rem,7vw,2.2rem)] font-black uppercase leading-none tracking-[0.08em] text-cream hover:text-primary pressable"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="relative z-10 mt-auto flex flex-col gap-3">
              <Link
                href="#reservations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-12 w-full items-center justify-center border border-white/20 px-4 py-3 text-center font-display text-sm font-black uppercase tracking-[0.1em] text-cream pressable"
              >
                Reservar
              </Link>
              <Link
                href="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-14 w-full items-center justify-center bg-primary px-4 py-4 text-center font-display text-sm font-black uppercase tracking-[0.1em] text-secondary pressable premium-cta"
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
