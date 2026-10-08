import React from 'react';
import { Database, ShieldCheck, Users, Zap } from 'lucide-react';

export default function AuthorityStats() {
  const stats = [
    {
      icon: <Database className="text-cyan-400" size={24} />,
      value: "22+",
      label: "Articles & Guides",
      detail: "Analyses de fond & actualités tech"
    },
    {
      icon: <ShieldCheck className="text-indigo-400" size={24} />,
      value: "100%",
      label: "Indépendant",
      detail: "Recherche pure sans sponsoring biaisé"
    },
    {
      icon: <Users className="text-fuchsia-400" size={24} />,
      value: "10k+",
      label: "Décideurs Tech",
      detail: "Fondateurs & ingénieurs abonnés"
    },
    {
      icon: <Zap className="text-emerald-400" size={24} />,
      value: "0$",
      label: "Accès Libre",
      detail: "Workflows ouverts pour l'élite"
    }
  ];

  return (
    <section className="mb-24 md:mb-36">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {stats.map((s, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''}`}>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
                {s.icon}
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-1">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300 mb-1">
                {s.label}
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 font-light">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
