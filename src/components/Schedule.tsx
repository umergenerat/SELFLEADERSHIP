import { useState } from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useApp, AttendanceStatus, ClassSession } from '../context/AppContext';

export default function Schedule() {
  const days = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
  const { schedule, setSchedule } = useApp();

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return <CheckCircle2 size={24} className="text-green-500" />;
      case 'partial': return <AlertCircle size={24} className="text-amber-500" />;
      case 'late': return <AlertCircle size={24} className="text-orange-500" />;
      case 'missed': return <AlertCircle size={24} className="text-orange-500" />;
      case 'absent': return <XCircle size={24} className="text-red-500" />;
      default: return <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-dashed" />;
    }
  };

  const getStatusLabel = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'حضور كلي';
      case 'late': return 'تأخر';
      case 'missed': return 'خروج مبكر';
      case 'partial': return 'تأخر وخروج مبكر';
      case 'absent': return 'غياب كلي';
      default: return 'انقر للتسجيل';
    }
  };

  const [activeSession, setActiveSession] = useState<{day: string, id: string} | null>(null);

  const setStatus = (day: string, sessionId: string, newStatus: AttendanceStatus) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      const sessionIndex = newSchedule[day].findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) return prev;

      newSchedule[day] = [...newSchedule[day]];
      newSchedule[day][sessionIndex] = { ...newSchedule[day][sessionIndex], status: newStatus };
      return newSchedule;
    });
    setActiveSession(null);
  };

  const [hasCommitted, setHasCommitted] = useState(false);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);

  return (
    <div className="space-y-6 pb-20">
      <div className={`glass p-6 transition-all duration-500 border ${hasCommitted ? 'border-emerald-500/30' : 'border-blue-500/30'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            {hasCommitted ? (
              <CheckCircle2 className="text-emerald-400" size={24} />
            ) : (
              <AlertCircle className="text-blue-400" size={24} />
            )}
            ميثاق وتعليمات تسجيل الحضور
          </h3>
          <button 
            onClick={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
            className="text-slate-400 hover:text-white transition-colors p-2"
          >
            {isInstructionsExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
          </button>
        </div>

        {isInstructionsExpanded && (
          <div className="space-y-4 mb-6 border-t border-white/10 pt-4 animate-fade-in-up">
            <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl">
              النظام الذكي لتسجيل الحضور يعتمد بالأساس على <strong>الأمانة العلمية</strong> والمسؤولية الذاتية للتلميذ. سجل وضعيتك الفعلية بدقة، حيث يتم مقاطعة هذه البيانات دورياً مع تقارير الأساتذة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                  <CheckCircle2 size={18} /> حضور كلي
                </div>
                <p className="text-xs text-slate-300">التواجد داخل الفصل من بداية الحصة إلى نهايتها دون تأخير يتجاوز 5 دقائق.</p>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                  <AlertCircle size={18} /> تأخر
                </div>
                <p className="text-xs text-slate-300">الالتحاق بالفصل بعد مرور أكثر من 5 دقائق على بداية الحصة المبرمجة.</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                  <XCircle size={18} /> غياب
                </div>
                <p className="text-xs text-slate-300">عدم التواجد في الحصة كلياً. يتطلب إحضار مبرر للإدارة عند العودة.</p>
              </div>
            </div>
            
            {!hasCommitted && (
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => {
                    setHasCommitted(true);
                    setIsInstructionsExpanded(false);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  أتعهد بالأمانة في تسجيل الحضور
                </button>
              </div>
            )}
          </div>
        )}

        {!isInstructionsExpanded && hasCommitted && (
          <p className="text-emerald-400/80 text-sm font-medium mt-2 bg-emerald-500/10 inline-block px-3 py-1.5 rounded-lg border border-emerald-500/20">
            تم توقيع ميثاق الأمانة. يمكنك الآن تسجيل وتسوية وضعية الحضور الخاصة بك بالنقر على حصص البرنامج.
          </p>
        )}
        {!isInstructionsExpanded && !hasCommitted && (
          <p className="text-slate-400 text-sm mt-2">
            يرجى قراءة التعليمات والمصادقة على ميثاق الأمانة لتتمكن من تسجيل الحضور بشكل مسؤول.
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${hasCommitted ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
        {days.map(day => (
          <div key={day} className="glass p-5">
            <h4 className="font-bold text-xl text-white border-b border-white/10 pb-3 mb-4">{day}</h4>
            <div className="space-y-3">
              {schedule[day] ? (
                schedule[day].map(session => {
                  const isActive = activeSession?.day === day && activeSession?.id === session.id;
                  return (
                  <div key={session.id} className="relative">
                    <div 
                      onClick={() => setActiveSession(isActive ? null : { day, id: session.id })}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        session.status === 'none' ? 'border-white/10 bg-white/5 hover:bg-white/10' :
                        session.status === 'present' ? 'border-emerald-500/50 bg-emerald-500/10' :
                        (session.status === 'partial' || session.status === 'late' || session.status === 'missed') ? 'border-amber-500/50 bg-amber-500/10' :
                        'border-red-500/50 bg-red-500/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-white">{session.subject}</h5>
                          <p className="text-xs text-slate-400 mt-1">{session.teacher}</p>
                        </div>
                        {getStatusIcon(session.status)}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                        <span className="text-xs font-medium text-slate-300 bg-white/5 px-2 py-1 rounded-md">{session.time}</span>
                        <span className={`text-xs font-bold ${
                          session.status === 'none' ? 'text-slate-400' :
                          session.status === 'present' ? 'text-emerald-400' :
                          (session.status === 'partial' || session.status === 'late' || session.status === 'missed') ? 'text-amber-400' :
                          'text-red-400'
                        }`}>{getStatusLabel(session.status)}</span>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="mt-2 bg-slate-900/80 border border-white/10 rounded-xl p-2 flex justify-between gap-2 shadow-lg animate-fade-in-up">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setStatus(day, session.id, 'present'); }}
                          className="flex-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          حضور كلي
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setStatus(day, session.id, 'late'); }}
                          className="flex-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          تأخر
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setStatus(day, session.id, 'absent'); }}
                          className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          غياب
                        </button>
                      </div>
                    )}
                  </div>
                )})
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm border border-white/5 bg-white/5 rounded-xl">لا توجد حصص مبرمجة</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
