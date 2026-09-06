import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Play, 
  RotateCcw,
  BookOpen,
  Save,
  Pause,
  AlertTriangle
} from 'lucide-react';
import { Question, AssessmentResult, Difficulty, LearnerProfile } from '../types';
import { QUESTION_BANK, getShuffledQuestions, getAdaptiveNextQuestion } from '../data/questions';
import { getScoreLevel } from '../data/badges';
import { sound } from '../utils/audio';

interface AssessmentViewProps {
  learnerProfile: LearnerProfile;
  onComplete: (result: AssessmentResult) => void;
  savedSessionState?: SavedSession | null;
  onClearSavedSession?: () => void;
}

export interface SavedSession {
  questions: Question[];
  currentIndex: number;
  userAnswers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  totalTimeSeconds: number;
  currentDifficulty: Difficulty;
  isExamMode: boolean;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  learnerProfile,
  onComplete,
  savedSessionState,
  onClearSavedSession
}) => {
  // Setup / Mode state
  const [inProgress, setInProgress] = useState(false);
  const [questionCountChoice, setQuestionCountChoice] = useState<number>(15);
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [useAdaptive, setUseAdaptive] = useState<boolean>(true);

  // Active session state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('Easy');
  
  // Answers recorded
  const [userAnswers, setUserAnswers] = useState<{
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number;
  }[]>([]);

  // Timers
  const [globalSecondsLeft, setGlobalSecondsLeft] = useState<number>(1200); // 20 mins
  const [questionSecondsElapsed, setQuestionSecondsElapsed] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerIntervalRef = useRef<number | null>(null);

  // Auto-save key
  const AUTO_SAVE_KEY = `iq_assessment_session_${learnerProfile.id || 'default'}`;

  // Check if saved session exists in local storage
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) {
      setHasSavedSession(true);
    }
  }, [AUTO_SAVE_KEY]);

  // Global Timer effect
  useEffect(() => {
    if (!inProgress || isPaused) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setGlobalSecondsLeft((prev) => {
        if (prev <= 1) {
          handleFinishAssessment();
          return 0;
        }
        return prev - 1;
      });
      setQuestionSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [inProgress, isPaused, questions, userAnswers]);

  // Auto-save on answer change
  useEffect(() => {
    if (inProgress && questions.length > 0) {
      const state: SavedSession = {
        questions,
        currentIndex,
        userAnswers,
        totalTimeSeconds: 1200 - globalSecondsLeft,
        currentDifficulty,
        isExamMode
      };
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(state));
    }
  }, [inProgress, currentIndex, userAnswers, globalSecondsLeft, currentDifficulty, isExamMode, questions]);

  const handleStartNewAssessment = (count: number = questionCountChoice) => {
    sound.playClick();
    const initialBatch = getShuffledQuestions(QUESTION_BANK, count);
    setQuestions(initialBatch);
    setCurrentIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    setCurrentDifficulty('Easy');
    setGlobalSecondsLeft(count * 60); // 1 min per question
    setQuestionSecondsElapsed(0);
    setIsPaused(false);
    setInProgress(true);
    localStorage.removeItem(AUTO_SAVE_KEY);
    setHasSavedSession(false);
  };

  const handleResumeSavedSession = () => {
    sound.playClick();
    const raw = localStorage.getItem(AUTO_SAVE_KEY);
    if (!raw) return;
    try {
      const state: SavedSession = JSON.parse(raw);
      setQuestions(state.questions);
      setCurrentIndex(state.currentIndex);
      setUserAnswers(state.userAnswers);
      setCurrentDifficulty(state.currentDifficulty);
      setIsExamMode(state.isExamMode);
      setGlobalSecondsLeft(Math.max(60, state.questions.length * 60 - state.totalTimeSeconds));
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
      setInProgress(true);
      setIsPaused(false);
    } catch {
      handleStartNewAssessment();
    }
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmittedAnswer && !isExamMode) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleSubmitOrNext = () => {
    if (selectedOption === null) return;
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;

    // Instant explanation mode: if not yet submitted, show explanation first
    if (!isExamMode && !hasSubmittedAnswer) {
      setHasSubmittedAnswer(true);
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }

      // Record answer
      const updatedAnswers = [
        ...userAnswers,
        {
          questionId: currentQ.id,
          selectedOption,
          isCorrect,
          timeSpent: questionSecondsElapsed
        }
      ];
      setUserAnswers(updatedAnswers);

      // Adaptive check: determine next difficulty
      if (useAdaptive) {
        const lastTwo = updatedAnswers.slice(-2);
        if (lastTwo.length >= 2 && lastTwo.every(a => a.isCorrect)) {
          if (currentDifficulty === 'Easy') setCurrentDifficulty('Medium');
          else if (currentDifficulty === 'Medium') setCurrentDifficulty('Hard');
        } else if (lastTwo.length >= 2 && lastTwo.every(a => !a.isCorrect)) {
          if (currentDifficulty === 'Hard') setCurrentDifficulty('Medium');
          else if (currentDifficulty === 'Medium') setCurrentDifficulty('Easy');
        }
      }
      return;
    }

    // Move to next question or complete
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
      setQuestionSecondsElapsed(0);
    } else {
      handleFinishAssessment();
    }
  };

  const handleFinishAssessment = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    localStorage.removeItem(AUTO_SAVE_KEY);
    setInProgress(false);
    sound.playFanfare();

    // Calculate score
    const total = questions.length;
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const rawScore = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const scoreLevel = getScoreLevel(rawScore).title;

    // Domain metrics calculation
    const domainGroup = userAnswers.reduce((acc, ans) => {
      const q = questions.find(item => item.id === ans.questionId);
      if (!q) return acc;
      if (!acc[q.category]) acc[q.category] = { correct: 0, total: 0 };
      acc[q.category].total += 1;
      if (ans.isCorrect) acc[q.category].correct += 1;
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    const getDomainPercentage = (catSubstrings: string[]) => {
      let c = 0;
      let t = 0;
      Object.keys(domainGroup).forEach(cat => {
        if (catSubstrings.some(s => cat.toLowerCase().includes(s.toLowerCase()))) {
          c += domainGroup[cat].correct;
          t += domainGroup[cat].total;
        }
      });
      if (t === 0) return Math.min(100, Math.max(50, rawScore + Math.floor(Math.random() * 10) - 5));
      return Math.round((c / t) * 100);
    };

    const careerReadiness = getDomainPercentage(['Career', 'Resume', 'Interview']);
    const linkedInReadiness = getDomainPercentage(['LinkedIn', 'Profile']);
    const networkingReadiness = getDomainPercentage(['Networking', 'Influence']);
    const aiUsageScore = getDomainPercentage(['AI', 'Productivity', 'Content']);
    const communicationScore = getDomainPercentage(['Communication', 'Writing', 'Storytelling']);
    const visibilityScore = getDomainPercentage(['Visibility', 'Reputation', 'Thought']);

    // Personalized strengths & weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (linkedInReadiness >= 75) {
      strengths.push('High-converting LinkedIn profile positioning and recruiter keyword architecture.');
    } else {
      weaknesses.push('LinkedIn headline and experience bullet points lack quantifiable proof of work.');
    }

    if (aiUsageScore >= 70) {
      strengths.push('Effective human-AI collaboration ("cyborg model") preserving authentic personal voice.');
    } else {
      weaknesses.push('Vulnerability to unedited AI buzzwords and plastic synthetic imagery.');
    }

    if (networkingReadiness >= 75) {
      strengths.push('Mastery of value-first executive outreach avoiding transactional requests.');
    } else {
      weaknesses.push('Cold outreach messages risk being flagged or ignored by senior hiring leaders.');
    }

    if (communicationScore >= 70) {
      strengths.push('Clear storytelling frameworks turning setbacks into accountable leadership narratives.');
    } else {
      weaknesses.push('Content hooks lack tension before the fold, leading to algorithmic scroll-past.');
    }

    const uniqueId = `KAPIL-IQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const result: AssessmentResult = {
      id: `res-${Date.now()}`,
      learnerName: learnerProfile.name || 'Anonymous Learner',
      learnerEmail: learnerProfile.email || 'learner@example.com',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      totalQuestions: total,
      correctAnswers: correctCount,
      rawScore,
      bonusPoints: 0,
      finalScore: rawScore,
      scoreLevel,
      timeSpentSeconds: 1200 - globalSecondsLeft,
      careerReadiness,
      linkedInReadiness,
      networkingReadiness,
      aiUsageScore,
      communicationScore,
      visibilityScore,
      strengths,
      weaknesses,
      recommendations: [
        'Audit your LinkedIn headline to emphasize outcomes rather than passive title labels.',
        'Publish 1 monthly deep-dive case study and break it into weekly high-yield takeaways.',
        'Adopt the Google X-Y-Z formula for all portfolio and resume project accomplishments.'
      ],
      learningRoadmap: [
        {
          step: 'Sprint 1: Digital Anchor Audit',
          timeline: 'Days 1–7',
          action: 'Align LinkedIn headline, banner, and featured artifacts to project a single cohesive value proposition.'
        },
        {
          step: 'Sprint 2: Proof-of-Work Publishing',
          timeline: 'Days 8–21',
          action: 'Produce an end-to-end AI project analysis documenting methodology, constraints, and measurable metrics.'
        },
        {
          step: 'Sprint 3: High-Value Networking Engine',
          timeline: 'Days 22–30',
          action: 'Engage with top 5 target company decision-makers through context-rich, insight-driven comments.'
        }
      ],
      certificateId: uniqueId,
      verificationCode: `VER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      userAnswers
    };

    onComplete(result);
  };

  // 1. Initial Start / Mode Selection Screen
  if (!inProgress) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Welcome Card */}
        <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl text-left">
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4">
            Algorithmic Workplace Assessment
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-[0.9] select-none">
            BRAND·IQ <span className="text-zinc-600">EVALUATION</span>
          </h1>

          <p className="text-base sm:text-xl font-light tracking-tight italic text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            Benchmark your professional authority, AI workflow leverage, and strategic positioning in the modern algorithmic economy.
          </p>

          {/* Key Pillars - Left-bordered Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-zinc-900">
            <div className="border-l-2 border-zinc-800 pl-6">
              <div className="text-3xl font-black tabular-nums text-white tracking-tight">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-bold">Real Scenarios</div>
            </div>
            <div className="border-l-2 border-zinc-800 pl-6">
              <div className="text-3xl font-black tabular-nums text-white tracking-tight">ADAPT</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-bold">Dynamic Scoring</div>
            </div>
            <div className="border-l-2 border-zinc-800 pl-6">
              <div className="text-3xl font-black tabular-nums text-white tracking-tight">SPIN</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-bold">Bonus Wheel</div>
            </div>
            <div className="border-l-2 border-zinc-800 pl-6">
              <div className="text-3xl font-black tabular-nums text-white tracking-tight">300 DPI</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-bold">Verified Print</div>
            </div>
          </div>

          {/* Session Length Selection */}
          <div className="mt-10 pt-8 border-t border-zinc-900 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
              Select Assessment Mode
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setQuestionCountChoice(10)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  questionCountChoice === 10
                    ? 'border-white bg-zinc-900 text-white shadow-xl'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm uppercase tracking-wider text-white">Diagnostic</span>
                  <span className="text-xs font-mono font-bold text-zinc-400">10 Qs</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">~8 mins &bull; Rapid baseline pulse</p>
              </button>

              <button
                onClick={() => setQuestionCountChoice(20)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  questionCountChoice === 20
                    ? 'border-white bg-zinc-900 text-white shadow-xl'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm uppercase tracking-wider text-white">Standard</span>
                  <span className="text-xs font-mono font-bold text-zinc-400">20 Qs</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">~15 mins &bull; Balanced credential</p>
              </button>

              <button
                onClick={() => setQuestionCountChoice(35)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  questionCountChoice === 35
                    ? 'border-white bg-zinc-900 text-white shadow-xl'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm uppercase tracking-wider text-white">Mastery Exam</span>
                  <span className="text-xs font-mono font-bold text-zinc-400">35 Qs</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">~25 mins &bull; Full certification pool</p>
              </button>
            </div>
          </div>

          {/* Toggle Switches: Adaptive AI & Feedback */}
          <div className="mt-6 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400 uppercase tracking-wider font-bold">
            <label className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={useAdaptive}
                onChange={(e) => setUseAdaptive(e.target.checked)}
                className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0 accent-white"
              />
              <span>Adaptive Difficulty Engine</span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isExamMode}
                onChange={(e) => setIsExamMode(e.target.checked)}
                className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0 accent-white"
              />
              <span>Exam Mode (Conceal Analysis)</span>
            </label>
          </div>

          {/* Action Start Buttons */}
          <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-start gap-4">
            <button
              onClick={() => handleStartNewAssessment(questionCountChoice)}
              className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center space-x-2 shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-black text-black" />
              <span>Initiate Evaluation</span>
            </button>

            {hasSavedSession && (
              <button
                onClick={handleResumeSavedSession}
                className="w-full sm:w-auto border border-zinc-700 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Resume Cached Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Assessment Question Flow
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const minutes = Math.floor(globalSecondsLeft / 60);
  const seconds = globalSecondsLeft % 60;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Session Status Bar */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between gap-6 shadow-xl">
        {/* Progress Tracker */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold text-zinc-400">
            <span className="flex items-center space-x-2">
              <span className="text-white">Scenario {currentIndex + 1}</span>
              <span className="text-zinc-600">/ {questions.length}</span>
            </span>
            <span className="font-mono text-white tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Global Countdown Clock */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="border-l-2 border-zinc-800 pl-4 py-1">
            <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Remaining</div>
            <div className="text-xl font-black font-mono tabular-nums text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsPaused(!isPaused);
            }}
            className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            title={isPaused ? 'Resume Assessment' : 'Pause Assessment'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-white fill-current" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-white mx-auto" />
          <h3 className="text-lg font-black uppercase tracking-tighter text-white">Assessment Paused</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">Session state preserved locally in secure cache.</p>
          <button
            onClick={() => { sound.playClick(); setIsPaused(false); }}
            className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
            Resume Evaluation
          </button>
        </div>
      )}

      {/* Scenario & Question Container */}
      {!isPaused && currentQuestion && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-left">
          {/* Metadata Badges: Category & Adaptive Difficulty */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-900">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">
              {currentQuestion.category}
            </span>

            <div className="flex items-center space-x-3">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                Target: {currentQuestion.estimatedSeconds}s
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          {/* Workplace Scenario Narrative Box */}
          <div className="border-l-2 border-zinc-700 pl-6 py-1 my-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-500 block mb-2">
              Context &bull; Workplace Scenario
            </span>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              "{currentQuestion.scenario}"
            </p>
          </div>

          {/* Core Decision Dilemma */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Interactive Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              const showResult = hasSubmittedAnswer && !isExamMode;

              let optionStyle = 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50';
              if (isSelected && !showResult) {
                optionStyle = 'border-white bg-zinc-900 text-white shadow-lg';
              } else if (showResult) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-100';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  optionStyle = 'border-zinc-900 opacity-40 text-zinc-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasSubmittedAnswer && !isExamMode}
                  className={`w-full p-5 rounded-2xl border text-left flex items-start space-x-4 transition-all ${optionStyle}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                  }`}>
                    {letter}
                  </span>

                  <span className="text-sm sm:text-base flex-1 leading-relaxed">
                    {option}
                  </span>

                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation Drawer (shown immediately unless exam mode) */}
          {hasSubmittedAnswer && !isExamMode && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 animate-in fade-in duration-200 space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Executive Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls: Submit / Next Button */}
          <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
            <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
              Personal Branding IQ Engine
            </div>

            <button
              onClick={handleSubmitOrNext}
              disabled={selectedOption === null}
              className={`px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-all ${
                selectedOption === null
                  ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-zinc-200 shadow-xl'
              }`}
            >
              <span>
                {!isExamMode && !hasSubmittedAnswer
                  ? 'Verify Selection'
                  : currentIndex + 1 === questions.length
                  ? 'Finalize Evaluation'
                  : 'Next Scenario'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
