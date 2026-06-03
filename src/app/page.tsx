import React from 'react';

// Layout Components
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

// Home Sections
import { HomeHero } from '@/components/home/HomeHero';
import { NoComplicationsBlock } from '@/components/home/NoComplicationsBlock';
import { FeaturedBurgerSection } from '@/components/home/FeaturedBurgerSection';
import { BurgerShowcase } from '@/components/home/BurgerShowcase';
import { PromoPosters } from '@/components/home/PromoPosters';
import { VisualMenuPreview } from '@/components/home/VisualMenuPreview';
import { FlanaCoinsBlock } from '@/components/home/FlanaCoinsBlock';
import { GallerySection } from '@/components/home/GallerySection';
import { ReservationsSection } from '@/components/home/ReservationsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { BrandQuote } from '@/components/home/BrandQuote';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-cream selection:bg-primary selection:text-secondary font-sans overflow-x-hidden">
      <SiteHeader />
      
      <main>
        <HomeHero />
        <NoComplicationsBlock />
        <FeaturedBurgerSection />
        <BurgerShowcase />
        <PromoPosters />
        <VisualMenuPreview />
        <FlanaCoinsBlock />
        <GallerySection />
        <ReservationsSection />
        <LocationSection />
        <BrandQuote />
      </main>

      <SiteFooter />
    </div>
  );
}
