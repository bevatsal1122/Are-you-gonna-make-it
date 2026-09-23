'use client';

import { motion } from 'framer-motion';

export default function LandingScreen({ onStart }: { onStart: () => void }) {
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
              HOW MUCH WILL YOU MAKE? &bull; FIND OUT NOW &bull; NO CAP &bull; BRUTAL HONESTY &bull;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <div className="neo-card bg-white p-8 md:p-12 mb-8">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            HOW MUCH WILL YOU<br />
            <span className="bg-[#FFD166] px-3 py-1 inline-block mt-2 -rotate-1">MAKE?</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 font-medium text-gray-700">
            15 brutal questions. Zero sugar coating.<br />
            Lambo or public transport? Let&apos;s find out.
          </p>
        </div>

        {/* Stickers */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="neo-sticker bg-[#FF6B8A] text-black rotate-[-2deg]">no bs</span>
          <span className="neo-sticker bg-[#06D6A0] text-black rotate-[1deg]">cope harder</span>
          <span className="neo-sticker bg-[#00BBF9] text-black rotate-[-1deg]">exit liquidity</span>
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

      {/* Example result card on right */}
      <div className="hidden md:block fixed right-16 top-[66%] -translate-y-1/2 z-40">
        <div className="neo-card p-6 w-[260px] rotate-2 text-center" style={{ backgroundColor: '#06D6A0' }}>
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

      <div className="absolute top-6 right-6 md:top-4 md:right-4 z-[60] flex gap-2 md:gap-4">
        <a
          href="https://x.com/corevats"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn bg-gray-600 text-white px-3 py-1.5 text-[10px] md:px-4 md:py-2 md:text-sm flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          @corevats
        </a>
      </div>
    </motion.div>
  );
}
