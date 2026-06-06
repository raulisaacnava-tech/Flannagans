'use client';

import React, { useState, useEffect } from 'react';
import { Restaurant, OpeningHours } from '@/types/restaurant';
import { Save, Sparkles, Clock, Globe } from 'lucide-react';
import { DEFAULT_HOMEPAGE_CONTENT } from '@/lib/restaurant-content';

interface RestaurantSettingsProps {
  restaurant: Restaurant;
  onSave: (restaurant: Restaurant) => void;
}

export const RestaurantSettings: React.FC<RestaurantSettingsProps> = ({ restaurant, onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [siteLogoMaxWidth, setSiteLogoMaxWidth] = useState(DEFAULT_HOMEPAGE_CONTENT.siteLogoMaxWidth);
  const [address, setAddress] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);

  // Sincronizar estados locales con datos entrantes
  useEffect(() => {
    setName(restaurant.name);
    setPhone(restaurant.phone);
    setWhatsappNumber(restaurant.whatsappNumber);
    setInstagramUrl(restaurant.instagramUrl);
    setLogoUrl(restaurant.logoUrl);
    setSiteLogoMaxWidth(restaurant.homepageContent?.siteLogoMaxWidth || DEFAULT_HOMEPAGE_CONTENT.siteLogoMaxWidth);
    setAddress(restaurant.address);
    setWelcomeMessage(restaurant.welcomeMessage || '');
    setOpeningHours(restaurant.openingHours);
  }, [restaurant]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Restaurant = {
      ...restaurant,
      name,
      phone,
      whatsappNumber,
      instagramUrl,
      logoUrl,
      homepageContent: {
        ...(restaurant.homepageContent || DEFAULT_HOMEPAGE_CONTENT),
        siteLogoMaxWidth,
      },
      address,
      welcomeMessage,
      openingHours,
    };

    onSave(updated);
  };

  const handleUpdateHours = (index: number, newHours: string) => {
    const updated = [...openingHours];
    updated[index] = {
      ...updated[index],
      hours: newHours,
    };
    setOpeningHours(updated);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 select-none text-left">
      
      {/* Cabecera */}
      <div className="space-y-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl text-cream uppercase tracking-wide">
            Configuración del Restaurante
          </h2>
          <p className="text-xs text-cream/40 font-mono uppercase tracking-widest">
            Edita los datos de contacto, horarios y perfil comercial de tu local
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-none bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-none shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Save size={14} />
          Guardar Ajustes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* 1. Información General */}
        <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Globe className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Perfil e Información
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Nombre Comercial</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Teléfono Reservas</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">WhatsApp Enlace Directo</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="34919401241 (con prefijo internacional)"
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Instagram Enlace</label>
              <input
                type="url"
                required
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL del Logotipo</label>
            <input
              type="text"
              required
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
            />
          </div>

          <div className="space-y-3 border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-4">
              <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">
                TamaÃ±o general del logo
              </label>
              <span className="font-mono text-xs font-bold text-primary">{siteLogoMaxWidth}px</span>
            </div>
            <input
              type="range"
              min={160}
              max={320}
              step={4}
              value={siteLogoMaxWidth}
              onChange={(e) => setSiteLogoMaxWidth(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-cream/30">
              <span>Compacto</span>
              <span>Grande</span>
            </div>
            <div className="border border-white/10 bg-[#050505] px-4 py-5">
              <img
                src={logoUrl || '/logo.webp'}
                alt="Vista previa del logo"
                className="h-auto max-h-24 object-contain"
                style={{ width: siteLogoMaxWidth }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Dirección Física del Local</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Mensaje de Bienvenida (Menú)</label>
            <input
              type="text"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
            />
          </div>
        </div>

        {/* 2. Horarios de Apertura */}
        <div className="lg:col-span-5 bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-none flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Clock className="text-primary" size={18} />
              <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
                Horarios Semanales
              </h3>
            </div>

            <p className="text-xs text-cream/60 leading-relaxed font-semibold">
              Configura el rango de servicio diario. Los cambios se verán reflejados al instante en la sección de reservas en la Landing Page.
            </p>

            <div className="space-y-3">
              {openingHours.map((oh, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs text-cream font-bold uppercase tracking-wider sm:w-28 shrink-0">{oh.day}</span>
                  <input
                    type="text"
                    value={oh.hours}
                    onChange={(e) => handleUpdateHours(index, e.target.value)}
                    className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-3 py-2 text-xs focus:outline-none transition-colors font-mono font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-cream/30 font-mono uppercase">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span>Guarda los ajustes para aplicar los horarios.</span>
          </div>
        </div>


      </div>

    </form>
  );
};
export default RestaurantSettings;
