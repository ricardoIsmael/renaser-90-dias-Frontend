export interface CategorizedHabit {
  id: string;
  title: string;
  categoryKey: "BODY" | "MIND" | "CONSCIENCE" | "SPIRIT";
  categoryLabel: string;
  timeWindow: string;
  points: number;
  completed: boolean;
  completedAt?: string;
  streak: number;
}

export const INITIAL_CATEGORIZED_HABITS: CategorizedHabit[] = [
  // CUERPO (BODY)
  {
    id: "h-body-1",
    title: "Ducha Fría & Respiración Wim Hof",
    categoryKey: "BODY",
    categoryLabel: "Cuerpo",
    timeWindow: "07:00 – 07:30 AM",
    points: 10,
    completed: true,
    completedAt: "07:15 AM",
    streak: 14,
  },
  {
    id: "h-body-2",
    title: "Entrenamiento de Fuerza 60 min",
    categoryKey: "BODY",
    categoryLabel: "Cuerpo",
    timeWindow: "07:30 – 08:30 AM",
    points: 15,
    completed: true,
    completedAt: "08:35 AM",
    streak: 12,
  },

  // MENTE (MIND)
  {
    id: "h-mind-1",
    title: "Meditación Matutina (15 min)",
    categoryKey: "MIND",
    categoryLabel: "Mente",
    timeWindow: "06:30 – 07:00 AM",
    points: 10,
    completed: true,
    completedAt: "06:45 AM",
    streak: 14,
  },
  {
    id: "h-mind-2",
    title: "Lectura 20 Páginas de Crecimiento",
    categoryKey: "MIND",
    categoryLabel: "Mente",
    timeWindow: "01:00 – 02:00 PM",
    points: 10,
    completed: false,
    streak: 10,
  },

  // EMOCIONES (CONSCIENCE)
  {
    id: "h-cons-1",
    title: "Visualización de Coherencia Cardíaca",
    categoryKey: "CONSCIENCE",
    categoryLabel: "Emociones",
    timeWindow: "08:00 – 08:30 AM",
    points: 10,
    completed: true,
    completedAt: "08:10 AM",
    streak: 14,
  },
  {
    id: "h-cons-2",
    title: "Journaling & Gratitud Nocturna",
    categoryKey: "CONSCIENCE",
    categoryLabel: "Emociones",
    timeWindow: "09:00 – 09:30 PM",
    points: 10,
    completed: false,
    streak: 14,
  },

  // ESPÍRITU (SPIRIT)
  {
    id: "h-spirit-1",
    title: "Audio Terapia & Frecuencias Solfeggio",
    categoryKey: "SPIRIT",
    categoryLabel: "Espíritu",
    timeWindow: "09:30 – 10:00 PM",
    points: 10,
    completed: false,
    streak: 8,
  },
  {
    id: "h-spirit-2",
    title: "Silencio & Desconexión de Pantallas",
    categoryKey: "SPIRIT",
    categoryLabel: "Espíritu",
    timeWindow: "10:00 – 10:30 PM",
    points: 10,
    completed: false,
    streak: 14,
  },
];
