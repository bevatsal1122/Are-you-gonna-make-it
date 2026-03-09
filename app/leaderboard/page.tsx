'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type LeaderboardEntry = {
  id: string;
  x_username: string;
  score: number;
  money: number;
  tier: string;
  created_at: string;
};

const tierColors: Record<string, string> = {
  broke: '#FF6B8A',
  surviving: '#FF9F1C',
  comfortable: '#FFD166',
  wealthy: '#06D6A0',
  rich: '#00BBF9',
  mega: '#9B5DE5',
};

const tierLabels: Record<string, string> = {
  broke: 'NOT GONNA MAKE IT',
  surviving: 'BARELY SURVIVING',
  comfortable: 'MID',
  wealthy: 'ON YOUR WAY',
  rich: 'GONNA MAKE IT',
  mega: 'GENERATIONAL WEALTH',
};

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('search') || '';
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(prefilled);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (Array.isArray(data)) setEntries(data);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">LEADERBOARD</h1>
          <p className="text-gray-500 font-medium">Top earners ranked by predicted 5-year income</p>
        </div>

        {/* Back button + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            href="/"
            className="neo-btn bg-[#FFD166] text-black px-6 py-3 text-sm inline-block shrink-0"
          >
            ← BACK TO QUIZ
          </Link>
          <div className="neo-card bg-white p-0 flex-1 flex items-center px-4">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 bg-transparent outline-none font-bold text-sm placeholder:font-medium placeholder:text-gray-300"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 ml-2 text-lg">
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="neo-card bg-white p-12 text-center">
            <div className="text-4xl mb-4 animate-bounce">🔮</div>
            <p className="font-bold text-lg">Loading leaderboard...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="neo-card bg-white p-12 text-center">
            <div className="text-4xl mb-4">👀</div>
            <p className="font-bold text-lg">No entries yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(() => {
              const renderEntry = (entry: LeaderboardEntry, rankNum: number, highlight = false) => {
                const isTop3 = rankNum <= 3;
                const medalEmoji = rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : rankNum === 3 ? '🥉' : null;
                return (
                  <div
                    key={entry.id}
                    className={`neo-card p-4 md:p-5 flex items-center gap-4 ${
                      highlight ? 'bg-[#9B5DE5] text-white' : isTop3 ? 'bg-[#FFF3CC]' : 'bg-white'
                    }`}
                  >
                    <div className="shrink-0 w-12 text-center">
                      {medalEmoji ? (
                        <span className="text-2xl">{medalEmoji}</span>
                      ) : (
                        <span className={`text-lg font-bold ${highlight ? 'text-white/70' : 'text-gray-400'}`}>#{rankNum}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://x.com/${entry.x_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-bold text-base md:text-lg hover:underline truncate flex items-center gap-1.5 ${highlight ? 'text-white' : ''}`}
                      >
                        @{entry.x_username}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        {highlight && prefilled && <span className="ml-1 text-[10px] bg-white/30 px-2 py-0.5 rounded-full align-middle">YOU</span>}
                      </a>
                      <span
                        className="neo-sticker text-[10px] mt-1"
                        style={{ backgroundColor: highlight ? 'rgba(255,255,255,0.3)' : (tierColors[entry.tier] || '#ccc') }}
                      >
                        {tierLabels[entry.tier] || entry.tier}
                      </span>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className={`text-lg md:text-xl font-bold ${highlight ? 'text-white' : ''}`}>
                        ${entry.money.toLocaleString()}
                      </div>
                      <div className={`text-xs font-medium ${highlight ? 'text-white/70' : 'text-gray-400'}`}>
                        {entry.score}/100
                      </div>
                    </div>
                  </div>
                );
              };

              // If searching, show top 3 + dots + above + match + below
              if (search) {
                const matchIdx = entries.findIndex((e) =>
                  e.x_username.toLowerCase().includes(search.toLowerCase())
                );

                if (matchIdx === -1) {
                  return (
                    <div className="neo-card bg-white p-12 text-center">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="font-bold text-lg">No user found for &quot;{search}&quot;</p>
                    </div>
                  );
                }

                const matchRank = matchIdx + 1;
                const rows: React.ReactNode[] = [];

                // Top 1
                rows.push(renderEntry(entries[0], 1, 0 === matchIdx));

                if (matchRank > 2) {
                  rows.push(
                    <div key="dots" className="text-center text-gray-300 text-lg tracking-widest py-1">•••</div>
                  );
                }

                // Person above (if not already shown as #1)
                if (matchIdx > 1 && entries[matchIdx - 1]) {
                  rows.push(renderEntry(entries[matchIdx - 1], matchIdx));
                }

                // Matched user (if not #1)
                if (matchIdx >= 1) {
                  rows.push(renderEntry(entries[matchIdx], matchRank, true));
                }

                // Person below
                if (matchIdx >= 1 && matchIdx < entries.length - 1) {
                  rows.push(renderEntry(entries[matchIdx + 1], matchRank + 1));
                }

                return rows;
              }

              // No search — show all
              return entries.map((entry, i) => renderEntry(entry, i + 1));
            })()}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Built by{' '}
            <a href="https://x.com/bevattt15" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              @bevattt15
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
