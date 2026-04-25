import { Target, Trophy, Clock, FilePlus, BookOpen, Lightbulb, CalendarDays } from 'lucide-react';
import { useApp, ClassSession } from '../context/AppContext';

export default function Dashboard() {
  const { schedule, readingSessions, difficulties } = useApp();

  let totalSessions = 0;
  let attendedSessions = 0;
  
  (Object.values(schedule) as ClassSession[][]).forEach(daySessions => {
    daySessions.forEach(session => {
      if (session.status !== 'none') {
        totalSessions++;
        if (session.status === 'present') attendedSessions += 1;
        else if (session.status === 'late' || session.status === 'missed') attendedSessions += 0.5;
      }
    });
  });
  
  const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;
  const attendanceDisplay = totalSessions > 0 ? `${attendanceRate}%` : '---';

  const nextSession = (Object.values(schedule) as ClassSession[][]).flat().find(s => s.status === 'none') || { subject: 'لا يوجد' };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 badge-glow">
               <Target size={20} />
             </div>
             <p className="text-sm text-slate-400 font-medium">معدل المواظبة</p>
          </div>
          <p className="text-3xl font-bold text-white mt-2">{attendanceDisplay}</p>
        </div>
        
        <div className="stat-card p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
               <Trophy size={20} />
             </div>
             <p className="text-sm text-slate-400 font-medium">حصص المطالعة</p>
          </div>
          <p className="text-3xl font-bold text-white mt-2">{readingSessions.length} <span className="text-sm text-slate-500">/ 78</span></p>
        </div>

        <div className="stat-card p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
               <FilePlus size={20} />
            </div>
            <p className="text-sm text-slate-400 font-medium">صعوبات مسجلة</p>
          </div>
          <p className="text-3xl font-bold text-white mt-2">{difficulties.length}</p>
        </div>

        <div className="stat-card p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
               <Clock size={20} />
            </div>
            <p className="text-sm text-slate-400 font-medium">الحصة القادمة</p>
          </div>
          <p className="text-xl font-bold text-white mt-2">{nextSession.subject}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass p-6">
          <h3 className="text-lg font-bold text-white mb-6">الأنشطة الأخيرة</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0">
              <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mt-1">
                <BookOpen size={18} />
              </div>
              <div>
                <p className="font-medium text-slate-200">تم تسجيل حصة مطالعة جديدة</p>
                <p className="text-sm text-slate-400">كتاب "العبقريات" للعقاد - منذ ساعتين</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0">
              <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 mt-1">
                <Lightbulb size={18} />
              </div>
              <div>
                <p className="font-medium text-slate-200">تم إيجاد حل لصعوبة في الفيزياء</p>
                <p className="text-sm text-slate-400">بمساعدة الزميل "ياسين" - الأمس</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0">
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 mt-1">
                <CalendarDays size={18} />
              </div>
              <div>
                <p className="font-medium text-slate-200">حضور كلي - اللغة العربية</p>
                <p className="text-sm text-slate-400">تم التأكيد - الأمس</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="stat-card p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
          <h3 className="text-lg font-bold text-white mb-2">كيف هو يومك الدراسي؟</h3>
          <p className="text-slate-300 mb-6 font-medium">سجل حضورك الخاص وصعوباتك لليوم. الاستمرارية هي مفتاح التفوق.</p>
          
          <div className="space-y-3">
            <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl shadow-sm font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors">
              <CalendarDays size={20} />
              تسجيل الحضور لليوم
            </button>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-sm font-bold flex items-center justify-center gap-2 transition-colors">
              <Lightbulb size={20} />
              صادفتني صعوبة للتو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
