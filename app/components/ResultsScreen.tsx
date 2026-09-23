'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  const [jev, setJev] = useState<{
    archetype: string;
    confidence: number;
    executionSignal: number;
    executionConfidence: number;
  } | null>(null);
  const [jevStatus, setJevStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => {
    let active = true;
    fetch('/api/jev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Jev unavailable');
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setJev(data);
        setJevStatus('ready');
      })
      .catch(() => {
        if (active) setJevStatus('unavailable');
      });
    return () => { active = false; };
  }, [answers]);

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
              {xUsername && <div className="text-sm font-bold mb-2">@{xUsername}</div>}
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

            {/* Roast */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="neo-card bg-[#FF6B8A] p-5 mb-6"
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const text = `I scored ${result.score}/100 on "How Much Will You Make?" 💰\n\nPredicted earnings: $${result.money.toLocaleString()} in 5 years\n\nVerdict: ${tierLabels[result.tier]}\n\nThink you can beat me? 👇`;
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

            <p className="text-xs text-gray-600 text-center mt-2">
              Built by{' '}
              <a href="https://x.com/corevats" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                @corevats
              </a>
            </p>
          </div>

          {/* Right column */}
          <div>
            {/* Jev founder profile */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="neo-card bg-[#D8F3DC] p-6 md:p-8 mb-6 max-w-lg mx-auto"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold uppercase">Jev&apos;s Founder Read</h3>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded">TYPESAFE AI</span>
              </div>
              {jevStatus === 'loading' && (
                <p className="font-medium">Jev is reading your choices…</p>
              )}
              {jevStatus === 'unavailable' && (
                <p className="font-medium text-sm">Jev is unavailable right now. Your quiz score and results are ready above.</p>
              )}
              {jevStatus === 'ready' && jev && (
                <>
                  <p className="text-2xl font-black mb-3">{jev.archetype}</p>
                  <div className="flex items-center justify-between text-sm font-bold mb-2">
                    <span>Execution signal</span>
                    <span>{jev.executionSignal}%</span>
                  </div>
                  <div className="h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                    <div className="h-full bg-[#06D6A0]" style={{ width: `${jev.executionSignal}%` }} />
                  </div>
                  <p className="text-xs mt-3">
                    Profile confidence: {Math.round(jev.confidence * 100)}% · Execution signal confidence: {Math.round(jev.executionConfidence * 100)}%
                  </p>
                </>
              )}
            </motion.div>

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

          </div>
        </div>
      </div>
    </motion.div>
  );
}
