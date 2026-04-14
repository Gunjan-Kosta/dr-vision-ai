import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-medical-600 text-white p-1.5 rounded-lg shadow-lg shadow-medical-500/20 dark:shadow-medical-900/40">
            <Stethoscope size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white hidden md:block">Dr. Vision AI</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-slate-400 dark:text-slate-500 hover:text-medical-600 dark:hover:text-medical-400 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-medical-100 dark:bg-medical-900/40 text-medical-700 dark:text-medical-400 rounded-full flex items-center justify-center font-bold border-2 border-medical-200 dark:border-medical-800/50">
              <User size={20} />
            </div>
            
            <button 
              onClick={handleLogout}
              className="ml-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
