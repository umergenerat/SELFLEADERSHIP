import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AttendanceStatus = 'present' | 'partial' | 'late' | 'missed' | 'absent' | 'none';

export interface ReadingSession {
  id: string;
  title: string;
  type: 'homework' | 'free';
  date: string;
  duration: number; // in minutes
}

export interface Difficulty {
  id: string;
  subject: string;
  topic: string;
  status: 'processing' | 'active' | 'resolved';
  solution?: string;
  date: string;
  aiSuggestions?: string[];
  matchedPeers?: Peer[];
  matchedTeacher?: Teacher;
}

export interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  status: AttendanceStatus;
}

export interface UserProfile {
  name: string;
  level: string;
  school: string;
  id: string;
  healthAlert: string;
  healthAlertActive: boolean;
}

export interface UserPreferences {
  language: string;
  theme: string;
  notifications: boolean;
}

export interface Contact {
  id: string;
  name: string;
  contactNumber: string;
}

export interface Peer extends Contact {
  strengths: string[];
}

export interface Teacher extends Contact {
  subject: string;
}

export type AssessmentType = 'التقويم التشخيصي' | 'الفرض 1' | 'الفرض 2' | 'الفرض 3';

export interface GradeEntry {
  name: AssessmentType;
  [subject: string]: any;
}

interface AppContextType {
  profile: UserProfile;
  preferences: UserPreferences;
  subjects: string[];
  schedule: Record<string, ClassSession[]>;
  peers: Peer[];
  teachers: Teacher[];
  readingSessions: ReadingSession[];
  difficulties: Difficulty[];
  grades: GradeEntry[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  setSchedule: React.Dispatch<React.SetStateAction<Record<string, ClassSession[]>>>;
  setReadingSessions: React.Dispatch<React.SetStateAction<ReadingSession[]>>;
  setDifficulties: React.Dispatch<React.SetStateAction<Difficulty[]>>;
  setPeers: React.Dispatch<React.SetStateAction<Peer[]>>;
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  setGrades: React.Dispatch<React.SetStateAction<GradeEntry[]>>;
  toggleHealthAlert: () => void;
}

const defaultSubjects = [
  'الرياضيات', 'اللغة العربية', 'اللغة الفرنسية', 'التربية الإسلامية', 
  'الاجتماعيات', 'علوم الحياة والأرض', 'الفيزياء', 'التربية البدنية'
];

const defaultSchedule: Record<string, ClassSession[]> = {
  'الإثنين': [
    { id: '1', subject: 'الرياضيات', teacher: 'أ. العلوي', time: '08:00 - 10:00', status: 'present' },
    { id: '2', subject: 'اللغة العربية', teacher: 'أ. بنسعيد', time: '10:00 - 12:00', status: 'present' },
  ],
  'الثلاثاء': [
    { id: '3', subject: 'الفيزياء', teacher: 'أ. العلمي', time: '08:00 - 10:00', status: 'present' },
    { id: '4', subject: 'التربية الإسلامية', teacher: 'أ. صابر', time: '10:00 - 12:00', status: 'present' },
  ],
  'الأربعاء': [],
  'الخميس': [],
  'الجمعة': [],
  'السبت': []
};

const defaultPeers: Peer[] = [
  { id: 'p1', name: 'ياسين المفتي', contactNumber: '212600000001', strengths: ['الرياضيات', 'الفيزياء'] },
  { id: 'p2', name: 'مروان الناصري', contactNumber: '212600000002', strengths: ['اللغة الفرنسية', 'اللغة العربية'] },
  { id: 'p3', name: 'سناء بنكيران', contactNumber: '212600000003', strengths: ['علوم الحياة والأرض', 'الرياضيات'] }
];

const defaultTeachers: Teacher[] = [
  { id: 't1', name: 'أ. العلوي', contactNumber: '212600000010', subject: 'الرياضيات' },
  { id: 't2', name: 'أ. بنسعيد', contactNumber: '212600000011', subject: 'اللغة العربية' },
  { id: 't3', name: 'أ. العلمي', contactNumber: '212600000012', subject: 'الفيزياء' },
  { id: 't4', name: 'أ. صابر', contactNumber: '212600000013', subject: 'التربية الإسلامية' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: "أحمد بناني",
  level: "السنة الثالثة إعدادي - فوج 4",
  school: "ثانوية المختار السوسي الإعدادية",
  id: "J123456789",
  healthAlert: "حساسية من مادة الغلوتين",
  healthAlertActive: false
};

const defaultPreferences: UserPreferences = {
  language: "ar",
  theme: "frosted",
  notifications: true
};

const defaultReadingSessions: ReadingSession[] = [
  { id: 'rs1', title: 'تمارين الرياضيات (الجبر)', type: 'homework', date: new Date().toISOString().split('T')[0], duration: 45 },
  { id: 'rs2', title: 'رواية الخيميائي', type: 'free', date: '2023-10-14', duration: 60 }
];

const defaultDifficulties: Difficulty[] = [
  {
    id: '1',
    subject: 'الرياضيات',
    topic: 'صعوبة في فهم النظمات ذات مجهولين',
    status: 'active',
    date: '2023-10-15',
    aiSuggestions: ['مراجعة الدرس الثالث ص 24 من المقرر', 'مشاهدة فيديو تبسيطي على منصة تلميذ تيس'],
    matchedPeers: [defaultPeers[0]],
    matchedTeacher: defaultTeachers[0]
  },
  {
    id: '2',
    subject: 'اللغة الفرنسية',
    topic: 'conjugaison conditionnel présent',
    status: 'resolved',
    solution: 'مراجعة شخصية عبر منصة التعليم عن بعد وحل التمارين التفاعلية',
    date: '2023-10-10'
  }
];

const defaultGrades: GradeEntry[] = [
  { name: 'التقويم التشخيصي', 'الرياضيات': 12, 'اللغة العربية': 14, 'الفرنسية': 10 },
  { name: 'الفرض 1', 'الرياضيات': 14, 'اللغة العربية': 15, 'الفرنسية': 13 },
  { name: 'الفرض 2', 'الرياضيات': 13, 'اللغة العربية': 16, 'الفرنسية': 14 },
  { name: 'الفرض 3', 'الرياضيات': 16, 'اللغة العربية': 17, 'الفرنسية': 16 }
];

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const loadData = () => {
    try {
      const saved = localStorage.getItem('self_leadership_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load data", e);
    }
    return null;
  };

  const savedData = loadData();

  const [profile, setProfile] = useState<UserProfile>(savedData?.profile || defaultProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(savedData?.preferences || defaultPreferences);
  const [subjects, setSubjects] = useState<string[]>(savedData?.subjects || defaultSubjects);
  const [schedule, setSchedule] = useState<Record<string, ClassSession[]>>(savedData?.schedule || defaultSchedule);
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>(savedData?.readingSessions || defaultReadingSessions);
  const [difficulties, setDifficulties] = useState<Difficulty[]>(savedData?.difficulties || defaultDifficulties);
  const [peers, setPeers] = useState<Peer[]>(savedData?.peers || defaultPeers);
  const [teachers, setTeachers] = useState<Teacher[]>(savedData?.teachers || defaultTeachers);
  const [grades, setGrades] = useState<GradeEntry[]>(savedData?.grades || defaultGrades);

  React.useEffect(() => {
    localStorage.setItem('self_leadership_data', JSON.stringify({
      profile, preferences, subjects, schedule, readingSessions, difficulties, peers, teachers, grades
    }));
  }, [profile, preferences, subjects, schedule, readingSessions, difficulties, peers, teachers, grades]);

  const toggleHealthAlert = () => {
    setProfile(prev => ({ ...prev, healthAlertActive: !prev.healthAlertActive }));
  };

  return (
    <AppContext.Provider value={{
      profile, preferences, subjects, schedule, peers, teachers, readingSessions, difficulties, grades,
      setProfile, setPreferences, setSubjects, setSchedule, setReadingSessions, setDifficulties, setPeers, setTeachers, setGrades, toggleHealthAlert
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
