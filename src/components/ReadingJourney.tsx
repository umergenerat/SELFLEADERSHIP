import React, { useState } from 'react';
import { BookOpen, Award, Medal, Star, Target, PlusCircle, X, Book, GraduationCap, Clock, CalendarDays, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReadingJourney() {
  const { readingSessions, setReadingSessions } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'homework' | 'free'>('homework');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState<number>(30);

  const maxSessions = 78;
  const sessionsCount = readingSessions.length;
  
  const homeworkCount = readingSessions.filter(s => s.type === 'homework').length;
  const freeCount = readingSessions.filter(s => s.type === 'free').length;

  // Level thresholds and titles
  const getBadgeForSession = (count: number) => {
    if (count >= 70) return { title: "مفكر المستقبل", icon: <Star className="text-yellow-400" size={32} />, color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" };
    if (count >= 50) return { title: "قارئ نهم", icon: <Medal className="text-emerald-400" size={32} />, color: "bg-emerald-500/20 border-emerald-500/30 badge-glow text-emerald-400" };
    if (count >= 30) return { title: "مستكشف المعرفة", icon: <Award className="text-blue-400" size={32} />, color: "bg-blue-500/20 border-blue-500/30 text-blue-400" };
    if (count >= 10) return { title: "صديق الكتاب", icon: <BookOpen className="text-green-400" size={32} />, color: "bg-green-500/20 border-green-500/30 text-green-400" };
    return { title: "مبتدئ", icon: <Target className="text-slate-400" size={32} />, color: "bg-slate-500/20 border-slate-500/30 text-slate-400" };
  };

  const currentBadge = getBadgeForSession(sessionsCount);
  const progressPercentage = Math.min(100, Math.round((sessionsCount / maxSessions) * 100));

  const resetForm = () => {
    setTitle('');
    setType('homework');
    setDate(new Date().toISOString().split('T')[0]);
    setDuration(30);
    setEditingId(null);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setReadingSessions(readingSessions.map(session => 
        session.id === editingId 
          ? { ...session, title: title.trim(), type, date, duration } 
          : session
      ));
    } else {
      const newSession = {
        id: Date.now().toString(),
        title: title.trim(),
        type,
        date,
        duration
      };
      setReadingSessions([newSession, ...readingSessions]);
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const openEditModal = (session: any) => {
    setTitle(session.title);
    setType(session.type);
    setDate(session.date);
    setDuration(session.duration);
    setEditingId(session.id);
    setIsModalOpen(true);
  };

  const handleDeleteSession = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الحصة؟')) {
      setReadingSessions(readingSessions.filter(s => s.id !== id));
    }
  };

  const nextThreshold = Math.ceil((sessionsCount + 1) / 10) * 10;
  const sessionsToNext = nextThreshold - sessionsCount;

  return (
    <div className="space-y-8 pb-20 relative">
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass bg-slate-900 border border-white/20 p-6 max-w-md w-full rounded-2xl shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {editingId ? <Edit2 className="text-blue-400" /> : <PlusCircle className="text-emerald-400" />} 
                {editingId ? 'تعديل حصة مطالعة' : 'تسجيل حصة مطالعة'}
              </h3>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSaveSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">الكتاب أو المادة المقروءة</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثال: رواية البؤساء أو تمارين الرياضيات"
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">نوع المطالعة</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('homework')}
                    className={`px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors border ${type === 'homework' ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-slate-800/50 border-white/10 text-slate-400 hover:bg-slate-800'}`}
                  >
                    <GraduationCap size={18} /> واجب مدرسي
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('free')}
                    className={`px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors border ${type === 'free' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-slate-800/50 border-white/10 text-slate-400 hover:bg-slate-800'}`}
                  >
                    <Book size={18} /> مطالعة حرة
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">التاريخ</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">المدة (بالدقائق)</label>
                  <div className="flex items-center gap-2">
                    <select 
                      value={duration}
                      onChange={e => setDuration(Number(e.target.value))}
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    >
                      <option value={15} className="bg-slate-900">15 دقيقة</option>
                      <option value={30} className="bg-slate-900">30 دقيقة</option>
                      <option value={45} className="bg-slate-900">45 دقيقة</option>
                      <option value={60} className="bg-slate-900">60 دقيقة (ساعة)</option>
                      <option value={90} className="bg-slate-900">90 دقيقة</option>
                      <option value={120} className="bg-slate-900">120 دقيقة (ساعتان)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!title.trim()}
                className={`w-full mt-4 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 text-white ${editingId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {editingId ? 'حفظ التعديلات' : 'تأكيد التسجيل'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="glass p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 z-0 pointer-events-none"></div>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border ${currentBadge.color} z-10`}>
          {currentBadge.icon}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 z-10">{currentBadge.title}</h2>
        <p className="text-slate-300 max-w-md z-10">
          حصيلة مثمرة! لقد أتممت {sessionsCount} حصة مطالعة من أصل {maxSessions} حصة مبرمجة في الموسم.
        </p>
        
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm z-10"
        >
          <PlusCircle size={20} />
          تسجيل حصة مطالعة جديدة
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card p-4 flex items-center gap-4">
          <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
            <Target size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">إجمالي الحصص</p>
            <p className="text-2xl font-bold text-white">{sessionsCount}</p>
          </div>
        </div>
        <div className="stat-card p-4 flex items-center gap-4 border border-blue-500/10">
          <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">الواجبات المدرسية</p>
            <p className="text-2xl font-bold text-white">{homeworkCount}</p>
          </div>
        </div>
        <div className="stat-card p-4 flex items-center gap-4 border border-amber-500/10">
          <div className="bg-amber-500/20 p-3 rounded-xl text-amber-400">
            <Book size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">المطالعة الحرة</p>
            <p className="text-2xl font-bold text-white">{freeCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Path */}
        <div className="glass p-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xl font-bold text-white">مسار التقدم العام</h3>
            <span className="text-sm font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
              {progressPercentage}%
            </span>
          </div>
          
          <div className="relative h-4 bg-white/5 border border-white/10 rounded-full mb-8 overflow-hidden">
            <div 
              className="absolute top-0 right-0 h-full bg-emerald-500 badge-glow transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {[10, 30, 50, 70].map(threshold => {
              const isUnlocked = sessionsCount >= threshold;
              const badgeInfo = getBadgeForSession(threshold);
              return (
                <div 
                  key={threshold} 
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isUnlocked 
                      ? 'border-emerald-500/30 bg-emerald-500/10 opacity-100 badge-glow' 
                      : 'border-white/10 bg-white/5 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    {badgeInfo.icon}
                  </div>
                  <h4 className="font-bold text-white text-xs mb-1">{badgeInfo.title}</h4>
                  <p className="text-[10px] text-slate-400">{threshold} حصة</p>
                </div>
              );
            })}
          </div>
          
          {sessionsCount < maxSessions && (
            <div className="mt-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <p className="text-emerald-300 text-sm font-medium">
                بقي {sessionsToNext} حصص للحصول على الترقية القادمة. واصل القراءة!
              </p>
            </div>
          )}
        </div>

        {/* History List */}
        <div className="glass p-6 flex flex-col h-full">
          <h3 className="text-xl font-bold text-white mb-4">سجل الإنجازات</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px] pr-2">
            {readingSessions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 border border-dashed border-white/10 rounded-xl">
                لا توجد حصص مسجلة بعد.
              </div>
            ) : (
              readingSessions.map(session => (
                <div key={session.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                  <div className={`p-3 rounded-lg ${session.type === 'homework' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {session.type === 'homework' ? <GraduationCap size={20} /> : <Book size={20} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{session.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><CalendarDays size={12} /> {session.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {session.duration} دقيقة</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                      session.type === 'homework' ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}>
                      {session.type === 'homework' ? 'واجب مدرسي' : 'مطالعة حرة'}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => openEditModal(session)} className="text-slate-400 hover:text-blue-400 transition-colors p-1" title="تعديل">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeleteSession(session.id)} className="text-slate-400 hover:text-red-400 transition-colors p-1" title="حذف">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
