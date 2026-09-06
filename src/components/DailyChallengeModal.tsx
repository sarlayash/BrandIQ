import React, { useState } from 'react';
import { Zap, CheckCircle2, Flame, Award, ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimDailyXP: (xp: number, coins: number) => void;
  streak: number;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  onClaimDailyXP,
  streak
}) => {
  const [answered, setAnswered] = useState<number | null>(null);
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const challengeScenario = {
    title: "Daily Flash Dilemma: The Automated Connection Request",
    scenario: "You receive an automated connection request with zero personal context, but the person is a recruiter at your top target firm. How do you respond?",
    options: [
      "Decline immediately to protect your network exclusivity",
      "Accept and wait passively for them to message you first",
      "Accept, and send a proactive 2-sentence note referencing their recent company open-source AI project with a relevant link to your proof of work",
      "Report their account as spam to LinkedIn"
    ],
    correct: 2,
    explanation: "Transforming passive inbound into an active conversational anchor with immediate context and proof of work demonstrates exceptional social agility."
  };

  const handleSelect = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    sound.playClick();
    if (idx === challengeScenario.correct) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }
  };

  const handleClaim = () => {
    sound.playFanfare();
    setClaimed(true);
    onClaimDailyXP(150, 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-left text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Micro Label */}
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Daily Dilemma</span>
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-white px-3 py-0.5 rounded-full font-bold uppercase tracking-widest">
            {streak} Day Streak
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          {challengeScenario.title}
        </h3>
        
        <div className="border-l-2 border-zinc-700 pl-4 py-3 bg-zinc-900/60 rounded-r-2xl mb-6 text-xs text-zinc-300 font-light leading-relaxed">
          "{challengeScenario.scenario}"
        </div>

        {/* Options */}
        <div className="space-y-3">
          {challengeScenario.options.map((opt, i) => {
            const isSelected = answered === i;
            const isCorrect = i === challengeScenario.correct;
            const showOutcome = answered !== null;

            let borderStyle = 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300';
            if (showOutcome) {
              if (isCorrect) borderStyle = 'border-white bg-white text-black font-bold';
              else if (isSelected && !isCorrect) borderStyle = 'border-zinc-700 bg-zinc-900 text-zinc-500 line-through';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered !== null}
                className={`w-full text-left p-4 rounded-2xl border text-xs leading-relaxed transition-all flex items-start space-x-3 ${borderStyle}`}
              >
                <span className="font-black text-zinc-500">{String.fromCharCode(65 + i)}.</span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation & Claim */}
        {answered !== null && (
          <div className="mt-6 pt-6 border-t border-zinc-900 space-y-4 animate-in fade-in">
            <div className="border-l-2 border-zinc-700 pl-4 py-2 bg-zinc-900/40 rounded-r-xl text-xs text-zinc-400">
              <strong className="text-white block uppercase tracking-wider text-[10px] font-bold mb-1">Strategic Breakdown:</strong>
              {challengeScenario.explanation}
            </div>

            {!claimed ? (
              <button
                onClick={handleClaim}
                className="w-full py-4 px-6 rounded-full font-bold uppercase tracking-widest text-xs bg-white text-black hover:bg-zinc-200 flex items-center justify-center space-x-2 shadow-xl transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Claim +150 XP &bull; +50 Coins</span>
              </button>
            ) : (
              <div className="text-center py-3 text-xs font-bold uppercase tracking-widest text-white flex items-center justify-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rewards Deposited &bull; Streak Active</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
