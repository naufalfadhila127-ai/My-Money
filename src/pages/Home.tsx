import React, { useState } from 'react';
import { PlusCircle, MinusCircle, TrendingUp, TrendingDown, LayoutDashboard } from 'lucide-react';
import { useTransactions, useSettings } from '../hooks/usePersistence';
import { formatCurrency, cn } from '../lib/utils';
import { Calendar } from '../components/Calendar';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { transactions, addTransaction } = useTransactions();
  const { settings } = useSettings();
  const [showModal, setShowModal] = useState<'income' | 'expense' | null>(null);

  const totalBalance = transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );

  const monthIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

  const monthExpense = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end mb-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-times new roman bold text-blue-900 mb-2">Welcome Back,</h1>
          <p className="text-slate-500 font-medium leading-relaxed">Manage your personal finances or business finances so that they are neatly arranged</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowModal('income')}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Income
          </button>
          <button 
            onClick={() => setShowModal('expense')}
            className="px-6 py-3 bg-white text-blue-600 border border-blue-100 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <MinusCircle className="w-4 h-4" />
            Expense
          </button>
        </div>
      </header>

      {/* Hero Stats Section */}
      <div className="grid grid-cols-12 gap-6 mb-10">
        <div className="col-span-12 lg:col-span-8 bg-blue-600 rounded-[2rem] p-10 text-white relative overflow-hidden min-h-[220px] shadow-xl">
          <div className="relative z-10">
            <p className="text-blue-100 uppercase text-[10px] font-bold tracking-widest mb-3">Total Net Balance</p>
            <h2 className="text-6xl font-serif tracking-tight mb-6">
              {formatCurrency(totalBalance, settings.currency)}
            </h2>
            <div className="flex gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 text-green-300">
                <TrendingUp className="w-5 h-5" />
                <span>{formatCurrency(monthIncome, settings.currency)} Income</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingDown className="w-5 h-5" />
                <span>{formatCurrency(monthExpense, settings.currency)} Expenses</span>
              </div>
            </div>
          </div>
          <svg className="absolute right-[-40px] bottom-[-40px] w-80 h-80 text-white/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Monthly Flow</span>
                <span className={cn("font-bold", totalBalance >= 0 ? "text-green-600" : "text-red-600")}>
                  {totalBalance >= 0 ? 'Positive' : 'Overage'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Transactions</span>
                <span className="font-bold text-slate-800">{transactions.length} total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <Calendar transactions={transactions} currency={settings.currency} />
        </div>
        
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 h-full shadow-sm">
            <h3 className="font-serif text-2xl italic text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-5">
              {transactions.slice(0, 6).map((t) => (
                <div key={t.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                      t.type === 'income' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none mb-1">{t.category}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider italic">{t.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-bold",
                      t.type === 'income' ? "text-green-600" : "text-blue-600"
                    )}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, settings.currency)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                      {new Date(t.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-center text-slate-300 py-10 font-serif italic">Clean sheet, no entries yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <TransactionModal 
            type={showModal} 
            onClose={() => setShowModal(null)} 
            onSubmit={(data) => {
              addTransaction({ ...data, type: showModal });
              setShowModal(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, amount, currency, icon: Icon, variant }: any) {
  const variants = {
    blue: "bg-brand-primary text-white",
    green: "bg-white text-slate-900 border-green-100",
    red: "bg-white text-slate-900 border-blue-100"
  };

  return (
    <div className={cn(
      "p-6 rounded-[2rem] border transition-transform hover:scale-[1.02] shadow-sm",
      variant === 'blue' ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-slate-900 border-slate-200"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-2xl",
          variant === 'blue' ? "bg-white/20" : "bg-brand-primary/10 text-brand-primary"
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className={cn(
        "text-sm font-medium mb-1",
        variant === 'blue' ? "text-white/80" : "text-slate-500"
      )}>{label}</p>
      <p className="text-2xl font-bold tracking-tight">{formatCurrency(amount, currency)}</p>
    </div>
  );
}

function TransactionModal({ type, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    source: 'personal',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl overflow-hidden"
      >
        <div className={cn(
          "absolute top-0 left-0 right-0 h-2",
          type === 'income' ? "bg-green-500" : "bg-brand-primary"
        )} />
        
        <h3 className="text-2xl font-bold text-slate-800 mb-6 capitalize">Add {type}</h3>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData, amount: parseFloat(formData.amount) });
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</label>
            <input 
              required
              type="number" 
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-lg font-bold"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</label>
            <input 
              required
              type="text" 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              placeholder="e.g. Salary, Rent, Food"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Source</label>
              <select 
                value={formData.source}
                onChange={e => setFormData({ ...formData, source: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none h-20"
              placeholder="Optional notes..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className={cn(
                "flex-[2] px-4 py-4 rounded-2xl font-bold text-white transition-all shadow-lg",
                type === 'income' ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" : "bg-brand-primary hover:bg-brand-secondary shadow-blue-600/20"
              )}
            >
              Save Transaction
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
