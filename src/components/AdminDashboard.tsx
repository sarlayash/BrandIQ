import React, { useState } from 'react';
import { 
  Users, Award, TrendingUp, Download, Search, CheckCircle, 
  Trash2, RotateCcw, X, Shield, FileSpreadsheet, Bell, RefreshCw
} from 'lucide-react';
import { AdminLearnerRecord } from '../types';
import { INITIAL_SAMPLE_LEARNERS } from '../data/sampleLearners';
import { sound } from '../utils/audio';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onReissueCert: (learnerName: string, score: number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onReissueCert
}) => {
  const [learners, setLearners] = useState<AdminLearnerRecord[]>(INITIAL_SAMPLE_LEARNERS);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    sound.playClick();
    setLearners(prev => prev.map(l => l.id === id ? { ...l, status: l.status === 'Active' ? 'Inactive' : 'Active' } : l));
    showNotice('Learner status updated successfully.');
  };

  const handleDelete = (id: string) => {
    sound.playClick();
    setLearners(prev => prev.filter(l => l.id !== id));
    showNotice('Learner record removed.');
  };

  const handleExportCSV = () => {
    sound.playClick();
    const headers = ['ID', 'Name', 'Email', 'College', 'Company', 'Role', 'HighestScore', 'Status', 'CertificateID'];
    const rows = learners.map(l => [l.id, l.name, l.email, l.college, l.company, l.role, l.highestScore, l.status, l.certificateId || 'None']);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Learner_Reports_Kapil_IQ_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('CSV report successfully exported.');
  };

  const filtered = learners.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-zinc-100 my-4 text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6 mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">
              Enterprise Governance &bull; Institutional Lead
            </div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
              ASSESSMENT CONTROL CENTER
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-light">Lead Assessor: Kapil Narula &bull; Institution Psychometric Engine</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleExportCSV} 
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button onClick={onClose} className="p-2.5 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {notification && (
          <div className="mb-6 border-l-2 border-zinc-500 bg-zinc-900/60 text-zinc-200 px-4 py-3 rounded-r-xl text-xs flex items-center space-x-2">
            <Bell className="w-4 h-4 text-white" />
            <span>{notification}</span>
          </div>
        )}

        {/* Metrics Grid - Left-Bordered */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Learners</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">1,428</div>
          </div>
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Active Users</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">19 Live</div>
          </div>
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Average Score</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">78.4%</div>
          </div>
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Highest Score</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">98/100</div>
          </div>
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Credentials</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">1,180</div>
          </div>
          <div className="border-l-2 border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pass Rate</span>
            <div className="text-2xl font-black text-white tabular-nums mt-1">91.2%</div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter roster by candidate or org..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => {
                sound.playFanfare();
                showNotice('Bulk certificates queued and generated for all eligible scores.');
              }}
              className="px-6 py-2.5 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              Bulk Issue Credentials
            </button>
          </div>
        </div>

        {/* Learner Roster Table */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-800 text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Learner</th>
                <th className="py-3 px-4">Institution / Org</th>
                <th className="py-3 px-4">Best IQ Score</th>
                <th className="py-3 px-4">Certificate ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{l.name}</div>
                    <div className="text-[10px] text-zinc-500">{l.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>{l.company || l.college}</div>
                    <div className="text-[10px] text-zinc-500">{l.role}</div>
                  </td>
                  <td className="py-3.5 px-4 font-black font-mono text-white">
                    {l.highestScore} / 100
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                    {l.certificateId || 'Eligible'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(l.id)}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        l.status === 'Active' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {l.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        onReissueCert(l.name, l.highestScore);
                        showNotice(`Reissued certificate for ${l.name}.`);
                      }}
                      className="text-zinc-400 hover:text-white p-1"
                      title="Reissue Certificate"
                    >
                      <RotateCcw className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="text-zinc-500 hover:text-white p-1"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
