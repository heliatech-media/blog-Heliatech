"use client";

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

interface TickerItem {
  title: string;
  slug: string;
  category?: string;
}

export default function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items || items.length === 0) return null;

  // Duplicate items for infinite seamless scroll
  const displayItems = [...items, ...items];

  return (
    <div className="w-full bg-[#030303] border-y border-white/5 py-2.5 overflow-hidden relative z-30 select-none">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 flex items-center gap-4">
        {/* Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-[10px] sm:text-xs font-black tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <Zap size={11} className="text-cyan-400" />
          <span>En continu</span>
        </div>

        {/* Marquee ticker wrapper */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {displayItems.map((item, idx) => (
              <Link
                key={`${item.slug}-${idx}`}
                href={`/articles/${item.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-cyan-300 transition-colors group flex-shrink-0"
              >
                {item.category && (
                  <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover:text-cyan-400">
                    [{item.category}]
                  </span>
                )}
                <span className="font-medium">{item.title}</span>
                <span className="text-zinc-600 font-bold ml-4">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
