import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'px-6 py-3 text-medical-600 rounded-xl font-semibold hover:bg-medical-50 transition-all flex items-center justify-center gap-2',
  };

  return (
    <button className={twMerge(variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
