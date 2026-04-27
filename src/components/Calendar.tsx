import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Transaction } from '../types';
import { cn, formatCurrency } from '../lib/utils';

interface CalendarProps {
  transactions: Transaction[];
  currency: string;
}

export function Calendar({ transactions, currency }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getDayTotals = (day: Date) => {
    return transactions
      .filter(t => isSameDay(new Date(t.date), day))
      .reduce((acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
      }, { income: 0, expense: 0 });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="font-serif text-3xl italic text-slate-800">{format(currentMonth, 'MMMM')}</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">{format(currentMonth, 'yyyy')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-3 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-4">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pb-4 border-b border-slate-50 mb-4">
            {day}
          </div>
        ))}
        
        {Array.from({ length: (startOfMonth(currentMonth).getDay() + 6) % 7 }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[60px]" />
        ))}
        
        {days.map(day => {
          const { income, expense } = getDayTotals(day);
          const isToday = isSameDay(day, new Date());
          const hasActivity = income > 0 || expense > 0;
          
          return (
            <div key={day.toString()} className="min-h-[80px] p-2 flex flex-col items-center group relative">
              <span className={cn(
                "text-sm font-bold w-10 h-10 flex items-center justify-center rounded-xl transition-all relative z-10",
                isToday ? "bg-blue-600 text-white shadow-lg" : "text-slate-700",
                hasActivity && !isToday && "bg-slate-50 border border-slate-100"
              )}>
                {format(day, 'd')}
              </span>
              
              <div className="mt-2 flex gap-1">
                {income > 0 && <div className="w-1 h-1 rounded-full bg-green-500" />}
                {expense > 0 && <div className="w-1 h-1 rounded-full bg-blue-400" />}
              </div>
              
              {/* Tooltip for amounts on hover */}
              {hasActivity && (
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                  <div className="bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl flex flex-col gap-1 border border-white/10 backdrop-blur-md bg-opacity-90">
                    {income > 0 && <span className="font-bold text-green-400">+{formatCurrency(income, currency)}</span>}
                    {expense > 0 && <span className="font-bold text-blue-300">-{formatCurrency(expense, currency)}</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
