import React from 'react';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';

export function Loading() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-full max-w-2xl h-[400px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200" 
          alt="Finance Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-2">My Money</h2>
            <p className="text-white/80 text-lg">Manage your business and personal finances beautifully.</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Wallet className="w-8 h-8 text-brand-primary" />
        </motion.div>
        <span className="text-xl font-medium text-slate-600">Initializing your dashboard...</span>
      </div>
    </motion.div>
  );
}
