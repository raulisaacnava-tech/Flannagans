'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurant } from '@/lib/use-restaurant';

export const ReviewsSection: React.FC = () => {
  const restaurant = useRestaurant();
  const content = restaurant.homepageContent!;

  return (
    <section id="reviews" className="bg-[#050505] py-24 text-cream md:py-32">
      <div className="site-container">
        <div className="mb-12 grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] md:items-end">
          <div>
            <h2 className="font-display text-[clamp(2.8rem,10vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] [text-wrap:balance]">
              {content.reviewsTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-relaxed text-cream/58 md:text-base">
            {content.reviewsDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {content.reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.38, delay: index * 0.06 }}
              className="flex min-h-[18rem] flex-col justify-between border border-white/10 bg-[#0A0A0A] p-6"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: Math.max(1, Math.min(5, review.rating)) }).map((_, starIndex) => (
                    <Star key={`${review.id}-star-${starIndex}`} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-lg font-display font-black uppercase leading-tight tracking-[0.02em] text-cream">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <footer className="mt-8 border-t border-white/10 pt-4">
                <p className="font-display text-sm font-black uppercase tracking-[0.12em] text-primary">{review.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-cream/35">{review.detail}</p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
