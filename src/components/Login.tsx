import React, { useState } from 'react';
import { Lock, User, LogIn, Eye, EyeOff, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import loginBg from '../assets/login_background.png';
import { UserCredentials } from '../context/AppContext';

interface LoginProps {
  onLogin: () => void;
  credentials: UserCredentials;
}

export default function Login({ onLogin, credentials }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setIsLoading(false);
    if (username === credentials.username && password === credentials.password) {
      onLogin();
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* Animated ambient orbs */}
      <div
        className="orb w-[500px] h-[500px] bg-emerald-500/15 top-[-15%] right-[-10%]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-teal-400/10 bottom-[-15%] left-[-10%]"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="orb w-[250px] h-[250px] bg-blue-500/10 top-[40%] left-[20%]"
        style={{ animationDelay: '-8s' }}
      />

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{ animation: 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards', opacity: 0 }}
      >
        <div className="glass-strong p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          {/* Logo Area */}
          <div className="flex flex-col items-center text-center mb-8"
            style={{ animation: 'fade-in-up 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <div
              className="w-24 h-24 rounded-full border-2 border-emerald-500/50 p-1 mb-5 relative"
              style={{
                boxShadow: '0 0 30px rgba(16,185,129,0.35), 0 0 80px rgba(16,185,129,0.12)',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                <span className="text-4xl font-black text-emerald-400 relative z-10">م</span>
              </div>
              {/* Sparkle badge */}
              <div className="absolute -bottom-1 -left-1 bg-emerald-500 rounded-full p-1 border-2 border-slate-900">
                <Sparkles size={12} className="text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
              مسار الريادة الذكي
            </h1>
            <p className="text-sm text-slate-400 mt-2 font-medium">
              دفتر القيادة والتتبع التربوي
            </p>

            {/* Decorative separator */}
            <div className="flex items-center gap-3 mt-4 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <ShieldCheck size={14} className="text-emerald-500/60" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div style={{ animation: 'fade-in-up 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
                اسم المستخدم أو رقم المسار
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  <User size={17} className="text-slate-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-premium w-full pr-10 pl-4 py-3.5 text-sm"
                  placeholder="أدخل الحساب الخاص بك"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ animation: 'fade-in-up 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  كلمة المرور
                </label>
                <a
                  href="#"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  onClick={e => e.preventDefault()}
                >
                  هل نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  <Lock size={17} className="text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium w-full pr-10 pl-10 py-3.5 text-sm"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300"
                style={{ animation: 'fade-in-up 0.3s ease-out' }}
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div style={{ animation: 'fade-in-up 0.6s 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
              <button
                type="submit"
                disabled={!username || !password || isLoading}
                className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2.5 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري التحقق...
                  </span>
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <LogIn size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Divider */}
          <div
            className="mt-6"
            style={{ animation: 'fade-in-up 0.6s 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <div className="relative flex items-center my-2">
              <div className="flex-1 border-t border-white/8" />
              <span className="px-4 text-xs text-slate-500 font-medium">أو الدخول بسرعة عبر</span>
              <div className="flex-1 border-t border-white/8" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setUsername(credentials.username);
                  setPassword(credentials.password);
                }}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-200 transition-all duration-200 border border-white/8 hover:border-white/15 hover:bg-white/8 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                title="تعبئة بيانات جوجل "
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.13v2.84C3.99 20.53 7.71 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.13C1.43 8.55 1 10.22 1 12s.43 3.45 1.13 4.95l3.71-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.71 1 3.99 3.47 2.13 7.05l3.71 2.84c.86-2.59 3.29-4.51 6.16-4.51z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <button
                onClick={() => {
                  setUsername(credentials.username);
                  setPassword(credentials.password);
                }}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-200 transition-all duration-200 border border-white/8 hover:border-white/15 hover:bg-white/8 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                title="تعبئة بيانات مايكروسوفت"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </svg>
                Microsoft
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs text-slate-600 mt-5 tracking-wider"
          style={{ animation: 'fade-in 0.6s 0.7s ease-out both' }}
        >
          تطوير: عمر أيت لوتو &mdash; AOMAR AIT LOUTOU
        </p>
      </div>
    </div>
  );
}
