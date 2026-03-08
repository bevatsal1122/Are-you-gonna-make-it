'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UsernamePrompt({
  onSubmit,
  onSkip,
}: {
  onSubmit: (username: string) => void;
  onSkip: () => void;
}) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    const cleaned = username.replace('@', '').trim();
    if (cleaned) {
      onSubmit(cleaned);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="neo-card bg-white p-8 md:p-12 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Join the Leaderboard
        </h2>
        <p className="text-gray-600 font-medium mb-8">
          Drop your X handle to see how you rank against others
        </p>

        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="your_handle"
            className="w-full border-3 border-black p-4 pl-10 text-lg font-bold focus:outline-none focus:ring-0 focus:shadow-[6px_6px_0px_#000] transition-shadow"
            style={{ borderWidth: '3px' }}
            autoFocus
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!username.replace('@', '').trim()}
          className="neo-btn bg-[#FFD166] text-black px-8 py-4 text-lg w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          NEXT →
        </button>
      </div>

      <button
        onClick={onSkip}
        className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors py-2 mt-6"
      >
        Skip, I&apos;ll stay anonymous
      </button>
    </motion.div>
  );
}
