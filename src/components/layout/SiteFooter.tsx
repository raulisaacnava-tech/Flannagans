'use client';

import React from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/lib/use-restaurant';

export const SiteFooter: React.FC = () => {
  const restaurant = useRestaurant();
  const footerLogoWidth = Math.max(150, Math.round((restaurant.homepageContent?.siteLogoMaxWidth || 240) * 0.82));

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <img
                src={restaurant.logoUrl || '/logo.webp'}
                alt={`${restaurant.name} logo`}
                className="object-contain"
                style={{ width: footerLogoWidth, height: 'auto' }}
              />
            </Link>
            <p className="text-cream/50 text-sm max-w-xs">{restaurant.welcomeMessage}</p>
          </div>

          <div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-cream mb-6">Navegacion</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Ver carta visual</Link></li>
              <li><Link href="/#gallery" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Galeria</Link></li>
              <li><Link href="/#location" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Ubicacion</Link></li>
              <li><Link href="/la-oferta" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">La oferta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-cream mb-6">Contacto</h4>
            <ul className="text-cream/50 space-y-2 text-sm">
              <li>{restaurant.address}</li>
              <li className="pt-2"><a href={`tel:${restaurant.phone}`} className="hover:text-primary transition-colors">Tel: {restaurant.phone}</a></li>
              <li><a href={`mailto:${restaurant.email || restaurant.homepageContent?.reservationsEmail || ''}`} className="hover:text-primary transition-colors">{restaurant.email || restaurant.homepageContent?.reservationsEmail}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-cream mb-6">Social</h4>
            <ul className="space-y-4">
              <li><a href={restaurant.instagramUrl} target="_blank" rel="noreferrer" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Instagram</a></li>
              <li><a href={restaurant.homepageContent?.googleMapsPlaceUrl} target="_blank" rel="noreferrer" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Google Maps</a></li>
              <li><Link href="/admin/login" className="text-cream/50 hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} {restaurant.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-cream/30 hover:text-cream text-xs font-bold uppercase tracking-widest transition-colors">Aviso Legal</a>
            <a href="#" className="text-cream/30 hover:text-cream text-xs font-bold uppercase tracking-widest transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
