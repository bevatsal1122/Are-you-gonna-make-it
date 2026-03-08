'use client';

import { motion } from 'framer-motion';
import { calculateResult, type Answers } from '@/lib/questions';
import MoneyCounter from './MoneyCounter';
import TraitBar from './TraitBar';

export default function ResultsScreen({
  answers,
  onRestart,
}: {
  answers: Answers;
  onRestart: () => void;
}) {
  const result = calculateResult(answers);

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
              className="neo-card animate-pulse-glow p-10 md:p-12 text-center mb-6"
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

            {/* Roast */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="neo-card bg-[#FF6B8A] p-8 mb-6"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔥</span>
                <div>
                  <div className="font-bold uppercase text-sm mb-1">The Roast</div>
                  <p className="font-medium text-sm md:text-base">{result.roast}</p>
                </div>
              </div>
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
              className="neo-card bg-white p-8 md:p-10 mb-6 max-w-lg mx-auto"
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <button
                onClick={() => {
                  const text = `I scored ${result.score}/100 on "Are You Gonna Make It?" 💰\n\nPredicted earnings: $${result.money.toLocaleString()} in 5 years\n\nVerdict: ${tierLabels[result.tier]}\n\nThink you can beat me? 👇`;
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
