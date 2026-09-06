import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { INITIAL_SAMPLE_LEARNERS } from '../data/sampleLearners';
import { sound } from '../utils/audio';

interface LeaderboardViewProps {
  currentLearnerScore: number;
  currentLearnerName: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentLearnerScore,
  currentLearnerName
}) => {
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'hallOfFame'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine sample learners with current user
  const allEntries = [
    ...INITIAL_SAMPLE_LEARNERS,
    ...(currentLearnerScore > 0
      ? [{
          id: 'current-user',
          name: `${currentLearnerName} (You)`,
          email: 'you@learner.io',
          college: 'Your Institution',
          company: 'Your Organization',
          role: 'Candidate',
          attemptsCount: 1,
          highestScore: currentLearnerScore,
          lastAttemptDate: 'Today',
          status: 'Active' as const,
          certificateIssued: currentLearnerScore >= 50,
          certificateId: 'KAPIL-IQ-YOU',
          badgeTier: currentLearnerScore >= 80 ? ('Diamond' as const) : ('Gold' as const)
        }]
      : [])
  ];

  // Filter & Sort
  const filtered = allEntries
    .filter(e => 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.college.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.highestScore - a.highestScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Global Industry Standing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Personal Branding IQ Leaderboard
          </h1>
          <p className="text-xs text-slate-400">
            Ranked by verified workplace scenario competence &bull; Powered by Kapil
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { sound.playClick(); setFilter('weekly'); }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'weekly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => { sound.playClick(); setFilter('monthly'); }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'monthly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => { sound.playClick(); setFilter('hallOfFame'); }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'hallOfFame' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hall of Fame 👑
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by learner name, company, or college..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-lg"
        />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-3">Learner</th>
              <th className="py-3 px-3">Institution / Company</th>
              <th className="py-3 px-3">Personal Branding IQ</th>
              <th className="py-3 px-3 text-right">Badge Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {filtered.map((learner, idx) => {
              const isTop1 = idx === 0;
              const isTop2 = idx === 1;
              const isTop3 = idx === 2;
              const isCurrentUser = learner.id === 'current-user';

              return (
                <tr 
                  key={learner.id}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    isCurrentUser ? 'bg-indigo-600/10 font-semibold border-l-2 border-l-indigo-500' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {isTop1 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                        1
                      </span>
                    ) : isTop2 ? (
                      <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-black">
                        2
                      </span>
                    ) : isTop3 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-black">
                        3
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono font-bold pl-2">{idx + 1}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white flex items-center space-x-1.5">
                      <span>{learner.name}</span>
                      {learner.highestScore >= 90 && (
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{learner.role}</div>
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    <div>{learner.company || learner.college}</div>
                    <div className="text-[10px] text-slate-500">{learner.college}</div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-extrabold text-indigo-400">
                        {learner.highestScore}
                      </span>
                      <span className="text-slate-500 text-[10px]">/ 100 IQ</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      learner.badgeTier === 'Diamond'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : learner.badgeTier === 'Gold'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {learner.badgeTier}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
