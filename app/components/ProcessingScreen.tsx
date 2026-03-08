'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProcessingScreen() {
  const messages = [
    "Analyzing your hustle DNA...",
    "Calculating risk tolerance...",
    "Checking your grind levels...",
    "Consulting the money gods...",
    "Running the numbers...",
    "Judging your life choices...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="neo-card bg-white p-10 md:p-16 text-center max-w-md w-full">
        <div className="text-6xl mb-6 animate-bounce">🔮</div>
        <div className="text-xl md:text-2xl font-bold mb-4">
          {messages[msgIndex]}
        </div>
        <div className="neo-progress-track mt-6">
          <motion.div
            className="neo-progress-fill bg-[#06D6A0]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
