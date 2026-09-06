import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AssessmentView } from './components/AssessmentView';
import { AssessmentReport } from './components/AssessmentReport';
import { CertificateModal } from './components/CertificateModal';
import { BonusRoundModal } from './components/BonusRoundModal';
import { UserDashboard } from './components/UserDashboard';
import { LeaderboardView } from './components/LeaderboardView';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LearnerProfile, AssessmentResult } from './types';
import { ALL_BADGES, getScoreLevel } from './data/badges';

const DEFAULT_PROFILE: LearnerProfile = {
  id: 'learner-me',
  name: 'Alex Rivera',
  email: 'alex.rivera@innovate.org',
  phone: '+1 (555) 234-5678',
  college: 'Tech Institute of Applied Sciences',
  company: 'NextScale AI',
  role: 'AI Product Specialist',
  linkedIn: 'https://linkedin.com/in/alexrivera-ai',
  portfolio: 'https://alexrivera.dev',
  github: 'https://github.com/alexrivera',
  skills: ['Generative AI', 'LinkedIn Strategy', 'Recruiter Positioning', 'Storytelling'],
  experience: '3+ Years',
  goals: 'Become a recognized thought leader in AI-assisted workflows and land executive advisory roles.',
  xp: 380,
  level: 2,
  coins: 120,
  streak: 3,
  lastActiveDate: 'Today',
  completedAssessments: 1,
  bestScore: 84,
  badges: ['badge-beginner', 'badge-linkedin-opt', 'badge-ai-creator']
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'dashboard' | 'leaderboard' | 'badges' | 'daily'>('assessment');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Learner Profile state
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(() => {
    const saved = localStorage.getItem('kapil_iq_learner_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Assessment History state
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>(() => {
    const saved = localStorage.getItem('kapil_iq_history');
    if (saved) return JSON.parse(saved);
    // Initial sample attempt
    return [{
      id: 'res-init-1',
      learnerName: 'Alex Rivera',
      learnerEmail: 'alex.rivera@innovate.org',
      date: 'Sep 4, 2026',
      totalQuestions: 15,
      correctAnswers: 13,
      rawScore: 84,
      bonusPoints: 0,
      finalScore: 84,
      scoreLevel: 'AI Branding Expert',
      timeSpentSeconds: 540,
      careerReadiness: 85,
      linkedInReadiness: 88,
      networkingReadiness: 80,
      aiUsageScore: 86,
      communicationScore: 82,
      visibilityScore: 83,
      strengths: ['High-converting LinkedIn headline positioning', 'Cyborg human-AI content synthesis'],
      weaknesses: ['Could refine contrarian thought-leadership presentation'],
      recommendations: ['Publish monthly deep-dive case studies', 'Audit featured artifacts'],
      learningRoadmap: [
        { step: 'Digital Audit', timeline: 'Week 1', action: 'Unify public profiles' },
        { step: 'Proof of Work', timeline: 'Week 2-3', action: 'Write end-to-end framework' }
      ],
      certificateId: 'KAPIL-IQ-84192',
      verificationCode: 'VER-84192ABC',
      userAnswers: []
    }];
  });

  // Current active result (if assessment was just finished)
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);

  // Modals state
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [certData, setCertData] = useState({
    name: 'Alex Rivera',
    score: 84,
    scoreLevel: 'AI Branding Expert',
    certificateId: 'KAPIL-IQ-84192',
    date: 'Sep 4, 2026',
    verification: 'VER-84192ABC'
  });

  const [isBonusWheelOpen, setIsBonusWheelOpen] = useState(false);
  const [hasSpunWheel, setHasSpunWheel] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('kapil_iq_learner_profile', JSON.stringify(learnerProfile));
  }, [learnerProfile]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('kapil_iq_history', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  const handleAssessmentComplete = (res: AssessmentResult) => {
    setCurrentResult(res);
    setHasSpunWheel(false);

    // Update history
    setAssessmentHistory(prev => [res, ...prev]);

    // Update Profile XP & best score
    setLearnerProfile(prev => {
      const newXP = prev.xp + 250;
      const newCoins = prev.coins + 60;
      const newLevel = Math.floor(newXP / 300) + 1;
      const newBest = Math.max(prev.bestScore, res.finalScore);
      const newCompleted = prev.completedAssessments + 1;
      
      const newBadges = [...prev.badges];
      if (res.finalScore >= 80 && !newBadges.includes('badge-ai-champion')) {
        newBadges.push('badge-ai-champion');
      }
      if (res.finalScore >= 60 && !newBadges.includes('badge-thought-leader')) {
        newBadges.push('badge-thought-leader');
      }

      return {
        ...prev,
        xp: newXP,
        coins: newCoins,
        level: newLevel,
        bestScore: newBest,
        completedAssessments: newCompleted,
        badges: newBadges
      };
    });

    // Configure certificate
    setCertData({
      name: res.learnerName,
      score: res.finalScore,
      scoreLevel: res.scoreLevel,
      certificateId: res.certificateId,
      date: res.date,
      verification: res.verificationCode
    });
  };

  const handleBonusRewardClaimed = (rewardText: string, bonusIQ: number, bonusXP: number, extraBadge?: string) => {
    setHasSpunWheel(true);
    if (currentResult) {
      const updatedFinalScore = Math.min(100, currentResult.finalScore + bonusIQ);
      const updatedLevel = getScoreLevel(updatedFinalScore).title;
      const updatedResult: AssessmentResult = {
        ...currentResult,
        bonusPoints: currentResult.bonusPoints + bonusIQ,
        finalScore: updatedFinalScore,
        scoreLevel: updatedLevel
      };
      setCurrentResult(updatedResult);

      setCertData(prev => ({
        ...prev,
        score: updatedFinalScore,
        scoreLevel: updatedLevel
      }));

      setAssessmentHistory(prev => prev.map(item => item.id === updatedResult.id ? updatedResult : item));
    }

    setLearnerProfile(prev => {
      const badges = [...prev.badges];
      if (extraBadge && !badges.includes(extraBadge)) {
        badges.push(extraBadge);
      }
      return {
        ...prev,
        xp: prev.xp + bonusXP,
        coins: prev.coins + 30,
        badges
      };
    });
  };

  const handleClaimDaily = (xp: number, coins: number) => {
    setLearnerProfile(prev => ({
      ...prev,
      xp: prev.xp + xp,
      coins: prev.coins + coins,
      streak: prev.streak + 1
    }));
  };

  const handleViewHistoricalCert = (certId: string) => {
    const item = assessmentHistory.find(h => h.certificateId === certId);
    if (item) {
      setCertData({
        name: item.learnerName,
        score: item.finalScore,
        scoreLevel: item.scoreLevel,
        certificateId: item.certificateId,
        date: item.date,
        verification: item.verificationCode
      });
      setIsCertOpen(true);
    }
  };

  const handleAdminReissue = (learnerName: string, score: number) => {
    const scoreLevel = getScoreLevel(score).title;
    setCertData({
      name: learnerName,
      score,
      scoreLevel,
      certificateId: `KAPIL-REISSUE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      verification: 'ADMIN-VERIFIED-KAPIL'
    });
    setIsCertOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans antialiased flex flex-col justify-between transition-colors ${
      darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-900'
    }`}>
      <div className="flex-1">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'daily') setIsDailyOpen(true);
          }}
          learnerProfile={learnerProfile}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'assessment' && (
            currentResult ? (
              <AssessmentReport
                result={currentResult}
                onRetake={() => setCurrentResult(null)}
                onOpenCertificate={() => setIsCertOpen(true)}
                onOpenBonusWheel={() => setIsBonusWheelOpen(true)}
                hasSpunWheel={hasSpunWheel}
              />
            ) : (
              <AssessmentView
                learnerProfile={learnerProfile}
                onComplete={handleAssessmentComplete}
              />
            )
          )}

          {activeTab === 'dashboard' && (
            <UserDashboard
              learnerProfile={learnerProfile}
              onUpdateProfile={setLearnerProfile}
              assessmentHistory={assessmentHistory}
              onViewCertificate={handleViewHistoricalCert}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              currentLearnerScore={learnerProfile.bestScore}
              currentLearnerName={learnerProfile.name}
            />
          )}

          {activeTab === 'badges' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3 font-bold">Industry Recognition</div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                  All Badges &amp; <span className="text-zinc-600">Distinctions</span>
                </h1>
                <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                  Complete workplace assessments, maintain daily evaluation streaks, and unlock Diamond tier credentials.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                  {ALL_BADGES.map(badge => {
                    const unlocked = learnerProfile.badges.includes(badge.id) || learnerProfile.badges.includes(badge.title);
                    return (
                      <div key={badge.id} className={`p-5 rounded-2xl border text-left transition-all ${
                        unlocked 
                          ? 'bg-zinc-900 border-zinc-700 shadow-xl' 
                          : 'bg-zinc-950/40 border-zinc-900 opacity-30 grayscale'
                      }`}>
                        <div className="w-10 h-10 mb-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-black">
                          🏆
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">{badge.title}</h4>
                        <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-1">
                          {badge.tier} Tier
                        </span>
                        <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">{badge.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="max-w-xl mx-auto py-16 text-center space-y-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Daily Evaluation Sprint</div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Daily Flash Dilemma</h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Maintain your streak, challenge your instincts, and claim instant XP bonuses.
              </p>
              <button
                onClick={() => setIsDailyOpen(true)}
                className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
              >
                Launch Today's Sprint
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Bold Typography Theme Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] gap-3">
        <div>Assessment Engine &bull; Powered by Kapil</div>
        <div>© 2026 Personal Branding IQ &bull; Core Operations</div>
        <div>Build v2.4.1 &bull; 300 DPI Verified</div>
      </footer>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        learnerName={certData.name}
        score={certData.score}
        scoreLevel={certData.scoreLevel}
        certificateId={certData.certificateId}
        issueDate={certData.date}
        verificationCode={certData.verification}
      />

      <BonusRoundModal
        isOpen={isBonusWheelOpen}
        onClose={() => setIsBonusWheelOpen(false)}
        onRewardClaimed={handleBonusRewardClaimed}
        currentIQ={currentResult?.finalScore || 80}
      />

      <DailyChallengeModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        onClaimDailyXP={handleClaimDaily}
        streak={learnerProfile.streak}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onReissueCert={handleAdminReissue}
      />
    </div>
  );
}
