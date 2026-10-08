"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import UniversalNav from '@/components/UniversalNav';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function PrivacyContent() {
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
          {locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
        </h1>
        
        <div className="space-y-8 prose prose-invert prose-cyan max-w-none">
          <p className="text-lg text-slate-400">
            {locale === 'en' ? 'Last updated: October 2026' : 'Dernière mise à jour : Octobre 2026'}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. {locale === 'en' ? 'Information Collection' : 'Collecte des Informations'}</h2>
            <p>
              {locale === 'en' 
                ? 'We only collect information that you voluntarily provide to us, such as your email address when you subscribe to our newsletter. We do not use intrusive tracking cookies.' 
                : 'Nous ne collectons que les informations que vous nous fournissez volontairement, comme votre adresse e-mail lors de votre inscription à notre newsletter. Nous n\'utilisons pas de cookies de suivi intrusifs.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. {locale === 'en' ? 'Use of Information' : 'Utilisation des Informations'}</h2>
            <p>
              {locale === 'en'
                ? 'The information we collect is used solely to send you our newsletters, updates, and relevant content about AI and technology. We will never sell or rent your personal information to third parties.'
                : 'Les informations que nous collectons sont utilisées uniquement pour vous envoyer nos newsletters, mises à jour et contenus pertinents sur l\'IA et la technologie. Nous ne vendrons ni ne louerons jamais vos informations personnelles à des tiers.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. {locale === 'en' ? 'Data Security' : 'Sécurité des Données'}</h2>
            <p>
              {locale === 'en'
                ? 'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'
                : 'Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations personnelles contre tout accès, altération, divulgation ou destruction non autorisés.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. {locale === 'en' ? 'Your Rights' : 'Vos Droits'}</h2>
            <p>
              {locale === 'en'
                ? 'You have the right to access, correct, or delete your personal data. You can unsubscribe from our communications at any time by clicking the "unsubscribe" link at the bottom of our emails.'
                : 'Vous avez le droit d\'accéder à vos données personnelles, de les corriger ou de les supprimer. Vous pouvez vous désabonner de nos communications à tout moment en cliquant sur le lien "se désabonner" en bas de nos e-mails.'}
            </p>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F19]" />}>
      <PrivacyContent />
    </Suspense>
  );
}
