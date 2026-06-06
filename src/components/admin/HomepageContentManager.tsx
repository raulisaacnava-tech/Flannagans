'use client';

import React, { useEffect, useState } from 'react';
import { Bike, Image as ImageIcon, MapPinned, MonitorPlay, Quote, Save, Star } from 'lucide-react';
import { MediaUploadField } from './MediaUploadField';
import { DEFAULT_HOMEPAGE_CONTENT } from '@/lib/restaurant-content';
import { HomepageContent, Restaurant } from '@/types/restaurant';

interface HomepageContentManagerProps {
  restaurant: Restaurant;
  onSave: (restaurant: Restaurant) => void;
}

type GalleryDraft = HomepageContent['galleryItems'];
type DeliveryDraft = HomepageContent['deliveryPartners'];
type ReviewsDraft = HomepageContent['reviews'];

export const HomepageContentManager: React.FC<HomepageContentManagerProps> = ({
  restaurant,
  onSave,
}) => {
  const [draft, setDraft] = useState<HomepageContent>(restaurant.homepageContent || DEFAULT_HOMEPAGE_CONTENT);

  useEffect(() => {
    setDraft(restaurant.homepageContent || DEFAULT_HOMEPAGE_CONTENT);
  }, [restaurant]);

  const updateField = <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const updateHighlight = (index: number, value: string) => {
    const next = [...draft.heroHighlights];
    next[index] = value;
    updateField('heroHighlights', next);
  };

  const updateGallery = (index: number, key: keyof GalleryDraft[number], value: string) => {
    const next = draft.galleryItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item,
    );
    updateField('galleryItems', next);
  };

  const updateDeliveryPartner = (index: number, key: keyof DeliveryDraft[number], value: string) => {
    const next = draft.deliveryPartners.map((partner, itemIndex) =>
      itemIndex === index ? { ...partner, [key]: value } : partner,
    );
    updateField('deliveryPartners', next);
  };

  const updateReview = (index: number, key: keyof ReviewsDraft[number], value: string | number) => {
    const next = draft.reviews.map((review, itemIndex) =>
      itemIndex === index ? { ...review, [key]: value } : review,
    );
    updateField('reviews', next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      ...restaurant,
      email: draft.reservationsEmail,
      homepageContent: draft,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none text-left">
      <div className="space-y-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl text-cream uppercase tracking-wide">
            Contenido de la Web
          </h2>
          <p className="text-xs text-cream/40 font-mono uppercase tracking-widest">
            Hero, video, galeria, mapa, reservas y textos visibles del homepage
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-none bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-xs uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer"
        >
          <Save size={14} />
          Guardar Contenido
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <MonitorPlay className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Hero y Video Principal
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Eyebrow</span>
              <input value={draft.heroEyebrow} onChange={(e) => updateField('heroEyebrow', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo hero</span>
              <input value={draft.heroTitle} onChange={(e) => updateField('heroTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripcion hero</span>
            <textarea value={draft.heroDescription} onChange={(e) => updateField('heroDescription', e.target.value)} rows={3} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Texto boton principal</span>
              <input value={draft.heroPrimaryCtaLabel} onChange={(e) => updateField('heroPrimaryCtaLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Texto boton secundario</span>
              <input value={draft.heroSecondaryCtaLabel} onChange={(e) => updateField('heroSecondaryCtaLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MediaUploadField
              label="URL video hero"
              value={draft.heroVideoUrl}
              onChange={(val) => updateField('heroVideoUrl', val)}
              accept="video/*"
              placeholder="Ej. /videomenu/hamburguesas/la_smashzilla.webm"
            />
            <MediaUploadField
              label="URL poster hero"
              value={draft.heroPosterUrl}
              onChange={(val) => updateField('heroPosterUrl', val)}
              accept="image/*"
              placeholder="Ej. /fotosmenu/Hamburguesas/lasmashzilla.webp"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {draft.heroHighlights.map((item, index) => (
              <label key={`hero-highlight-${index}`} className="space-y-1">
                <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Highlight {index + 1}</span>
                <input value={item} onChange={(e) => updateHighlight(index, e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
              </label>
            ))}
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <ImageIcon className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Galeria y Preview de Carta
            </h3>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Texto de entrada galeria</span>
            <textarea value={draft.galleryIntro} onChange={(e) => updateField('galleryIntro', e.target.value)} rows={2} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo preview menu</span>
              <input value={draft.visualMenuTitle} onChange={(e) => updateField('visualMenuTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">CTA principal preview</span>
              <input value={draft.visualMenuPrimaryCtaLabel} onChange={(e) => updateField('visualMenuPrimaryCtaLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripcion preview menu</span>
            <textarea value={draft.visualMenuDescription} onChange={(e) => updateField('visualMenuDescription', e.target.value)} rows={3} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
          </label>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">CTA secundario preview</span>
            <input value={draft.visualMenuSecondaryCtaLabel} onChange={(e) => updateField('visualMenuSecondaryCtaLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draft.galleryItems.map((item, index) => (
              <div key={item.id} className="border border-white/10 p-4 space-y-3">
                <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">Galeria {index + 1}</span>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Etiqueta</span>
                  <input value={item.label} onChange={(e) => updateGallery(index, 'label', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
                <MediaUploadField
                  label="URL imagen"
                  value={item.imageUrl}
                  onChange={(val) => updateGallery(index, 'imageUrl', val)}
                  accept="image/*"
                  placeholder="Ej. /fotosmenu/galeria-1.webp"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <MapPinned className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Mapa, Ubicacion y Reservas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo ubicacion</span>
              <input value={draft.locationTitle} onChange={(e) => updateField('locationTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Texto lugar</span>
              <input value={draft.locationPlaceLabel} onChange={(e) => updateField('locationPlaceLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL embed del mapa</span>
            <input value={draft.googleMapsEmbedUrl} onChange={(e) => updateField('googleMapsEmbedUrl', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            <span className="block text-[9px] text-cream/30 leading-relaxed pt-1">
              Por defecto se muestra un mapa que siempre funciona. Para usar Google: Google Maps → Compartir → &ldquo;Incorporar un mapa&rdquo; → copia el enlace de <code>src=&quot;...&quot;</code> (empieza por <code>https://www.google.com/maps/embed?pb=</code>) y pégalo aquí.
            </span>
          </label>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL abrir Google Maps</span>
            <input value={draft.googleMapsPlaceUrl} onChange={(e) => updateField('googleMapsPlaceUrl', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo reservas</span>
              <input value={draft.reservationsTitle} onChange={(e) => updateField('reservationsTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Email reservas</span>
              <input value={draft.reservationsEmail} onChange={(e) => updateField('reservationsEmail', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Canal de reserva</span>
              <input value={draft.reservationsChannelLabel} onChange={(e) => updateField('reservationsChannelLabel', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Bike className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Delivery
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo delivery</span>
              <input value={draft.deliveryTitle} onChange={(e) => updateField('deliveryTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripcion delivery</span>
              <input value={draft.deliveryDescription} onChange={(e) => updateField('deliveryDescription', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draft.deliveryPartners.map((partner, index) => (
              <div key={partner.id} className="border border-white/10 p-4 space-y-3">
                <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">Empresa {index + 1}</span>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Nombre</span>
                  <input value={partner.name} onChange={(e) => updateDeliveryPartner(index, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
                <MediaUploadField
                  label="URL logo"
                  value={partner.logoUrl}
                  onChange={(val) => updateDeliveryPartner(index, 'logoUrl', val)}
                  accept="image/*"
                  placeholder="Ej. /fotosmenu/ubereats.webp"
                />
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">URL pedido</span>
                  <input value={partner.orderUrl} onChange={(e) => updateDeliveryPartner(index, 'orderUrl', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Star className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              ReseÃ±as Dinamicas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Titulo reseÃ±as</span>
              <input value={draft.reviewsTitle} onChange={(e) => updateField('reviewsTitle', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Descripcion reseÃ±as</span>
              <input value={draft.reviewsDescription} onChange={(e) => updateField('reviewsDescription', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {draft.reviews.map((review, index) => (
              <div key={review.id} className="border border-white/10 p-4 space-y-3">
                <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">ReseÃ±a {index + 1}</span>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Nombre</span>
                  <input value={review.name} onChange={(e) => updateReview(index, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Detalle</span>
                  <input value={review.detail} onChange={(e) => updateReview(index, 'detail', e.target.value)} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Puntuacion</span>
                  <input type="number" min={1} max={5} value={review.rating} onChange={(e) => updateReview(index, 'rating', Number(e.target.value))} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold" />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Texto</span>
                  <textarea value={review.quote} onChange={(e) => updateReview(index, 'quote', e.target.value)} rows={4} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Quote className="text-primary" size={18} />
            <h3 className="font-display font-black text-sm text-cream uppercase tracking-wider">
              Cierre de Marca
            </h3>
          </div>

          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Frase principal</span>
            <textarea value={draft.brandQuoteText} onChange={(e) => updateField('brandQuoteText', e.target.value)} rows={2} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
          </label>
          <label className="space-y-1 block">
            <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest">Frase destacada</span>
            <textarea value={draft.brandQuoteAccent} onChange={(e) => updateField('brandQuoteAccent', e.target.value)} rows={2} className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream p-4 text-xs focus:outline-none resize-none font-semibold" />
          </label>
        </section>
      </div>
    </form>
  );
};

export default HomepageContentManager;
