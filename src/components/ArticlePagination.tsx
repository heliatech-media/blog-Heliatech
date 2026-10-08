import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ArticleData } from '@/lib/articles';
import { translations, Locale } from '@/lib/translations';

interface ArticlePaginationProps {
  prevArticle?: ArticleData | null;
  nextArticle?: ArticleData | null;
  locale?: Locale;
}

export default function ArticlePagination({ prevArticle, nextArticle, locale = 'fr' }: ArticlePaginationProps) {
  if (!prevArticle && !nextArticle) return null;
  const t = translations[locale].pagination;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  return (
    <nav aria-label="Navigation entre articles" className="my-12 pt-8 border-t border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Article */}
        {prevArticle ? (
          <Link
            href={`/articles/${prevArticle.slug}${langQuery}`}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors mb-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t.prev}</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
              {prevArticle.title}
            </h4>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next Article */}
        {nextArticle ? (
          <Link
            href={`/articles/${nextArticle.slug}${langQuery}`}
            className="group relative flex flex-col justify-between items-start sm:items-end text-left sm:text-right p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors mb-2">
              <span>{t.next}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
              {nextArticle.title}
            </h4>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
