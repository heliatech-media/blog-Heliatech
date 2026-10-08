import React from 'react';

export default function AdSlot() {
  return (
    <div className="my-12 p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 shadow-[0_0_30px_rgba(217,70,239,0.3)]">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#0f172a] rounded-2xl p-6 md:p-8 h-full relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 pointer-events-none"></div>
        
        <div className="text-white space-y-3 mb-6 md:mb-0 relative z-10 md:w-2/3">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-md">
            Passez au niveau supérieur avec Nexus AI
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            L'outil d'intelligence artificielle ultime conçu pour les esprits créatifs. Automatisez vos workflows, générez du contenu premium et gagnez des heures chaque semaine.
          </p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto text-center md:text-left mt-2 md:mt-0">
          <a
            href="#"
            className="inline-block w-full md:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Découvrir Nexus
          </a>
        </div>
      </div>
    </div>
  );
}
