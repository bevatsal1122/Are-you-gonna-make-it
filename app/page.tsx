'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions, type Answers, type Answer } from '@/lib/questions';
import LandingScreen from './components/LandingScreen';
import QuestionCard from './components/QuestionCard';
import UsernamePrompt from './components/UsernamePrompt';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsScreen from './components/ResultsScreen';

type Screen = 'landing' | 'quiz' | 'username' | 'processing' | 'results';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [xUsername, setXUsername] = useState('');

  const handleStart = useCallback(() => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setXUsername('');
  }, []);

  const handleAnswer = useCallback((answer: Answer) => {
    const q = questions[currentQuestion];
    setAnswers((prev) => ({ ...prev, [q.id]: answer }));

    // After question 10 (index 9), show username prompt
    if (currentQuestion === 9) {
      setCurrentQuestion((prev) => prev + 1);
      setScreen('username');
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen('processing');
      setTimeout(() => setScreen('results'), 4500);
    }
  }, [currentQuestion]);

  const handleUsernameSubmit = useCallback((username: string) => {
    setXUsername(username);
    setScreen('quiz');
  }, []);

  const handleUsernameSkip = useCallback(() => {
    setXUsername('');
    setScreen('quiz');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('landing');
    setCurrentQuestion(0);
    setAnswers({});
    setXUsername('');
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
        {screen === 'username' && (
          <UsernamePrompt
            key="username"
            onSubmit={handleUsernameSubmit}
            onSkip={handleUsernameSkip}
          />
        )}
        {screen === 'processing' && (
          <ProcessingScreen key="processing" />
        )}
        {screen === 'results' && (
          <ResultsScreen
            key="results"
            answers={answers}
            xUsername={xUsername}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
