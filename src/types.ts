export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  source: 'personal' | 'business';
}

export type Currency = 'USD' | 'EUR' | 'IDR' | 'GBP';
export type Language = 'en' | 'id';

export interface AppSettings {
  currency: Currency;
  language: Language;
}
