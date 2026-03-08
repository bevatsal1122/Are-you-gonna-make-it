import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX_GET = 30; // 30 GET requests per minute
const RATE_LIMIT_MAX_POST = 5; // 5 POST requests per minute

function getIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
}

function checkRateLimit(ip: string, method: string): boolean {
  const key = `${ip}:${method}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  const max = method === 'POST' ? RATE_LIMIT_MAX_POST : RATE_LIMIT_MAX_GET;

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 300_000);

// Sanitize username input
function sanitizeUsername(input: string): string {
  return input.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 30);
}

const VALID_TIERS = ['broke', 'surviving', 'comfortable', 'wealthy', 'rich', 'mega'];

// GET - fetch leaderboard + optionally get rank for a money amount
export async function GET(req: NextRequest) {
  const ip = getIP(req);
  if (!checkRateLimit(ip, 'GET')) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const money = req.nextUrl.searchParams.get('money');

  // If money param provided, return rank info + mini leaderboard
  if (money) {
    const moneyNum = parseInt(money);
    if (isNaN(moneyNum) || moneyNum < 0 || moneyNum > 10_000_000) {
      return NextResponse.json({ error: 'Invalid money value' }, { status: 400 });
    }

    const username = sanitizeUsername(req.nextUrl.searchParams.get('username') || '');

    const [{ count: above }, { count: total }, { data: top3 }, { data: allOrdered }] = await Promise.all([
      supabase
        .from('leaderboard')
        .select('*', { count: 'exact', head: true })
        .gt('money', moneyNum),
      supabase
        .from('leaderboard')
        .select('*', { count: 'exact', head: true }),
      supabase
        .from('leaderboard')
        .select('*')
        .order('money', { ascending: false })
        .limit(3),
      supabase
        .from('leaderboard')
        .select('*')
        .order('money', { ascending: false }),
    ]);

    const rank = (above ?? 0) + 1;

    // Find nearby entries
    let personAbove = null;
    let personBelow = null;
    let currentEntry = null;

    if (allOrdered) {
      // Match by username first, fall back to money
      let idx = allOrdered.findIndex(
        (e: { x_username: string }) => e.x_username === username
      );
      if (idx === -1) {
        idx = allOrdered.findIndex(
          (e: { x_username: string; money: number }) => e.money === moneyNum
        );
      }
      if (idx === -1) {
        // User truly not found, build manually
        const rankIdx = rank - 1;
        if (rankIdx > 0 && allOrdered[rankIdx - 1]) personAbove = { ...allOrdered[rankIdx - 1], rank: rank - 1 };
        currentEntry = { x_username: username, money: moneyNum, score: 0, rank };
        if (rankIdx < allOrdered.length && allOrdered[rankIdx]) personBelow = { ...allOrdered[rankIdx], rank: rank + 1 };
      } else {
        currentEntry = { ...allOrdered[idx], rank: idx + 1 };
        if (idx > 0) personAbove = { ...allOrdered[idx - 1], rank: idx };
        if (idx < allOrdered.length - 1) personBelow = { ...allOrdered[idx + 1], rank: idx + 2 };
      }
    }

    return NextResponse.json({
      rank,
      total: total ?? 0,
      top3: (top3 || []).map((e: { x_username: string; money: number; tier: string; score: number }, i: number) => ({
        x_username: e.x_username,
        money: e.money,
        tier: e.tier,
        score: e.score,
        rank: i + 1,
      })),
      personAbove,
      currentEntry,
      personBelow,
    });
  }

  // Otherwise return top 50
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('money', { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - save a new leaderboard entry
export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (!checkRateLimit(ip, 'POST')) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { x_username, score, money, tier } = body;

  if (!x_username || score == null || money == null || !tier) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Validate & sanitize
  const cleanUsername = sanitizeUsername(x_username);
  if (!cleanUsername || cleanUsername.length < 1) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  const scoreNum = parseInt(score);
  const moneyNum = parseInt(money);
  if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
    return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
  }
  if (isNaN(moneyNum) || moneyNum < 0 || moneyNum > 10_000_000) {
    return NextResponse.json({ error: 'Invalid money' }, { status: 400 });
  }
  if (!VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
  }

  // Check if user already exists
  const { data: existing } = await supabase
    .from('leaderboard')
    .select('id')
    .eq('x_username', cleanUsername)
    .limit(1)
    .single();

  if (existing) {
    // Update existing entry
    const { error } = await supabase
      .from('leaderboard')
      .update({ score: scoreNum, money: moneyNum, tier })
      .eq('x_username', cleanUsername);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Insert new entry
    const { error } = await supabase.from('leaderboard').insert({
      x_username: cleanUsername,
      score: scoreNum,
      money: moneyNum,
      tier,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
