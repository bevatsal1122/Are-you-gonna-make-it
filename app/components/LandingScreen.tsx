'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type TopEntry = { x_username: string; money: number; score: number };

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  const [top3, setTop3] = useState<TopEntry[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTop3(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 pb-12"
    >
      {/* Marquee banner */}
      <div className="w-full overflow-hidden border-y-[3px] border-black bg-[#FFD166] py-2 mb-12 mt-20 md:mt-10">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-sm font-bold uppercase tracking-widest">
              ARE YOU GONNA MAKE IT? &bull; FIND OUT NOW &bull; NO CAP &bull; BRUTAL HONESTY &bull;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <div className="neo-card bg-white p-8 md:p-12 mb-8">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            ARE YOU GONNA<br />
            <span className="bg-[#FFD166] px-3 py-1 inline-block mt-2 -rotate-1">MAKE IT?</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 font-medium text-gray-700">
            15 brutal questions. Zero sugar coating.<br />
            Find out how much you&apos;ll earn in the next 5 years.
          </p>
        </div>

        {/* Stickers */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="neo-sticker bg-[#FF6B8A] text-black rotate-[-2deg]">no bs</span>
          <span className="neo-sticker bg-[#06D6A0] text-black rotate-[1deg]">real talk</span>
          <span className="neo-sticker bg-[#00BBF9] text-black rotate-[-1deg]">brutally honest</span>
          <span className="neo-sticker bg-[#9B5DE5] text-black rotate-[2deg]">free forever</span>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="neo-btn bg-[#FFD166] text-black px-12 py-5 text-xl md:text-2xl"
        >
          LET&apos;S FIND OUT →
        </button>

        <p className="mt-6 text-xs md:text-sm text-gray-500 font-medium">
          Takes 2 minutes. Results may hurt your feelings.
        </p>

        {/* Mobile top 3 + example result */}
        <div className="md:hidden mt-8 flex flex-col gap-6">
          {top3.length > 0 && (
            <div className="neo-card bg-[#E8E8E8] p-5 text-left">
              <div className="text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <span>🏆</span> Top Players
              </div>
              <div className="space-y-2.5">
                {top3.map((entry, i) => {
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-base">{medal}</span>
                      <span className="text-base font-bold truncate flex-1">@{entry.x_username}</span>
                      <span className="text-sm text-gray-500">${entry.money.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
              <a href="/leaderboard" target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-bold text-[#9B5DE5] mt-3 hover:underline">
                View All →
              </a>
            </div>
          )}

          <div className="neo-card p-5 text-center" style={{ backgroundColor: '#06D6A0' }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">
              In 5 years, you&apos;ll make
            </div>
            <div className="text-3xl font-bold my-2">$452,248</div>
            <div className="text-sm font-bold mb-2">Score: 67/100</div>
            <div className="neo-card bg-white/80 p-3 text-left">
              <p className="font-bold text-sm">Solid moves. Not yacht-level.</p>
            </div>
            <div className="mt-3 text-xs font-bold text-black/40 uppercase">Example Result</div>
          </div>
        </div>
      </div>

      {/* Top 3 sidebar */}
      {top3.length > 0 && (
        <div className="hidden md:block fixed left-16 top-1/2 -translate-y-1/2 z-50">
          <div className="neo-card bg-[#E8E8E8] p-6 w-[245px] -rotate-2">
            <div className="text-base font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <span>🏆</span> Top Players
            </div>
            <div className="space-y-2">
              {top3.map((entry, i) => {
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm">{medal}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">@{entry.x_username}</div>
                      <div className="text-xs text-gray-500">${entry.money.toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="/leaderboard" target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-bold text-[#9B5DE5] mt-3 hover:underline">
              View All →
            </a>
          </div>
        </div>
      )}

      {/* Example result card on right */}
      <div className="hidden md:block fixed right-16 top-[66%] -translate-y-1/2 z-40">
        <div className="neo-card p-6 w-[250px] rotate-2 text-center" style={{ backgroundColor: '#06D6A0' }}>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">
            In the next 5 years, you&apos;ll make
          </div>
          <div className="text-3xl font-bold my-2">$452,248</div>
          <div className="text-xs font-bold mb-2">Score: 67/100</div>
          <div className="neo-card bg-white/80 p-3 text-left">
            <p className="font-bold text-[11px]">Solid moves. You&apos;ll be comfortable but not yacht-level.</p>
          </div>
          <div className="mt-3 text-[10px] font-bold text-black/40 uppercase">Example Result</div>
        </div>
      </div>

      <div className="absolute top-6 right-6 md:top-4 md:right-[15.5rem] z-[60] flex gap-2 md:gap-4">
        <Link
          href="/leaderboard"
          className="neo-btn bg-[#9B5DE5] text-white px-3 py-1.5 text-[10px] md:px-4 md:py-2 md:text-sm"
        >
          🏆 Leaderboard
        </Link>
        <a
          href="https://x.com/bevattt15"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn bg-gray-600 text-white px-3 py-1.5 text-[10px] md:px-4 md:py-2 md:text-sm"
        >
          @bevattt15
        </a>
      </div>
    </motion.div>
  );
}
