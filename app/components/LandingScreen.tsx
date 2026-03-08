'use client';

import { motion } from 'framer-motion';

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Marquee banner */}
      <div className="w-full overflow-hidden border-y-[3px] border-black bg-[#FFD166] py-2 mb-12">
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
      </div>

      <a
        href="https://x.com/bevattt15"
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn bg-gray-600 text-white px-4 py-2 text-xs md:text-sm fixed top-4 z-50" style={{ right: '15.5rem' }}
      >
        @bevattt15
      </a>
    </motion.div>
  );
}
