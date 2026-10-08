import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { ArticleData } from '@/lib/articles';
import SpotlightCard from './SpotlightCard';
import { translations, Locale } from '@/lib/translations';

interface RelatedArticlesProps {
  articles: ArticleData[];
  locale?: Locale;
}

export default function RelatedArticles({ articles, locale = 'fr' }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;
  const t = translations[locale].articleDetail;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  return (
    <section className="my-16 pt-12 border-t border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{t.keepReading}</span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
            {t.readNext}
          </h3>
        </div>
        <Link href={`/articles${langQuery}`} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
          <span>{t.allArticles}</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}${langQuery}`} className="block h-full group">
            <SpotlightCard className="h-full flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-zinc-950/80 hover:border-cyan-500/30 transition-all">
              <div>
                {article.tags && article.tags.length > 0 && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 mb-3 border border-cyan-400/20">
                    {article.tags[0]}
                  </span>
                )}
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-zinc-400 text-xs line-clamp-2 font-light leading-relaxed mb-4">
                  {article.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-cyan-400">
                <span className="flex items-center gap-1"><Clock size={11} /> {article.readingTime || '8 min'}</span>
                <span className="flex items-center gap-1">Lire <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
