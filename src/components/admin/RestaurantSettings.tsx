'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Globe, Palette, Save, Sparkles } from 'lucide-react';
import { OpeningHours, Restaurant } from '@/types/restaurant';
import { MediaUploadField } from './MediaUploadField';

const DEFAULT_PRIMARY = '#FACC15';
const DEFAULT_ACCENT = '#EF4444';

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
  const [address, setAddress] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [logoScale, setLogoScale] = useState(1);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    setName(restaurant.name);
    setPhone(restaurant.phone);
    setWhatsappNumber(restaurant.whatsappNumber);
    setInstagramUrl(restaurant.instagramUrl);
    setLogoUrl(restaurant.logoUrl);
    setAddress(restaurant.address);
    setWelcomeMessage(restaurant.welcomeMessage || '');
    setOpeningHours(restaurant.openingHours);
    setLogoScale(restaurant.homepageContent?.logoScale ?? 1);
    setPrimaryColor(restaurant.brandColors?.primary || DEFAULT_PRIMARY);
    setAccentColor(restaurant.brandColors?.accent || DEFAULT_ACCENT);
  }, [restaurant]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    onSave({
      ...restaurant,
      name,
      phone,
      whatsappNumber,
      instagramUrl,
      logoUrl,
      address,
      welcomeMessage,
      openingHours,
      brandColors: {
        ...restaurant.brandColors,
        primary: primaryColor,
        accent: accentColor,
      },
      homepageContent: restaurant.homepageContent
        ? { ...restaurant.homepageContent, logoScale }
        : restaurant.homepageContent,
    });
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
      <div className="space-y-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl text-cream uppercase tracking-wide">
            Configuracion del Restaurante
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
        <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Globe className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Perfil e Informacion
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Nombre Comercial</span>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Telefono Reservas</span>
              <input
                type="text"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">WhatsApp Enlace Directo</span>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(event) => setWhatsappNumber(event.target.value)}
                placeholder="34919401241 (con prefijo internacional)"
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Instagram Enlace</span>
              <input
                type="url"
                required
                value={instagramUrl}
                onChange={(event) => setInstagramUrl(event.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
              />
            </label>
          </div>

          <MediaUploadField
            label="URL del Logotipo"
            value={logoUrl}
            onChange={setLogoUrl}
            accept="image/*"
            placeholder="/logo.webp"
          />

          {/* Tamaño del logo */}
          <div className="space-y-3 border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Tamaño del logo</span>
              <span className="text-[10px] font-mono font-bold text-primary">{Math.round(logoScale * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.6}
              max={1.6}
              step={0.05}
              value={logoScale}
              onChange={(event) => setLogoScale(Number(event.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex items-center justify-center bg-black/40 border border-white/5 p-3 overflow-hidden">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Previsualización del logo"
                  style={{ width: `${Math.round(180 * logoScale)}px` }}
                  className="h-auto max-h-24 object-contain"
                />
              ) : (
                <span className="text-[10px] text-cream/30 font-mono uppercase">Sube un logo para previsualizar</span>
              )}
            </div>
            <p className="text-[9px] text-cream/30">Ajusta cómo se ve el logo en la cabecera de la web y del menú. Guarda para aplicar.</p>
          </div>

          {/* Colores de marca */}
          <div className="space-y-3 border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2">
              <Palette className="text-primary" size={15} />
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Colores de marca</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-2 block">
                <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Color principal</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-9 w-12 bg-transparent border border-white/10 cursor-pointer" />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2 text-xs focus:outline-none font-mono uppercase" />
                </div>
              </label>
              <label className="space-y-2 block">
                <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Color de acento</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-9 w-12 bg-transparent border border-white/10 cursor-pointer" />
                  <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1 bg-black/40 border border-white/10 focus:border-primary text-cream px-3 py-2 text-xs focus:outline-none font-mono uppercase" />
                </div>
              </label>
            </div>
            <button
              type="button"
              onClick={() => { setPrimaryColor(DEFAULT_PRIMARY); setAccentColor(DEFAULT_ACCENT); }}
              className="text-[9px] text-cream/40 hover:text-cream uppercase tracking-widest font-bold underline underline-offset-2 cursor-pointer"
            >
              Restaurar colores originales
            </button>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Direccion Fisica del Local</span>
            <input
              type="text"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
            />
          </label>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Mensaje de Bienvenida (Menu)</span>
            <input
              type="text"
              value={welcomeMessage}
              onChange={(event) => setWelcomeMessage(event.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream rounded-none px-4 py-2.5 text-xs focus:outline-none transition-colors duration-300 font-semibold"
            />
          </label>
        </div>

        <div className="lg:col-span-5 bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-none flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Clock className="text-primary" size={18} />
              <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
                Horarios Semanales
              </h3>
            </div>

            <p className="text-xs text-cream/60 leading-relaxed font-semibold">
              Configura el rango de servicio diario. Los cambios se veran reflejados en la seccion de reservas.
            </p>

            <div className="space-y-3">
              {openingHours.map((openingHour, index) => (
                <div key={openingHour.day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs text-cream font-bold uppercase tracking-wider sm:w-28 shrink-0">
                    {openingHour.day}
                  </span>
                  <input
                    type="text"
                    value={openingHour.hours}
                    onChange={(event) => handleUpdateHours(index, event.target.value)}
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
