'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Download, ExternalLink, QrCode } from 'lucide-react';
import { Product } from '@/types/menu';
import { Restaurant } from '@/types/restaurant';

interface MenuQrGeneratorProps {
  restaurant: Restaurant | null;
  products: Product[];
}

export const MenuQrGenerator: React.FC<MenuQrGeneratorProps> = ({ restaurant, products }) => {
  const [siteOrigin, setSiteOrigin] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(() => {
    setSiteOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (copyState === 'idle') return;

    const timeout = window.setTimeout(() => setCopyState('idle'), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  const menuUrl = useMemo(() => {
    if (!siteOrigin) return '/menu';
    return new URL('/menu', siteOrigin).toString();
  }, [siteOrigin]);

  const encodedMenuUrl = encodeURIComponent(menuUrl);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=960x960&margin=24&format=png&data=${encodedMenuUrl}`;
  const qrDownloadUrl = `${qrImageUrl}&download=1`;
  const availableProducts = products.filter((product) => product.isAvailable).length;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  return (
    <section className="space-y-8 select-none">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <h2 className="font-display text-2xl font-black uppercase tracking-wide text-cream">
            QR del Menu
          </h2>
          <p className="max-w-2xl text-xs font-mono uppercase tracking-widest text-cream/40">
            Genera el codigo que lleva directo a la carta digital, sin pasar por la web principal
          </p>
        </div>

        <Link
          href="/menu"
          target="_blank"
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/10 bg-black/40 px-4 py-3 font-display text-xs font-black uppercase tracking-wider text-cream transition-colors hover:border-white/20 hover:bg-white/5"
        >
          <ExternalLink size={15} />
          Probar Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="border border-white/10 bg-[#0A0A0A] p-5 sm:p-8 lg:col-span-5">
          <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrImageUrl}
              alt={`Codigo QR para abrir el menu de ${restaurant?.name || 'el restaurante'}`}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 lg:col-span-7">
          <div className="space-y-6">
            <div className="flex items-start gap-4 border-b border-white/10 pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/25 bg-primary/10 text-primary">
                <QrCode size={22} />
              </span>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-black uppercase tracking-wider text-cream">
                  {restaurant?.name || 'Carta digital'}
                </h3>
                <p className="text-xs font-semibold leading-relaxed text-cream/60">
                  Este QR apunta a la ruta publica <span className="font-mono text-primary">/menu</span>. Cuando el sitio este desplegado, usara el dominio real automaticamente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-black/30 p-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cream/40">Destino</span>
                <span className="mt-2 block font-display text-lg font-black uppercase tracking-wide text-cream">Menu</span>
              </div>
              <div className="border border-white/10 bg-black/30 p-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cream/40">Productos visibles</span>
                <span className="mt-2 block font-display text-lg font-black uppercase tracking-wide text-cream">{availableProducts}</span>
              </div>
              <div className="border border-white/10 bg-black/30 p-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cream/40">Formato</span>
                <span className="mt-2 block font-display text-lg font-black uppercase tracking-wide text-cream">PNG</span>
              </div>
            </div>

            <label className="block space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cream/45">Enlace directo del QR</span>
              <input
                type="text"
                readOnly
                value={menuUrl}
                className="w-full border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs font-bold text-cream outline-none"
                onFocus={(event) => event.currentTarget.select()}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 font-display text-xs font-black uppercase tracking-widest text-secondary transition-colors hover:bg-yellow-400"
            >
              {copyState === 'copied' ? <Check size={15} /> : <Copy size={15} />}
              {copyState === 'copied' ? 'Enlace Copiado' : copyState === 'error' ? 'Copia Manual' : 'Copiar Enlace'}
            </button>

            <a
              href={qrDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/10 bg-black/40 px-5 py-3 font-display text-xs font-black uppercase tracking-widest text-cream transition-colors hover:border-white/20 hover:bg-white/5"
            >
              <Download size={15} />
              Descargar QR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuQrGenerator;
