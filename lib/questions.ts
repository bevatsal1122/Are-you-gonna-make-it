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

  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  if (normalizedScore >= 90) {
    money = 2500000 + Math.floor(Math.random() * 2500000);
    tier = 'mega';
    prediction = pick([
      "You're built different. Generational wealth incoming.",
      "The universe owes you a bag and it's about to pay up.",
      "You don't chase money. Money chases you.",
      "You're not just gonna make it — you're gonna own the game.",
      "Retirement at 35? Yeah, that's realistic for you.",
    ]);
    roast = pick([
      "You chose violence in every answer. Your therapist is gonna be busy but your accountant will be busier.",
      "You'd sell your grandma's cookies for equity. Respect, but also... yikes.",
      "Congrats, you have the emotional range of a spreadsheet. But a very profitable spreadsheet.",
      "You're basically a capitalism speedrun. Touch grass occasionally.",
      "Your friends are scared of you and your enemies are inspired. That's the vibe.",
    ]);
  } else if (normalizedScore >= 72) {
    money = 800000 + Math.floor(Math.random() * 700000);
    tier = 'rich';
    prediction = pick([
      "You've got what it takes. Big bag energy.",
      "You're on a collision course with serious wealth.",
      "Smart moves, sharp instincts. The bag is coming.",
      "You've got the recipe. Now just don't burn the kitchen down.",
      "Top 10% energy. You're gonna eat well.",
    ]);
    roast = pick([
      "You're hungry but you still have a heart. That's either your superpower or your weakness.",
      "You almost went full shark mode but chickened out on a few. Still solid though.",
      "You've got the ambition of a wolf and the occasional softness of a golden retriever.",
      "You'll be rich but you'll still cry at movies. A balanced king/queen.",
      "One or two more ruthless answers and you'd be in mega territory. So close.",
    ]);
  } else if (normalizedScore >= 63) {
    money = 300000 + Math.floor(Math.random() * 200000);
    tier = 'wealthy';
    prediction = pick([
      "Solid moves. You'll be comfortable but not yacht-level.",
      "You're building something real. Steady wins the race.",
      "Upper middle class with a side of ambition. Not bad at all.",
      "You won't be broke, but you won't be on Forbes either. And that's okay.",
      "Comfortable life, nice vacations, zero financial panic. You'll take it.",
    ]);
    roast = pick([
      "You play it smart but sometimes too safe. Fortune favors the bold, and you're more like medium-bold.",
      "You're the human equivalent of a diversified portfolio. Stable but not exciting.",
      "You hedged every bet. Safe? Yes. Legendary? Nah.",
      "You'll never go broke but you'll also never have a Wikipedia page.",
      "Your risk tolerance is like mild salsa — technically spicy but nobody's sweating.",
    ]);
  } else if (normalizedScore >= 42) {
    money = 85000 + Math.floor(Math.random() * 65000);
    tier = 'comfortable';
    prediction = pick([
      "You'll do okay. Not broke, not rich. The eternal middle.",
      "Average is not an insult. It's a lifestyle. And it's yours.",
      "You'll pay your bills on time and that's more than most.",
      "Middle of the pack. You'll survive every recession but never pop champagne.",
      "Steady income, steady life. No fireworks, no fires.",
    ]);
    roast = pick([
      "You picked the safe option too many times. Your comfort zone has a comfort zone.",
      "You're the person who orders the same thing at every restaurant. Reliable but boring.",
      "You'll never be broke but you'll also never know what first class feels like.",
      "Your financial strategy is basically 'hope for the best.' Bold in its own way.",
      "You treat risk like it's a ghost story — fun to hear about but you'd never go near it.",
    ]);
  } else if (normalizedScore >= 25) {
    money = 35000 + Math.floor(Math.random() * 25000);
    tier = 'surviving';
    prediction = pick([
      "You're surviving, not thriving. Might wanna rethink some things.",
      "You'll keep the lights on. Barely. But you'll keep them on.",
      "Ramen budget with champagne dreams. Something's gotta give.",
      "You're one bad month away from a GoFundMe. Let's fix that.",
      "Paycheck to paycheck with a positive attitude. Admirable but concerning.",
    ]);
    roast = pick([
      "You chose love, sleep, and safety over money every time. Cute. Enjoy your roommates.",
      "You have the financial instincts of a golden retriever chasing a butterfly.",
      "You said 'money isn't everything' and your bank account took it personally.",
      "At this rate your retirement plan is hoping your kids are successful.",
      "You're allergic to risk and it shows. Your savings account is begging for help.",
    ]);
  } else {
    money = 8000 + Math.floor(Math.random() * 12000);
    tier = 'broke';
    prediction = pick([
      "NGL... you might not make it. But there's still time.",
      "You're speedrunning poverty. Impressive in a terrifying way.",
      "Financial ruin any% world record attempt detected.",
      "The universe tried to help you and you said 'nah I'm good.'",
      "There's still hope. Probably. Maybe. We'll see.",
    ]);
    roast = pick([
      "You literally chose every soft option. The grind chose you and you ghosted it.",
      "Your financial future looks like a horror movie and you're the person who goes into the basement.",
      "You'd rather be liked than paid. Congrats, you're broke AND popular.",
      "You chose vibes over money every single time. At least you'll be happy... right?",
      "If avoiding money was a sport, you'd be an Olympic gold medalist.",
    ]);
  }

  return { score: normalizedScore, prediction, money, tier, traits, roast };
}
