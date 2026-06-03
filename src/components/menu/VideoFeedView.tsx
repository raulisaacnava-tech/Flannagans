'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Eye, Flame, Volume2, VolumeX } from 'lucide-react';
import { Product } from '@/types/menu';
import { FavoriteButton } from './FavoriteButton';

export const VideoFeedView: React.FC<{
  products: Product[];
  onViewDetails: (product: Product) => void;
}> = ({ products, onViewDetails }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  const feedProducts = [...products].filter((p) => p.isAvailable).sort((a, b) => {
    if (a.videoUrl && !b.videoUrl) return -1;
    if (!a.videoUrl && b.videoUrl) return 1;
    return a.displayOrder - b.displayOrder;
  });

  const handleScroll = () => {
    if (!feedRef.current) return;
    const { scrollTop, clientHeight } = feedRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeSlide && index >= 0 && index < feedProducts.length) {
      setActiveSlide(index);
    }
  };

  useEffect(() => {
    setActiveSlide(0);
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [products]);

  if (feedProducts.length === 0) {
    return (
      <div className="absolute inset-0 z-20 bg-black flex items-center justify-center p-8 text-center">
        <p className="text-cream/58 text-sm font-semibold uppercase tracking-[0.12em]">
          No hay platos disponibles en esta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 bg-black">
      <button
        onClick={() => setIsMuted((muted) => !muted)}
        className="absolute top-4 right-4 p-3 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white border border-white/15 z-40 transition-colors duration-[160ms] pressable"
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar video'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {feedProducts.map((product, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={product.id}
              className="w-full h-full snap-start relative flex flex-col justify-end p-6 pb-28"
            >
              <div className="absolute inset-0 z-0 bg-black">
                {product.videoUrl ? (
                  <video
                    src={isActive ? product.videoUrl : undefined}
                    poster={product.posterImage || product.imageUrl}
                    autoPlay={isActive}
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="100vw"
                    priority={isActive}
                    className={`object-cover ${isActive ? 'animate-cinematic' : ''}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/42 to-black/8 opacity-95" />
                <div className="absolute inset-0 hero-fire-wash opacity-35" />
              </div>

              <div className="relative z-10 w-full pr-16">
                {product.isCampaign && product.campaignLabel && (
                  <div className="inline-flex mb-3 items-center gap-1.5 bg-primary text-secondary font-display font-black text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full shadow-[0_0_24px_rgb(250_204_21_/_0.18)]">
                    <Flame size={12} className="fill-secondary" />
                    {product.campaignLabel}
                  </div>
                )}

                <h3 className="font-display font-black text-3xl text-white uppercase tracking-normal leading-none mb-2 drop-shadow-xl [text-wrap:balance]">
                  {product.name}
                </h3>
                <p className="text-white/82 text-sm font-medium line-clamp-2 drop-shadow-md mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="font-display font-black text-primary text-2xl drop-shadow-md">
                  {product.price.toFixed(2)} EUR
                </div>
              </div>

              <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-6">
                <div className="p-3.5 rounded-full bg-black/45 border border-white/15 backdrop-blur-md">
                  <FavoriteButton productId={product.id} size={24} />
                </div>
                <button
                  onClick={() => onViewDetails(product)}
                  className="w-14 h-14 rounded-full bg-black/45 text-cream border border-white/15 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-secondary hover:border-primary transition-colors duration-[160ms] pressable"
                  aria-label="Ver detalles"
                >
                  <Eye size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
