import React from 'react';
import { 
  Award, 
  Flame, 
  Coins, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Lock, 
  User, 
  Trophy, 
  FileText, 
  Compass,
  Zap
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: 'assessment' | 'dashboard' | 'leaderboard' | 'badges' | 'daily';
  setActiveTab: (tab: 'assessment' | 'dashboard' | 'leaderboard' | 'badges' | 'daily') => void;
  learnerProfile: LearnerProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  learnerProfile,
  darkMode,
  setDarkMode,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onOpenAdminDashboard
}) => {
  const [muted, setMuted] = React.useState(sound.getMuted());

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playClick();
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      darkMode 
        ? 'bg-zinc-950/95 border-zinc-800 text-white' 
        : 'bg-white/95 border-zinc-200 text-zinc-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              sound.playClick();
              setActiveTab('assessment');
            }}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-black text-xs text-white uppercase tracking-tighter group-hover:scale-105 transition-transform">
              IQ™
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white">
                  Brand·IQ™
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                  AI Era
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em]">
                Engineered by <span className="text-zinc-300 font-black">Kapil</span>
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => { sound.playClick(); setActiveTab('assessment'); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'assessment'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('dashboard'); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('leaderboard'); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('badges'); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'badges'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Badges</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('daily'); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'daily'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Daily Sprint</span>
            </button>
          </nav>

          {/* Gamification Stats & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Gamification Pills */}
            <div className="hidden lg:flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-xs font-bold tabular-nums">
              <div className="flex items-center space-x-1.5 text-white" title="Daily Streak">
                <Flame className="w-3.5 h-3.5 fill-current text-white" />
                <span>{learnerProfile.streak}D</span>
              </div>
              <div className="w-px h-3 bg-zinc-700" />
              <div className="flex items-center space-x-1.5 text-zinc-300" title="Coins">
                <Coins className="w-3.5 h-3.5" />
                <span>{learnerProfile.coins}</span>
              </div>
              <div className="w-px h-3 bg-zinc-700" />
              <div className="flex items-center space-x-1.5 text-zinc-400 uppercase tracking-wider text-[11px]" title="Learner Level">
                <Compass className="w-3.5 h-3.5" />
                <span>LVL {learnerProfile.level}</span>
              </div>
            </div>

            {/* Avatar Pill */}
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-black text-white" title={learnerProfile.name}>
              {learnerProfile.name ? learnerProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'JD'}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-full border border-zinc-800 transition-colors ${
                darkMode ? 'hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-600'
              }`}
              title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              aria-label="Sound Toggle"
            >
              {muted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>

            {/* Dark / Light Mode */}
            <button
              onClick={() => {
                sound.playClick();
                setDarkMode(!darkMode);
              }}
              className={`p-2.5 rounded-full border border-zinc-800 transition-colors ${
                darkMode ? 'hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-600'
              }`}
              title="Toggle Theme"
              aria-label="Theme Toggle"
            >
              {darkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-zinc-950" />}
            </button>

            {/* Admin Portal Toggle (Discreet locked icon as per spec) */}
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAdminDashboard();
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all"
                title="Admin Control Center"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAdminLogin();
                }}
                className="p-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-colors"
                title="Admin Portal"
                aria-label="Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-3 border-t border-zinc-900 text-xs uppercase tracking-widest font-bold">
          <button
            onClick={() => { sound.playClick(); setActiveTab('assessment'); }}
            className={`px-3 py-1 rounded-full ${activeTab === 'assessment' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Assessment
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('dashboard'); }}
            className={`px-3 py-1 rounded-full ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('leaderboard'); }}
            className={`px-3 py-1 rounded-full ${activeTab === 'leaderboard' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Ranks
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('badges'); }}
            className={`px-3 py-1 rounded-full ${activeTab === 'badges' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Badges
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('daily'); }}
            className={`px-3 py-1 rounded-full ${activeTab === 'daily' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Daily
          </button>
        </div>
      </div>
    </header>
  );
};
