import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { getArticleData, getSortedArticlesData } from '@/lib/articles';
import ProgressBar from '@/components/ProgressBar';
import AdSlot from '@/components/AdSlot';
import SubscribeForm from '@/components/SubscribeForm';
import ShareBar from '@/components/ShareBar';
import ArticleReactions from '@/components/ArticleReactions';
import RelatedArticles from '@/components/RelatedArticles';
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer';
import UniversalNav from '@/components/UniversalNav';
import ArticlePagination from '@/components/ArticlePagination';
import PremiumContent from '@/components/PremiumContent';
import { translations, Locale } from '@/lib/translations';
import { recordArticleView } from '@/lib/analytics';

import type { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getSortedArticlesData();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const locale: Locale = resolvedSearchParams?.lang === 'en' ? 'en' : 'fr';
  
  let article;
  try {
    article = await getArticleData(slug, locale);
  } catch {
    article = await getArticleData(slug, 'fr');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helia.media';
  const url = `${siteUrl}/articles/${slug}${locale === 'en' ? '?lang=en' : ''}`;
  const imageUrl = article.image ? `${siteUrl}${article.image}` : `${siteUrl}/og-image.jpg`;

  return {
    title: `${article.title} | HELIA TECH`,
    description: article.description,
    authors: [{ name: article.author || 'HELIA TECH' }],
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: 'HELIA TECH',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author || 'HELIA TECH'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@HELIA_Media',
      creator: '@HELIA_Media',
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export const instant = false;

export default async function ArticlePage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const locale: Locale = resolvedSearchParams?.lang === 'en' ? 'en' : 'fr';
  const t = translations[locale].articleDetail;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  let article;
  try {
    article = await getArticleData(slug, locale);
  } catch {
    article = await getArticleData(slug, 'fr');
  }

  const allArticles = getSortedArticlesData(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helia.media';

  // JSON-LD Schema.org TechArticle
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    image: article.image ? `${siteUrl}${article.image}` : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author || 'HELIA TECH',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HELIA TECH',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/covers/sujet-1.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${slug}`,
    },
    keywords: article.tags ? article.tags.join(', ') : 'IA, Automatisation',
  };

  // Partition by category so AI LABS masterclasses cycle together, and standard articles cycle together
  const isAiLab = article.category?.toUpperCase() === 'AI LABS' || slug.startsWith('21-');
  const poolArticles = allArticles.filter(a => {
    const aIsAiLab = a.category?.toUpperCase() === 'AI LABS' || a.slug.startsWith('21-');
    return isAiLab ? aIsAiLab : !aIsAiLab;
  });

  const currentIndex = poolArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? poolArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < poolArticles.length - 1 ? poolArticles[currentIndex + 1] : null;

  // Find related articles (matching tags or latest excluding current)
  const relatedArticles = poolArticles
    .filter(a => a.slug !== slug)
    .filter(a => {
      if (!article.tags || article.tags.length === 0) return true;
      return a.tags && a.tags.some(t => article.tags.includes(t));
    })
    .slice(0, 3);

  const fallbackRelated = relatedArticles.length > 0 
    ? relatedArticles 
    : poolArticles.filter(a => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500/30">
      <ProgressBar />
      <CodeBlockEnhancer />

      {/* JSON-LD Structured Data for Google & AI search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <UniversalNav locale={locale} />

      {/* Hero Image Section */}
      {article.image && (
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] mt-16">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent z-10" />
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <main className={`max-w-4xl mx-auto px-4 sm:px-6 ${article.image ? '-mt-20 sm:-mt-32 md:-mt-48 relative z-20' : 'pt-24 sm:pt-32'} pb-16 sm:pb-24`}>
        <Link href={`/${langQuery}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> {t.backHome}
        </Link>
        
        <header className="mb-8 sm:mb-12">
          {article.tags && (
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold tracking-widest text-fuchsia-400 bg-fuchsia-400/10 rounded-full uppercase flex items-center gap-2">
                  <Tag size={12}/> {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-[1.15] tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400 drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]">
            {article.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 sm:mb-10 leading-snug font-light border-l-4 border-cyan-500 pl-4 sm:pl-6 shadow-sm">
            {article.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-6 border-y border-white/10 text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-full">
                <User size={18} className="text-cyan-400"/>
              </div>
              <div>
                <span className="font-semibold text-slate-200 text-base">{article.author || 'HELIA TECH'}</span>
                <span className="ml-2 text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  {locale === 'en' ? 'Verified' : 'Vérifié'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-full">
                <Clock size={18} className="text-fuchsia-400"/>
              </div>
              <span className="font-medium text-base">
                {article.readingTime || `8 MIN ${locale === 'en' ? 'READ' : 'DE LECTURE'}`}
              </span>
            </div>
          </div>

          {/* Social Share Bar Top */}
          <ShareBar title={article.title} slug={slug} locale={locale} />
        </header>
        
        {/* TL;DR Executive Summary */}
        {article.tldr && article.tldr.length > 0 && (
          <div className="mb-8 sm:mb-12 relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-24 bg-gradient-to-tr from-cyan-500/10 to-fuchsia-500/10 opacity-30 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                <span className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                {t.tldrTitle}
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {article.tldr.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4 text-slate-300">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="leading-relaxed font-medium text-base sm:text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {(() => {
          const paragraphs = article.contentHtml.split('</p>');
          if (paragraphs.length <= 2) {
            return (
              <article 
                className="elite-article max-w-none mx-auto w-full overflow-hidden"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            );
          }
          
          const middleIndex = Math.floor(paragraphs.length / 2);
          const firstHalf = paragraphs.slice(0, middleIndex).join('</p>') + '</p>';
          const secondHalf = paragraphs.slice(middleIndex).join('</p>');
          
          return (
            <article className="elite-article max-w-none mx-auto w-full overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
              <div className="w-full overflow-x-hidden my-8">
                <AdSlot />
              </div>
              <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
            </article>
          );
        })()}

        {/* Reaction Box */}
        <ArticleReactions locale={locale} />

        {/* Social Share Bar Bottom */}
        <ShareBar title={article.title} slug={slug} locale={locale} />

        {/* Next / Previous Article Navigation */}
        <ArticlePagination prevArticle={prevArticle} nextArticle={nextArticle} locale={locale} />

        {/* Related Articles */}
        <RelatedArticles articles={fallbackRelated} locale={locale} />
        
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/10 text-center relative z-10 w-full flex justify-center">
          <div className="inline-block w-full bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 max-w-2xl shadow-2xl shadow-cyan-900/20">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-white">
              {locale === 'en' ? 'Take Action Now.' : 'Passez à l’action.'}
            </h3>
            <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {locale === 'en' 
                ? 'Subscribe to get our private AI architectures and engineering blueprints every week. Direct to your inbox.' 
                : 'Abonnez-vous pour recevoir nos workflows IA privés chaque mardi matin. Directement dans votre boîte mail.'}
            </p>
            <div className="w-full">
              <SubscribeForm variant="article" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
