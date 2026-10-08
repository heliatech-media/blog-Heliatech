"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale?: 'fr' | 'en';
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const searchParams = useSearchParams();

  const activeLang: 'fr' | 'en' =
    currentLocale ?? (searchParams?.get('lang') === 'en' ? 'en' : 'fr');

  function switchLanguage(targetLang: 'fr' | 'en') {
    // Persist language preference
    try {
      document.cookie = `NEXT_LOCALE=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (_) { /* ignore in SSR guard */ }

    // Build target URL
    const params = new URLSearchParams(window.location.search);
    if (targetLang === 'en') {
      params.set('lang', 'en');
    } else {
      params.delete('lang');
    }
    const qs = params.toString() ? `?${params.toString()}` : '';
    const target = `${window.location.pathname}${qs}`;

    // Direct navigation — no React transition wrapper
    window.location.href = target;
  }

  return (
    <div
      className="inline-flex items-center rounded-full bg-white/[0.08] border border-white/10 p-0.5 sm:p-1 font-mono"
      style={{ touchAction: 'manipulation' }}
    >
      <button
        type="button"
        onPointerUp={() => switchLanguage('fr')}
        className={[
          'px-3 py-1.5 rounded-full transition-colors font-bold text-xs leading-none',
          activeLang === 'fr'
            ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]'
            : 'text-zinc-300 hover:text-white hover:bg-white/10',
        ].join(' ')}
        aria-label="Passer en Français"
        aria-pressed={activeLang === 'fr'}
      >
        FR
      </button>

      <span className="text-zinc-600 px-0.5 pointer-events-none" aria-hidden>•</span>

      <button
        type="button"
        onPointerUp={() => switchLanguage('en')}
        className={[
          'px-3 py-1.5 rounded-full transition-colors font-bold text-xs leading-none',
          activeLang === 'en'
            ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]'
            : 'text-zinc-300 hover:text-white hover:bg-white/10',
        ].join(' ')}
        aria-label="Switch to English"
        aria-pressed={activeLang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
