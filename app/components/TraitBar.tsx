'use client';

import { motion } from 'framer-motion';

export default function TraitBar({ name, score, emoji, delay }: { name: string; score: number; emoji: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm md:text-base">
          {emoji} {name}
        </span>
        <span className="font-bold text-sm md:text-base">{score}%</span>
      </div>
      <div className="neo-progress-track h-6">
        <motion.div
          className="neo-progress-fill"
          style={{
            backgroundColor: score >= 75 ? '#06D6A0' : score >= 40 ? '#FFD166' : '#FF6B8A',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
