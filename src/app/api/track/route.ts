import { NextRequest, NextResponse } from 'next/server';
import { recordRealVisit } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, visitorId } = body || {};

    const userAgent = req.headers.get('user-agent') || '';
    const headerReferrer = req.headers.get('referer') || '';

    // Ignore automated monitoring / uptime pingers
    if (userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.includes('spider')) {
      return NextResponse.json({ ok: true, ignored: 'crawler' });
    }

    recordRealVisit({
      path: path || '/',
      referrer: referrer || headerReferrer || 'Direct / Favoris',
      userAgent,
      visitorId: visitorId || 'v_anon',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Tracking error' }, { status: 500 });
  }
}
