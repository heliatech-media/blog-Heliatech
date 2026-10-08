"use client";

import { useState } from 'react';
import { Lock, Unlock, Zap } from 'lucide-react';

export default function PremiumContent({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (isUnlocked) {
    return (
      <div className="relative border border-amber-500/30 bg-amber-500/5 p-6 rounded-xl my-8">
        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10">
          <Unlock className="w-3 h-3" />
          ACCÈS ÉLITE DÉVERROUILLÉ
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl my-8 border border-gray-800 bg-gray-900/50">
      <div className="absolute inset-0 backdrop-blur-md bg-black/60 z-10 flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-12 h-12 text-amber-500 mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
        <h3 className="text-2xl font-bold text-white mb-2">Contenu Réservé à l'Élite</h3>
        <p className="text-gray-300 mb-6 max-w-md">
          Débloquez l'accès aux prompts exacts, aux codes sources complets et aux architectures secrètes de nos agents.
        </p>
        <button 
          onClick={() => setIsUnlocked(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
        >
          <Zap className="w-5 h-5" />
          Déverrouiller l'accès (Simulation)
        </button>
      </div>
      
      <div className="p-6 opacity-30 select-none filter blur-[6px]">
        {/* Fake content structure to show behind the blur */}
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-full mb-4"></div>
        <div className="h-32 bg-gray-700 rounded w-full mt-6 mb-4 border border-gray-500 border-dashed"></div>
        <div className="h-4 bg-gray-600 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
      </div>
    </div>
  );
}
