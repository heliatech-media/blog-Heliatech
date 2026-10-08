"use client";

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { translations, Locale } from '@/lib/translations';

interface ShareBarProps {
  title: string;
  slug: string;
  locale?: Locale;
}

export default function ShareBar({ title, slug, locale = 'fr' }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const t = translations[locale].articleDetail;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/articles/${slug}${langQuery}`
    : `https://helia.media/articles/${slug}${langQuery}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Analyse percutante : "${title}" via @HELIA_Media`
  )}&url=${encodeURIComponent(articleUrl)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(articleUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = articleUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md my-8 select-none">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
        <Share2 size={14} className="text-cyan-400" />
        <span>{t.shareArticle}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* X / Twitter */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 hover:border-cyan-400/40 transition-all active:scale-95"
          title="Share on X (Twitter)"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="hidden sm:inline">X / Twitter</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 hover:border-blue-400/40 transition-all active:scale-95"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.37 9.74v-8.37H5.09v8.37h2.74z"/>
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
            copied
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title="Copy link"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? t.shareCopied : t.shareCopy}</span>
        </button>
      </div>
    </div>
  );
}
