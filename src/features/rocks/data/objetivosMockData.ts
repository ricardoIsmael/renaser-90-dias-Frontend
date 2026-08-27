import { GoalAxis } from "../components/AxisIcon";

export interface MasterRock {
  id: string;
  goalAxis: GoalAxis;
  objective: string;
  rhythmStatus: "en tiempo" | "por acelerar" | "alcanzado";
  progressPct: number;
  daysRemaining: number;
}

export interface WeeklyRock {
  id: string;
  goalAxis: GoalAxis;
  title: string;
  weekDays: { day: string; date: number; completed: boolean; isToday?: boolean }[];
  completedCount: number;
  totalCount: number;
}

export interface RockItem {
  id: string;
  goalAxis: GoalAxis;
  title: string;
  position: number;
  paretoColor: "GREEN" | "YELLOW" | "RED";
  startTime: string; // e.g. "08:00 AM"
  endTime: string;   // e.g. "09:00 AM"
  isNow: boolean;
  isFuture: boolean;
  completed: boolean;
  completedAt?: string;
  weeklyRockTitle?: string;
}

export const INITIAL_MASTER_ROCKS: Record<GoalAxis, MasterRock> = {
  BODY: {
    id: "master-body",
    goalAxis: "BODY",
    objective: "Correr mi primera media maratón antes del día 90 y bajar 8kg de grasa",
    rhythmStatus: "en tiempo",
    progressPct: 52,
    daysRemaining: 43,
  },
  WORK: {
    id: "master-work",
    goalAxis: "WORK",
    objective: "Facturar $10,000 USD mensuales y cerrar 5 clientes corporativos",
    rhythmStatus: "en tiempo",
    progressPct: 65,
    daysRemaining: 30,
  },
  RELATIONSHIPS: {
    id: "master-rel",
    goalAxis: "RELATIONSHIPS",
    objective: "Fortalecer el vínculo con mi familia y dedicar 2 horas de presencia plena diaria",
    rhythmStatus: "en tiempo",
    progressPct: 70,
    daysRemaining: 43,
  },
};

export const INITIAL_WEEKLY_ROCKS: Record<GoalAxis, WeeklyRock> = {
  BODY: {
    id: "weekly-body",
    goalAxis: "BODY",
    title: "Completar 4 sesiones de carrera continua y 3 sesiones de fuerza",
    completedCount: 3,
    totalCount: 7,
    weekDays: [
      { day: "L", date: 14, completed: true, isToday: true },
      { day: "M", date: 15, completed: true },
      { day: "X", date: 16, completed: true },
      { day: "J", date: 17, completed: false },
      { day: "V", date: 18, completed: false },
      { day: "S", date: 19, completed: false },
      { day: "D", date: 20, completed: false },
    ],
  },
  WORK: {
    id: "weekly-work",
    goalAxis: "WORK",
    title: "Contactar a 25 prospectos calificados y enviar 5 propuestas formales",
    completedCount: 4,
    totalCount: 7,
    weekDays: [
      { day: "L", date: 14, completed: true, isToday: true },
      { day: "M", date: 15, completed: true },
      { day: "X", date: 16, completed: true },
      { day: "J", date: 17, completed: true },
      { day: "V", date: 18, completed: false },
      { day: "S", date: 19, completed: false },
      { day: "D", date: 20, completed: false },
    ],
  },
  RELATIONSHIPS: {
    id: "weekly-rel",
    goalAxis: "RELATIONSHIPS",
    title: "Cena sin teléfonos los miércoles y sábado de aventura familiar",
    completedCount: 2,
    totalCount: 7,
    weekDays: [
      { day: "L", date: 14, completed: true, isToday: true },
      { day: "M", date: 15, completed: true },
      { day: "X", date: 16, completed: false },
      { day: "J", date: 17, completed: false },
      { day: "V", date: 18, completed: false },
      { day: "S", date: 19, completed: false },
      { day: "D", date: 20, completed: false },
    ],
  },
};

export const INITIAL_TODAY_ROCKS: RockItem[] = [
  // SALUD (BODY)
  {
    id: "rock-b-1",
    goalAxis: "BODY",
    title: "Cardio 30 min en ayunas (Pista Maratón)",
    position: 1,
    paretoColor: "GREEN",
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    isNow: false,
    isFuture: false,
    completed: true,
    completedAt: "08:32 AM",
    weeklyRockTitle: "Completar 4 sesiones de carrera continua",
  },
  {
    id: "rock-b-2",
    goalAxis: "BODY",
    title: "Preparar comidas balanceadas de la semana",
    position: 2,
    paretoColor: "YELLOW",
    startTime: "06:00 PM",
    endTime: "07:00 PM",
    isNow: false,
    isFuture: true,
    completed: false,
    weeklyRockTitle: "Nutrición deportiva para maratón",
  },

  // DINERO (WORK)
  {
    id: "rock-w-1",
    goalAxis: "WORK",
    title: "Llamadas de prospección a 5 clientes VIP",
    position: 1,
    paretoColor: "GREEN",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    isNow: true,
    isFuture: false,
    completed: false,
    weeklyRockTitle: "Contactar a 25 prospectos calificados",
  },
  {
    id: "rock-w-2",
    goalAxis: "WORK",
    title: "Enviar propuesta comercial corporativa",
    position: 2,
    paretoColor: "YELLOW",
    startTime: "03:00 PM",
    endTime: "04:30 PM",
    isNow: false,
    isFuture: true,
    completed: false,
    weeklyRockTitle: "Enviar 5 propuestas formales",
  },

  // RELACIONES (RELATIONSHIPS)
  {
    id: "rock-r-1",
    goalAxis: "RELATIONSHIPS",
    title: "Conversación de calidad y presencia 30 min",
    position: 1,
    paretoColor: "GREEN",
    startTime: "08:30 PM",
    endTime: "09:00 PM",
    isNow: false,
    isFuture: true,
    completed: false,
    weeklyRockTitle: "Presencia plena diaria",
  },
];
