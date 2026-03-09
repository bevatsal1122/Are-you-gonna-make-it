'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { emoji: '🧬', text: 'Analyzing your hustle DNA...', color: '#9B5DE5' },
  { emoji: '📊', text: 'Calculating risk tolerance...', color: '#00BBF9' },
  { emoji: '🔥', text: 'Checking your grind levels...', color: '#FF6B8A' },
  { emoji: '💰', text: 'Consulting the money gods...', color: '#FFD166' },
  { emoji: '🧮', text: 'Running the numbers...', color: '#06D6A0' },
  { emoji: '⚖️', text: 'Judging your life choices...', color: '#FF9F1C' },
];

const floatingEmojis = ['💵', '💰', '🤑', '💸', '💎', '🏆', '👑', '🚀', '🔥', '⭐', '💲', '🪙', '📈', '🥇', '💳'];

export default function ProcessingScreen() {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const stage = stages[stageIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative"
    >
      {/* Floating background emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl"
            initial={{
              x: `${(i * 7) % 100}vw`,
              y: '110vh',
              opacity: 0.15,
              rotate: 0,
            }}
            animate={{
              y: '-10vh',
              rotate: 360,
              opacity: [0, 0.25, 0.25, 0],
            }}
            transition={{
              duration: 3 + (i % 4),
              delay: (i * 0.3) % 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <motion.div
          className="neo-card bg-white p-8 md:p-12 text-center"
          animate={{
            boxShadow: [
              '6px 6px 0px #000',
              '8px 8px 0px #000',
              '6px 6px 0px #000',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Animated emoji with color ring */}
          <div className="relative inline-block mb-6">
            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto"
              style={{ border: `4px solid ${stage.color}` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stage.color}20` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stageIndex}
                    className="text-5xl md:text-6xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stage.emoji}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: stage.color,
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((i * 2 * Math.PI) / 3) * 60,
                    Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 60,
                    Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 60,
                  ],
                  y: [
                    Math.sin((i * 2 * Math.PI) / 3) * 60,
                    Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 60,
                    Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 60,
                  ],
                  scale: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Cycling message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-xl md:text-2xl font-bold mb-2 min-h-[2em]"
            >
              {stage.text}
            </motion.div>
          </AnimatePresence>

          <p className="text-sm text-gray-400 font-medium mb-6">This might hurt your feelings...</p>

          {/* Progress bar */}
          <div className="neo-progress-track w-full h-5">
            <motion.div
              className="neo-progress-fill h-full"
              style={{ backgroundColor: stage.color }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            className="mt-3 text-lg font-bold"
            style={{ color: stage.color }}
          >
            {progress}%
          </motion.div>
        </motion.div>

        {/* Floating stickers below card */}
        <div className="flex justify-center gap-3 mt-6">
          {['no cap', 'for real', 'trust'].map((text, i) => (
            <motion.span
              key={text}
              className="neo-sticker text-xs"
              style={{
                backgroundColor: stages[i % stages.length].color,
              }}
              animate={{
                y: [0, -6, 0],
                rotate: [i % 2 === 0 ? -2 : 2, i % 2 === 0 ? 2 : -2, i % 2 === 0 ? -2 : 2],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {text}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
