import React, { useState } from 'react';
import { 
  Compass, 
  Brain, 
  Code, 
  BookOpen, 
  Palette, 
  Calculator,
  ArrowRight,
  CheckCircle2,
  RefreshCcw,
  Target,
  Sparkles,
  MessageCircle,
  Send,
  XCircle,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Simplified scientific criteria based on RIASEC & Multiple Intelligences models
const QUESTIONS = [
  { id: 1, text: 'أستمتع بحل الألغاز الرياضية والمسائل المعقدة واستخدام المنطق.', category: 'science' },
  { id: 2, text: 'أحب قراءة الروايات والكتب التاريخية وأهتم باللغات.', category: 'literature' },
  { id: 3, text: 'أهتم بمعرفة كيف تعمل الأجهزة الإلكترونية والحواسيب والآلات.', category: 'tech' },
  { id: 4, text: 'أميل إلى التعبير عن أفكاري من خلال الرسم، التصميم، أو التصوير.', category: 'art' },
  { id: 5, text: 'أحب تنظيم الفعاليات، الإقناع، وتسيير ميزانية الفريق أو الفصل.', category: 'eco' },
  { id: 6, text: 'أجد متعة في إجراء التجارب العلمية في المختبر وملاحظة النتائج.', category: 'science' },
  { id: 7, text: 'أستمتع بكتابة القصص أو التعبير عن رأيي في مواضيع اجتماعية وفلسفية.', category: 'literature' },
  { id: 8, text: 'أحب تركيب وتفكيك الأشياء، البرمجة، أو بناء مجسمات.', category: 'tech' },
  { id: 9, text: 'أهتم بتناسق الألوان، الديكور، والموسيقى بشكل كبير.', category: 'art' },
  { id: 10, text: 'أتابع أخبار الشركات، الأسواق، وأهتم بمجال ريادة الأعمال.', category: 'eco' },
  { id: 11, text: 'أفضل المواد التي تتطلب الحفظ، التحليل اللغوي والنقاش المفتوح.', category: 'literature' },
  { id: 12, text: 'أميل إلى التفكير الرياضي المتسلسل الدقيق أكثر من التفكير العاطفي.', category: 'science' }
];

const PROFILES: Record<string, any> = {
  science: {
    title: 'العلوم والرياضيات (جذع مشترك علمي)',
    icon: Brain,
    color: 'from-blue-500 to-indigo-500',
    description: 'تمتلك قدرة عالية على التحليل المنطقي وحل المشكلات المعقدة. تتميز بذكاء رياضي-منطقي. تخصص العلوم يفتح لك آفاقاً واسعة في الطب، الهندسة، البحث العلمي، والتكنولوجيا الدقيقة.',
    advice: 'ركز على تقوية مستواك في الرياضيات والفيزياء، وشارك في نوادي العلوم.'
  },
  literature: {
    title: 'الآداب والعلوم الإنسانية (جذع مشترك آداب)',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-500',
    description: 'لديك ميول قوية نحو التعبير اللغوي، فهم المجتمعات، والذكاء اللفظي. هذا التوجه يناسبك لتصبح كاتباً، محامياً، صحفياً، باحثاً اجتماعياً، أو أستاذاً.',
    advice: 'أكثر من المطالعة، شارك في مسابقات المناظرة، وطور مهاراتك في اللغات الأجنبية.'
  },
  tech: {
    title: 'التكنولوجيا والهندسة (جذع مشترك تكنولوجي)',
    icon: Code,
    color: 'from-slate-500 to-slate-700',
    description: 'تفكيرك عملي وتطبيقي (براغماتي). أنت شغوف بالتقنية وكيفية عمل الأشياء. مجالات البرمجة، الذكاء الاصطناعي، الهندسة الصناعية والشبكات هي بيئتك المثالية.',
    advice: 'تعلم أساسيات البرمجة، واهتم بالمواد التقنية والرياضيات التطبيقية.'
  },
  art: {
    title: 'الفنون والإبداع (جذع الفنون التطبيقية)',
    icon: Palette,
    color: 'from-fuchsia-500 to-pink-500',
    description: 'تتميز بخيال واسع، حس فني مرهف، وذكاء بصري-مكاني. مجالات التصميم الجرافيكي، الهندسة المعمارية، تصميم الأزياء، والفنون الجميلة هي مساحتك للتألق.',
    advice: 'مارس الرسم باستمرار، تعلم برامج التصميم، واصقل موهبتك الإبداعية.'
  },
  eco: {
    title: 'الاقتصاد والتدبير (خدمات / تسيير)',
    icon: Calculator,
    color: 'from-amber-500 to-orange-500',
    description: 'تتمتع بحس تنظيمي وتجاري ممتاز، وذكاء اجتماعي يجعلك قائداً جيداً. تخصصات إدارة الأعمال، المحاسبة، التسويق، وريادة الأعمال تتوافق تماماً مع قدراتك.',
    advice: 'تابع الأخبار الاقتصادية، تدرب على الخطابة والإقناع، ونمّ مهاراتك القيادية.'
  }
};

const Guidance = () => {
  const { profile } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  React.useEffect(() => {
    if (result) {
      setMsgSubject(`طلب استشارة حول توجيه: ${PROFILES[result].title}`);
    }
  }, [result]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);

    if (!profile.counselorPhone) {
      setContactError("يرجى إدراج رقم هاتف مستشار التوجيه في صفحة الإعدادات أولاً.");
      return;
    }

    const fullMessage = `${msgSubject}\n\n${msgBody}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${profile.counselorPhone.replace(/\+/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    setMessageSent(true);
    setTimeout(() => {
      setShowContactForm(false);
      setMessageSent(false);
      setMsgBody('');
    }, 3000);
  };

  const handleAnswer = (questionId: number, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300); // slight delay for smooth transition
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    const scores: Record<string, number> = { science: 0, literature: 0, tech: 0, art: 0, eco: 0 };
    
    QUESTIONS.forEach(q => {
      scores[q.category] += (finalAnswers[q.id] || 0);
    });

    let maxCategory = 'science';
    let maxScore = -1;

    Object.entries(scores).forEach(([cat, score]) => {
      if (score > maxScore) {
        maxScore = score;
        maxCategory = cat;
      }
    });

    setResult(maxCategory);
  };

  const resetTest = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">بوصلة التوجيه التربوي</h2>
              <p className="text-slate-400 mt-1">اكتشف التوجه الدراسي الأنسب لك بناءً على معايير علمية دقيقة لميولك ومهاراتك</p>
            </div>
          </div>
        </div>
      </div>

      {!result ? (
        <div className="glass p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="text-teal-400" />
              اختبار الميول الدراسية
            </h3>
            <div className="text-sm font-medium text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full">
              السؤال {currentStep + 1} من {QUESTIONS.length}
            </div>
          </div>

          <div className="w-full bg-slate-800/50 rounded-full h-2 mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-teal-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-10 mb-8 min-h-[200px] flex items-center justify-center text-center">
            <h4 className="text-2xl md:text-3xl font-medium text-white leading-relaxed" key={currentStep}>
              {QUESTIONS[currentStep].text}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleAnswer(QUESTIONS[currentStep].id, 3)}
              className="p-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all text-emerald-400 font-bold text-lg"
            >
              نعم، بشدة
            </button>
            <button
              onClick={() => handleAnswer(QUESTIONS[currentStep].id, 2)}
              className="p-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all text-amber-400 font-bold text-lg"
            >
              أحياناً / محايد
            </button>
            <button
              onClick={() => handleAnswer(QUESTIONS[currentStep].id, 1)}
              className="p-4 rounded-xl border-2 border-slate-600/30 bg-slate-700/30 hover:bg-slate-700/50 hover:border-slate-500 transition-all text-slate-300 font-bold text-lg"
            >
              لا، لا أميل لذلك
            </button>
          </div>
        </div>
      ) : (
        <div className="glass p-6 md:p-10 max-w-4xl mx-auto animate-in zoom-in-95 duration-500 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-500/20 rounded-full mb-6">
            <Sparkles className="text-emerald-400 w-8 h-8 m-2" />
          </div>
          <h3 className="text-xl text-slate-300 mb-2">بناءً على إجاباتك، التوجه الأنسب لك هو:</h3>
          
          {(() => {
            const profile = PROFILES[result];
            const Icon = profile.icon;
            return (
              <div className="mt-8 mb-8">
                <div className={`mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-500`}>
                  <Icon className="text-white" size={48} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  {profile.title}
                </h2>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 text-right max-w-2xl mx-auto">
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    {profile.description}
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                    <Lightbulb className="text-amber-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">نصيحة للمستقبل:</h4>
                      <p className="text-sm text-slate-400">{profile.advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>تواصل مع مستشار التوجيه</span>
            </button>
            <button
              onClick={resetTest}
              className="w-full sm:w-auto px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={20} />
              <span>إعادة الاختبار</span>
            </button>
          </div>

          {showContactForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" dir="rtl">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageCircle className="text-indigo-400" />
                    مراسلة المستشار
                  </h3>
                  <button onClick={() => setShowContactForm(false)} className="text-slate-400 hover:text-white">
                    <XCircle size={24} />
                  </button>
                </div>
                
                {messageSent ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
                      <CheckCircle2 className="text-emerald-400 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">جاري توجيهك إلى الواتساب!</h4>
                    <p className="text-slate-400">سيتم فتح المحادثة المباشرة مع مستشار التوجيه الآن.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="p-6 space-y-4 text-right">
                    {contactError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p>{contactError}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">موضوع المراسلة</label>
                      <input 
                        type="text" 
                        value={msgSubject}
                        onChange={(e) => setMsgSubject(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">رسالتك (اختياري)</label>
                      <textarea 
                        rows={4}
                        value={msgBody}
                        onChange={(e) => setMsgBody(e.target.value)}
                        placeholder="اكتب هنا أي تفاصيل إضافية أو أسئلة تود طرحها على المستشار..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      <span>إرسال عبر الواتساب</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Guidance;
