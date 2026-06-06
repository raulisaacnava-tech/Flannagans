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
import { DeliverySection } from '@/components/home/DeliverySection';
import { FlanaCoinsBlock } from '@/components/home/FlanaCoinsBlock';
import { GallerySection } from '@/components/home/GallerySection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ReservationsSection } from '@/components/home/ReservationsSection';
import { LocationSection } from '@/components/home/LocationSection';
import { BrandQuote } from '@/components/home/BrandQuote';

export default function HomePage() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Flanagans Burguer",
    url: "https://flannagans.vercel.app",
    image: "https://flannagans.vercel.app/logo.webp",
    servesCuisine: ["Hamburguesas", "Comida americana"],
    priceRange: "EUR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mostoles",
      addressCountry: "ES",
    },
    hasMenu: "https://flannagans.vercel.app/menu",
  };

  return (
    <div className="min-h-screen bg-[#050505] text-cream selection:bg-primary selection:text-secondary font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <SiteHeader />
      
      <main>
        <HomeHero />
        <NoComplicationsBlock />
        <FeaturedBurgerSection />
        <BurgerShowcase />
        <PromoPosters />
        <VisualMenuPreview />
        <DeliverySection />
        <FlanaCoinsBlock />
        <GallerySection />
        <ReviewsSection />
        <ReservationsSection />
        <LocationSection />
        <BrandQuote />
      </main>

      <SiteFooter />
    </div>
  );
}
