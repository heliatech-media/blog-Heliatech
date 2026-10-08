import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { translations, Locale } from '@/lib/translations';

interface FooterProps {
  locale?: Locale;
}

export default function Footer({ locale = 'fr' }: FooterProps) {
  const t = translations[locale].footer;
  const langQuery = locale === 'en' ? '?lang=en' : '';

  return (
    <footer className="border-t border-white/10 bg-[#020202] text-zinc-400 text-sm relative z-20">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href={`/${langQuery}`} className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-white flex items-center gap-2 mb-4">
              Helia <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </Link>
            <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-sm mb-6">
              {t.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-zinc-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t.statusOperational}
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-4">{t.colAnalyses}</h5>
            <ul className="space-y-2.5 font-light text-zinc-400">
              <li><Link href={`/ai-labs${langQuery}`} className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> HELIA Labs (Blueprints)</Link></li>
              <li><Link href={`/articles${langQuery}`} className="hover:text-cyan-400 transition-colors">{t.allArticles}</Link></li>
              <li><Link href={`/articles/sujet-1${langQuery}`} className="hover:text-cyan-400 transition-colors">Agents Autonomes</Link></li>
              <li><Link href={`/articles/05-agi${langQuery}`} className="hover:text-cyan-400 transition-colors">Dossier AGI</Link></li>
              <li><Link href={`/articles/08-business-ia${langQuery}`} className="hover:text-cyan-400 transition-colors">Business IA</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-4">{t.colEcosystem}</h5>
            <ul className="space-y-2.5 font-light text-zinc-400">
              <li><Link href={`/#newsletter${langQuery}`} className="hover:text-cyan-400 transition-colors">{t.joinNewsletter}</Link></li>
              <li><Link href={`/articles/sujet-2${langQuery}`} className="hover:text-cyan-400 transition-colors">Code Architecture</Link></li>
              <li><Link href={`/articles/sujet-4-ecologie-ia${langQuery}`} className="hover:text-cyan-400 transition-colors">Datacenters & Energy</Link></li>
              <li><Link href={`/articles/16-hardware${langQuery}`} className="hover:text-cyan-400 transition-colors">NVIDIA Hardware</Link></li>
            </ul>
          </div>

          {/* Socials Col */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-4">{t.colSocials}</h5>
            <ul className="space-y-2.5 font-light text-zinc-400">
              <li>
                <a href="https://x.com/HELIA_Media" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  X (Twitter) <ArrowUpRight size={13} className="text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/helia-media-1b9a91441/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  LinkedIn <ArrowUpRight size={13} className="text-zinc-500" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-zinc-500 font-mono">
                {t.zeroTrackers}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
          <div>
            {t.copyright}
          </div>
          <div className="flex items-center gap-6">
            <span>{t.designedFor}</span>
            <span>â€¢</span>
            <span className="text-zinc-400">Next.js 16 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
