import { Badge, ScoreLevel, ScoreLevelTitle } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-beginner',
    title: 'Personal Branding Beginner',
    tier: 'Bronze',
    icon: 'Sparkles',
    category: 'Foundation',
    description: 'Took the first step to benchmark professional brand equity in the AI era.'
  },
  {
    id: 'badge-linkedin-opt',
    title: 'LinkedIn Optimizer',
    tier: 'Silver',
    icon: 'Share2',
    category: 'Optimization',
    description: 'Mastered high-converting profile hooks, keyword placement, and recruiter psychology.'
  },
  {
    id: 'badge-ai-creator',
    title: 'AI Creator',
    tier: 'Gold',
    icon: 'Bot',
    category: 'AI Mastery',
    description: 'Demonstrated cyborg-level generative AI synthesis without losing authentic human voice.'
  },
  {
    id: 'badge-networking-exp',
    title: 'Networking Explorer',
    tier: 'Silver',
    icon: 'Users',
    category: 'Connection',
    description: 'Excels at value-first outreach that triggers high executive response rates.'
  },
  {
    id: 'badge-thought-leader',
    title: 'Thought Leader',
    tier: 'Gold',
    icon: 'Lightbulb',
    category: 'Authority',
    description: 'Frames contrarian industry insights with intellectual rigor and collaborative nuance.'
  },
  {
    id: 'badge-digital-rep',
    title: 'Digital Reputation Expert',
    tier: 'Diamond',
    icon: 'ShieldCheck',
    category: 'Ethics & Defense',
    description: 'Protects proprietary assets and handles online crisis situations with executive poise.'
  },
  {
    id: 'badge-career-accel',
    title: 'Career Accelerator',
    tier: 'Gold',
    icon: 'TrendingUp',
    category: 'Advancement',
    description: 'Translates technical output into measurable business impact and internal visibility.'
  },
  {
    id: 'badge-ai-champion',
    title: 'AI Branding Champion',
    tier: 'Diamond',
    icon: 'Crown',
    category: 'Legendary',
    description: 'Ranked in the top 5% of all learners worldwide on the AI Personal Branding IQ.'
  },
  {
    id: 'badge-fast-thinker',
    title: 'Fast Thinker',
    tier: 'Silver',
    icon: 'Zap',
    category: 'Bonus Wheel',
    description: 'Won from the Lucky Spin Wheel for rapid decision-making instinct.'
  },
  {
    id: 'badge-ai-wizard',
    title: 'AI Wizard',
    tier: 'Gold',
    icon: 'Wand2',
    category: 'Bonus Wheel',
    description: 'Awarded for extraordinary creative mastery in AI prompt orchestration.'
  },
  {
    id: 'badge-linkedin-ninja',
    title: 'LinkedIn Ninja',
    tier: 'Gold',
    icon: 'Compass',
    category: 'Bonus Wheel',
    description: 'Stealth positioning that captures recruiter inbound flow effortlessly.'
  },
  {
    id: 'badge-golden',
    title: 'Golden Badge of Excellence',
    tier: 'Diamond',
    icon: 'Award',
    category: 'Special',
    description: 'Awarded by Kapil for extraordinary workplace scenario reasoning.'
  }
];

export const SCORE_LEVELS: ScoreLevel[] = [
  {
    min: 0,
    max: 20,
    title: 'Needs Improvement',
    description: 'Your digital footprint lacks definition and may communicate conflicting signals to industry recruiters.',
    badgeTier: 'Bronze',
    color: '#94A3B8'
  },
  {
    min: 21,
    max: 40,
    title: 'Emerging Professional',
    description: 'Basic profiles are established, but you lack consistent proof-of-work artifacts and strategic visibility.',
    badgeTier: 'Bronze',
    color: '#60A5FA'
  },
  {
    min: 41,
    max: 60,
    title: 'Growing Brand',
    description: 'Good fundamentals. Increasing consistency, active networking, and clearer positioning will unlock higher-tier opportunities.',
    badgeTier: 'Silver',
    color: '#38BDF8'
  },
  {
    min: 61,
    max: 80,
    title: 'Strong Professional Brand',
    description: 'Impressive brand authority. Recruiters and peers perceive you as a competent, articulate industry practitioner.',
    badgeTier: 'Gold',
    color: '#F59E0B'
  },
  {
    min: 81,
    max: 95,
    title: 'AI Branding Expert',
    description: 'Elite proficiency. You leverage AI tools with ethical clarity, deep domain insight, and magnetic personal voice.',
    badgeTier: 'Diamond',
    color: '#8B5CF6'
  },
  {
    min: 96,
    max: 100,
    title: 'Personal Branding Legend',
    description: 'World-class standard. Your personal brand commands premium trust, top inbound opportunities, and recognized thought leadership.',
    badgeTier: 'Diamond',
    color: '#EC4899'
  }
];

export function getScoreLevel(score: number): ScoreLevel {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  for (const level of SCORE_LEVELS) {
    if (clamped >= level.min && clamped <= level.max) {
      return level;
    }
  }
  return SCORE_LEVELS[0];
}
