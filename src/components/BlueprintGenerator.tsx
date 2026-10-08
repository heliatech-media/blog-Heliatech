"use client";

import { useState } from 'react';
import { Cpu, Terminal, Network, Loader2, Plus, Sparkles, CheckCircle2, X, Lock, User, Key, Check } from 'lucide-react';

type BlueprintResult = {
  title: string;
  agents: string[];
  code: string;
};

export default function BlueprintGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<BlueprintResult | null>(null);
  
  // Modal states
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [modalStep, setModalStep] = useState<'locked' | 'login' | 'authenticating' | 'success' | 'code'>('locked');

  const analyzePrompt = (input: string): BlueprintResult => {
    // Basic Local Heuristic Engine (NLP in JS)
    const stopwords = [
      'je','voudrais','veux','aimerais','automatiser','tout','le','la','les','l',
      'processus','de','des','pour','avec','un','une','a','à','z','faire','creer',
      'créer','générer','comment','mon','ma','mes','ton','ta','tes','ce','cet',
      'cette','ces','dans','sur','par','qui','que','quoi','dont','où'
    ];
    
    // Nettoyer et extraire les mots-clés
    const words = input.toLowerCase().replace(/[.,!?'"]/g, ' ').split(/\s+/);
    const keywords = words.filter(w => w.length > 2 && !stopwords.includes(w));
    
    // Construire le sujet
    let topic = keywords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Fallback si la phrase ne contenait que des stop words
    if (!topic || topic.trim() === '') {
      topic = "Processus Général";
    }

    // Génération Procédurale des Rôles
    const agent1Role = `Scout ${topic}`;
    const agent2Role = `Architecte ${topic}`;
    const agent3Role = `QA & Conformité`;

    const generatedCode = `from crewai import Agent, Task, Crew
import os

# Configuration de l'Empire
os.environ["OPENAI_API_KEY"] = "sk-..."

print("Initialisation de la Factory : ${topic}...")

# 1. Agent d'Acquisition (Data/Recherche)
scout = Agent(
    role="${agent1Role}",
    goal="Collecter les données brutes et analyser le contexte spécifique de : ${topic}",
    backstory="Spécialiste de l'extraction d'informations ciblées avec zéro hallucination.",
    verbose=True
)

# 2. Agent de Création (Génération)
creator = Agent(
    role="${agent2Role}",
    goal="Transformer les données brutes en un livrable structuré et prêt à l'emploi",
    backstory="Expert de haut niveau dans la structuration logicielle et conceptuelle.",
    verbose=True
)

# 3. Agent de Contrôle (QA)
validator = Agent(
    role="${agent3Role}",
    goal="Vérifier la qualité, l'absence d'erreurs et le respect absolu du format",
    backstory="Auditeur intraitable, garant de la réputation de HELIA ÉLITE.",
    verbose=True
)

# Déploiement de l'Essaim Autonome
crew = Crew(
    agents=[scout, creator, validator],
    tasks=[...], # Tasks d'exécution définies dans la version pro
    verbose=2
)

result = crew.kickoff()
print("Processus '${topic}' terminé avec succès.")`

    return {
      title: `Architecture Sur-Mesure : ${topic}`,
      agents: [
        `${agent1Role} (Acquisition & Data Mining)`,
        `${agent2Role} (Génération & Traitement)`,
        `${agent3Role} (Vérification Finale)`
      ],
      code: generatedCode
    };
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setResult(null);
    setShowPremiumModal(false);
    setModalStep('locked');

    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setResult(analyzePrompt(prompt));
    }, 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('authenticating');
    
    // Simulate API login
    setTimeout(() => {
      setModalStep('success');
      
      // Auto transition to code view
      setTimeout(() => {
        setModalStep('code');
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Terminal className="text-cyan-400 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Blueprint Generator 
            <span className="text-[10px] bg-cyan-500 text-black px-2 py-0.5 rounded ml-2 align-top font-bold tracking-wider uppercase">Beta</span>
          </h2>
        </div>
        
        <p className="text-slate-300 mb-6 max-w-2xl relative z-10 leading-relaxed">
          Décrivez votre processus manuel actuel. Notre moteur d'architecture analysera votre besoin et générera la topologie exacte d'agents autonomes pour l'automatiser.
        </p>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
          <input 
            type="text"
            placeholder="Ex: Je passe 5h/jour à lire des newsletters pour écrire des résumés LinkedIn..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
          />
          <button 
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-cyan-500/20"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Générer
          </button>
        </form>

        {/* Result Area */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="border-t border-slate-800 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {result.title}
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative">
                {/* Connection lines (desktop) */}
                <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>
                
                {result.agents.map((agent, i) => (
                  <div key={i} className="flex flex-col items-center text-center z-10 w-full sm:w-1/3 p-4">
                    <div className="w-16 h-16 bg-slate-800 border-2 border-cyan-500/50 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      {i === 0 ? <Network className="text-cyan-400 w-8 h-8" /> : i === 1 ? <Cpu className="text-fuchsia-400 w-8 h-8" /> : <CheckCircle2 className="text-green-400 w-8 h-8" />}
                    </div>
                    <div className="text-sm font-bold text-white mb-2">Agent 0{i+1}</div>
                    <div className="text-xs text-slate-400 font-medium">{agent}</div>
                    
                    {/* Mobile connection arrow */}
                    {i < result.agents.length - 1 && (
                      <div className="sm:hidden w-0.5 h-8 bg-slate-700 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 border border-cyan-500/30 px-5 py-2.5 rounded-lg bg-cyan-500/5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Voir le code Python (Élite)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Multi-Step Modal Mock */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className={`bg-slate-900 border ${modalStep === 'code' ? 'border-cyan-500/50 max-w-2xl' : 'border-amber-500/50 max-w-md'} rounded-2xl p-8 w-full text-center relative shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500`}>
            
            <button 
              onClick={() => {
                setShowPremiumModal(false);
                setTimeout(() => setModalStep('locked'), 300);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* STEP 1 : LOCKED */}
            {modalStep === 'locked' && (
              <div className="animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-amber-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Code Source Verrouillé</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Le code d'orchestration dynamique est réservé aux membres de la faction <strong>HELIA ÉLITE</strong>. Connectez-vous pour débloquer l'accès.
                </p>
                <button 
                  onClick={() => setModalStep('login')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black py-3 rounded-xl transition-all shadow-lg"
                >
                  SE CONNECTER (SIMULATION)
                </button>
              </div>
            )}

            {/* STEP 2 : LOGIN */}
            {modalStep === 'login' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Accès HELIA ÉLITE</h3>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Membre</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-500" />
                      </div>
                      <input type="email" required placeholder="contact@votre-entreprise.com" className="w-full bg-black border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mot de passe</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-slate-500" />
                      </div>
                      <input type="password" required placeholder="••••••••" className="w-full bg-black border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    S'authentifier
                  </button>
                </form>
              </div>
            )}

            {/* STEP 3 : AUTHENTICATING */}
            {modalStep === 'authenticating' && (
              <div className="py-8 animate-in fade-in duration-300 flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Chiffrement en cours...</h3>
                <p className="text-slate-400 text-sm">Vérification de vos privilèges d'accès.</p>
              </div>
            )}

            {/* STEP 4 : SUCCESS */}
            {modalStep === 'success' && (
              <div className="py-8 animate-in zoom-in-95 duration-300 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Accès Autorisé</h3>
                <p className="text-slate-300 text-sm">Bienvenue dans l'Élite. Déverrouillage des serveurs...</p>
              </div>
            )}

            {/* STEP 5 : REVEALED CODE */}
            {modalStep === 'code' && result && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="text-cyan-400 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Code Généré (Python)</h3>
                </div>
                
                <div className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-sm overflow-x-auto text-slate-300">
<pre><code>{result.code}</code></pre>
                </div>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => {
                      setShowPremiumModal(false);
                      setTimeout(() => setModalStep('locked'), 300);
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-sm underline"
                  >
                    Fermer la console
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
