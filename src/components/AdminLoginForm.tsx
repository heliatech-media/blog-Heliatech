"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowRight, AlertTriangle, Key } from 'lucide-react';

export default function AdminLoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    // Set cookie and refresh
    document.cookie = `admin_secret_token=${encodeURIComponent(token.trim())}; path=/; max-age=604800; SameSite=Strict`;
    
    // Redirect with token query parameter as backup
    window.location.href = `/vault-master-helia?key=${encodeURIComponent(token.trim())}`;
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
            HELIA TECH <span className="text-cyan-400">VAULT</span>
          </h1>
          <p className="text-xs text-zinc-400 font-mono tracking-wide">
            Espace Stratégique d'Administration Privée
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Key size={13} className="text-cyan-400" /> Clé Secrète de Sécurité
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={token}
                onChange={(e) => { setToken(e.target.value); setError(false); }}
                placeholder="Entrez votre passe-partout..."
                className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock size={15} />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle size={14} className="shrink-0" />
              <span>Clé d'autorisation invalide. Accès refusé.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Déverrouiller le Vault</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
            Accès sécurisé réservé au fondateur de HELIA TECH.<br />
            Les tentatives non autorisées sont archivées.
          </p>
        </div>
      </div>
    </div>
  );
}
