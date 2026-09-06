import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Trophy, Award, Gift, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface BonusRoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardClaimed: (rewardText: string, bonusIQ: number, bonusXP: number, extraBadge?: string) => void;
  currentIQ: number;
}

interface WheelSegment {
  label: string;
  sub: string;
  color: string;
  bonusIQ: number;
  bonusXP: number;
  badge?: string;
}

const SEGMENTS: WheelSegment[] = [
  { label: '+5 IQ Points', sub: 'Instant Boost', color: '#4F46E5', bonusIQ: 5, bonusXP: 100 },
  { label: '+10 IQ Points', sub: 'Grand IQ Leap', color: '#9333EA', bonusIQ: 10, bonusXP: 250 },
  { label: 'Fast Thinker', sub: 'Silver Badge', color: '#0EA5E9', bonusIQ: 3, bonusXP: 150, badge: 'Fast Thinker' },
  { label: 'Double XP', sub: '2x Multiplier', color: '#EAB308', bonusIQ: 2, bonusXP: 500 },
  { label: 'AI Wizard', sub: 'Gold Badge', color: '#8B5CF6', bonusIQ: 4, bonusXP: 300, badge: 'AI Wizard' },
  { label: 'Career Booster', sub: '+150 Coins', color: '#10B981', bonusIQ: 3, bonusXP: 200 },
  { label: 'Golden Badge', sub: 'Diamond Tier', color: '#F59E0B', bonusIQ: 5, bonusXP: 400, badge: 'Golden Badge of Excellence' },
  { label: 'LinkedIn Ninja', sub: 'Gold Badge', color: '#0284C7', bonusIQ: 4, bonusXP: 250, badge: 'LinkedIn Ninja' },
  { label: 'Brand Champion', sub: '+8 IQ Points', color: '#EC4899', bonusIQ: 8, bonusXP: 350 },
  { label: 'Certificate Upgrade', sub: 'Honor Distinction', color: '#6366F1', bonusIQ: 5, bonusXP: 300 },
  { label: 'Retry Token', sub: 'Score Shield', color: '#14B8A6', bonusIQ: 2, bonusXP: 100 },
  { label: '+5 IQ Points', sub: 'Precision Bonus', color: '#3B82F6', bonusIQ: 5, bonusXP: 120 }
];

export const BonusRoundModal: React.FC<BonusRoundModalProps> = ({
  isOpen,
  onClose,
  onRewardClaimed,
  currentIQ
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonReward, setWonReward] = useState<WheelSegment | null>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    drawWheel(0);
  }, [isOpen]);

  const drawWheel = (angleRad: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 16;
    const numSegments = SEGMENTS.length;
    const arc = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, width, height);

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#09090b';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#27272a';
    ctx.stroke();

    // Segments
    for (let i = 0; i < numSegments; i++) {
      const segAngle = angleRad + i * arc;
      ctx.beginPath();
      ctx.fillStyle = SEGMENTS[i].color;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, segAngle, segAngle + arc);
      ctx.lineTo(centerX, centerY);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.stroke();

      // Text labels
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(segAngle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Space Grotesk, sans-serif';
      ctx.fillText(SEGMENTS[i].label, radius - 20, 4);

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '8px Plus Jakarta Sans, sans-serif';
      ctx.fillText(SEGMENTS[i].sub, radius - 20, 16);
      ctx.restore();
    }

    // Inner center hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#09090b';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KAPIL', centerX, centerY - 5);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'bold 8px Plus Jakarta Sans, sans-serif';
    ctx.fillText('BONUS', centerX, centerY + 8);
  };

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    sound.playClick();

    // Random winner index
    const targetIndex = Math.floor(Math.random() * SEGMENTS.length);
    const numSegments = SEGMENTS.length;
    const arc = (2 * Math.PI) / numSegments;

    // We want the indicator at the TOP (angle = 3*Math.PI / 2) to point to targetIndex
    // Segment i starts at angle + i * arc, center is angle + (i + 0.5) * arc.
    // So 3*PI/2 = angle + (targetIndex + 0.5) * arc (mod 2PI)
    // angle = 3*PI/2 - (targetIndex + 0.5) * arc + fullTurns
    const fullSpins = 6 + Math.floor(Math.random() * 3);
    const desiredFinalAngle = (3 * Math.PI / 2) - (targetIndex + 0.5) * arc;
    const currentAngle = rotationRef.current % (2 * Math.PI);
    const totalDelta = fullSpins * 2 * Math.PI + (desiredFinalAngle - currentAngle);

    const startTime = performance.now();
    const duration = 4800; // ms
    let lastTickTime = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentRot = currentAngle + totalDelta * ease;
      rotationRef.current = currentRot;

      // Sound ticks periodically as segments pass
      if (now - lastTickTime > 120 * (1 + ease * 3)) {
        sound.playSpinTick();
        lastTickTime = now;
      }

      drawWheel(currentRot);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setHasSpun(true);
        const winner = SEGMENTS[targetIndex];
        setWonReward(winner);
        sound.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-zinc-100 text-center overflow-hidden">
        <button
          onClick={onClose}
          disabled={isSpinning}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Micro Label & Title */}
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Bonus Round &bull; High Probability Multipliers
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-white mb-2">
          LUCKY SPIN WHEEL
        </h2>
        <p className="text-xs text-zinc-400 font-light mb-6">
          Spin to unlock additional IQ benchmarks, rare badges, and XP multipliers.
        </p>

        {/* Wheel Canvas Container */}
        <div className="relative mx-auto w-[320px] h-[320px] flex items-center justify-center">
          {/* Top Indicator Arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-white filter drop-shadow-md" />
          </div>

          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            className="rounded-full shadow-2xl"
          />
        </div>

        {/* Action Controls & Results */}
        <div className="mt-8">
          {!wonReward ? (
            <button
              onClick={handleSpin}
              disabled={isSpinning || hasSpun}
              className={`w-full py-4 px-8 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xl transition-all ${
                isSpinning
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{isSpinning ? 'Executing Spin...' : 'Spin The Wheel Now'}</span>
            </button>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-in fade-in zoom-in-95 text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-1">
                Reward Unlocked
              </div>
              <div className="text-2xl font-black uppercase tracking-tight text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-white" />
                <span>{wonReward.label}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {wonReward.sub} &bull; +{wonReward.bonusXP} XP Benchmarked
              </p>

              <button
                onClick={() => {
                  sound.playClick();
                  onRewardClaimed(
                    wonReward.label,
                    wonReward.bonusIQ,
                    wonReward.bonusXP,
                    wonReward.badge
                  );
                  onClose();
                }}
                className="mt-5 w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Claim Reward &amp; Apply to Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
