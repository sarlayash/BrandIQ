import React, { useState } from 'react';
import { 
  User, 
  Award, 
  TrendingUp, 
  History, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Edit3, 
  Check, 
  Download,
  Calendar,
  Sparkles,
  Shield,
  FileText
} from 'lucide-react';
import { LearnerProfile, AssessmentResult, Badge } from '../types';
import { ALL_BADGES } from '../data/badges';
import { sound } from '../utils/audio';

interface UserDashboardProps {
  learnerProfile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
  assessmentHistory: AssessmentResult[];
  onViewCertificate: (certId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  learnerProfile,
  onUpdateProfile,
  assessmentHistory,
  onViewCertificate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LearnerProfile>({ ...learnerProfile });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const unlockedBadges = ALL_BADGES.filter(b => 
    learnerProfile.badges.includes(b.id) || learnerProfile.badges.includes(b.title)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 text-left">
      {/* Profile Overview Card */}
      <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-black text-white shrink-0">
              {formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">
                Verified Identity &bull; Level {learnerProfile.level}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter uppercase">
                {learnerProfile.name || 'Learner Profile'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
                {learnerProfile.role || 'Aspiring Professional'} &bull; {learnerProfile.company || learnerProfile.college || 'Industry Explorer'}
              </p>
              <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mt-3">
                <span className="text-white">{learnerProfile.xp} XP</span>
                <span>&bull;</span>
                <span className="text-zinc-300">Peak IQ: {learnerProfile.bestScore || 0}/100</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsEditing(!isEditing);
            }}
            className="border border-zinc-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center space-x-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Profile Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-8 pt-8 border-t border-zinc-900 space-y-4 text-xs">
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-bold mb-2">
              Modify Professional Credentials
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Role / Positioning</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Institution</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-bold uppercase tracking-wider text-[10px]">Personal Branding Trajectory</label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[10px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-white text-black px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* KPI Stats Grid - Left-Bordered Architectural Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="border-l-2 border-zinc-800 pl-6">
          <div className="text-4xl font-black tabular-nums text-white">
            {assessmentHistory.length}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Total Attempts</div>
        </div>

        <div className="border-l-2 border-zinc-800 pl-6">
          <div className="text-4xl font-black tabular-nums text-white">
            {learnerProfile.bestScore || 0}
            <span className="text-xl text-zinc-600 font-normal">/100</span>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Highest IQ Score</div>
        </div>

        <div className="border-l-2 border-zinc-800 pl-6">
          <div className="text-4xl font-black tabular-nums text-white">
            {unlockedBadges.length}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Badges Earned</div>
        </div>

        <div className="border-l-2 border-zinc-800 pl-6">
          <div className="text-4xl font-black tabular-nums text-white">
            {assessmentHistory.filter(h => h.finalScore >= 50).length}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Certificates Issued</div>
        </div>
      </div>

      {/* Earned Badges Gallery */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Accreditation
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase mb-6 flex items-center space-x-2">
          <Award className="w-5 h-5 text-white" />
          <span>Earned Industry Badges</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = learnerProfile.badges.includes(badge.id) || learnerProfile.badges.includes(badge.title);
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isUnlocked
                    ? 'bg-zinc-900 border-zinc-700 shadow-lg'
                    : 'bg-zinc-950/40 border-zinc-900 opacity-25 grayscale'
                }`}
              >
                <div className="w-10 h-10 mb-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-sm">
                  🏆
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white truncate">{badge.title}</h4>
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-1">
                  {badge.tier}
                </span>
                <p className="text-[11px] text-zinc-500 mt-2 line-clamp-2">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assessment History Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
          Audit Trail
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase mb-6 flex items-center space-x-2">
          <History className="w-5 h-5 text-white" />
          <span>Assessment History &amp; Credentials</span>
        </h2>

        {assessmentHistory.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs uppercase tracking-widest font-bold">
            No completed assessments yet. Complete an evaluation to generate verified credentials.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">IQ Benchmark</th>
                  <th className="py-3 px-3">Accreditation Tier</th>
                  <th className="py-3 px-3">Credential ID</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {assessmentHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-4 px-3 whitespace-nowrap font-medium">{item.date}</td>
                    <td className="py-4 px-3 font-black text-white font-mono tabular-nums text-sm">{item.finalScore} / 100</td>
                    <td className="py-4 px-3 uppercase tracking-wider text-[11px] font-bold text-zinc-400">{item.scoreLevel}</td>
                    <td className="py-4 px-3 font-mono text-zinc-400 text-xs">{item.certificateId}</td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onViewCertificate(item.certificateId);
                        }}
                        className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Print Cert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
