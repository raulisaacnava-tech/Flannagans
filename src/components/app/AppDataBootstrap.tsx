'use client';

import { useEffect } from 'react';
import { bootstrapSupabaseToLocal } from '@/lib/supabase-sync';

export const AppDataBootstrap = () => {
  useEffect(() => {
    void bootstrapSupabaseToLocal();
  }, []);

  return null;
};
