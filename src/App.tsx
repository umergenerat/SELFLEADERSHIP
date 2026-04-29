import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Lightbulb, 
  BookOpen, 
  TrendingUp, 
  BellRing,
  FileDown,
  Settings as SettingsIcon,
  Menu,
  X,
  LogOut,
  Sparkles
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import DifficultiesLab from './components/DifficultiesLab';
import ReadingJourney from './components/ReadingJourney';
import ProgressCurve from './components/ProgressCurve';
import Settings from './components/Settings';
import Login from './components/Login';
import { useApp } from './context/AppContext';

type View = 'dashboard' | 'schedule' | 'difficulties' | 'reading' | 'progress' | 'settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile: student, toggleHealthAlert, credentials, preferences } = useApp();
  const healthAlert = student.healthAlertActive;

  React.useEffect(() => {
    if (preferences.theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
    document.documentElement.dir = preferences.language === 'ar' ? 'rtl' : 'ltr';
  }, [preferences.theme, preferences.language]);


  if (!isAuthenticated) {
    return <Login credentials={credentials} onLogin={() => setIsAuthenticated(true)} />;
  }

  const views: Record<View, React.ReactNode> = {
    dashboard: <Dashboard />,
    schedule: <Schedule />,
    difficulties: <DifficultiesLab />,
    reading: <ReadingJourney />,
    progress: <ProgressCurve />,
    settings: <Settings onClose={() => setCurrentView('dashboard')} />
  };

  const navItems = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'schedule', label: 'البرنامج والمواظبة', icon: CalendarDays },
    { id: 'difficulties', label: 'مختبر الصعوبات', icon: Lightbulb },
    { id: 'reading', label: 'رحلة المطالعة', icon: BookOpen },
    { id: 'progress', label: 'منحنى التطور', icon: TrendingUp },
    { id: 'settings', label: 'الإعدادات', icon: SettingsIcon },
  ];

  const handleExportPDF = () => {
    window.print();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full p-2 md:p-4 lg:p-6 gap-2 md:gap-4 lg:gap-6 text-white font-sans overflow-hidden" dir={preferences.language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-30 w-64 md:w-72 flex flex-col gap-4 lg:gap-6 shrink-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 bg-[#0f172a] lg:bg-transparent p-4 lg:p-0
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="glass p-6 flex flex-col items-center gap-4 text-center mt-8 lg:mt-0 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-3 right-3 lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full p-[2px] relative avatar-no-invert"
            style={{ background: 'linear-gradient(135deg, #10b981, #0d9488, #10b981)', boxShadow: '0 0 25px rgba(16,185,129,0.35)' }}
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-transparent" />
              <span className="text-3xl font-black text-emerald-400 relative z-10">م</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-1 border-2 border-slate-900">
              <Sparkles size={10} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-base">{student.name}</h2>
            <p className="text-emerald-400 text-xs mt-0.5 font-medium">{student.level}</p>
          </div>
        </div>

        <nav className="glass flex-1 py-3 overflow-y-auto flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 mx-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'text-emerald-400 nav-item-active' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
                style={isActive ? { width: 'calc(100% - 1rem)' } : {}}
              >
                <Icon size={19} className={isActive ? 'text-emerald-400' : ''} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="mr-auto w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
                )}
              </button>
            );
          })}
          
          <div className="mt-auto px-6 py-4 space-y-4">
              <button 
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 rounded-xl transition-colors text-sm"
              >
                <FileDown size={16} />
                <span>تصدير الدفتر (PDF)</span>
              </button>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl transition-colors text-sm"
              >
                <LogOut size={16} />
                <span>تسجيل الخروج</span>
              </button>
             <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">{student.school}</div>
             <div className="text-[10px] text-slate-500 tracking-widest text-center mt-2">تطوير: عمر أيت لوتو Aomar Ait Loutou</div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 lg:gap-6 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="glass px-4 md:px-8 py-4 flex justify-between items-center shrink-0" style={{ backdropFilter: 'blur(24px)' }}>
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black text-white tracking-tight">RAED</h1>
              <p className="text-[10px] md:text-xs text-emerald-500/70 font-medium">Reading · Achieving · Evaluating · Developing</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Quick Health/Emergency Alert */}
            <button 
               onClick={toggleHealthAlert}
               className={`px-3 md:px-4 py-2 flex items-center gap-2 md:gap-3 transition-colors rounded-xl md:rounded-2xl ${
                 healthAlert ? 'alert-glass' : 'glass opacity-60 hover:opacity-100'
               }`}
            >
              <div className={`w-2 h-2 rounded-full ${healthAlert ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}></div>
              <div className="text-[10px] md:text-xs flex items-center gap-2">
                 <BellRing size={14} className={healthAlert ? 'text-red-400' : 'text-slate-300'} />
                 {healthAlert ? (
                   <>
                     <span className="text-red-400 font-bold hidden sm:block">تنبيه صحي خاص:</span>
                     <span className="text-slate-300 hidden md:inline">حساسية معلنة نشطة</span>
                   </>
                 ) : (
                   <span className="text-slate-300 hidden sm:inline">تنبيه صحي/طارئ</span>
                 )}
              </div>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-20 md:pb-0" id="pdf-content-area">
          {healthAlert && (
            <div className="alert-glass mb-6 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-red-500/20 p-2 rounded-full shrink-0">
                <BellRing size={20} className="text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-400 text-lg">تنبيه طارئ نشط!</h3>
                <p className="text-slate-300 mt-1 text-sm md:text-base">
                  تم تسجيل إشعار للقسم الإداري ولولي الأمر بخصوص وضعية طارئة. يرجى التوجه للإدارة.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
                    تم إرسال SMS لولي الأمر
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
                    تم إشعار الحراسة العامة
                  </span>
                </div>
              </div>
              <button 
                onClick={toggleHealthAlert}
                className="text-red-400 hover:bg-red-500/20 p-2 rounded-md transition-colors mt-2 sm:mt-0 whitespace-nowrap"
              >
                إلغاء التنبيه
              </button>
            </div>
          )}
          
          <div className="max-w-6xl mx-auto w-full pb-8">
            {views[currentView]}
          </div>
        </div>
      </main>
    </div>
  );
}

