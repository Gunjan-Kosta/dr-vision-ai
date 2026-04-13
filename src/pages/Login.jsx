import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GlassCard } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-medical-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-medical-200/40 dark:bg-medical-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-medical-200/40 dark:bg-medical-900/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-600 text-white rounded-2xl shadow-lg mb-4 shadow-medical-500/20">
            <Stethoscope size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Dr. Vision AI</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Diabetic Retinopathy Prediction System</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-medical-600" />
                Email Address
              </label>
              <Input 
                type="email" 
                placeholder="doctor@hospital.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email ? error : null}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock size={16} className="text-medical-600" />
                Password
              </label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && !password ? error : null}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-medical-600 focus:ring-medical-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-medical-600 dark:text-medical-400 font-medium hover:underline">Forgot password?</a>
            </div>

            {error && email && password && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                {error}
              </div>
            )}

            <Button type="submit" className="w-full py-4 text-lg">
              Sign In
            </Button>

            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                login('guest@example.com', 'bypass');
                navigate('/');
              }}
              className="w-full py-2 text-sm font-medium text-slate-400 hover:text-medical-600 mt-2"
            >
              Bypass Login (Direct Access)
            </Button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-6 uppercase tracking-widest font-semibold">
            SECURE DOCTOR PORTAL
          </p>
        </GlassCard>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-8 text-sm">
          Don't have an account? <a href="#" className="text-medical-600 dark:text-medical-400 font-semibold hover:underline">Request Access</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
