import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <input className={twMerge("input-field", error && "border-red-500 focus:ring-red-500/20", className)} {...props} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
