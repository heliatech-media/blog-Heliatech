"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { translations, Locale } from '@/lib/translations';

export interface ArticlePreview {
  slug: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  readingTime?: string;
  tags?: string[];
  image?: string;
}

interface InteractiveExplorerProps {
  articles: ArticlePreview[];
  locale?: Locale;
}

export default function InteractiveExplorer({ articles, locale = 'fr' }: InteractiveExplorerProps) {
  const [selectedCat, setSelectedCat] = useState('all');
  const t = translations[locale].interactiveExplorer;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  const categories = [
    { id: 'all', label: t.allFlows },
    { id: 'Agents', label: t.agentsLlm },
    { id: 'Business', label: t.businessMonetization },
    { id: 'Tech', label: t.hardwareCode },
    { id: 'Futur', label: t.agiFuturism },
  ];

  const filteredArticles = articles.filter((article) => {
    if (selectedCat === 'all') return true;
    const cat = (article.category || '').toLowerCase();
    const tags = (article.tags || []).map(tag => tag.toLowerCase());
    const title = (article.title || '').toLowerCase();

    if (selectedCat === 'Agents') {
      return cat.includes('agent') || cat.includes('ia') || tags.some(tag => tag.includes('agent') || tag.includes('llm')) || title.includes('agent') || title.includes('chatgpt');
    }
    if (selectedCat === 'Business') {
      return cat.includes('business') || cat.includes('travail') || tags.some(tag => tag.includes('business') || tag.includes('trading') || tag.includes('créat') || tag.includes('creator')) || title.includes('€') || title.includes('$') || title.includes('business');
    }
    if (selectedCat === 'Tech') {
      return cat.includes('tech') || cat.includes('code') || tags.some(tag => tag.includes('hardware') || tag.includes('code') || tag.includes('puce') || tag.includes('chip')) || title.includes('code') || title.includes('nvidia') || title.includes('quantique') || title.includes('quantum');
    }
    if (selectedCat === 'Futur') {
      return cat.includes('futur') || tags.some(tag => tag.includes('agi') || tag.includes('robot') || tag.includes('transhum')) || title.includes('agi') || title.includes('robot') || title.includes('cerveau') || title.includes('brain');
    }
    return true;
  }).slice(0, 6);

  return (
    <section id="explorer" className="mb-24 md:mb-36">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>{t.badge}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{t.titleHighlight}</span>
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none select-none">
          {categories.map((cat) => {
            const isActive = selectedCat === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20 scale-105'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Filtered Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}${langQuery}`} className="block h-full group">
            <SpotlightCard className="h-full flex flex-col justify-between p-6 sm:p-7 border border-white/10 bg-zinc-950/80 hover:border-cyan-500/30 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                    {article.category || 'IA'}
                  </span>
                  <span className="text-zinc-500 text-xs flex items-center gap-1 font-medium">
                    <Clock size={12} /> {article.readingTime || '8 min'}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                  {article.title}
                </h4>

                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light mb-6">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-cyan-400 transition-colors">
                <span>{t.readArticle}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
