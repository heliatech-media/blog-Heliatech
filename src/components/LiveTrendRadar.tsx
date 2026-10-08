"use client";

import { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';

type TrendItem = {
  id: string;
  topic: string;
  category: 'AI' | 'Business' | 'Tech' | 'Hardware';
  momentum: number; // 0 to 100
  status: 'rising' | 'falling' | 'stable';
};

export default function LiveTrendRadar() {
  const [trends, setTrends] = useState<TrendItem[]>([]);

  useEffect(() => {
    // Dans la V2, ceci sera connecté à notre Agent Trend Researcher via une API réelle (ou WebSocket)
    const mockTrends: TrendItem[] = [
      { id: '1', topic: 'Agents IA Autonomes (Swarm)', category: 'AI', momentum: 94, status: 'rising' },
      { id: '2', topic: 'RAG Hybride & Vector Databases', category: 'Tech', momentum: 82, status: 'rising' },
      { id: '3', topic: 'Puces Neuromorphiques vs GPU', category: 'Hardware', momentum: 76, status: 'rising' },
      { id: '4', topic: 'Génération de Vidéo (Sora / Kling)', category: 'AI', momentum: 65, status: 'stable' },
      { id: '5', topic: 'Prompt Engineering Classique', category: 'Business', momentum: 42, status: 'falling' },
    ];
    setTrends(mockTrends);
  }, []);

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <Activity className="text-red-400 w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Live Trend Radar</h2>
        </div>
        <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          EN DIRECT
        </div>
      </div>

      <div className="space-y-4">
        {trends.map((trend, i) => (
          <div key={trend.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs text-slate-400">
                #{i+1}
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-1">{trend.topic}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{trend.category}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 mb-1">Momentum</span>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold ${trend.momentum > 80 ? 'text-green-400' : trend.momentum > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {trend.momentum}%
                  </span>
                  {trend.status === 'rising' && <TrendingUp className="w-4 h-4 text-green-400" />}
                  {trend.status === 'falling' && <TrendingDown className="w-4 h-4 text-red-400" />}
                  {trend.status === 'stable' && <Minus className="w-4 h-4 text-slate-500" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-800 text-center">
        <button className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
          Accéder à l'API Data (V2) <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
