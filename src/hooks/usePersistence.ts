import { useEffect, useState } from 'react';
import { Transaction, AppSettings } from '../types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('my_money_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my_money_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return { transactions, addTransaction, deleteTransaction };
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('my_money_settings');
    return saved ? JSON.parse(saved) : { currency: 'USD', language: 'en' };
  });

  useEffect(() => {
    localStorage.setItem('my_money_settings', JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings };
}
