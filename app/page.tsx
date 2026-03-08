'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, calculateResult, type Answers, type Answer } from '@/lib/questions';

// ─── Landing Screen ───
function LandingScreen({ onStart }: { onStart: () => void }) {
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

        <p className="mt-6 text-sm text-gray-500 font-medium">
          Takes 2 minutes. Results may hurt your feelings.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Question Card ───
function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: {
  question: typeof questions[0];
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}) {
  const [selected, setSelected] = useState<Answer | null>(null);

  const handleSelect = (answer: Answer) => {
    if (selected) return;
    setSelected(answer);
    setTimeout(() => onAnswer(answer), 400);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
    >
      {/* Progress */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="neo-sticker bg-white text-black text-xs">
            Q{questionIndex + 1}/{totalQuestions}
          </span>
          <span className="text-sm font-bold text-gray-500">
            {Math.round(((questionIndex) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="neo-progress-track">
          <div
            className="neo-progress-fill bg-[#FFD166]"
            style={{ width: `${((questionIndex) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-xl">
        <div className="neo-card p-6 md:p-10 mb-8" style={{ backgroundColor: question.color }}>
          <div className="text-5xl mb-4">{question.emoji}</div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect('A')}
            disabled={selected !== null}
            className={`neo-choice p-5 md:p-6 text-left ${
              selected === 'A'
                ? 'selected bg-[#FFD166]'
                : selected === 'B'
                ? 'bg-gray-100 opacity-50'
                : 'bg-white hover:bg-[#FFF3CC]'
            }`}
          >
            <div className="text-3xl mb-2">{question.optionA.emoji}</div>
            <div className="text-lg font-bold">{question.optionA.text}</div>
          </button>

          <button
            onClick={() => handleSelect('B')}
            disabled={selected !== null}
            className={`neo-choice p-5 md:p-6 text-left ${
              selected === 'B'
                ? 'selected bg-[#FFD166]'
                : selected === 'A'
                ? 'bg-gray-100 opacity-50'
                : 'bg-white hover:bg-[#FFF3CC]'
            }`}
          >
            <div className="text-3xl mb-2">{question.optionB.emoji}</div>
            <div className="text-lg font-bold">{question.optionB.text}</div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Processing Screen ───
function ProcessingScreen() {
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

// ─── Money Counter ───
function MoneyCounter({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    };

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target]);

  return (
    <span>${current.toLocaleString()}</span>
  );
}

// ─── Trait Bar ───
function TraitBar({ name, score, emoji, delay }: { name: string; score: number; emoji: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm">
          {emoji} {name}
        </span>
        <span className="font-bold text-sm">{score}%</span>
      </div>
      <div className="neo-progress-track h-5">
        <motion.div
          className="neo-progress-fill"
          style={{
            backgroundColor: score >= 70 ? '#06D6A0' : score >= 40 ? '#FFD166' : '#FF6B8A',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Results Screen ───
function ResultsScreen({
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
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${1.5 + Math.random() * 2}rem`,
              ['--delay' as string]: `${Math.random() * 6}s`,
              ['--duration' as string]: `${2.5 + Math.random() * 4}s`,
            }}
          >
            {['💵', '💰', '🤑', '💸', '💎', '🏆', '👑', '🚀', '🔥', '⭐', '💲', '🪙', '💳', '📈', '🥇'][i % 15]}
          </div>
        ))}
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Tier Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-center mb-6"
        >
          <span
            className="neo-sticker text-lg md:text-xl px-6 py-2"
            style={{ backgroundColor: tierColors[result.tier] }}
          >
            {tierLabels[result.tier]}
          </span>
        </motion.div>

        {/* Main result card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="neo-card animate-pulse-glow p-8 md:p-12 text-center mb-6"
          style={{ backgroundColor: tierColors[result.tier] }}
        >
          <div className="text-sm font-bold uppercase tracking-widest mb-2">
            In the next 5 years, you&apos;ll make
          </div>
          <div className="text-5xl md:text-7xl font-bold my-4">
            <MoneyCounter target={result.money} />
          </div>
          <div className="text-lg font-bold mb-4">
            Score: {result.score}/100
          </div>
          <div className="neo-card bg-white/80 p-4 text-left">
            <p className="font-bold text-lg">{result.prediction}</p>
          </div>
        </motion.div>

        {/* Roast */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="neo-card bg-[#FF6B8A] p-6 mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <div className="font-bold uppercase text-sm mb-1">The Roast</div>
              <p className="font-medium">{result.roast}</p>
            </div>
          </div>
        </motion.div>

        {/* Traits breakdown */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="neo-card bg-white p-6 md:p-8 mb-6"
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
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRestart}
            className="neo-btn bg-[#FFD166] text-black px-8 py-4 text-lg flex-1"
          >
            TRY AGAIN
          </button>
          <button
            onClick={() => {
              const text = `I scored ${result.score}/100 on "Are You Gonna Make It?" 💰\n\nPredicted earnings: $${result.money.toLocaleString()} in 5 years\n\nVerdict: ${tierLabels[result.tier]}`;
              if (navigator.share) {
                navigator.share({ title: 'Are You Gonna Make It?', text });
              } else {
                navigator.clipboard.writeText(text);
                alert('Copied to clipboard!');
              }
            }}
            className="neo-btn bg-[#00BBF9] text-black px-8 py-4 text-lg flex-1"
          >
            SHARE RESULTS
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main App ───
type Screen = 'landing' | 'quiz' | 'processing' | 'results';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleStart = useCallback(() => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  }, []);

  const handleAnswer = useCallback((answer: Answer) => {
    const q = questions[currentQuestion];
    setAnswers((prev) => ({ ...prev, [q.id]: answer }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen('processing');
      setTimeout(() => setScreen('results'), 4500);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setScreen('landing');
    setCurrentQuestion(0);
    setAnswers({});
  }, []);

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onStart={handleStart} />
        )}
        {screen === 'quiz' && (
          <QuestionCard
            key={`q-${currentQuestion}`}
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        {screen === 'processing' && (
          <ProcessingScreen key="processing" />
        )}
        {screen === 'results' && (
          <ResultsScreen key="results" answers={answers} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </main>
  );
}
