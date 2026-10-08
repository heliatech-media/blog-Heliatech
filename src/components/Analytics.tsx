'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Simulation de l'initialisation selon la documentation officielle de PostHog pour Next.js App Router
if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (posthogKey && posthogKey !== 'simulated-key') {
    posthog.init(posthogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      person_profiles: 'identified_only',
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === 'development') posthogInstance.debug();
      }
    });
  } else {
    console.log('[Analytics] PostHog ignoré (aucune clé API trouvée).');
  }
}

export default function Analytics({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
