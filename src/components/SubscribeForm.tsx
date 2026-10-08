"use client";

import React, { useState } from 'react';

type SubscribeFormProps = {
  variant: 'home' | 'article';
};

export default function SubscribeForm({ variant }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Inscription réussie !');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue');
    }
  };

  if (variant === 'home') {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="bg-black/50 p-2 rounded-full border border-white/10 flex flex-col sm:flex-row items-center backdrop-blur-xl relative">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            placeholder="Votre email professionnel" 
            className="w-full bg-transparent border-none px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 text-lg font-light disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-white text-black hover:bg-cyan-400 hover:text-black font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0 w-full sm:w-auto"
          >
            {status === 'loading' ? 'En cours...' : 'Accès Privé'}
          </button>
        </form>
        {status === 'success' && <p className="text-cyan-400 mt-4 text-sm font-semibold pl-6">{message}</p>}
        {status === 'error' && <p className="text-red-400 mt-4 text-sm font-semibold pl-6">{message}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative">
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          placeholder="Votre meilleure adresse email" 
          className="flex-1 bg-black/60 border border-white/20 rounded-2xl px-6 py-4 text-base text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 disabled:opacity-50" 
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-2xl text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'En cours...' : "S'abonner"}
        </button>
      </form>
      {status === 'success' && <p className="text-cyan-400 mt-4 text-sm font-semibold text-left">{message}</p>}
      {status === 'error' && <p className="text-red-400 mt-4 text-sm font-semibold text-left">{message}</p>}
    </div>
  );
}
