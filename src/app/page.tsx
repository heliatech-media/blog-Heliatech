import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Flame, Sparkles, TrendingUp } from 'lucide-react';
import { getSortedArticlesData } from '@/lib/articles';
import SpotlightCard from '@/components/SpotlightCard';
import BreakingTicker from '@/components/BreakingTicker';
import CompactVideoTeaser from '@/components/CompactVideoTeaser';
import InteractiveExplorer from '@/components/InteractiveExplorer';
import SubscribeForm from '@/components/SubscribeForm';
import Footer from '@/components/Footer';
import UniversalNav from '@/components/UniversalNav';
import { translations, Locale } from '@/lib/translations';

export const instant = false;

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const locale: Locale = resolvedSearchParams?.lang === 'en' ? 'en' : 'fr';
  const t = translations[locale].home;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  const articles = getSortedArticlesData(locale);
  const leadArticle = articles.length > 0 ? articles[0] : null;
  const sideArticles = articles.slice(1, 4); // 3 trending articles
  const deepDives = articles.slice(4, 10);   // 6 deep dive investigative articles
  const tickerItems = articles.slice(0, 10).map(a => ({
    title: a.title,
    slug: a.slug,
    category: a.category || (a.tags && a.tags[0]) || 'TECH'
  }));

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col justify-between">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[30%] bg-cyan-950/20 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[35%] h-[35%] bg-indigo-950/20 rounded-full blur-[140px]" />
      </div>

      {/* Universal Navigation */}
      <UniversalNav locale={locale} />

      {/* Breaking Ticker Header */}
      <div className="pt-14 sm:pt-14">
        <BreakingTicker items={tickerItems} />
      </div>

      {/* Main Newspaper / Editorial Layout */}
      <main className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 pt-6 sm:pt-10 pb-20 w-full">
        
        {/* Newspaper Grid: Lead Story (7 cols) + Right Column (5 cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24 pb-12 border-b border-white/10">
          
          {/* LEFT: Grand Article d'Investigation (À la une) */}
          {leadArticle && (
            <div className="lg:col-span-8 flex flex-col justify-between">
              <Link href={`/articles/${leadArticle.slug}${langQuery}`} className="group block">
                <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-zinc-950">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-400 text-black text-[11px] font-black uppercase tracking-wider">
                      {t.leadBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 text-[11px] font-mono border border-white/10">
                      {leadArticle.readingTime || '8 MIN'}
                    </span>
                  </div>

                  {leadArticle.image ? (
                    <img 
                      src={leadArticle.image} 
                      alt={leadArticle.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-950/40 to-black" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                    <span>{leadArticle.category || 'EXCLUSIVE REPORT'}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{leadArticle.date}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight group-hover:text-cyan-300 transition-colors">
                    {leadArticle.title}
                  </h1>

                  <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed line-clamp-3">
                    {leadArticle.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 pt-2">
                    <span>{t.viewArticle}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* RIGHT: En continu + Vidéo Compacte + Articles Chauds */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
            
            {/* Teaser Vidéo Compact */}
            <CompactVideoTeaser locale={locale} />

            {/* Trending Articles List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <Flame size={14} className="text-orange-400" />
                <span>{t.trendingBadge}</span>
              </div>

              <div className="divide-y divide-white/5 space-y-4">
                {sideArticles.map((article) => (
                  <Link 
                    key={article.slug} 
                    href={`/articles/${article.slug}${langQuery}`}
                    className="block group pt-4 first:pt-0"
                  >
                    <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase mb-1">
                      <span>{article.category || 'TECH'}</span>
                      <span>•</span>
                      <span className="text-zinc-500">{article.readingTime || '5 MIN'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mini Newsletter Box */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                Newsletter
              </span>
              <p className="text-xs text-zinc-400 font-light mb-4">
                Recevez chaque semaine nos synthèses d'ingénierie et d'automatisation.
              </p>
              <SubscribeForm variant="home" />
            </div>

          </div>
        </section>

        {/* Section: Radar / Filtrage thématique interactif */}
        <div id="explorer">
          <InteractiveExplorer articles={articles} locale={locale} />
        </div>

        {/* Section: Analyses de Fond / Deep Dives Grid */}
        <section id="enquetes" className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                {t.deepDivesBadge}
              </h2>
            </div>
            <Link 
              href={`/articles${langQuery}`} 
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>{t.allArticlesCta} ({articles.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deepDives.map((article) => (
              <Link 
                key={article.slug} 
                href={`/articles/${article.slug}${langQuery}`}
                className="group block rounded-2xl border border-white/10 bg-zinc-950/60 p-5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-zinc-900 relative">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-950/30 to-black" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase mb-2">
                    <span>{article.category || 'IA'}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{article.readingTime || '6 MIN'}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-2 font-light leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-cyan-400">
                  <span>{t.viewArticle}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}
