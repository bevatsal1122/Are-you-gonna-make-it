import { choice, score, TypeSafeClient } from '@typesafe-ai/sdk';
import { NextResponse } from 'next/server';
import { questions, type Answers } from '@/lib/questions';

export const runtime = 'nodejs';

const archetypes = {
  disciplined_builder: 'The Disciplined Builder',
  bold_operator: 'The Bold Operator',
  people_first_founder: 'The People First Founder',
  cautious_strategist: 'The Cautious Strategist',
  curious_pivotter: 'The Curious Pivotter',
} as const;

const client = () => new TypeSafeClient({ apiKey: process.env.TYPESAFE_API_KEY });

export async function POST(request: Request) {
  if (!process.env.TYPESAFE_API_KEY) {
    return NextResponse.json({ error: 'Jev is not configured.' }, { status: 503 });
  }

  let answers: unknown;
  try {
    ({ answers } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return NextResponse.json({ error: 'Answers must be an object.' }, { status: 400 });
  }

  const checkedAnswers = answers as Answers;
  const complete = questions.every((question) =>
    checkedAnswers[question.id] === 'A' || checkedAnswers[question.id] === 'B'
  );
  if (!complete) {
    return NextResponse.json({ error: 'Please answer every question first.' }, { status: 400 });
  }

  const state = questions.map((question) => ({
    question: question.question,
    selectedAnswer: checkedAnswers[question.id] === 'A'
      ? question.optionA.text
      : question.optionB.text,
    category: question.category,
  }));

  try {
    const response = await client().systemOne({
      model: 'jev-latest',
      state,
      questions: {
        archetype: choice(
          'Which founder archetype is best supported by this person’s choices? Base the answer only on the choices shown.',
          {
            disciplined_builder: 'Consistently favors focus, shipping, thoughtful tradeoffs, and steady execution.',
            bold_operator: 'Frequently favors aggressive growth, decisive action, and high-risk opportunities.',
            people_first_founder: 'Frequently prioritizes loyalty, relationships, sustainability, and human impact.',
            cautious_strategist: 'Frequently protects control, stability, and downside even when upside is available.',
            curious_pivotter: 'Shows flexibility, curiosity, and willingness to change direction when new evidence appears.',
          },
        ),
        execution_signal: score(
          'How strongly do these choices signal practical founder execution behaviors? Evaluate the full set of choices, not ambition alone.',
          [
            'Very weak: mostly avoids ownership, action, and difficult tradeoffs.',
            'Weak: some willingness to act, but repeatedly favors comfort over execution.',
            'Mixed: meaningful execution strengths balanced by hesitation or inconsistency.',
            'Strong: usually shows ownership, adaptability, and willingness to execute.',
            'Very strong: consistently combines decisive action, learning, focus, and resilience.',
          ],
        ),
      },
    });

    const archetype = response.answers.archetype;
    const executionSignal = response.answers.execution_signal;
    return NextResponse.json({
      archetype: archetypes[archetype.choice],
      confidence: archetype.confidence,
      executionSignal: Math.round((executionSignal.score / 4) * 100),
      executionConfidence: executionSignal.confidence,
      model: response.model,
    });
  } catch (error) {
    console.error('TypeSafe Jev request failed:', error);
    return NextResponse.json({ error: 'Jev could not evaluate these answers.' }, { status: 502 });
  }
}
