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
    
    // Trim inputs to avoid whitespace issues
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (cleanUsername === credentials.username && cleanPassword === credentials.password) {
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

            <h1 className="text-4xl font-black tracking-widest leading-tight" style={{ background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RAED
            </h1>
            <p className="text-xs text-emerald-400/70 mt-1 font-semibold tracking-widest uppercase">
              Reading · Achieving · Evaluating · Developing
            </p>
            <p className="text-xs text-slate-500 mt-1">
              المطالعة · الإنجاز · التقويم · التطوير
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
