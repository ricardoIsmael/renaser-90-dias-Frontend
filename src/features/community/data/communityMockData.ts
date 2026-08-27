export interface SparkStory {
  id: string;
  name: string;
  avatar: string;
  habitDone: string;
  timeAgo: string;
  hasRing: boolean;
}

export interface WallPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  timeAgo: string;
  category: "Hábito Diario" | "Gran Victoria" | "Reflexión" | "Presentación";
  text: string;
  imageUrl?: string;
  flames: number;
  commentsCount: number;
  tags: string[];
}

export interface RankingUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  discipline: string;
  tier: string;
  isCurrentUser?: boolean;
}

export interface CellMember {
  id: string;
  name: string;
  avatar: string;
  streakDays: number;
  todayHabitsDone: boolean;
  role: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  role: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  type: "general" | "celula" | "direct";
}

export interface CommunityEvent {
  id: string;
  title: string;
  mentor: string;
  mentorRole: string;
  mentorAvatar: string;
  date: string;
  time: string;
  description: string;
  attendeesCount: number;
  isLiveNow: boolean;
  isRsvp: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  category: "Salud & Cuerpo" | "Negocios" | "Mentalidad" | "Relaciones";
  headline: string;
  beforeStats: string;
  afterStats: string;
  quote: string;
  beforeAvatar: string;
  afterAvatar: string;
  praisesCount: number;
  isPraised?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessonsCount: number;
  duration: string;
  progress: number;
  thumbnail: string;
  category: string;
  isCompleted?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_SPARKS: SparkStory[] = [
  {
    id: "sp-1",
    name: "Sophia R.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    habitDone: "Meditación 20 min",
    timeAgo: "Hace 5m",
    hasRing: true,
  },
  {
    id: "sp-2",
    name: "James L.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    habitDone: "Fuerza 60 min",
    timeAgo: "Hace 12m",
    hasRing: true,
  },
  {
    id: "sp-3",
    name: "Aria Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    habitDone: "Lectura Hábitos",
    timeAgo: "Hace 25m",
    hasRing: true,
  },
  {
    id: "sp-4",
    name: "David K.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    habitDone: "Ducha Fría 3 min",
    timeAgo: "Hace 40m",
    hasRing: false,
  },
  {
    id: "sp-5",
    name: "Olivia G.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    habitDone: "Visualización",
    timeAgo: "Hace 1h",
    hasRing: false,
  },
];

export const MOCK_POSTS: WallPost[] = [
  {
    id: "post-1",
    author: "Anya Sharma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    role: "Guerrero Nivel 3",
    timeAgo: "Hace 20 min",
    category: "Hábito Diario",
    text: "Sesión de movilidad y yoga al amanecer. 14 días seguidos manteniendo el foco matutino. ¡La disciplina es paz mental!",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    flames: 128,
    commentsCount: 14,
    tags: ["#mindfulness", "#rutinamatutina", "#dia14"],
  },
  {
    id: "post-2",
    author: "Liam Thorne",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    role: "Guerrero Nivel 2",
    timeAgo: "Hace 1 hora",
    category: "Gran Victoria",
    text: "Terminé de redactar mis 3 Rocas del trimestre y logré mi primera semana perfecta de hábitos al 100%. Gracias a mi Célula Fénix por la rendición de cuentas.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    flames: 94,
    commentsCount: 8,
    tags: ["#rocas", "#enfoque", "#tribu"],
  },
];

export const MOCK_PODIUM_USERS: RankingUser[] = [
  {
    rank: 1,
    name: "Sophia R.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 9870,
    discipline: "Fitness & Mente",
    tier: "Elite Master",
  },
  {
    rank: 2,
    name: "Alex M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    points: 9450,
    discipline: "Coherencia Total",
    tier: "Guerrero Nivel 3",
  },
  {
    rank: 3,
    name: "Olivia G.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    points: 9120,
    discipline: "Meditación & Hábitos",
    tier: "Guerrero Nivel 3",
  },
];

export const MOCK_CURRENT_USER_RANK: RankingUser = {
  rank: 4,
  name: "David K. (Tú)",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  points: 8915,
  discipline: "Rutina & Rocas",
  tier: "Pro Elite",
  isCurrentUser: true,
};

export const MOCK_RANKING_LIST: RankingUser[] = [
  {
    rank: 5,
    name: "Ethan J.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    points: 8880,
    discipline: "Físico",
    tier: "Guerrero Nivel 2",
  },
  {
    rank: 6,
    name: "Liam P.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    points: 8810,
    discipline: "Meditación",
    tier: "Guerrero Nivel 2",
  },
  {
    rank: 7,
    name: "Chloe W.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    points: 8745,
    discipline: "Lectura",
    tier: "Guerrero Nivel 2",
  },
  {
    rank: 8,
    name: "Noah B.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    points: 8750,
    discipline: "Nutrición",
    tier: "Guerrero Nivel 1",
  },
];

export const MOCK_CELL_MEMBERS: CellMember[] = [
  { id: "c-1", name: "Liam", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-2", name: "Chloe", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-3", name: "Ben", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", streakDays: 12, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-4", name: "Zara", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-5", name: "Anya", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", streakDays: 10, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-6", name: "Kai", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-7", name: "Ban", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", streakDays: 9, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-8", name: "Maya", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-9", name: "Noah", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80", streakDays: 11, todayHabitsDone: true, role: "Aprendiz" },
  { id: "c-10", name: "Isla", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80", streakDays: 14, todayHabitsDone: true, role: "Aprendiz" },
];

export const MOCK_CHATS: ChatMessage[] = [
  {
    id: "ch-1",
    sender: "Elara Vance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "Mentor Principal",
    lastMessage: "¡Excelente reporte de Rocas! Recuerda mantener el ritual nocturno.",
    time: "10:30 AM",
    unreadCount: 2,
    isOnline: true,
    type: "direct",
  },
  {
    id: "ch-2",
    sender: "Célula Fénix 04 (Grupo)",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    role: "10 Guerreros",
    lastMessage: "Liam: ¿Quién se conecta a las 7 AM para el entrenamiento?",
    time: "09:45 AM",
    unreadCount: 5,
    isOnline: true,
    type: "celula",
  },
  {
    id: "ch-3",
    sender: "Chat General RENASER",
    avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&auto=format&fit=crop&q=80",
    role: "Comunidad Global",
    lastMessage: "Admin: Recordatorio: Círculo de Alquimia hoy a las 5:00 PM.",
    time: "08:15 AM",
    unreadCount: 0,
    isOnline: true,
    type: "general",
  },
  {
    id: "ch-4",
    sender: "Aria Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "Guerrero Nivel 3",
    lastMessage: "¿Qué libro me recomiendas para optimizar hábitos de sueño?",
    time: "Ayer",
    unreadCount: 0,
    isOnline: false,
    type: "direct",
  },
];

export const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: "ev-1",
    title: "Círculo de Alquimia: Alineación y Respiración",
    mentor: "Anya Sharma",
    mentorRole: "Guía de Mindfulness & Energía",
    mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    date: "Hoy, 24 de Octubre",
    time: "5:00 PM - 6:30 PM",
    description: "Desbloquea tu máximo potencial en esta sesión interactiva enfocada en respiración diafragmática, coherencia cardíaca y claridad mental para superar bloqueos.",
    attendeesCount: 142,
    isLiveNow: true,
    isRsvp: true,
  },
  {
    id: "ev-2",
    title: "Masterclass: Estrategia de Rocas de Alto Impacto",
    mentor: "Elara Vance",
    mentorRole: "Mentor Líder de Rendimiento",
    mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    date: "Jueves, 26 de Octubre",
    time: "7:00 PM - 8:30 PM",
    description: "Cómo desglosar metas trimestrales en compromisos diarios innegociables para acelerar resultados sin agotamiento.",
    attendeesCount: 88,
    isLiveNow: false,
    isRsvp: false,
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    city: "Nueva York",
    category: "Salud & Cuerpo",
    headline: "Fuerza y Vitalidad Restauradas",
    beforeStats: "Cansada, Sin Hábitos (Nov 2023)",
    afterStats: "+15kg Músculo Magro • 90 Días Sobria",
    quote: "El programa RENASER transformó por completo mi disciplina y mi mente. Encontré una fuerza interior que no sabía que tenía.",
    beforeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    afterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    praisesCount: 284,
    isPraised: true,
  },
  {
    id: "test-2",
    name: "Mark Delgado",
    city: "Londres",
    category: "Negocios",
    headline: "Claridad y Crecimiento Financiero",
    beforeStats: "Estrés y Desorden (Ago 2023)",
    afterStats: "$20k Ingresos • 4 Meses de Enfoque",
    quote: "La mentoría y el acompañamiento de mi Célula me dieron la estructura exacta para escalar mi negocio con serenidad.",
    beforeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    afterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    praisesCount: 215,
    isPraised: false,
  },
];

export const MOCK_COURSES: CourseModule[] = [
  {
    id: "mod-1",
    title: "Fundamentos de la Alquimia Personal",
    lessonsCount: 8,
    duration: "2h 45m",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    category: "Mentalidad",
    isCompleted: true,
  },
  {
    id: "mod-2",
    title: "Diseño de Rituales Diarios y Hábitos Inquebrantables",
    lessonsCount: 12,
    duration: "4h 10m",
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    category: "Disciplina",
    isCompleted: false,
  },
  {
    id: "mod-3",
    title: "Ejecución Trimestral de Rocas",
    lessonsCount: 6,
    duration: "1h 50m",
    progress: 30,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    category: "Estrategia",
    isCompleted: false,
  },
  {
    id: "mod-4",
    title: "Biohacking y Optimización del Sueño Profundo",
    lessonsCount: 10,
    duration: "3h 20m",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=800&auto=format&fit=crop&q=80",
    category: "Cuerpo",
    isCompleted: false,
  },
];
