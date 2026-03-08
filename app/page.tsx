'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions, type Answers, type Answer } from '@/lib/questions';
import LandingScreen from './components/LandingScreen';
import QuestionCard from './components/QuestionCard';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsScreen from './components/ResultsScreen';

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
    <main className="relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onStart={handleStart} />
        )}
        {screen === 'quiz' && (
          <QuestionCard
            key="quiz"
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
