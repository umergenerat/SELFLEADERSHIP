import React, { useState } from 'react';
import { Lock, User, LogIn, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Simulate authentication
      onLogin();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass max-w-md w-full p-8 md:p-10 relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-500/50 p-1 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
               <span className="text-3xl font-bold">م</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">مسار الريادة الذكي</h1>
          <p className="text-sm text-slate-400 mt-2">تسجيل الدخول إلى الدفتر التربوي</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300 ml-1">اسم المستخدم أو رقم مسار</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                placeholder="أدخل الحساب الخاص بك"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">كلمة المرور</label>
              <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">هل نسيت كلمة المرور؟</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!username || !password}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 group mt-2"
          >
            <span>تسجيل الدخول</span>
            <LogIn size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#162133] text-slate-400 text-xs">أو الدخول بسرعة عبر</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => onLogin()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm font-medium text-slate-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.13v2.84C3.99 20.53 7.71 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.13C1.43 8.55 1 10.22 1 12s.43 3.45 1.13 4.95l3.71-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.71 1 3.99 3.47 2.13 7.05l3.71 2.84c.86-2.59 3.29-4.51 6.16-4.51z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <button
              onClick={() => onLogin()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm font-medium text-slate-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              Microsoft
            </button>
          </div>
        </div>
      </div>
      
      {/* Small footer */}
      <div className="absolute bottom-6 text-center w-full z-10 text-xs text-slate-500 tracking-widest pointer-events-none">
        تطوير: عمر أيت لوتو AOMAR AIT LOUTOU
      </div>
    </div>
  );
}
