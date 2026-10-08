"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { ArticleData } from '@/lib/articles';
import { translations, Locale } from '@/lib/translations';

interface ArticlesExplorerProps {
  articles: ArticleData[];
  locale?: Locale;
}

export default function ArticlesExplorer({ articles, locale: propLocale }: ArticlesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const searchParams = useSearchParams();
  const locale: Locale = propLocale || (searchParams?.get('lang') === 'en' ? 'en' : 'fr');
  const t = translations[locale].explorer;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => {
      if (a.tags) {
        a.tags.forEach(t => set.add(t));
      }
    });
    return Array.from(set).slice(0, 10);
  }, [articles]);

  // Filter articles by query and tag
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(q)));

      const matchesTag = selectedTag === 'all' || 
        (article.tags && article.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  return (
    <div>
      {/* Search Bar + Filters */}
      <div className="mb-12 space-y-5">
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
          <button
            type="button"
            onClick={() => setSelectedTag('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white'
            }`}
          >
            {t.all} ({articles.length})
          </button>

          {allTags.map((tag) => {
            const count = articles.filter(a => a.tags && a.tags.includes(tag)).length;
            const isActive = selectedTag === tag;
            return (
              <button
                type="button"
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white'
                }`}
              >
                {tag} <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>{filteredArticles.length} {t.resultsFound}</span>
        {(searchQuery || selectedTag !== 'all') && (
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            {t.resetFilters}
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <p className="text-zinc-400 text-base mb-3">{t.noResults} "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
            className="px-4 py-2 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            {t.showAll}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}${langQuery}`}
              className="group block rounded-2xl border border-white/10 bg-zinc-950/60 p-6 hover:border-cyan-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Cover Image */}
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-white/5 text-zinc-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 font-light leading-relaxed mb-6">
                  {article.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-zinc-400" />
                  {article.readingTime || '5 MIN'} {t.readTime}
                </span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans font-bold uppercase tracking-wider text-[11px]">
                  {t.read} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
