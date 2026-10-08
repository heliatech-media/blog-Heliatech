"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RealTrafficTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double recording same path in strict mode
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    // Generate or retrieve persistent local visitor ID
    let visitorId = '';
    try {
      visitorId = localStorage.getItem('helia_vid') || '';
      if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
        localStorage.setItem('helia_vid', visitorId);
      }
    } catch {
      visitorId = 'v_cookie_disabled';
    }

    const payload = {
      path: pathname,
      referrer: document.referrer || 'Direct / Favoris',
      visitorId,
    };

    // Use sendBeacon or non-blocking fetch to record real event
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Non-blocking telemetry
    }
  }, [pathname]);

  return null;
}
