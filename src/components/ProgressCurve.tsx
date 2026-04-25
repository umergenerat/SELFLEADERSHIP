import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProgressCurve() {
  const { grades, setGrades, subjects: allSubjects } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('الجميع');

  const filterSubjects = ['الجميع', ...allSubjects];

  const colors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316'
  ];

  return (
    <div className="space-y-6">
      {/* Grades Table */}
      <div className="glass p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-4">سجل النقاط (أدخل نقاطك لتحديث المنحنى)</h3>
        <div className="min-w-max">
          <table className="w-full text-right text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 px-2 font-medium w-32">التقييم</th>
                {allSubjects.map(sub => (
                  <th key={sub} className="pb-3 px-2 font-medium text-center">{sub}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, idx) => (
                <tr key={grade.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 font-bold text-emerald-400">{grade.name}</td>
                  {allSubjects.map(sub => (
                    <td key={sub} className="py-2 px-2 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20"
                        step="0.25"
                        value={grade[sub] === undefined ? '' : grade[sub]}
                        onChange={(e) => {
                          const newGrades = [...grades];
                          const val = e.target.value;
                          newGrades[idx] = { ...newGrades[idx], [sub]: val === '' ? undefined : Number(val) };
                          setGrades(newGrades);
                        }}
                        className="w-16 bg-slate-900/50 border border-white/10 text-white rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="glass p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">منحنى التطور المرئي</h2>
          <p className="text-slate-300 text-sm">تتبع مسار التحصيل الدراسي للفروض الأربعة</p>
        </div>

        <select 
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[200px]"
        >
          {filterSubjects.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
        </select>
      </div>

      <div className="glass p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={grades}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff1a" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 14 }}
              dy={10}
            />
            <YAxis 
              domain={[0, 20]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8' }}
              orientation="right"
              dx={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(12px)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
            
            {allSubjects.map((sub, idx) => {
              if (selectedSubject === 'الجميع' || selectedSubject === sub) {
                return (
                  <Line 
                    key={sub}
                    type="monotone" 
                    dataKey={sub} 
                    name={sub}
                    stroke={colors[idx % colors.length]} 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                    connectNulls={true}
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Analysis Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card p-6 flex items-start gap-4">
          <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl mt-1 badge-glow">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">تطور إيجابي ملحوظ</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              هناك منحنى تصاعدي في مادة الفرنسية محققا تقدما بـ +6 نقط منذ التقويم التشخيصي. استمر في تطبيق استراتيجية المراجعة الحالية!
            </p>
          </div>
        </div>

        <div className="stat-card p-6 flex items-start gap-4">
          <div className="bg-amber-500/20 text-amber-400 p-3 rounded-xl mt-1">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">يحتاج لانتباه</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              لوحظ تذبذب طفيف في الرياضيات خلال الفرض الثاني. نوصيك بزيارة مختبر الصعوبات لاختيار الزميل الداعم أو تسجيل القضية لمدرسك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
