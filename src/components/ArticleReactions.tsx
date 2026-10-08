"use client";

import React, { useState } from 'react';
import { Sparkles, Rocket } from 'lucide-react';
import { translations, Locale } from '@/lib/translations';

interface ArticleReactionsProps {
  locale?: Locale;
}

export default function ArticleReactions({ locale = 'fr' }: ArticleReactionsProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    fire: 142,
    mindblown: 89,
    rocket: 64,
  });
  const t = translations[locale].articleDetail;

  const handleVote = (type: string) => {
    if (selected === type) return;
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
      ...(selected ? { [selected]: Math.max(0, prev[selected] - 1) } : {})
    }));
    setSelected(type);
  };

  return (
    <div className="my-12 p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent text-center select-none relative z-40">
      <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-2">
        {t.usefulQuestion}
      </h4>
      <p className="text-xs text-zinc-400 font-light mb-6">
        {t.usefulSubtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => handleVote('fire')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            selected === 'fire'
              ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 scale-105 shadow-lg shadow-orange-500/10'
              : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="text-base">🔥</span>
          <span>{t.reactionFire}</span>
          <span className="text-zinc-500 font-mono text-[11px] ml-1">({counts.fire})</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote('mindblown')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            selected === 'mindblown'
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 scale-105 shadow-lg shadow-cyan-500/10'
              : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles size={14} className="text-cyan-400" />
          <span>{t.reactionMindblown}</span>
          <span className="text-zinc-500 font-mono text-[11px] ml-1">({counts.mindblown})</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote('rocket')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            selected === 'rocket'
              ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400 scale-105 shadow-lg shadow-fuchsia-500/10'
              : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Rocket size={14} className="text-fuchsia-400" />
          <span>{t.reactionRocket}</span>
          <span className="text-zinc-500 font-mono text-[11px] ml-1">({counts.rocket})</span>
        </button>
      </div>
    </div>
  );
}
