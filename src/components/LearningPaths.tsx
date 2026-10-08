import React from 'react';
import Link from 'next/link';
import { Terminal, Briefcase, Eye, ChevronRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function LearningPaths() {
  const tracks = [
    {
      badge: "Ingénierie & Code",
      icon: <Terminal className="text-cyan-400" size={26} />,
      title: "Architectes & Développeurs",
      description: "Agents autonomes, modèles de raisonnement, fin de la programmation junior et architectures multi-agents.",
      link: "/articles/sujet-1",
      cta: "Explorer les protocoles",
      gradient: "from-cyan-500/20 via-transparent to-transparent"
    },
    {
      badge: "Scale & Revenus",
      icon: <Briefcase className="text-emerald-400" size={26} />,
      title: "Fondateurs & Solopreneurs",
      description: "Automatiser 100% des opérations, workflows sans employés et capture de marge par l'IA générative.",
      link: "/articles/08-business-ia",
      cta: "Découvrir les blueprints",
      gradient: "from-emerald-500/20 via-transparent to-transparent"
    },
    {
      badge: "Horizon & Ruptures",
      icon: <Eye className="text-fuchsia-400" size={26} />,
      title: "Visionnaires & Dirigeants",
      description: "AGI imminente, guerre des puces, ordinateurs quantiques et bouleversements sociétaux profonds.",
      link: "/articles/05-agi",
      cta: "Comprendre l'impact",
      gradient: "from-fuchsia-500/20 via-transparent to-transparent"
    }
  ];

  return (
    <section className="mb-24 md:mb-36">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Par où <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">commencer ?</span>
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 font-light">
          Trois parcours conçus pour aller droit aux analyses stratégiques qui transforment votre exécution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track, i) => (
          <Link key={i} href={track.link} className="block group h-full">
            <SpotlightCard className="h-full flex flex-col justify-between p-7 sm:p-9 border border-white/10 bg-zinc-950/70 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${track.gradient} rounded-full blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    {track.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {track.badge}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {track.title}
                </h4>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {track.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300">
                <span>{track.cta}</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
