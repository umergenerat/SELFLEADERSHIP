import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Lightbulb, 
  BookOpen, 
  Gamepad2, 
  BellRing,
  Info,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const UserGuide = () => {
  const guideSections = [
    {
      id: 'dashboard',
      title: 'لوحة القيادة (الصفحة الرئيسية)',
      icon: LayoutDashboard,
      color: 'from-blue-500 to-indigo-500',
      description: 'نظرة عامة على يومك الدراسي. يمكنك من هنا رؤية ملخص سريع لجدول اليوم، مهامك القادمة، وإحصائيات تقدمك.',
      features: ['عرض حصص اليوم', 'الوصول السريع للمهام', 'ملخص النقاط والتطور']
    },
    {
      id: 'schedule',
      title: 'البرنامج والمواظبة',
      icon: CalendarDays,
      color: 'from-emerald-500 to-teal-500',
      description: 'مكان مخصص لإدارة جدول حصصك الأسبوعي وتسجيل الحضور والغياب لتنظيم وقتك بفعالية.',
      features: ['إضافة وتعديل الحصص', 'متابعة سجل الغياب', 'تنظيم الوقت']
    },
    {
      id: 'difficulties',
      title: 'مختبر الصعوبات',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-500',
      description: 'واجهت درساً صعباً؟ سجله هنا! سيقوم التطبيق باقتراح حلول، فيديوهات، أو حتى زملاء وأساتذة يمكنهم مساعدتك.',
      features: ['تسجيل الصعوبات التعلمية', 'تلقي اقتراحات ذكية للحل', 'الربط مع الزملاء المتميزين']
    },
    {
      id: 'resources',
      title: 'المصادر التفاعلية',
      icon: Gamepad2,
      color: 'from-fuchsia-500 to-pink-500',
      description: 'ألعاب تعليمية وتمارين مبسطة يتم تخصيصها تلقائياً بناءً على الصعوبات التي سجلتها لتقوية مهاراتك.',
      features: ['ألعاب تفاعلية للتعلم', 'تمارين مع تقييم فوري', 'محتوى مخصص حسب حاجتك']
    },
    {
      id: 'reading',
      title: 'رحلة المطالعة',
      icon: BookOpen,
      color: 'from-violet-500 to-purple-500',
      description: 'سجل الكتب والقصص التي تقرأها، وتابع عدد الدقائق التي قضيتها في المطالعة لتطوير مهاراتك اللغوية.',
      features: ['تسجيل جلسات القراءة', 'تتبع الأهداف الأسبوعية', 'مكتبة المقروءات']
    },
    {
      id: 'alert',
      title: 'نظام التنبيه الصحي/الطارئ',
      icon: BellRing,
      color: 'from-red-500 to-rose-500',
      description: 'زر سريع في أعلى الشاشة يُستخدم في الحالات الطارئة لإشعار الإدارة وأولياء الأمور بوضعك الصحي (مثل الحساسية).',
      features: ['إشعار فوري للإدارة', 'تنبيه ولي الأمر', 'متاح دائماً في أعلى الشاشة']
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass p-6 md:p-8 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-xl mb-4 border border-slate-600">
            <Info className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white">دليل الاستخدام</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            مرحباً بك في تطبيقك الشخصي للتسيير الذاتي! صُمم هذا التطبيق لمساعدتك على تنظيم وقتك، تجاوز الصعوبات الدراسية، وتطوير مهاراتك. إليك كيف يعمل:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guideSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="glass p-6 group hover:-translate-y-1 transition-all duration-300">
              {/* Simple Image/Illustration equivalent */}
              <div className={`w-full h-32 rounded-xl mb-6 bg-gradient-to-br ${section.color} p-1 shadow-lg overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-black/20 rounded-full blur-2xl" />
                
                <div className="relative w-full h-full rounded-lg bg-slate-900/40 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                  <Icon size={48} className="text-white drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                  
                  {/* Decorative small background icons */}
                  <Icon size={24} className="text-white/10 absolute top-2 right-4 transform rotate-12" />
                  <Icon size={16} className="text-white/10 absolute bottom-4 left-4 transform -rotate-12" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {section.description}
              </p>

              <div className="space-y-2">
                {section.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="glass p-6 text-center bg-emerald-500/10 border-emerald-500/20">
        <h3 className="text-lg font-bold text-emerald-400 mb-2">هل تحتاج للمزيد من المساعدة؟</h3>
        <p className="text-sm text-slate-300">
          يمكنك دائماً التواصل مع الإدارة أو أساتذتك للحصول على إرشادات إضافية حول كيفية الاستفادة القصوى من التطبيق.
        </p>
      </div>
    </div>
  );
};

export default UserGuide;
