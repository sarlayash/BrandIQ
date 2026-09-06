import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { verifyAdminCredentials, DEMO_ADMIN_CONFIG } from '../config/admin';
import { sound } from '../utils/audio';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (verifyAdminCredentials(username, password)) {
      sound.playCorrect();
      setError(null);
      onLoginSuccess();
      onClose();
    } else {
      sound.playIncorrect();
      setError('Invalid administrator credentials. Please check username or password.');
    }
  };

  const handleFillDemo = () => {
    sound.playClick();
    setUsername(DEMO_ADMIN_CONFIG.username);
    setPassword(DEMO_ADMIN_CONFIG.password);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-zinc-100 text-left">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Micro Label */}
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Restricted Access &bull; Administrator
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
          ADMIN PORTAL LOGIN
        </h2>
        <p className="text-xs text-zinc-400 font-light mb-6 leading-relaxed">
          Authenticate to access enterprise psychometrics, participant registries, and verified credential management.
        </p>

        {error && (
          <div className="flex items-center space-x-2 border-l-2 border-zinc-500 bg-zinc-900/60 p-3 rounded-r-xl text-xs text-zinc-300 mb-6">
            <ShieldAlert className="w-4 h-4 shrink-0 text-white" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. kapiladmin"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              required
            />
          </div>

          {/* Demo Hint Banner */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex items-center justify-between">
            <div className="text-[11px] text-zinc-400 font-mono">
              demo: <strong className="text-white">kapiladmin</strong> / <strong className="text-white">admin123</strong>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 hover:text-white bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700"
            >
              Auto-Fill
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest bg-white text-black hover:bg-zinc-200 flex items-center justify-center space-x-2 shadow-xl transition-all mt-4"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
