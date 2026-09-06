export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type SkillDomain =
  | 'Personal Branding'
  | 'LinkedIn Optimization'
  | 'Networking'
  | 'Professional Communication'
  | 'AI for Content Creation'
  | 'Thought Leadership'
  | 'Digital Reputation'
  | 'Professional Ethics'
  | 'Career Visibility'
  | 'Recruiter Psychology'
  | 'Portfolio Building'
  | 'Resume Positioning'
  | 'Employer Branding'
  | 'Public Speaking'
  | 'Storytelling'
  | 'Content Marketing'
  | 'Influence Building'
  | 'Professional Writing'
  | 'Brand Consistency'
  | 'AI Productivity'
  | 'Professional Decision Making'
  | 'Future of Work'
  | 'Personal Website'
  | 'Online Presence'
  | 'Interview Positioning'
  | 'Career Growth Strategy';

export interface Question {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: Difficulty;
  category: SkillDomain;
  estimatedSeconds: number;
}

export type ScoreLevelTitle =
  | 'Needs Improvement'
  | 'Emerging Professional'
  | 'Growing Brand'
  | 'Strong Professional Brand'
  | 'AI Branding Expert'
  | 'Personal Branding Legend';

export interface ScoreLevel {
  min: number;
  max: number;
  title: ScoreLevelTitle;
  description: string;
  badgeTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  color: string;
}

export interface DomainScore {
  domain: string;
  score: number; // 0-100
  correct: number;
  total: number;
}

export interface AssessmentResult {
  id: string;
  learnerName: string;
  learnerEmail: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  rawScore: number; // 0-100
  bonusPoints: number;
  finalScore: number; // clamped to 100
  scoreLevel: ScoreLevelTitle;
  timeSpentSeconds: number;
  careerReadiness: number;
  linkedInReadiness: number;
  networkingReadiness: number;
  aiUsageScore: number;
  communicationScore: number;
  visibilityScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  learningRoadmap: { step: string; timeline: string; action: string }[];
  certificateId: string;
  verificationCode: string;
  badgeAwarded?: string;
  userAnswers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  icon: string;
  description: string;
  unlockedAt?: string;
  category: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  company: string;
  role: string;
  linkedIn: string;
  portfolio: string;
  github: string;
  skills: string[];
  experience: string;
  goals: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  completedAssessments: number;
  bestScore: number;
  badges: string[]; // badge ids
}

export interface AdminLearnerRecord {
  id: string;
  name: string;
  email: string;
  college: string;
  company: string;
  role: string;
  attemptsCount: number;
  highestScore: number;
  lastAttemptDate: string;
  status: 'Active' | 'Inactive';
  certificateIssued: boolean;
  certificateId?: string;
  badgeTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
}
