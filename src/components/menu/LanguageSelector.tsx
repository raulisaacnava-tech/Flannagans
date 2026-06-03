'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  code: string;
  label: string;
  googleCode: string;
  flag: string;
  rtl?: boolean;
}

const LANGUAGES: Language[] = [
  { code: 'es', label: 'Español', googleCode: 'es', flag: '🇪🇸' },
  { code: 'en', label: 'English', googleCode: 'en', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', googleCode: 'pt', flag: '🇵🇹' },
  { code: 'it', label: 'Italiano', googleCode: 'it', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', googleCode: 'fr', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', googleCode: 'ar', flag: '🇸🇦', rtl: true },
];

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (opts: object, id: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function triggerGoogleTranslate(targetLang: string) {
  // Find the Google Translate select element and change it
  const iframe = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement;
  if (iframe) iframe.style.display = 'none';
  document.body.style.top = '0px';

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = targetLang;
    select.dispatchEvent(new Event('change'));
    return;
  }

  // Fallback: use Google Translate cookie approach
  if (targetLang === 'es') {
    // Clear translation (restore to original)
    const cookie = document.cookie;
    if (cookie.includes('googtrans')) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=' + location.hostname;
      location.reload();
    }
  } else {
    document.cookie = `googtrans=/es/${targetLang}`;
    document.cookie = `googtrans=/es/${targetLang}; domain=${location.hostname}`;
    location.reload();
  }
}

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Detect active Google Translate language from cookie
  useEffect(() => {
    const cookie = document.cookie;
    const match = cookie.match(/googtrans=\/es\/([a-z]+)/);
    if (match) {
      const found = LANGUAGES.find(l => l.googleCode === match[1]);
      if (found) setCurrentLang(found);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
    triggerGoogleTranslate(lang.googleCode);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(v => !v)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-cream/60 hover:text-primary transition-colors rounded-lg"
        aria-label="Seleccionar idioma"
      >
        <Globe size={17} />
        <span className="text-[11px] font-bold font-mono">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 bg-[#161616] border border-white/10 shadow-2xl shadow-black/60 z-[999] overflow-hidden rounded-xl"
          >
            <div className="py-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    currentLang.code === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-cream/70 hover:bg-white/5 hover:text-cream'
                  }`}
                  dir={lang.rtl ? 'rtl' : 'ltr'}
                >
                  <span className="text-base shrink-0">{lang.flag}</span>
                  <span className={`text-sm font-medium flex-grow ${lang.rtl ? 'text-right' : ''}`}>
                    {lang.label}
                  </span>
                  {currentLang.code === lang.code && (
                    <Check size={13} className="shrink-0 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
