import React from 'react';
import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/articles';
import ArticlesExplorer from '@/components/ArticlesExplorer';
import SubscribeForm from '@/components/SubscribeForm';
import Footer from '@/components/Footer';
import UniversalNav from '@/components/UniversalNav';
import { translations, Locale } from '@/lib/translations';

export const metadata = {
  title: "Toutes les Analyses & Articles | HELIA TECH",
  description: "Explorez l'intégralité de nos analyses de fond, enquêtes et blueprints sur l'intelligence artificielle.",
};

export const instant = false;

export default async function AllArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const locale: Locale = resolvedSearchParams?.lang === 'en' ? 'en' : 'fr';
  const t = translations[locale].articlesPage;
  const allArticles = getSortedArticlesData(locale);
  // Strictly filter out AI LABS masterclasses from standard articles
  const articles = allArticles.filter(a => a.category?.toUpperCase() !== 'AI LABS' && !a.slug.startsWith('21-'));

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col justify-between">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[30%] bg-cyan-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] bg-indigo-950/20 rounded-full blur-[140px]" />
      </div>

      {/* Navigation */}
      <UniversalNav locale={locale} />

      {/* Main Content */}
      <main className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 pt-28 sm:pt-32 pb-24 w-full">
        <header className="mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
            {t.tagline}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tight text-white uppercase">
            {t.title} <span className="text-zinc-600 font-mono text-2xl sm:text-4xl">({articles.length})</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl">
            {t.description}
          </p>
        </header>

        {/* Live Filter & Search Explorer */}
        <ArticlesExplorer articles={articles} locale={locale} />

        {/* Newsletter Section */}
        <section id="newsletter" className="mt-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h4 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                {t.newsletterTitle}
              </h4>
              <p className="text-zinc-400 text-sm font-light">
                {t.newsletterDesc}
              </p>
            </div>
            <div className="lg:w-1/2 w-full max-w-md">
              <SubscribeForm variant="home" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}
