import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { useTransactions, useSettings } from '../hooks/usePersistence';
import { format, startOfYear, eachMonthOfInterval } from 'date-fns';
import { formatCurrency, cn } from '../lib/utils';
import { Calendar } from '../components/Calendar';

export default function Statistics() {
  const { transactions } = useTransactions();
  const { settings } = useSettings();

  const chartData = useMemo(() => {
    const yearStart = startOfYear(new Date());
    const months = eachMonthOfInterval({
      start: yearStart,
      end: new Date()
    });

    return months.map(month => {
      const monthStr = format(month, 'MMM');
      const totals = transactions
        .filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
        })
        .reduce((acc, t) => {
          if (t.type === 'income') acc.income += t.amount;
          else acc.expense += t.amount;
          return acc;
        }, { income: 0, expense: 0 });

      return {
        name: monthStr,
        ...totals,
        balance: totals.income - totals.expense
      };
    });
  }, [transactions]);

  const totalBalance = transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 max-w-2xl">
        <h2 className="text-4xl font-serif italic text-blue-900 mb-2">Financial Analysis</h2>
        <p className="text-slate-500 font-medium leading-relaxed">Observe your patterns through a sophisticated lens of data and editorial clarity.</p>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-10">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-serif text-2xl italic text-slate-800">Cash Flow Performance</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/20"></span> Income
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-600/20"></span> Expense
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #f1f5f9', 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  formatter={(val: number) => [formatCurrency(val, settings.currency), '']}
                />
                <Bar name="Income" dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar name="Expense" dataKey="expense" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl flex-1 relative overflow-hidden">
            <p className="text-blue-100 uppercase text-[10px] font-bold tracking-[0.2em] mb-3">Net Worth Balance</p>
            <h4 className="text-4xl font-serif tracking-tight mb-8">
              {formatCurrency(totalBalance, settings.currency)}
            </h4>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Sustainability</p>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3">
                <div className="bg-white h-full w-[65%] transition-all duration-700" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tighter opacity-50">65% of monthly stability target</p>
            </div>
            <svg className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="font-serif text-xl italic text-slate-800 mb-6">Efficiency</h3>
            <div className="space-y-5">
              {[
                { label: 'Income Growth', val: 12, color: 'bg-green-500' },
                { label: 'Savings Rate', val: 28, color: 'bg-blue-600' },
                { label: 'Expense Control', val: 84, color: 'bg-slate-300' }
              ].map((item) => (
                <div key={item.label} className="group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-800 transition-colors">{item.label}</span>
                    </div>
                    <span className="text-xs font-black text-slate-400 group-hover:text-slate-900 transition-colors">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1 rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
        <Calendar transactions={transactions} currency={settings.currency} />
      </div>
    </div>
  );
}
