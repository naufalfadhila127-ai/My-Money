import React from 'react';
import { useSettings } from '../hooks/usePersistence';
import { Globe, DollarSign, Share2, Shield, Bell, AppWindow } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings() {
  const { settings, setSettings } = useSettings();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Money App',
        text: 'Track your business and personal finances beautifully!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('App URL copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-serif italic text-blue-900 mb-2">Preferences</h2>
        <p className="text-slate-500 font-medium">Fine-tune the instrument of your financial management.</p>
      </header>

      <div className="space-y-8">
        <section className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-blue-600 transition-colors group-hover:bg-blue-50">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Currency Preference</h3>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-tight">Financial Display Units</p>
              </div>
            </div>
            <select 
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value as any })}
              className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="IDR">IDR (Rp)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="p-10 border-b border-slate-50 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-blue-600 transition-colors group-hover:bg-blue-50">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Language Settings</h3>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-tight">Regional Interface</p>
              </div>
            </div>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value as any })}
              className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all cursor-pointer"
            >
              <option value="en">English (US)</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>

          <button 
            onClick={handleShare}
            className="w-full p-10 flex items-center justify-between hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-lg">Share Application</h3>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-tight">Expand the network</p>
              </div>
            </div>
            <div className="text-blue-600 font-black uppercase tracking-widest text-xs transition-transform group-hover:translate-x-2">
              Invite ➜
            </div>
          </button>
        </section>

        <section className="bg-blue-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                <Shield className="w-7 h-7 text-blue-200" />
              </div>
              <h3 className="text-2xl font-serif italic">Privacy Protocol</h3>
            </div>
            <p className="text-blue-100/60 leading-relaxed max-w-lg mb-10 font-medium">
              We uphold a strict local-first philosophy. Your financial journals are stored exclusively within the crypt of your browser's local memory. No transmission, no tracking.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300/50 mb-2">Vaulting</p>
                <p className="text-sm font-bold">Local-First Persistence</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300/50 mb-2">Security</p>
                <p className="text-sm font-bold">Zero-Cloud Footprint</p>
              </div>
            </div>
          </div>
          <svg className="absolute right-[-40px] bottom-[-40px] w-80 h-80 text-blue-800/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </section>
      </div>
    </div>
  );
}
