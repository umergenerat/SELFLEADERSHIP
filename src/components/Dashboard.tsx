import { useMemo } from 'react';
import {
  Target, Trophy, FilePlus, BookOpen, Lightbulb,
  CalendarDays, TrendingUp, TrendingDown, CheckCircle2,
  AlertCircle, Clock, Star, BarChart2, Minus
} from 'lucide-react';
import { useApp, ClassSession } from '../context/AppContext';

/* ─── helpers ─────────────────────────────────────────────────────────── */

function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'اليوم';
  if (diffDays === 1) return 'الأمس';
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
  return `منذ ${Math.floor(diffDays / 30)} أشهر`;
}

function avg(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/* ─── component ────────────────────────────────────────────────────────── */

export default function Dashboard() {
  const {
    schedule, readingSessions, difficulties,
    grades, subjects, profile, readingConfig
  } = useApp();

  /* ── Attendance ──────────────────────────────────────────────────────── */
  const { attendanceRate, totalSessions, presentCount, absentCount, lateCount } = useMemo(() => {
    let total = 0, scored = 0, present = 0, absent = 0, late = 0;
    (Object.values(schedule) as ClassSession[][]).forEach(day =>
      day.forEach(s => {
        if (s.status === 'none') return;
        total++;
        if (s.status === 'present') { scored += 1; present++; }
        else if (s.status === 'late' || s.status === 'missed') { scored += 0.5; late++; }
        else if (s.status === 'absent') { absent++; }
      })
    );
    return {
      attendanceRate: total > 0 ? Math.round((scored / total) * 100) : null,
      totalSessions: total,
      presentCount: present,
      absentCount: absent,
      lateCount: late,
    };
  }, [schedule]);

  /* ── Grades / Best subject ───────────────────────────────────────────── */
  const { bestSubject, bestAvg, worstSubject, worstAvg, lastAssessmentName, overallAvg } = useMemo(() => {
    if (!grades.length || !subjects.length) {
      return { bestSubject: null, bestAvg: 0, worstSubject: null, worstAvg: 0, lastAssessmentName: '', overallAvg: 0 };
    }
    const subjectAverages: Record<string, number> = {};
    subjects.forEach(sub => {
      const vals = grades.map(g => g[sub]).filter((v): v is number => typeof v === 'number' && !isNaN(v));
      if (vals.length) subjectAverages[sub] = avg(vals);
    });
    const entries = Object.entries(subjectAverages);
    if (!entries.length) return { bestSubject: null, bestAvg: 0, worstSubject: null, worstAvg: 0, lastAssessmentName: '', overallAvg: 0 };
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const allSubjectVals = Object.values(subjectAverages);
    return {
      bestSubject: sorted[0][0],
      bestAvg: sorted[0][1],
      worstSubject: sorted[sorted.length - 1][0],
      worstAvg: sorted[sorted.length - 1][1],
      lastAssessmentName: grades[grades.length - 1]?.name ?? '',
      overallAvg: avg(allSubjectVals),
    };
  }, [grades, subjects]);

  /* ── Reading quota ───────────────────────────────────────────────────── */
  const readingTarget = readingConfig.weeksPerYear * readingConfig.sessionsPerWeek * readingConfig.dailyPeriods;
  const readingPercent = readingTarget > 0 ? Math.min(100, Math.round((readingSessions.length / readingTarget) * 100)) : 0;
  const totalReadingMinutes = readingSessions.reduce((s, r) => s + (r.duration || 0), 0);

  /* ── Difficulties breakdown ──────────────────────────────────────────── */
  const resolvedCount = difficulties.filter(d => d.status === 'resolved').length;
  const activeCount = difficulties.filter(d => d.status === 'active').length;

  /* ── Recent activities (real, chronological) ─────────────────────────── */
  type Activity = { icon: 'book' | 'lightbulb' | 'calendar' | 'check'; label: string; sub: string; date: string; color: string };
  const recentActivities = useMemo((): Activity[] => {
    const items: Activity[] = [];

    // Reading sessions
    readingSessions.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).forEach(r => {
      items.push({
        icon: 'book',
        label: r.title,
        sub: `${r.duration} دقيقة · ${timeAgo(r.date)}`,
        date: r.date,
        color: 'blue',
      });
    });

    // Difficulties
    difficulties.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2).forEach(d => {
      items.push({
        icon: d.status === 'resolved' ? 'check' : 'lightbulb',
        label: `${d.status === 'resolved' ? 'تم حل صعوبة في' : 'صعوبة في'} ${d.subject}`,
        sub: `${d.topic} · ${timeAgo(d.date)}`,
        date: d.date,
        color: d.status === 'resolved' ? 'emerald' : 'purple',
      });
    });

    // Last attended session
    const lastPresent = (Object.entries(schedule) as [string, ClassSession[]][])
      .flatMap(([day, ss]) => ss.filter(s => s.status === 'present').map(s => ({ ...s, day })))
      .pop();
    if (lastPresent) {
      items.push({
        icon: 'calendar',
        label: `حضور كلي · ${lastPresent.subject}`,
        sub: `${lastPresent.day} · ${lastPresent.time}`,
        date: new Date().toISOString().split('T')[0],
        color: 'emerald',
      });
    }

    return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  }, [readingSessions, difficulties, schedule]);

  /* ── Attendance color ──────────────────────────────────────────────────── */
  const attendanceColor =
    attendanceRate === null ? 'text-slate-400' :
    attendanceRate >= 90 ? 'text-emerald-400' :
    attendanceRate >= 70 ? 'text-amber-400' : 'text-red-400';

  /* ── Icon map ─────────────────────────────────────────────────────────── */
  const iconMap = {
    book: <BookOpen size={18} />,
    lightbulb: <Lightbulb size={18} />,
    calendar: <CalendarDays size={18} />,
    check: <CheckCircle2 size={18} />,
  };
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    purple: 'bg-purple-500/20 text-purple-400',
    amber: 'bg-amber-500/20 text-amber-400',
  };

  /* ─── render ────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* ── Greeting ── */}
      <div className="glass p-5 flex items-center gap-4 border border-emerald-500/15"
        style={{ animation: 'fade-in-up 0.5s ease both' }}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/40 flex items-center justify-center text-2xl font-black text-emerald-300 shrink-0">
          {profile.name.charAt(0)}
        </div>
        <div>
          <p className="text-slate-400 text-sm">مرحباً بك في مسارك الذكي،</p>
          <h2 className="text-white font-bold text-lg leading-tight">{profile.name}</h2>
          <p className="text-slate-500 text-xs mt-0.5">{profile.level} · {profile.school}</p>
        </div>
        <div className="mr-auto text-left hidden md:block">
          <p className="text-slate-500 text-xs">آخر تقييم</p>
          <p className="text-emerald-400 font-bold text-sm">{lastAssessmentName || '—'}</p>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Attendance */}
        <div className="stat-card p-5 flex flex-col gap-3 stagger-1" style={{ animation: 'fade-in-up 0.5s 0.05s both' }}>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 badge-glow">
              <Target size={18} />
            </div>
            <p className="text-xs text-slate-400 font-medium">معدل المواظبة</p>
          </div>
          <p className={`text-3xl font-black ${attendanceColor}`}>
            {attendanceRate !== null ? `${attendanceRate}%` : '—'}
          </p>
          <div className="flex gap-3 text-xs text-slate-500">
            <span className="text-emerald-400">✓ {presentCount}</span>
            <span className="text-amber-400">⏱ {lateCount}</span>
            <span className="text-red-400">✗ {absentCount}</span>
            <span>/ {totalSessions}</span>
          </div>
        </div>

        {/* Best subject */}
        <div className="stat-card p-5 flex flex-col gap-3 stagger-2" style={{ animation: 'fade-in-up 0.5s 0.1s both' }}>
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
              <Trophy size={18} />
            </div>
            <p className="text-xs text-slate-400 font-medium">أفضل مادة</p>
          </div>
          <p className="text-xl font-black text-white leading-tight">{bestSubject ?? '—'}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-amber-400 font-bold">
              {bestAvg ? bestAvg.toFixed(1) : '—'} <span className="text-slate-500">/20</span>
            </span>
            {overallAvg > 0 && (
              <span className="text-slate-500">· معدل عام {overallAvg.toFixed(1)}</span>
            )}
          </div>
        </div>

        {/* Reading sessions */}
        <div className="stat-card p-5 flex flex-col gap-3 stagger-3" style={{ animation: 'fade-in-up 0.5s 0.15s both' }}>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <BookOpen size={18} />
            </div>
            <p className="text-xs text-slate-400 font-medium">حصص المطالعة</p>
          </div>
          <p className="text-3xl font-black text-white">
            {readingSessions.length}
            <span className="text-sm text-slate-500 font-normal"> / {readingTarget}</span>
          </p>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div
              className="bg-blue-400 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${readingPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">{totalReadingMinutes} دقيقة إجمالية · {readingPercent}% من الهدف</p>
        </div>

        {/* Difficulties */}
        <div className="stat-card p-5 flex flex-col gap-3 stagger-4" style={{ animation: 'fade-in-up 0.5s 0.2s both' }}>
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
              <FilePlus size={18} />
            </div>
            <p className="text-xs text-slate-400 font-medium">صعوبات مسجلة</p>
          </div>
          <p className="text-3xl font-black text-white">{difficulties.length}</p>
          <div className="flex gap-3 text-xs">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> {resolvedCount} محلولة
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <AlertCircle size={12} /> {activeCount} نشطة
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Real recent activities */}
        <div className="glass p-6" style={{ animation: 'fade-in-up 0.5s 0.25s both' }}>
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Clock size={18} className="text-emerald-400" />
            الأنشطة الأخيرة
          </h3>
          {recentActivities.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              لم يتم تسجيل أي نشاط بعد. ابدأ بتسجيل حضورك أو صعوباتك.
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${colorMap[act.color] ?? colorMap.blue}`}>
                    {iconMap[act.icon]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-200 text-sm truncate">{act.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{act.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grades snapshot */}
        <div className="glass p-6" style={{ animation: 'fade-in-up 0.5s 0.3s both' }}>
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <BarChart2 size={18} className="text-emerald-400" />
            لمحة عن آخر نقاط
          </h3>
          {grades.length === 0 || subjects.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              لم تُدخل أي نقاط بعد. توجه إلى منحنى التطور لإدخال نقاطك.
            </div>
          ) : (
            <div className="space-y-3">
              {subjects.slice(0, 6).map(sub => {
                const lastGrade = grades.map(g => g[sub]).filter((v): v is number => typeof v === 'number' && !isNaN(v)).pop();
                const firstGrade = grades.map(g => g[sub]).filter((v): v is number => typeof v === 'number' && !isNaN(v)).shift();
                const trend = lastGrade !== undefined && firstGrade !== undefined
                  ? lastGrade - firstGrade : null;
                return (
                  <div key={sub} className="flex items-center gap-3">
                    <span className="text-sm text-slate-300 w-32 shrink-0 truncate">{sub}</span>
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-700"
                        style={{
                          width: lastGrade !== undefined ? `${(lastGrade / 20) * 100}%` : '0%',
                          background: lastGrade !== undefined && lastGrade >= 15 ? '#10b981'
                            : lastGrade !== undefined && lastGrade >= 10 ? '#f59e0b'
                            : '#ef4444',
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white w-10 text-right shrink-0">
                      {lastGrade !== undefined ? lastGrade : <span className="text-slate-600">—</span>}
                    </span>
                    {trend !== null && trend !== 0 ? (
                      trend > 0
                        ? <TrendingUp size={14} className="text-emerald-400 shrink-0" />
                        : <TrendingDown size={14} className="text-red-400 shrink-0" />
                    ) : <Minus size={14} className="text-slate-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Weak subject alert */}
          {worstSubject && worstAvg < 10 && (
            <div className="mt-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-300 leading-relaxed">
                <strong>{worstSubject}</strong> تحتاج لاهتمام — آخر معدل {worstAvg.toFixed(1)}/20. سجّل صعوبة أو تواصل مع أستاذك.
              </p>
            </div>
          )}

          {/* Best subject badge */}
          {bestSubject && bestAvg >= 15 && (
            <div className="mt-3 flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
              <Star size={15} className="text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs text-emerald-300 leading-relaxed">
                تألق في <strong>{bestSubject}</strong> بمعدل {bestAvg.toFixed(1)}/20. استمر في هذا المستوى الرائع!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
