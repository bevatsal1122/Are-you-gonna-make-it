'use client';

import { useState, useEffect, useRef } from 'react';
import { questions, type Answer } from '@/lib/questions';

export default function QuestionCard({
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
  const [transitioning, setTransitioning] = useState(false);
  const [animateEnabled, setAnimateEnabled] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(questionIndex);
  const pendingAnswer = useRef<Answer | null>(null);

  // When parent advances questionIndex, snap back instantly (no transition)
  useEffect(() => {
    setAnimateEnabled(false);
    setTransitioning(false);
    setVisibleIndex(questionIndex);
    setSelected(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimateEnabled(true);
      });
    });
  }, [questionIndex]);

  const handleSelect = (answer: Answer) => {
    if (selected || transitioning) return;
    setSelected(answer);
    pendingAnswer.current = answer;
    onAnswer(answer);
  };

  const prevQ = visibleIndex > 0 ? questions[visibleIndex - 1] : null;
  const currentQ = questions[visibleIndex];
  const nextQ = visibleIndex < totalQuestions - 1 ? questions[visibleIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-4 pb-8 relative -mt-8">
      {/* Progress */}
      <div className="w-full max-w-xl mb-2">
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
            style={{
              width: `${((questionIndex) / totalQuestions) * 100}%`,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Previous question ghost - always reserve space */}
      <div className="w-full max-w-xl mb-3 mt-8 pointer-events-none scale-[0.88]" style={{ minHeight: '68px' }}>
        {prevQ && (
          <div className="opacity-[0.3]">
            <div className="neo-card p-3 md:p-4 min-h-[60px] md:min-h-[68px] flex flex-col justify-center" style={{ backgroundColor: prevQ.color }}>
              <div className="text-xl mb-1">{prevQ.emoji}</div>
              <h2 className="text-sm md:text-base font-bold leading-snug line-clamp-1">{prevQ.question}</h2>
            </div>
          </div>
        )}
      </div>

      {/* Current question */}
      <div className="w-full max-w-xl">
        <div className="neo-card p-6 md:p-10 mb-6 h-[260px] md:h-[260px] flex flex-col justify-center" style={{ backgroundColor: currentQ.color }}>
          <div className="text-5xl mb-4">{currentQ.emoji}</div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            {currentQ.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => handleSelect('A')}
            disabled={!!selected}
            className={`neo-choice p-4 md:p-5 text-left h-[105px] md:h-[115px] flex flex-col justify-center ${
              selected === 'A'
                ? 'selected bg-[#FFD166]'
                : selected === 'B'
                ? 'bg-gray-100 opacity-50'
                : 'bg-white hover:bg-[#FFF3CC]'
            }`}
          >
            <div className="text-2xl mb-1">{currentQ.optionA.emoji}</div>
            <div className="text-[17px] font-bold">{currentQ.optionA.text}</div>
          </button>

          <button
            onClick={() => handleSelect('B')}
            disabled={!!selected}
            className={`neo-choice p-4 md:p-5 text-left h-[105px] md:h-[115px] flex flex-col justify-center ${
              selected === 'B'
                ? 'selected bg-[#FFD166]'
                : selected === 'A'
                ? 'bg-gray-100 opacity-50'
                : 'bg-white hover:bg-[#FFF3CC]'
            }`}
          >
            <div className="text-2xl mb-1">{currentQ.optionB.emoji}</div>
            <div className="text-[17px] font-bold">{currentQ.optionB.text}</div>
          </button>
        </div>
      </div>

      {/* Next question ghost - always reserve space */}
      <div className="w-full max-w-xl mt-3 pointer-events-none scale-[0.88]" style={{ minHeight: '68px' }}>
        {nextQ && (
          <div className="opacity-[0.3]">
            <div className="neo-card p-3 md:p-4 min-h-[60px] md:min-h-[68px] flex flex-col justify-center" style={{ backgroundColor: nextQ.color }}>
              <div className="text-xl mb-1">{nextQ.emoji}</div>
              <h2 className="text-sm md:text-base font-bold leading-snug line-clamp-1">{nextQ.question}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
