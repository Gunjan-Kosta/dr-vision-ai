import React from 'react';
import { Shield, Lock, FileText, Smartphone, Stethoscope, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20 py-16 transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-medical-600 text-white p-1.5 rounded-lg">
                <Stethoscope size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Dr. Vision AI</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              Empowering healthcare professionals with state-of-the-art AI for early detection 
              and precision management of Diabetic Retinopathy.
            </p>
            <div className="flex gap-3">
              {[Shield, Lock, FileText, Smartphone].map((Icon, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-medical-600 dark:text-medical-400 hover:scale-110 transition-transform cursor-pointer shadow-sm">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              {['Documentation', 'API Status', 'Clinical Studies', 'Privacy Policy'].map((item) => (
                <li key={item} className="hover:text-medical-600 dark:hover:text-medical-400 cursor-pointer transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              {['Help Center', 'Contact Us', 'Training Materials', 'System Status'].map((item) => (
                <li key={item} className="hover:text-medical-600 dark:hover:text-medical-400 cursor-pointer transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              © 2026 Dr. Vision AI. All rights reserved. Hospital Edition v2.4.0
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 flex items-center gap-1">
              Developed with <Heart size={10} className="text-red-500 fill-red-500" /> for medical advancement
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
               <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">HiPAA Compliant</span>
               <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">ISO 27001</span>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
