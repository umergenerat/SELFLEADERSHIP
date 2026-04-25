import React, { useState } from 'react';
import { Lightbulb, Send, Search, Users, Book, CheckCircle2, GraduationCap, Loader2, MessageCircle, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useApp, Peer, Teacher, Difficulty } from '../context/AppContext';

export default function DifficultiesLab() {
  const { subjects, peers, teachers, difficulties, setDifficulties } = useApp();

  const [newSubject, setNewSubject] = useState('');
  const [newTopic, setNewTopic] = useState('');
  
  const [filter, setFilter] = useState<'all' | 'processing' | 'active' | 'resolved'>('all');
  
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [customSolution, setCustomSolution] = useState('');
  const [expandedResolvedIds, setExpandedResolvedIds] = useState<string[]>([]);

  const generateHelp = (subject: string, topic: string): Partial<Difficulty> => {
    const matchedPeers = peers.filter(p => p.strengths.includes(subject));
    const matchedTeacher = teachers.find(t => t.subject === subject);
    
    const generalSuggestions = [
      `البحث عن ملخص مبسط لموضوع "${topic}" في المكتبة الرقمية`,
      `إعادة إنجاز التمارين التطبيقية الخاصة بـ ${subject}`,
      `تخصيص 15 دقيقة إضافية يومياً لمراجعة هذا المحور`
    ];
    
    return {
      matchedPeers,
      matchedTeacher,
      aiSuggestions: generalSuggestions
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newTopic) return;

    const newDiffId = Date.now().toString();
    const newDiff: Difficulty = {
      id: newDiffId,
      subject: newSubject,
      topic: newTopic,
      status: 'processing',
      date: new Date().toLocaleDateString('ar-MA')
    };

    setDifficulties([newDiff, ...difficulties]);
    setNewSubject('');
    setNewTopic('');
    
    // Simulate AI processing & matching
    setTimeout(() => {
      setDifficulties(prev => 
        prev.map(d => {
          if (d.id === newDiffId) {
            const help = generateHelp(d.subject, d.topic);
            return { 
              ...d, 
              status: 'active' as const,
              ...help
            };
          }
          return d;
        })
      );
    }, 2500);
  };

  const handleConfirmResolve = (id: string) => {
    if (!customSolution.trim()) return;
    setDifficulties(prev =>
      prev.map(d => d.id === id ? { 
        ...d, 
        status: 'resolved', 
        solution: customSolution.trim()
      } : d)
    );
    setResolvingId(null);
    setCustomSolution('');
  };

  const toggleExpand = (id: string) => {
    setExpandedResolvedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const openContact = (phone: string, text: string) => {
    const formattedPhone = phone.startsWith('0') ? phone.replace('0', '212') : phone;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedText}`, '_blank');
  };

  const filteredDifficulties = difficulties.filter(d => filter === 'all' ? true : d.status === filter);

  return (
    <div className="space-y-6 pb-20">
      {/* Header section */}
      <div className="glass p-8 relative overflow-hidden backdrop-brightness-125 border-emerald-500/20">
        <div className="relative z-10 md:w-2/3">
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-white">
            <Lightbulb className="text-amber-400" size={32} />
            مختبر الصعوبات والحلول
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            محرك ذكي لاستقبال الصعوبات الدراسية وتوجيهها في مسارات الحل المثلى. يربطك بالحلول المقترحة وبالأشخاص المرجعيين بناءً على بيانات الأقسام الحقيقية.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 text-white">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="glass p-6 sticky top-6">
            <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">سجل صعوبة لمحرك الحلول</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">المادة المستعصية</label>
                <select 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-slate-900">اختر المادة...</option>
                  {subjects.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">توصيف الصعوبة</label>
                <textarea 
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="كيف يمكنني فهم..."
                  rows={4}
                  className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none placeholder:text-slate-500"
                />
              </div>

              <button 
                type="submit"
                disabled={!newSubject || !newTopic}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
              >
                <Send size={18} />
                أرسل للتحليل والاستكشاف
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <h3 className="text-xl font-bold text-white">سجل بناء التعلمات وتجاوز العقبات</h3>
            
            {/* Filter Tabs */}
            <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10 overflow-x-auto w-full sm:w-auto">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                الكل
              </button>
              <button 
                onClick={() => setFilter('processing')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'processing' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                قيد المعالجة
              </button>
              <button 
                onClick={() => setFilter('active')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'active' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                نشطة
              </button>
              <button 
                onClick={() => setFilter('resolved')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'resolved' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                مكتملة
              </button>
            </div>
          </div>
          
          {filteredDifficulties.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white/5 border border-white/5 rounded-2xl animate-fade-in-up">
              <Filter size={48} className="mx-auto mb-4 opacity-20" />
              <p>لا توجد صعوبات تطابق هذا الفلتر حالياً.</p>
            </div>
          )}

          <div className="space-y-4">
            {filteredDifficulties.map(diff => (
              <div key={diff.id} className={`stat-card transition-all duration-300 overflow-hidden relative ${diff.status === 'resolved' ? (expandedResolvedIds.includes(diff.id) ? 'p-6' : 'p-4 border-emerald-500/20 bg-emerald-500/5 cursor-pointer hover:bg-emerald-500/10') : 'p-6'}`} onClick={() => diff.status === 'resolved' && !expandedResolvedIds.includes(diff.id) ? toggleExpand(diff.id) : undefined}>
                
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${diff.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-slate-200 border border-white/10'}`}>
                      {diff.subject}
                    </span>
                    <span className="text-xs text-slate-400">{diff.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {diff.status === 'processing' && (
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
                        <Loader2 size={14} className="animate-spin" /> جاري التحليل...
                      </span>
                    )}
                    {diff.status === 'active' && (
                      <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Search size={14} /> مقترحات نشطة
                      </span>
                    )}
                    {diff.status === 'resolved' && (
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 size={14} /> تم الحل
                        </span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleExpand(diff.id); }}
                          className="text-emerald-400 hover:bg-emerald-500/20 p-1 rounded transition-colors"
                        >
                          {expandedResolvedIds.includes(diff.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <h4 className={`font-medium text-white ${diff.status === 'resolved' && !expandedResolvedIds.includes(diff.id) ? 'text-sm mt-1 truncate max-w-[80%]' : 'text-lg mt-3 mb-5'}`}>
                  {diff.topic}
                </h4>
                
                {/* Processing State */}
                {diff.status === 'processing' && (
                  <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center border-dashed border border-white/10 animate-fade-in-up">
                     <Search className="text-slate-500 mb-3 animate-bounce" size={24} />
                     <p className="text-emerald-400 font-medium">يقوم محرك الحلول بالبحث عن المقاربات والأشخاص المرجعيين...</p>
                  </div>
                )}

                {/* Active State Details */}
                {diff.status === 'active' && (
                  <div className="space-y-4 animate-fade-in-up">
                    {/* AI Suggestions */}
                    {diff.aiSuggestions && diff.aiSuggestions.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h5 className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
                          <Lightbulb size={16} className="text-amber-400" /> موجهات مقترحة للحل المستقل:
                        </h5>
                        <ul className="space-y-2">
                          {diff.aiSuggestions.map((sug, i) => (
                             <li key={i} className="flex gap-2 text-sm text-slate-200">
                               <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 shrink-0"></div>
                               {sug}
                             </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Human Support */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Teacher */}
                      {diff.matchedTeacher ? (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap size={18} className="text-blue-400" />
                              <p className="text-xs text-blue-300 font-bold">الاستشارة الأكاديمية</p>
                            </div>
                            <p className="text-blue-100 font-medium text-sm mb-1">{diff.matchedTeacher.name}</p>
                            <p className="text-xs text-blue-200/60 mb-3">أستاذ المادة المعتمد</p>
                          </div>
                          <button 
                            onClick={() => openContact(diff.matchedTeacher!.contactNumber, `السلام عليكم أستاذي، لدي استفسار بخصوص موضوع في المقرر: ${diff.topic}. هل يمكنك مساعدتي؟`)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <MessageCircle size={14} /> طلب توجيه
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 opacity-60">
                          <GraduationCap size={18} className="text-slate-500 mb-2" />
                          <p className="text-xs text-slate-400">لا يوجد أستاذ مسجل لهذه المادة حاليا.</p>
                        </div>
                      )}

                      {/* Peers */}
                      {diff.matchedPeers && diff.matchedPeers.length > 0 ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Users size={18} className="text-emerald-400" />
                              <p className="text-xs text-emerald-300 font-bold">شبكة الأقران المعتمدة</p>
                            </div>
                            <div className="mb-3 space-y-2 max-h-40 overflow-y-auto pr-1">
                              {diff.matchedPeers.map((peer, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                                  <span className="text-sm font-medium text-emerald-100">{peer.name}</span>
                                  <button 
                                    onClick={() => openContact(peer.contactNumber, `السلام ${peer.name}، لقيت راسي كنعاني فهاد الموضوع الدراسية: ${diff.topic}. واش تقدر تعاوني نفهمها؟`)}
                                    className="text-emerald-400 hover:bg-emerald-500/20 p-1.5 rounded-md transition-colors"
                                    title="تواصل وتساب"
                                  >
                                    <MessageCircle size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 opacity-60">
                          <Users size={18} className="text-slate-500 mb-2" />
                          <p className="text-xs text-slate-400">لا يتوفر زميل مرجعي متفوق في هذه المادة حالياً.</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      {resolvingId === diff.id ? (
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 animate-fade-in-up">
                          <label className="block text-sm font-medium text-emerald-400 mb-2">كيف تم تجاوز هذه الصعوبة؟ (اكتب خلاصة لتعود إليها لاحقاً)</label>
                          <textarea 
                            value={customSolution}
                            onChange={(e) => setCustomSolution(e.target.value)}
                            placeholder="مثال: بعد مراجعة ملخص الدرس ومشاهدة مقطع فيديو، استطعت فهم القاعدة..."
                            className="w-full bg-slate-900 border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none text-sm mb-3"
                            rows={3}
                          />
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => { setResolvingId(null); setCustomSolution(''); }}
                              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                            >
                              إلغاء
                            </button>
                            <button 
                              onClick={() => handleConfirmResolve(diff.id)}
                              disabled={!customSolution.trim()}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 size={16} /> حفظ الخلاصة واعتماد الحل
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <button 
                            onClick={() => { setResolvingId(diff.id); setCustomSolution(''); }}
                            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold items-center flex gap-2 transition-colors border border-white/10"
                          >
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            تسجيل الخلاصة وتجاوز العقبة
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Resolved State (Expanded) */}
                {diff.status === 'resolved' && expandedResolvedIds.includes(diff.id) && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-4 animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      <Book className="text-emerald-400" size={16} />
                      <p className="text-xs text-emerald-400 font-bold">خلاصة الحل (مذكرة التعلم)</p>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed whitespace-pre-wrap">{diff.solution || 'تم التجاوز.'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
