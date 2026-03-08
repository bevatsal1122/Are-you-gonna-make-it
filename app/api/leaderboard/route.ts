import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - fetch leaderboard + optionally get rank for a money amount
export async function GET(req: NextRequest) {
  const money = req.nextUrl.searchParams.get('money');

  // If money param provided, return rank info + mini leaderboard
  if (money) {
    const moneyNum = parseInt(money);
    const username = req.nextUrl.searchParams.get('username') || '';

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
      const idx = allOrdered.findIndex(
        (e: { x_username: string; money: number }) => e.x_username === username && e.money === moneyNum
      );
      if (idx === -1) {
        // User not found by exact match, find by rank position
        const rankIdx = rank - 1;
        if (rankIdx > 0 && allOrdered[rankIdx - 1]) personAbove = { ...allOrdered[rankIdx - 1], rank: rank - 1 };
        currentEntry = { x_username: username, money: moneyNum, rank };
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
  const body = await req.json();
  const { x_username, score, money, tier } = body;

  if (!x_username || score == null || money == null || !tier) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Check if user already exists
  const { data: existing } = await supabase
    .from('leaderboard')
    .select('id')
    .eq('x_username', x_username)
    .limit(1)
    .single();

  if (existing) {
    // Update existing entry
    const { error } = await supabase
      .from('leaderboard')
      .update({ score, money, tier })
      .eq('x_username', x_username);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Insert new entry
    const { error } = await supabase.from('leaderboard').insert({
      x_username,
      score,
      money,
      tier,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
