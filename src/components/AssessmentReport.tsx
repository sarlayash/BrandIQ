import React, { useState } from 'react';
import { 
  Award, 
  Share2, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Compass, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { getScoreLevel } from '../data/badges';
import { sound } from '../utils/audio';

interface AssessmentReportProps {
  result: AssessmentResult;
  onRetake: () => void;
  onOpenCertificate: () => void;
  onOpenBonusWheel: () => void;
  hasSpunWheel: boolean;
}

export const AssessmentReport: React.FC<AssessmentReportProps> = ({
  result,
  onRetake,
  onOpenCertificate,
  onOpenBonusWheel,
  hasSpunWheel
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const scoreLevelInfo = getScoreLevel(result.finalScore);

  const handleShareLinkedIn = () => {
    sound.playClick();
    const shareText = encodeURIComponent(
      `I just assessed my Personal Branding Intelligence in the AI era on the "AI Personal Branding IQ Assessment – Powered by Kapil"! 🚀\n\n` +
      `📊 My IQ Score: ${result.finalScore}/100 (${result.scoreLevel})\n` +
      `🎯 Career Readiness: ${result.careerReadiness}%\n` +
      `🤖 AI Usage Score: ${result.aiUsageScore}%\n` +
      `Verified Certificate ID: ${result.certificateId}\n\n` +
      `Test your own brand authority here: https://aipersonalbranding.iq`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${shareText}`, '_blank');
  };

  const handleCopySummary = () => {
    sound.playClick();
    const summary = `AI Personal Branding IQ: ${result.finalScore}/100 (${result.scoreLevel})\nCertificate ID: ${result.certificateId}\nPowered by Kapil`;
    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const domainBreakdowns = [
    { title: 'Career Readiness', score: result.careerReadiness, color: 'bg-indigo-500' },
    { title: 'LinkedIn Readiness', score: result.linkedInReadiness, color: 'bg-blue-500' },
    { title: 'Networking Readiness', score: result.networkingReadiness, color: 'bg-emerald-500' },
    { title: 'AI Usage Score', score: result.aiUsageScore, color: 'bg-purple-500' },
    { title: 'Communication Score', score: result.communicationScore, color: 'bg-amber-500' },
    { title: 'Professional Visibility', score: result.visibilityScore, color: 'bg-rose-500' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Main Score Gauge */}
      <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl text-left">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3">
          Verification &bull; Completed Assessment
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase select-none leading-none">
              INTELLIGENCE <span className="text-zinc-600">REPORT</span>
            </h1>
            <p className="text-sm sm:text-base font-light italic text-zinc-400">
              Evaluated for <strong className="text-white font-black not-italic">{result.learnerName}</strong> &bull; Powered by Kapil
            </p>
          </div>

          {/* Left-Bordered Colossal Score Metric */}
          <div className="border-l-2 border-zinc-800 pl-6 sm:pl-8 py-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
              Brand·IQ Benchmark
            </div>
            <div className="text-6xl sm:text-8xl font-black text-white tabular-nums tracking-tighter leading-none mt-1">
              {result.finalScore}
              <span className="text-2xl sm:text-3xl text-zinc-600 font-bold">/100</span>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black">
                {result.scoreLevel}
              </span>
              {result.bonusPoints > 0 && (
                <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                  +{result.bonusPoints} Spin Bonus
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-wrap items-center gap-3">
          <button
            onClick={() => { sound.playClick(); onOpenCertificate(); }}
            className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center space-x-2 shadow-xl"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Generate 300 DPI Certificate</span>
          </button>

          {!hasSpunWheel ? (
            <button
              onClick={() => { sound.playClick(); onOpenBonusWheel(); }}
              className="border border-zinc-700 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Spin Bonus Wheel 🎡</span>
            </button>
          ) : (
            <button
              onClick={() => { sound.playClick(); onOpenBonusWheel(); }}
              className="border border-zinc-800 bg-zinc-900/60 text-zinc-400 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center space-x-2"
            >
              <span>Bonus Wheel Claimed ✓</span>
            </button>
          )}

          <button
            onClick={handleShareLinkedIn}
            className="border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-300 hover:text-white px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on LinkedIn</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>{copiedShare ? 'Copied' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* 6 Metric Breakdown Bars */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-left">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Competency Matrices
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase mb-6 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-white" />
          <span>Core Domain Readiness Breakdown</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {domainBreakdowns.map((domain) => (
            <div key={domain.title} className="space-y-2 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-zinc-300">{domain.title}</span>
                <span className="text-white font-mono tabular-nums">{domain.score}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{ width: `${domain.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Strengths */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-black text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Demonstrated Strengths</span>
          </div>
          <ul className="space-y-3 text-xs text-zinc-300">
            {result.strengths.map((str, i) => (
              <li key={i} className="border-l-2 border-zinc-700 pl-4 py-1 bg-zinc-900/40 rounded-r-xl">
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Areas / Weaknesses */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-black text-sm uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-white" />
            <span>High-Leverage Growth Opportunities</span>
          </div>
          <ul className="space-y-3 text-xs text-zinc-300">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="border-l-2 border-zinc-700 pl-4 py-1 bg-zinc-900/40 rounded-r-xl">
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tailored Learning Roadmap */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-left">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Execution Strategy
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase mb-6 flex items-center space-x-2">
          <Compass className="w-5 h-5 text-white" />
          <span>Recommended Learning Roadmap</span>
        </h2>

        <div className="space-y-4">
          {result.learningRoadmap.map((item, idx) => (
            <div 
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-black uppercase tracking-wide text-white">{item.step}</span>
                </div>
                <p className="text-xs text-zinc-400 pl-10 leading-relaxed">{item.action}</p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                {item.timeline}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Retake Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl gap-4 text-left">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white">Need to benchmark a new iteration?</h3>
          <p className="text-xs text-zinc-400 mt-1">Our adaptive question engine dynamically draws randomized workplace scenarios.</p>
        </div>
        <button
          onClick={() => { sound.playClick(); onRetake(); }}
          className="border border-zinc-700 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all shrink-0 flex items-center space-x-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Assessment</span>
        </button>
      </div>
    </div>
  );
};
