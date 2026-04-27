import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Settings as SettingsIcon, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/statistics', icon: BarChart3, label: 'Stats' },
    { to: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <aside className="w-24 bg-brand-sidebar border-r border-blue-800 h-screen sticky top-0 flex flex-col items-center py-8 justify-between z-20">
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="text-white font-bold text-2xl tracking-tighter font-serif italic">MM.</div>
        
        <nav className="flex flex-col items-center gap-8 w-full px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 transition-all duration-200 group w-full",
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all",
                    isActive ? "bg-blue-600 shadow-lg" : "group-hover:bg-blue-700"
                  )}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-white uppercase font-bold tracking-widest text-center px-1">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="w-12 h-12 bg-blue-800 rounded-full border border-blue-700 flex items-center justify-center text-blue-200 font-bold uppercase text-xs">
        NF
      </div>
    </aside>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
