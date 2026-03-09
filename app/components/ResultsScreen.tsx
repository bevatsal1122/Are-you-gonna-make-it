'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { calculateResult, type Answers } from '@/lib/questions';
import MoneyCounter from './MoneyCounter';
import TraitBar from './TraitBar';

export default function ResultsScreen({
  answers,
  xUsername,
  onRestart,
}: {
  answers: Answers;
  xUsername: string;
  onRestart: () => void;
}) {
  // Memoize so Math.random() in calculateResult only runs once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => calculateResult(answers), []);
  const [rank, setRank] = useState<number | null>(null);
  const [totalPlayers, setTotalPlayers] = useState<number | null>(null);
  const [miniBoard, setMiniBoard] = useState<{
    top3: { x_username: string; money: number; tier: string; score: number; rank: number }[];
    personAbove: { x_username: string; money: number; score: number; rank: number } | null;
    currentEntry: { x_username: string; money: number; score: number; rank: number } | null;
    personBelow: { x_username: string; money: number; score: number; rank: number } | null;
  } | null>(null);
  const saved = useRef(false);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;

    const saveAndFetchRank = async () => {
      // Save to leaderboard if username provided
      if (xUsername) {
        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            x_username: xUsername,
            score: result.score,
            money: result.money,
            tier: result.tier,
          }),
        });
      }

      // Fetch rank + mini leaderboard
      const res = await fetch(`/api/leaderboard?money=${result.money}&username=${encodeURIComponent(xUsername)}`);
      const data = await res.json();
      if (data.rank) setRank(data.rank);
      if (data.total) setTotalPlayers(data.total);
      if (data.top3) {
        setMiniBoard({
          top3: data.top3,
          personAbove: data.personAbove,
          currentEntry: data.currentEntry,
          personBelow: data.personBelow,
        });
      }
    };

    saveAndFetchRank();
  }, [xUsername, result.score, result.money, result.tier]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Money falling bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 29 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1.2}rem`,
              ['--offset' as string]: `${Math.random() * 6}s`,
              ['--duration' as string]: `${2.5 + Math.random() * 4}s`,
            }}
          >
            {['💵', '💰', '🤑', '💸', '💎', '🏆', '👑', '🚀', '🔥', '⭐', '💲', '🪙', '💳', '📈', '🥇'][i % 15]}
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Tier Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-center mb-8"
        >
          <span
            className="neo-sticker text-3xl md:text-4xl px-10 py-5"
            style={{ backgroundColor: tierColors[result.tier] }}
          >
            {tierLabels[result.tier]}
          </span>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            {/* Main result card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="neo-card animate-pulse-glow p-6 md:p-8 text-center mb-6"
              style={{ backgroundColor: tierColors[result.tier] }}
            >
              <div className="text-sm font-bold uppercase tracking-widest mb-2">
                In the next 5 years, you&apos;ll make
              </div>
              <div className="text-4xl md:text-6xl font-bold my-4">
                <MoneyCounter target={result.money} />
              </div>
              <div className="text-lg font-bold mb-4">
                Score: {result.score}/100
              </div>
              <div className="neo-card bg-white/80 p-5 text-left">
                <p className="font-bold text-base md:text-lg">{result.prediction}</p>
              </div>
            </motion.div>

            {/* Mini Leaderboard */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="neo-card bg-white p-4 mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🏆</span>
                <span className="font-bold text-sm uppercase tracking-wide">Leaderboard</span>
                {totalPlayers && (
                  <span className="text-xs text-gray-600 font-medium ml-auto">{totalPlayers} players</span>
                )}
              </div>

              {!miniBoard ? (
                <div className="space-y-1 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                      <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0" />
                      <div className="h-4 bg-gray-200 rounded flex-1" />
                      <div className="h-4 w-12 bg-gray-200 rounded shrink-0" />
                      <div className="h-4 w-16 bg-gray-200 rounded shrink-0" />
                    </div>
                  ))}
                  <div className="text-center text-gray-200 text-xs tracking-widest py-0.5">•••</div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
                    <div className="w-6 h-4 bg-gray-200 rounded shrink-0" />
                    <div className="h-4 bg-gray-200 rounded flex-1" />
                    <div className="h-4 w-16 bg-gray-200 rounded shrink-0" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {/* Top 3 */}
                  {miniBoard.top3.map((entry) => {
                    const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉';
                    const isCurrentUser = entry.x_username === xUsername;
                    return (
                      <div
                        key={`top-${entry.rank}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                          isCurrentUser ? 'bg-[#9B5DE5] text-white font-bold' : 'bg-gray-50'
                        }`}
                      >
                        <span className="text-base">{medal}</span>
                        <a href={`https://x.com/${entry.x_username}`} target="_blank" rel="noopener noreferrer" className="truncate flex-1 font-medium flex items-center gap-1 hover:underline">
                          {isCurrentUser ? <>You {entry.x_username && <span className="ml-1 text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full">@{entry.x_username}</span>}</> : <>@{entry.x_username}</>}
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <span className={`text-xs shrink-0 mr-2 ${isCurrentUser ? 'text-white/70' : 'text-gray-600'}`}>{entry.score}/100</span>
                        <span className="font-bold shrink-0">${entry.money.toLocaleString()}</span>
                      </div>
                    );
                  })}

                  {/* Dots separator - only show if user is not in top 3 */}
                  {rank !== null && rank > 3 && (
                    <>
                      <div className="text-center text-gray-300 text-xs tracking-widest py-0.5">•••</div>

                      {/* Person above */}
                      {miniBoard.personAbove && miniBoard.personAbove.rank > 3 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-gray-50">
                          <span className="text-xs text-gray-600 w-6 text-right">#{miniBoard.personAbove.rank}</span>
                          <a href={`https://x.com/${miniBoard.personAbove.x_username}`} target="_blank" rel="noopener noreferrer" className="truncate flex-1 font-medium flex items-center gap-1 hover:underline">
                            @{miniBoard.personAbove.x_username}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </a>
                          <span className="text-xs text-gray-600 shrink-0 mr-2">{miniBoard.personAbove.score}/100</span>
                          <span className="font-bold shrink-0">${miniBoard.personAbove.money.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Current user */}
                      {miniBoard.currentEntry && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-[#9B5DE5] text-white font-bold">
                          <span className="text-xs w-6 text-right">#{miniBoard.currentEntry.rank}</span>
                          <a href={`https://x.com/${miniBoard.currentEntry.x_username || xUsername}`} target="_blank" rel="noopener noreferrer" className="truncate flex-1 flex items-center gap-1 hover:underline">
                            You {(miniBoard.currentEntry.x_username || xUsername) && <span className="ml-1 text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full">@{miniBoard.currentEntry.x_username || xUsername}</span>}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </a>
                          <span className="text-xs text-white/70 shrink-0 mr-2">{miniBoard.currentEntry.score}/100</span>
                          <span className="shrink-0">${miniBoard.currentEntry.money.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Person below */}
                      {miniBoard.personBelow && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-gray-50">
                          <span className="text-xs text-gray-600 w-6 text-right">#{miniBoard.personBelow.rank}</span>
                          <a href={`https://x.com/${miniBoard.personBelow.x_username}`} target="_blank" rel="noopener noreferrer" className="truncate flex-1 font-medium flex items-center gap-1 hover:underline">
                            @{miniBoard.personBelow.x_username}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </a>
                          <span className="text-xs text-gray-600 shrink-0 mr-2">{miniBoard.personBelow.score}/100</span>
                          <span className="font-bold shrink-0">${miniBoard.personBelow.money.toLocaleString()}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              <a
                href={xUsername ? `/leaderboard?search=${encodeURIComponent(xUsername)}` : '/leaderboard'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-sm font-bold bg-[#9B5DE5] text-white py-2.5 rounded-lg hover:bg-[#8a4dd4] transition-colors"
              >
                🏆 View Full Leaderboard →
              </a>
            </motion.div>

            <p className="text-xs text-gray-400 text-center mt-2">
              Built by{' '}
              <a href="https://x.com/bevattt15" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                @bevattt15
              </a>
            </p>
          </div>

          {/* Right column */}
          <div>
            {/* Traits breakdown */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="neo-card bg-white p-6 md:p-8 mb-6 max-w-lg mx-auto"
            >
              <h3 className="text-xl font-bold mb-6 uppercase">Your DNA Breakdown</h3>
              {result.traits.map((trait, i) => (
                <TraitBar
                  key={trait.name}
                  name={trait.name}
                  score={trait.score}
                  emoji={trait.emoji}
                  delay={1 + i * 0.15}
                />
              ))}
            </motion.div>

            {/* Roast */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="neo-card bg-[#FF6B8A] p-5 mb-6 max-w-lg mx-auto"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔥</span>
                <div>
                  <div className="font-bold uppercase text-sm mb-1">The Roast</div>
                  <p className="font-medium text-sm md:text-base">{result.roast}</p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <button
                onClick={() => {
                  const rankText = rank ? `\n\nRanked #${rank} out of ${totalPlayers} players 🏆` : '';
                  const text = `I scored ${result.score}/100 on "Are You Gonna Make It?" 💰\n\nPredicted earnings: $${result.money.toLocaleString()} in 5 years\n\nVerdict: ${tierLabels[result.tier]}${rankText}\n\nThink you can beat me? 👇`;
                  const url = window.location.href;
                  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                  window.open(tweetUrl, '_blank');
                }}
                className="neo-btn bg-[#00BBF9] text-black px-6 py-3 text-base md:text-xl flex-1"
              >
                SHARE ON X
              </button>
              <button
                onClick={onRestart}
                className="neo-btn bg-[#FFD166] text-black px-6 py-3 text-base md:text-xl flex-1"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
