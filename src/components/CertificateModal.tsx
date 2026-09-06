import React, { useRef, useState } from 'react';
import { X, Download, Printer, ShieldCheck, Award, CheckCircle2, Copy } from 'lucide-react';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerName: string;
  score: number;
  scoreLevel: string;
  certificateId: string;
  issueDate: string;
  verificationCode: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  learnerName,
  score,
  scoreLevel,
  certificateId,
  issueDate,
  verificationCode
}) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const certRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(certificateId);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  // High-res 300 DPI HTML5 Canvas export
  const handleDownloadPNG = () => {
    sound.playClick();
    setIsExporting(true);

    // Create high-res offscreen canvas (2400 x 1600 px for crisp 300 DPI print quality)
    const canvas = document.createElement('canvas');
    canvas.width = 2400;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Background Luxury Deep Navy Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 2400, 1600);
    bgGrad.addColorStop(0, '#090D16');
    bgGrad.addColorStop(0.5, '#0F172A');
    bgGrad.addColorStop(1, '#050811');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2400, 1600);

    // 2. Ornate Outer Borders
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(60, 60, 2280, 1480);

    ctx.strokeStyle = '#93732A';
    ctx.lineWidth = 3;
    ctx.strokeRect(84, 84, 2232, 1432);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(100, 100, 2200, 1400);

    // Corner decorative rosettes
    const drawCorner = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, 2 * Math.PI);
      ctx.fillStyle = '#D4AF37';
      ctx.fill();
      ctx.restore();
    };
    drawCorner(84, 84);
    drawCorner(2316, 84);
    drawCorner(84, 1516);
    drawCorner(2316, 1516);

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('AI PERSONAL BRANDING INSTITUTE', 1200, 260);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 72px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('CERTIFICATE OF DISTINCTION', 1200, 370);

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'italic 30px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('This official credential affirms that', 1200, 480);

    // Recipient Name with dynamic auto-fit scaling
    let nameFontSize = 74;
    if (learnerName.length > 25) nameFontSize = 54;
    if (learnerName.length > 35) nameFontSize = 42;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${nameFontSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.letterSpacing = '2px';
    ctx.fillText(learnerName.toUpperCase(), 1200, 610);

    // Underline below name
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(700, 645);
    ctx.lineTo(1700, 645);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '400 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'has successfully completed the comprehensive assessment and demonstrated exemplary competency in',
      1200,
      740
    );

    ctx.fillStyle = '#60A5FA';
    ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AI Personal Branding Intelligence & Industry Authority', 1200, 810);

    // Performance Level & Score Badge Box
    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(800, 880, 800, 130, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Performance Rating: ${scoreLevel.toUpperCase()}`, 1200, 935);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Personal Branding IQ: ${score} / 100`, 1200, 985);

    // Footer - Signatures & Verification Area
    // Left: Authorized Signatory
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(320, 1260);
    ctx.lineTo(680, 1260);
    ctx.stroke();

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Kapil Narula', 320, 1300);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Lead Assessor & Creator', 320, 1335);
    ctx.fillText('Powered by Kapil', 320, 1365);

    // Center: Gold Seal Emblem
    ctx.textAlign = 'center';
    const sealX = 1200;
    const sealY = 1260;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 80, 0, 2 * Math.PI);
    ctx.fillStyle = '#D4AF37';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sealX, sealY, 68, 0, 2 * Math.PI);
    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('VERIFIED', sealX, sealY - 10);
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('IQ EXCELLENCE', sealX, sealY + 15);

    // Right: Date & Verification ID
    ctx.textAlign = 'right';
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1720, 1260);
    ctx.lineTo(2080, 1260);
    ctx.stroke();

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Issued: ${issueDate}`, 2080, 1300);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Certificate ID: ${certificateId}`, 2080, 1335);
    ctx.fillText(`Verification: ${verificationCode}`, 2080, 1365);

    // Bottom verification notice
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748B';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Verify securely at aipersonalbranding.iq/verify • Powered by Kapil • Global Accreditation Standard', 1200, 1490);

    // Download trigger
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Certificate_${learnerName.replace(/\s+/g, '_')}_${certificateId}.png`;
      a.click();
      setIsExporting(false);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-zinc-100 my-4 text-left">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6 mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">
              Verified Credential &bull; 300 DPI Archival Quality
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase">
              OFFICIAL CERTIFICATION CREDENTIAL
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-light">Lead Assessor: Kapil Narula &bull; Powered by Kapil</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all shadow-xl"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating...' : 'Download 300 DPI PNG'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-zinc-700 text-white hover:bg-zinc-900 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Certificate Landscape Canvas / Visual Display */}
        <div 
          ref={certRef}
          id="printable-certificate"
          className="relative w-full aspect-[1.5/1] bg-gradient-to-b from-[#090D16] via-[#0F172A] to-[#050811] border-[6px] border-[#D4AF37] rounded-xl p-4 sm:p-10 shadow-2xl overflow-hidden flex flex-col justify-between"
          style={{
            boxShadow: '0 0 50px rgba(212, 175, 55, 0.15)'
          }}
        >
          {/* Guilloche inner border line */}
          <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/40 pointer-events-none rounded-lg" />
          <div className="absolute inset-3 sm:inset-4 border border-[#D4AF37]/20 pointer-events-none rounded-md" />

          {/* Top Organization Header */}
          <div className="text-center pt-2 sm:pt-4 relative z-10">
            <div className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-slate-300 mb-1">
              AI Personal Branding Institute
            </div>
            <h1 className="font-serif text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#D4AF37] to-amber-100">
              CERTIFICATE OF DISTINCTION
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-2" />
            <p className="text-[10px] sm:text-xs italic text-slate-400">
              This official credential affirms that
            </p>
          </div>

          {/* Recipient Full Name */}
          <div className="text-center my-auto py-2 relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase drop-shadow-md break-words px-4">
              {learnerName}
            </h2>
            <div className="w-48 sm:w-72 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-3 px-4 leading-relaxed font-light">
              has completed the rigorous benchmarking assessment and demonstrated exemplary competency in{' '}
              <strong className="text-indigo-300 font-semibold">AI Personal Branding Intelligence & Industry Authority</strong>.
            </p>

            {/* Score & Tier Pill */}
            <div className="inline-flex items-center space-x-3 bg-slate-900/80 border border-amber-500/40 rounded-full px-4 py-1.5 mt-3 shadow-inner">
              <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
                {scoreLevel}
              </span>
              <span className="text-xs text-slate-500">&bull;</span>
              <span className="text-xs sm:text-sm font-extrabold text-white">
                Personal Branding IQ: {score} / 100
              </span>
            </div>
          </div>

          {/* Footer Area: Signatures, Seal & Verification QR */}
          <div className="grid grid-cols-3 items-end pt-2 pb-1 text-xs relative z-10 border-t border-slate-800/80">
            {/* Left: Signatory */}
            <div className="text-left">
              <div className="w-24 sm:w-36 border-b border-slate-600 mb-1.5" />
              <div className="font-bold text-slate-100 text-xs sm:text-sm">Kapil Narula</div>
              <div className="text-[10px] text-slate-400">Lead Assessor & Creator</div>
              <div className="text-[10px] font-semibold text-indigo-400">Powered by Kapil</div>
            </div>

            {/* Center: Official Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-[#D4AF37] to-amber-300 border-2 border-white flex flex-col items-center justify-center text-slate-950 shadow-lg">
                <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="text-[7px] sm:text-[8px] font-extrabold tracking-tighter uppercase">VERIFIED</span>
              </div>
            </div>

            {/* Right: Verification & Date */}
            <div className="text-right">
              <div className="text-[10px] sm:text-xs text-slate-400">
                Issued: <span className="text-slate-200 font-medium">{issueDate}</span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono">
                ID: <span className="text-amber-400 font-bold">{certificateId}</span>
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                Hash: {verificationCode.slice(0, 10)}...
              </div>
            </div>
          </div>
        </div>

        {/* Verification Copy Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-3.5 text-xs text-zinc-300 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Verification Link: <span className="font-mono text-zinc-200">https://aipersonalbranding.iq/verify/{certificateId}</span></span>
          </div>
          <button
            onClick={handleCopyVerification}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 uppercase tracking-widest text-[10px] font-bold transition-colors border border-zinc-700"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied ID!' : 'Copy Certificate ID'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
