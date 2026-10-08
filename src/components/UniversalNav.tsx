"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { translations, Locale } from '@/lib/translations';

interface UniversalNavProps {
  locale?: Locale;
}

export default function UniversalNav({ locale: propLocale }: UniversalNavProps) {
  const searchParams = useSearchParams();
  const locale: Locale = propLocale || (searchParams?.get('lang') === 'en' ? 'en' : 'fr');
  const t = translations[locale].nav;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5 transition-all">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href={`/${langQuery}`} className="text-xl sm:text-2xl font-black tracking-tight uppercase flex items-center gap-2">
          HELIA <span className="text-cyan-400">TECH</span>
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full inline-block animate-pulse" />
        </Link>
        
        {/* Center Desktop Links */}
        <div className="space-x-6 sm:space-x-8 hidden sm:flex font-bold text-xs uppercase tracking-widest text-zinc-400 items-center">
          <Link href={`/articles${langQuery}`} className="hover:text-cyan-400 transition-colors">
            {t.analyses}
          </Link>
          <Link 
            href={`/ai-labs${langQuery}`} 
            className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.aiLabs}</span>
          </Link>
          <Link href={`/#enquetes${langQuery}`} className="hover:text-cyan-400 transition-colors">
            {t.dossiers}
          </Link>
          <Link href={`/#newsletter${langQuery}`} className="hover:text-cyan-400 transition-colors">
            {t.newsletter}
          </Link>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Switcher [FR | EN] */}
          <React.Suspense fallback={<div className="w-16 h-6 rounded-full bg-white/5 animate-pulse" />}>
            <LanguageSwitcher currentLocale={locale} />
          </React.Suspense>

          <Link 
            href={`/ai-labs${langQuery}`} 
            className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold uppercase tracking-wider text-cyan-400 hover:bg-cyan-500/20 transition-all sm:hidden flex items-center gap-1 whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            LABS
          </Link>
          <Link 
            href={`/articles${langQuery}`} 
            className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-zinc-300 hover:bg-white/20 transition-all sm:hidden whitespace-nowrap"
          >
            {t.articlesMobile}
          </Link>
          <Link 
            href={`/#newsletter${langQuery}`} 
            className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/20 transition-all hidden sm:inline-flex"
          >
            {t.subscribe}
          </Link>
        </div>
      </div>
    </nav>
  );
}
