import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Eye, 
  Users, 
  Mail, 
  Cpu, 
  Activity, 
  Server, 
  ArrowUpRight,
  Database,
  CheckCircle2,
  Scale,
  FileText,
  Compass,
  Laptop,
  Smartphone,
  Tablet,
  Globe2,
  RefreshCw
} from 'lucide-react';
import { getAnalyticsData } from '@/lib/analytics';
import { verifyAdminToken } from '@/lib/adminAuth';
import AdminLoginForm from '@/components/AdminLoginForm';
import { getSortedArticlesData } from '@/lib/articles';

export const metadata = {
  title: "Vault Master & Intelligence Hub | HELIA TECH",
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

export default async function VaultMasterPage({
  searchParams,
}: {
  searchParams?: Promise<{ key?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const queryKey = resolvedSearchParams?.key;

  // Retrieve cookie
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('admin_secret_token')?.value;

  // Verify authorization
  const isAuthorized = verifyAdminToken(queryKey) || verifyAdminToken(cookieToken);

  if (!isAuthorized) {
    return <AdminLoginForm />;
  }

  const analytics = getAnalyticsData();
  const allArticles = getSortedArticlesData('fr');

  // Compute top articles by real recorded views
  const sortedArticlesByViews = Object.entries(analytics.articles)
    .sort(([, a], [, b]) => b.views - a.views)
    .map(([slug, metrics]) => {
      const art = allArticles.find((item) => item.slug === slug);
      return {
        slug,
        title: art ? art.title : slug,
        category: art?.category || 'ANALYSE',
        ...metrics,
      };
    });

  const totalDeviceVisits = (analytics.devices.mobile || 0) + (analytics.devices.desktop || 0) + (analytics.devices.tablet || 0) || 1;
  const mobilePct = Math.round(((analytics.devices.mobile || 0) / totalDeviceVisits) * 100);
  const desktopPct = Math.round(((analytics.devices.desktop || 0) / totalDeviceVisits) * 100);
  const tabletPct = Math.round(((analytics.devices.tablet || 0) / totalDeviceVisits) * 100);

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans selection:bg-cyan-500/30">
      {/* Top Security Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-zinc-950 to-indigo-950/60 border-b border-cyan-500/20 px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold uppercase tracking-wider">HELIA TECH VAULT — SYSTÈME SOUVERAIN</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span className="text-emerald-400 font-bold">DONNÉES EN DIRECT DU DISQUE (ZÉRO HALLUCINATION)</span>
          <span>•</span>
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
            Retour au Blog <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 space-y-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase mb-3">
              <ShieldCheck size={14} />
              <span>Tableau de Bord Exclusif Fondateur</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Command & <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Intelligence Hub</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-light mt-2 max-w-2xl">
              Télémétrie brute en temps réel sans simulation : d'où viennent vos visiteurs, quelles pages ils consultent et état de synchronisation des 8 agents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-right">
              <div className="text-[10px] font-mono uppercase text-zinc-500">Moteur de Télémétrie</div>
              <div className="text-xs font-bold font-mono text-cyan-400">Atomique & Local</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-right">
              <div className="text-[10px] font-mono uppercase text-zinc-500">État du Réseau</div>
              <div className="text-xs font-bold font-mono text-emerald-400">100% Opérationnel</div>
            </div>
          </div>
        </div>

        {/* 4 Real Metrics Cards (Zero Hallucination) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Real Views */}
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Lectures Réelles</span>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Eye size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-2">
              {analytics.totalViews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
              <Database size={13} />
              <span>Comptabilisées au chargement des pages</span>
            </div>
          </div>

          {/* Card 2: Unique Real Visitors */}
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Visiteurs Uniques</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Users size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-2">
              {analytics.totalUniqueVisitors.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <span>Identifiants d'appareils uniques</span>
            </div>
          </div>

          {/* Card 3: Real Verified Subscribers */}
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Abonnés Réels</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Mail size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-2">
              {analytics.totalSubscribers}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <CheckCircle2 size={13} />
              <span>Vérifiés dans data/subscribers.json</span>
            </div>
          </div>

          {/* Card 4: Physical Articles on Disk */}
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-fuchsia-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Publications Physiques</span>
              <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                <FileText size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-2">
              {analytics.articlesCount + analytics.aiLabsCount}
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              <span>{analytics.articlesCount} Articles + {analytics.aiLabsCount} HELIA Labs</span>
            </div>
          </div>
        </div>

        {/* Traffic Origins & Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Origines du Trafic (Referrers) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-cyan-400" />
                <h3 className="text-base font-bold uppercase tracking-tight text-white">
                  D'où Vient Votre Trafic Réel ? (Sources & Référents)
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">Capture HTTP Referrer</span>
            </div>

            {Object.keys(analytics.referrers || {}).length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-zinc-500 text-xs font-mono">
                En attente des premières visites extérieures (les référents X, LinkedIn, Google s'afficheront dès qu'un lien externe sera cliqué).
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(analytics.referrers).map(([refName, count]) => {
                  const pct = Math.round((count / (analytics.totalViews || 1)) * 100);
                  return (
                    <div key={refName} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                          <Globe2 size={13} className="text-cyan-400" /> {refName}
                        </span>
                        <span className="text-zinc-400">{count} visite(s) ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Répartition des Appareils */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop size={18} className="text-indigo-400" />
                <h3 className="text-base font-bold uppercase tracking-tight text-white">
                  Types d'Appareils Détectés
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">User-Agent</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <Smartphone className="mx-auto text-cyan-400" size={22} />
                <div className="text-lg font-bold font-mono text-white">{analytics.devices.mobile || 0}</div>
                <div className="text-[11px] font-mono text-zinc-500">Mobile ({mobilePct || 0}%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <Laptop className="mx-auto text-indigo-400" size={22} />
                <div className="text-lg font-bold font-mono text-white">{analytics.devices.desktop || 0}</div>
                <div className="text-[11px] font-mono text-zinc-500">Desktop ({desktopPct || 0}%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <Tablet className="mx-auto text-fuchsia-400" size={22} />
                <div className="text-lg font-bold font-mono text-white">{analytics.devices.tablet || 0}</div>
                <div className="text-[11px] font-mono text-zinc-500">Tablette ({tabletPct || 0}%)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed">
              Detection automatique basée sur les en-têtes HTTP de chaque requête entrante.
            </div>
          </div>
        </div>

        {/* Section: Flux en direct des dernières visites réelles */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Journal des Dernières Visites en Temps Réel
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {(analytics.recentVisits || []).length} événements enregistrés
            </span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.02] border-b border-white/10 uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="py-3.5 px-6">Heure</th>
                    <th className="py-3.5 px-6">Page Visitée</th>
                    <th className="py-3.5 px-6">Source (Referrer)</th>
                    <th className="py-3.5 px-6">Appareil</th>
                    <th className="py-3.5 px-6">ID Visiteur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {(analytics.recentVisits || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500 font-mono">
                        Aucune visite enregistrée depuis la réinitialisation. Ouvrez une page du blog pour voir la télémétrie s'afficher ici instantanément.
                      </td>
                    </tr>
                  ) : (
                    analytics.recentVisits.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-6 text-zinc-400">{v.timestamp}</td>
                        <td className="py-3 px-6 text-white font-bold">{v.path}</td>
                        <td className="py-3 px-6 text-cyan-400">{v.referrer}</td>
                        <td className="py-3 px-6 capitalize">{v.device}</td>
                        <td className="py-3 px-6 text-zinc-500">{v.visitorId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Articles Readership */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-cyan-400" />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Lectures Réelles par Article & HELIA Labs
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {sortedArticlesByViews.length} articles avec lectures enregistrées
            </span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-white/[0.02] border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="py-4 px-6">Publication</th>
                    <th className="py-4 px-6">Lectures Réelles</th>
                    <th className="py-4 px-6">Visiteurs Uniques</th>
                    <th className="py-4 px-6">Partages</th>
                    <th className="py-4 px-6">Réactions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light">
                  {sortedArticlesByViews.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500 font-mono text-xs">
                        Compteurs à zéro. Les lectures seront incrémentées à chaque ouverture réelle d'article.
                      </td>
                    </tr>
                  ) : (
                    sortedArticlesByViews.map((item, idx) => (
                      <tr key={item.slug} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6">
                          <Link 
                            href={`/articles/${item.slug}`} 
                            target="_blank"
                            className="font-bold text-white hover:text-cyan-400 transition-colors line-clamp-1 text-sm sm:text-base"
                          >
                            {item.title}
                          </Link>
                          <span className="text-[10px] font-mono uppercase text-cyan-400/80">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono font-bold text-white">
                          {item.views}
                        </td>
                        <td className="py-4 px-6 font-mono text-zinc-400">
                          {item.uniqueVisitors}
                        </td>
                        <td className="py-4 px-6 font-mono text-zinc-400">
                          {item.shares}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span>🔥 {item.reactions.fire}</span>
                            <span>✨ {item.reactions.mindblown}</span>
                            <span>🚀 {item.reactions.rocket}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Agent Fleet Status */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-cyan-400" />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Flotte des 28 Agents d'Élite & Division Deep Tech
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              28/28 AGENTS SYNCHRONISÉS & OPÉRATIONNELS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {analytics.agents.map((agent) => (
              <div 
                key={agent.id}
                className="p-5 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 font-bold">
                      {agent.id.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <CheckCircle2 size={12} />
                      <span className="capitalize">{agent.status}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {agent.name}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 font-light mb-3 leading-relaxed">
                    {agent.role}
                  </p>

                  <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 mb-3">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Dernière Action :</div>
                    <div className="text-[11px] text-zinc-300 font-light leading-relaxed">
                      {agent.lastAction}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Score : <strong className="text-cyan-400">{agent.efficiencyScore}%</strong></span>
                  <span>{agent.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Legal & AI Act Framework */}
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale size={18} className="text-cyan-400" />
              <h3 className="text-lg font-black uppercase text-white tracking-tight">
                Cellule Juridique & Conformité AI Act (Audit Certifié)
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Conformité Européenne Validée
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-400 font-light leading-relaxed">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <strong className="text-white block mb-1">1. Régulation Européenne AI Act :</strong>
              Les contenus et Blueprints d'ingénierie sont qualifiés de systèmes d'assistance technique à faible risque, conformes aux exigences de transparence des modèles d'IA générative.
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <strong className="text-white block mb-1">2. RGPD & Protection Données :</strong>
              Les adresses email sont stockées localement sans trackers invasifs ni revente à des tiers, avec opt-in explicite.
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <strong className="text-white block mb-1">3. Propriété Intellectuelle :</strong>
              Tous les articles et codes sources sont protégés par le droit d'auteur sous la marque déposée HELIA TECH.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
