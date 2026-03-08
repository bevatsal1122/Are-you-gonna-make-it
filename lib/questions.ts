export type Question = {
  id: number;
  question: string;
  emoji: string;
  optionA: { text: string; emoji: string };
  optionB: { text: string; emoji: string };
  category: 'hustle' | 'sacrifice' | 'mindset' | 'risk' | 'emotional' | 'discipline';
  // Score weights: [optionA_score, optionB_score] from 0-10
  weights: [number, number];
  color: string; // background color for the card
};

export const questions: Question[] = [
  {
    id: 1,
    question: "It's 3 AM. Deadline is tomorrow. What do you do?",
    emoji: "🌙",
    optionA: { text: "Sleep. Health first.", emoji: "😴" },
    optionB: { text: "Coffee up. Ship it.", emoji: "☕" },
    category: 'hustle',
    weights: [3, 8],
    color: '#FFD166',
  },
  {
    id: 2,
    question: "Your partner says: 'It's me or your startup.'",
    emoji: "💔",
    optionA: { text: "Choose love", emoji: "❤️" },
    optionB: { text: "Choose the grind", emoji: "💼" },
    category: 'sacrifice',
    weights: [4, 9],
    color: '#FF6B8A',
  },
  {
    id: 3,
    question: "You have $10K left in savings. Your startup needs cash.",
    emoji: "💸",
    optionA: { text: "Keep it safe", emoji: "🏦" },
    optionB: { text: "All in. Bet on yourself.", emoji: "🎰" },
    category: 'risk',
    weights: [3, 9],
    color: '#06D6A0',
  },
  {
    id: 4,
    question: "A 9-to-5 offers you $200K/year with full benefits.",
    emoji: "🏢",
    optionA: { text: "Take the bag", emoji: "💰" },
    optionB: { text: "Nah, I'm building my own thing", emoji: "🚀" },
    category: 'mindset',
    weights: [4, 8],
    color: '#118AB2',
  },
  {
    id: 5,
    question: "Your best friend asks you for a $50K loan.",
    emoji: "🤝",
    optionA: { text: "Help them out", emoji: "🫶" },
    optionB: { text: "Business is business. No.", emoji: "🚫" },
    category: 'emotional',
    weights: [3, 8],
    color: '#9B5DE5',
  },
  {
    id: 6,
    question: "Your mentor says your idea is trash.",
    emoji: "🗑️",
    optionA: { text: "Maybe they're right. Pivot.", emoji: "🔄" },
    optionB: { text: "They said the same about Airbnb.", emoji: "😤" },
    category: 'mindset',
    weights: [5, 8],
    color: '#F15BB5',
  },
  {
    id: 7,
    question: "You can party with your friends or study a new skill this weekend.",
    emoji: "🎉",
    optionA: { text: "YOLO, let's party", emoji: "🍻" },
    optionB: { text: "Lock in. Learn something.", emoji: "📚" },
    category: 'discipline',
    weights: [2, 9],
    color: '#00BBF9',
  },
  {
    id: 8,
    question: "A competitor copies your entire product.",
    emoji: "😡",
    optionA: { text: "Sue them", emoji: "⚖️" },
    optionB: { text: "Out-execute them", emoji: "⚡" },
    category: 'mindset',
    weights: [4, 9],
    color: '#FEE440',
  },
  {
    id: 9,
    question: "You failed publicly. Everyone saw it.",
    emoji: "📉",
    optionA: { text: "Lay low for a while", emoji: "🫣" },
    optionB: { text: "Post the L. Learn. Keep going.", emoji: "📝" },
    category: 'mindset',
    weights: [2, 10],
    color: '#FF9F1C',
  },
  {
    id: 10,
    question: "Your parents want you to get a 'real job.'",
    emoji: "👨‍👩‍👧",
    optionA: { text: "They have a point...", emoji: "🤔" },
    optionB: { text: "I'll make them proud my way", emoji: "💪" },
    category: 'sacrifice',
    weights: [3, 8],
    color: '#06D6A0',
  },
  {
    id: 11,
    question: "You get a chance to network at an exclusive event. But it's your mom's birthday.",
    emoji: "🎂",
    optionA: { text: "Family first. Always.", emoji: "👩‍👧" },
    optionB: { text: "Mom will understand. This is once in a lifetime.", emoji: "🤵" },
    category: 'emotional',
    weights: [5, 7],
    color: '#9B5DE5',
  },
  {
    id: 12,
    question: "You can either save or invest every spare dollar.",
    emoji: "📊",
    optionA: { text: "Save it. Security matters.", emoji: "🐖" },
    optionB: { text: "Invest aggressively. Compound.", emoji: "📈" },
    category: 'risk',
    weights: [4, 8],
    color: '#00BBF9',
  },
  {
    id: 13,
    question: "Someone offers you a shortcut that's ethically gray.",
    emoji: "🌫️",
    optionA: { text: "Hard pass. Integrity.", emoji: "🛡️" },
    optionB: { text: "Business is war.", emoji: "🗡️" },
    category: 'mindset',
    weights: [7, 5],
    color: '#FF6B8A',
  },
  {
    id: 14,
    question: "You've been grinding for 2 years with zero results.",
    emoji: "⏰",
    optionA: { text: "Time to be realistic", emoji: "🪞" },
    optionB: { text: "Year 3 is when it clicks", emoji: "🔥" },
    category: 'discipline',
    weights: [2, 9],
    color: '#FFD166',
  },
  {
    id: 15,
    question: "Would you rather be respected or rich?",
    emoji: "⚖️",
    optionA: { text: "Respected", emoji: "🙏" },
    optionB: { text: "Rich. Respect follows money.", emoji: "🤑" },
    category: 'mindset',
    weights: [5, 7],
    color: '#F15BB5',
  },
];

export type Answer = 'A' | 'B';
export type Answers = Record<number, Answer>;

export function calculateResult(answers: Answers): {
  score: number; // 0-100
  prediction: string;
  money: number;
  tier: 'broke' | 'surviving' | 'comfortable' | 'wealthy' | 'rich' | 'mega';
  traits: { name: string; score: number; emoji: string }[];
  roast: string;
} {
  const categoryScores: Record<string, { total: number; count: number }> = {
    hustle: { total: 0, count: 0 },
    sacrifice: { total: 0, count: 0 },
    mindset: { total: 0, count: 0 },
    risk: { total: 0, count: 0 },
    emotional: { total: 0, count: 0 },
    discipline: { total: 0, count: 0 },
  };

  let totalScore = 0;
  let maxPossible = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer) continue;

    const score = answer === 'A' ? q.weights[0] : q.weights[1];
    totalScore += score;
    maxPossible += 10;

    categoryScores[q.category].total += score;
    categoryScores[q.category].count += 1;
  }

  const normalizedScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  // Calculate trait scores (0-100)
  const traits = [
    {
      name: 'Hustle',
      score: categoryScores.hustle.count > 0
        ? Math.round((categoryScores.hustle.total / (categoryScores.hustle.count * 10)) * 100)
        : 0,
      emoji: '⚡',
    },
    {
      name: 'Sacrifice',
      score: categoryScores.sacrifice.count > 0
        ? Math.round((categoryScores.sacrifice.total / (categoryScores.sacrifice.count * 10)) * 100)
        : 0,
      emoji: '🔥',
    },
    {
      name: 'Mindset',
      score: categoryScores.mindset.count > 0
        ? Math.round((categoryScores.mindset.total / (categoryScores.mindset.count * 10)) * 100)
        : 0,
      emoji: '🧠',
    },
    {
      name: 'Risk Tolerance',
      score: categoryScores.risk.count > 0
        ? Math.round((categoryScores.risk.total / (categoryScores.risk.count * 10)) * 100)
        : 0,
      emoji: '🎲',
    },
    {
      name: 'Cold Blooded',
      score: categoryScores.emotional.count > 0
        ? Math.round((categoryScores.emotional.total / (categoryScores.emotional.count * 10)) * 100)
        : 0,
      emoji: '🧊',
    },
    {
      name: 'Discipline',
      score: categoryScores.discipline.count > 0
        ? Math.round((categoryScores.discipline.total / (categoryScores.discipline.count * 10)) * 100)
        : 0,
      emoji: '🎯',
    },
  ];

  // Money prediction based on score with some randomness for fun
  let money: number;
  let tier: 'broke' | 'surviving' | 'comfortable' | 'wealthy' | 'rich' | 'mega';
  let prediction: string;
  let roast: string;

  if (normalizedScore >= 85) {
    money = 2500000 + Math.floor(Math.random() * 2500000);
    tier = 'mega';
    prediction = "You're built different. Generational wealth incoming.";
    roast = "You chose violence in every answer. Your therapist is gonna be busy but your accountant will be busier.";
  } else if (normalizedScore >= 72) {
    money = 800000 + Math.floor(Math.random() * 700000);
    tier = 'rich';
    prediction = "You've got what it takes. Big bag energy.";
    roast = "You're hungry but you still have a heart. That's either your superpower or your weakness.";
  } else if (normalizedScore >= 58) {
    money = 300000 + Math.floor(Math.random() * 200000);
    tier = 'wealthy';
    prediction = "Solid moves. You'll be comfortable but not yacht-level.";
    roast = "You play it smart but sometimes too safe. Fortune favors the bold, and you're more like medium-bold.";
  } else if (normalizedScore >= 42) {
    money = 85000 + Math.floor(Math.random() * 65000);
    tier = 'comfortable';
    prediction = "You'll do okay. Not broke, not rich. The eternal middle.";
    roast = "You picked the safe option too many times. Your comfort zone has a comfort zone.";
  } else if (normalizedScore >= 25) {
    money = 35000 + Math.floor(Math.random() * 25000);
    tier = 'surviving';
    prediction = "You're surviving, not thriving. Might wanna rethink some things.";
    roast = "You chose love, sleep, and safety over money every time. Cute. Enjoy your roommates.";
  } else {
    money = 8000 + Math.floor(Math.random() * 12000);
    tier = 'broke';
    prediction = "NGL... you might not make it. But there's still time.";
    roast = "You literally chose every soft option. The grind chose you and you ghosted it.";
  }

  return { score: normalizedScore, prediction, money, tier, traits, roast };
}
