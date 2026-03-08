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
    question: "Your product has 100 users who LOVE it. But growth is slow.",
    emoji: "🔬",
    optionA: { text: "Perfect the product. Let it spread.", emoji: "🍎" },
    optionB: { text: "Scale now. Fix it on the way up.", emoji: "🚀" },
    category: 'hustle',
    weights: [6, 8],
    color: '#FFD166',
  },
  {
    id: 2,
    question: "You're burning out. Your co-founder offers to run things for 6 months so you can recharge.",
    emoji: "🔋",
    optionA: { text: "Step back. Come back stronger.", emoji: "🧘" },
    optionB: { text: "Nobody runs this but me.", emoji: "👑" },
    category: 'sacrifice',
    weights: [7, 6],
    color: '#FF6B8A',
  },
  {
    id: 3,
    question: "Two investors. One offers $500K for 10%. The other offers $2M for 40%.",
    emoji: "🤝",
    optionA: { text: "Less money. Keep control.", emoji: "🎯" },
    optionB: { text: "Big check. Move 10x faster.", emoji: "⚡" },
    category: 'risk',
    weights: [7, 7],
    color: '#06D6A0',
  },
  {
    id: 4,
    question: "You can build something you're deeply passionate about, or something the market is clearly begging for.",
    emoji: "🧭",
    optionA: { text: "Follow my obsession.", emoji: "❤️‍🔥" },
    optionB: { text: "Follow the demand.", emoji: "📊" },
    category: 'mindset',
    weights: [6, 7],
    color: '#118AB2',
  },
  {
    id: 5,
    question: "Your early employee — also a close friend — is underperforming. They're going through personal stuff.",
    emoji: "😔",
    optionA: { text: "Give them time. Loyalty matters.", emoji: "🤝" },
    optionB: { text: "Have the hard conversation now.", emoji: "💬" },
    category: 'emotional',
    weights: [5, 8],
    color: '#9B5DE5',
  },
  {
    id: 6,
    question: "An early-stage rocket ship wants you as employee #5. Your own startup is barely surviving.",
    emoji: "🚀",
    optionA: { text: "Join the rocket. Ride the wave.", emoji: "🏄" },
    optionB: { text: "Stay on my own path. No matter what.", emoji: "🛤️" },
    category: 'mindset',
    weights: [7, 6],
    color: '#F15BB5',
  },
  {
    id: 7,
    question: "A VC wants to fund you — but only if you completely pivot your model.",
    emoji: "💰",
    optionA: { text: "Pivot. Smart money sees something I don't.", emoji: "🔄" },
    optionB: { text: "I know my vision better than any VC.", emoji: "🧠" },
    category: 'discipline',
    weights: [6, 7],
    color: '#00BBF9',
  },
  {
    id: 8,
    question: "Your product is 80% ready. You can launch now or wait 3 months for perfection.",
    emoji: "⏳",
    optionA: { text: "Ship it. Iterate in public.", emoji: "📦" },
    optionB: { text: "Wait. First impressions are everything.", emoji: "💎" },
    category: 'mindset',
    weights: [8, 5],
    color: '#FEE440',
  },
  {
    id: 9,
    question: "Someone offers you a guaranteed $500K exit right now. Or you keep going for a potential $10M in 3 years.",
    emoji: "🎰",
    optionA: { text: "A bird in hand. Take the $500K.", emoji: "🏦" },
    optionB: { text: "I didn't come this far to settle.", emoji: "🔥" },
    category: 'risk',
    weights: [6, 7],
    color: '#FF9F1C',
  },
  {
    id: 10,
    question: "Your co-founder wants to bring on a third partner who's insanely talented... but you can't stand them personally.",
    emoji: "😬",
    optionA: { text: "Chemistry matters. Hard pass.", emoji: "🧪" },
    optionB: { text: "Talent wins. I'll deal with it.", emoji: "🏆" },
    category: 'sacrifice',
    weights: [5, 8],
    color: '#06D6A0',
  },
  {
    id: 11,
    question: "A customer publicly roasts your product. Their complaints are actually valid.",
    emoji: "🔥",
    optionA: { text: "Respond publicly. Own the L.", emoji: "🫡" },
    optionB: { text: "Fix it silently. Never show weakness.", emoji: "🥷" },
    category: 'emotional',
    weights: [7, 6],
    color: '#9B5DE5',
  },
  {
    id: 12,
    question: "You can keep 100% of your small profitable company, or give 50% to someone who could 10x it.",
    emoji: "🍰",
    optionA: { text: "100% of mine. I built this.", emoji: "🏠" },
    optionB: { text: "50% of a rocket > 100% of a bicycle.", emoji: "🚲" },
    category: 'risk',
    weights: [5, 8],
    color: '#00BBF9',
  },
  {
    id: 13,
    question: "You have a profitable business. A new trend could be massive but means starting from zero.",
    emoji: "🌊",
    optionA: { text: "Protect what I built. Stay the course.", emoji: "🏰" },
    optionB: { text: "Burn the boats. Catch the wave.", emoji: "🏄" },
    category: 'discipline',
    weights: [6, 7],
    color: '#FF6B8A',
  },
  {
    id: 14,
    question: "You can go all in on one thing, or spread across multiple income streams.",
    emoji: "🎯",
    optionA: { text: "One thing. Obsessive focus wins.", emoji: "🔍" },
    optionB: { text: "Diversify. Never depend on one thing.", emoji: "🌐" },
    category: 'hustle',
    weights: [7, 6],
    color: '#FFD166',
  },
  {
    id: 15,
    question: "Would you rather be the CEO of a $10M company, or the #2 at a $1B company?",
    emoji: "👔",
    optionA: { text: "CEO. My name on the building.", emoji: "🏢" },
    optionB: { text: "#2 at the top. Bigger game.", emoji: "🌍" },
    category: 'mindset',
    weights: [6, 7],
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
