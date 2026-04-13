import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className }) => {
  return (
    <div className={twMerge("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300", className)}>
      {children}
    </div>
  );
};

export const GlassCard = ({ children, className }) => {
  return (
    <div className={twMerge("bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl rounded-2xl p-6 transition-colors duration-300", className)}>
      {children}
    </div>
  );
};
