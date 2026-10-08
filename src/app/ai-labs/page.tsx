import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSortedArticlesData } from '@/lib/articles';
import { ArrowLeft, Cpu, Terminal, DollarSign, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import Footer from '@/components/Footer';
import UniversalNav from '@/components/UniversalNav';
import BlueprintGenerator from '@/components/BlueprintGenerator';
import { translations, Locale } from '@/lib/translations';

export const metadata = {
  title: "HELIA Labs | HELIA TECH — Blueprints, Architectures & Ingénierie des Agents",
  description: "Accédez aux blueprints d'ingénierie avancés, architectures multi-agents de production, prompts XML certifiés et stratégies d'optimisation de tokens.",
};

export const instant = false;

export default async function AILabsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const locale: Locale = resolvedSearchParams?.lang === 'en' ? 'en' : 'fr';
  const t = translations[locale].aiLabsPage;
  const langQuery = locale === 'en' ? '?lang=en' : '';
  const allArticles = getSortedArticlesData(locale);
  
  // Strictly filter articles dedicated ONLY to AI LABS Masterclasses
  const labArticles = allArticles.filter(a => 
    a.category?.toUpperCase() === 'AI LABS' || a.slug.startsWith('21-') || a.slug.startsWith('22-')
  );

  const featuredBlueprint = labArticles.find(a => a.slug === '21-empire-3-agents') || labArticles[0];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col justify-between">
      {/* Background Tech Glow & Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[20%] w-[50%] h-[40%] bg-cyan-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/15 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation */}
      <UniversalNav locale={locale} />

      {/* Main Content */}
      <main className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 pt-28 sm:pt-36 pb-24 w-full">
        
        {/* Hero Section */}
        <header className="mb-14 sm:mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.subtitle}</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase mb-6 leading-none">
            HELIA <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Labs</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed mb-8">
            {t.description}
          </p>

          {/* Pillars Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Cpu className="text-cyan-400 shrink-0" size={20} />
              <div>
                <div className="text-xs font-bold text-white uppercase">{t.pillars.architectures}</div>
                <div className="text-[11px] text-zinc-500">{t.pillars.architecturesDesc}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Terminal className="text-teal-400 shrink-0" size={20} />
              <div>
                <div className="text-xs font-bold text-white uppercase">{t.pillars.code}</div>
                <div className="text-[11px] text-zinc-500">{t.pillars.codeDesc}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <DollarSign className="text-emerald-400 shrink-0" size={20} />
              <div>
                <div className="text-xs font-bold text-white uppercase">{t.pillars.tokenomics}</div>
                <div className="text-[11px] text-zinc-500">{t.pillars.tokenomicsDesc}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="text-indigo-400 shrink-0" size={20} />
              <div>
                <div className="text-xs font-bold text-white uppercase">{t.pillars.zeroHallucination}</div>
                <div className="text-[11px] text-zinc-500">{t.pillars.zeroHallucinationDesc}</div>
              </div>
            </div>
          </div>
        </header>

        <BlueprintGenerator />

        {/* Featured Master Blueprint */}
        {featuredBlueprint && (
          <section className="mb-16 sm:mb-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  {t.featuredBadge}
                </h2>
              </div>
              <span className="text-xs font-mono uppercase text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                {t.readyBadge}
              </span>
            </div>

            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-zinc-950 via-[#0a101d] to-zinc-950 p-6 sm:p-10 relative overflow-hidden group hover:border-cyan-500/60 transition-all duration-500 shadow-2xl shadow-cyan-950/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold">
                      BLUEPRINT #01
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs">
                      {featuredBlueprint.readingTime || '12 MIN'} {t.readTime}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      {locale === 'en' ? 'Cost: < $0.40/day' : 'Coût : < 0,40$/jour'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                    <Link href={`/articles/${featuredBlueprint.slug}${langQuery}`}>
                      {featuredBlueprint.title}
                    </Link>
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                    {featuredBlueprint.description}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={`/articles/${featuredBlueprint.slug}${langQuery}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-black text-xs uppercase tracking-wider hover:bg-cyan-300 hover:scale-[1.02] transition-all shadow-lg shadow-cyan-400/20"
                    >
                      {t.openBlueprint} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Blueprint Terminal Preview */}
                <div className="lg:col-span-5 bg-black/80 rounded-2xl border border-white/10 p-5 font-mono text-xs text-zinc-300 shadow-inner">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-zinc-500 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      <span className="ml-2 text-zinc-400">financial_crew.py</span>
                    </span>
                    <span className="text-cyan-400">Python 3.11</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-zinc-300">
                    <code>
{`from crewai import Agent, Task, Crew

scout = Agent(
    role="Financial Ingestion Analyst",
    goal="10-K extraction with zero hallucination",
    llm=ChatOpenAI(model="gpt-4o-mini")
)

quant = Agent(
    role="Quantitative Strategist",
    goal="Ratio modeling & scenario forecast",
    llm=ChatOpenAI(model="gpt-4o")
)

auditor = Agent(
    role="Chief Risk Auditor",
    goal="Strict compliance certification",
    llm=ChatOpenAI(model="gpt-4o-mini")
)

# Operational cost: < $0.38/day (100 runs)`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Engineering Guides & Blueprints Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              {t.allBlueprints}
            </h2>
            <span className="text-zinc-500 text-xs font-mono">
              {labArticles.length} {t.available}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labArticles.map((article) => (
              <article 
                key={article.slug}
                className="group rounded-3xl border border-white/10 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-zinc-900/40 transition-all duration-300"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 border border-white/5 bg-zinc-900">
                    <Image
                      src={article.image || '/images/covers/sujet-1.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-cyan-400 font-mono text-[10px] uppercase font-bold">
                        {article.category || 'AI LABS'}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-zinc-500 mb-2">
                    {article.date} • {article.readingTime || '8 MIN'} {t.readTime}
                  </div>

                  <h3 className="text-lg font-black text-white uppercase group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                    <Link href={`/articles/${article.slug}${langQuery}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-3 font-light leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/articles/${article.slug}${langQuery}`} 
                    className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    {t.readAction} <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="mt-12">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h4 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                {locale === 'en' ? 'Get Direct Access to Our Blueprint Vault' : 'Accédez à notre coffre de Blueprints en direct.'}
              </h4>
              <p className="text-zinc-400 text-sm font-light">
                {locale === 'en' 
                  ? 'Weekly: 1 production Python agent architecture with strict token optimization and zero hallucination schemas.' 
                  : 'Chaque semaine : 1 architecture d’agents Python de niveau entreprise avec nos schémas XML et optimisations de coûts.'}
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
