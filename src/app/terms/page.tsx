"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import UniversalNav from '@/components/UniversalNav';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function TermsContent() {
  const searchParams = useSearchParams();
  const locale = searchParams.get('lang') === 'en' ? 'en' : 'fr';
  const langQuery = locale === 'en' ? '?lang=en' : '';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-cyan-500/30">
      <UniversalNav locale={locale} />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <Link href={`/${langQuery}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-12 transition-colors">
          <ArrowLeft size={16} /> {locale === 'en' ? 'Back to Home' : 'Retour à l\'accueil'}
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
          {locale === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
        </h1>
        
        <div className="space-y-8 prose prose-invert prose-cyan max-w-none">
          <p className="text-lg text-slate-400">
            {locale === 'en' ? 'Last updated: October 2026' : 'Dernière mise à jour : Octobre 2026'}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. {locale === 'en' ? 'Acceptance of Terms' : 'Acceptation des conditions'}</h2>
            <p>
              {locale === 'en' 
                ? 'By accessing and using HELIA TECH ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.' 
                : 'En accédant et en utilisant HELIA TECH ("nous", "notre" ou "nos"), vous acceptez d\'être lié par ces Conditions d\'Utilisation. Si vous n\'êtes pas d\'accord avec une partie de ces conditions, vous ne devez pas utiliser notre site web ou nos services.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. {locale === 'en' ? 'Intellectual Property' : 'Propriété Intellectuelle'}</h2>
            <p>
              {locale === 'en'
                ? 'All content published on this site, including text, graphics, logos, images, and software, is the property of HELIA TECH and is protected by international copyright laws. Unauthorized reproduction is strictly prohibited.'
                : 'Tout le contenu publié sur ce site, y compris les textes, graphiques, logos, images et logiciels, est la propriété de HELIA TECH et est protégé par les lois internationales sur le droit d\'auteur. Toute reproduction non autorisée est strictement interdite.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. {locale === 'en' ? 'Disclaimer' : 'Avis de non-responsabilité'}</h2>
            <p>
              {locale === 'en'
                ? 'The materials on HELIA TECH\'s website are provided on an \'as is\' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.'
                : 'Les documents sur le site web de HELIA TECH sont fournis "tels quels". Nous ne donnons aucune garantie, explicite ou implicite, et déclinons et annulons par la présente toutes les autres garanties, y compris, sans s\'y limiter, les garanties implicites ou les conditions de qualité marchande, d\'adéquation à un usage particulier ou de non-violation de la propriété intellectuelle.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. {locale === 'en' ? 'Modifications' : 'Modifications'}</h2>
            <p>
              {locale === 'en'
                ? 'We reserve the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.'
                : 'Nous nous réservons le droit de réviser ces conditions d\'utilisation à tout moment sans préavis. En utilisant ce site web, vous acceptez d\'être lié par la version actuelle de ces conditions d\'utilisation.'}
            </p>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F19]" />}>
      <TermsContent />
    </Suspense>
  );
}
