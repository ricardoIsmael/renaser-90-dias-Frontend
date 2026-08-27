// ───────────────────────────────────────────────────────────────────────────
// TEMA CLARO · definición independiente
//
// Este archivo es la ÚNICA fuente del tema claro. No deriva del oscuro ni el
// oscuro deriva de él: son dos definiciones separadas a propósito.
//
// El motivo es concreto. Mientras el claro se definía como "el oscuro
// invertido" (o al revés), cualquier ajuste pensado para un modo se colaba en
// el otro y aparecían pantallas a medias — fondo de un tema con textos del
// contrario. Separándolos, tocar `theme.dark.ts` NO PUEDE alterar el claro.
//
// Regla al editar: aquí solo valores claros. Si algo se ve mal en oscuro, se
// arregla en theme.dark.ts, nunca aquí.
//
// Estos valores son los originales del proyecto (propuesta D, monocromo) y no
// deberían cambiar salvo decisión de diseño explícita.
// ───────────────────────────────────────────────────────────────────────────

/** Paleta del tema claro. */
export const LIGHT = {
  // Superficies
  canvas: "#FFFFFF",
  deep: "#F5F5F7",
  surface: "#FFFFFF", // tarjeta: se separa del canvas por su borde, no por su tono
  elevated: "#F5F5F7", // superficie hundida/pressed y tarjeta "flat"

  // Bordes — líneas de pelo, nunca gris medio
  borderSubtle: "#E8E8ED",
  borderDefault: "#E0E0E6",
  borderStrong: "#C9C9D0",

  // Texto
  textPrimary: "#1D1D1F",
  textSecondary: "#6E6E73",
  textTertiary: "#A1A1A8",
  textDisabled: "#C4C4CC",

  // Acento. Era dorado; en claro el único acento es el negro — un dorado sobre
  // blanco da 1.95:1 y sería ilegible. El dorado vive solo en theme.dark.ts.
  gold: "#1D1D1F",
  goldHigh: "#000000",
  goldDark: "#6E6E73",

  // Ejes. En la propuesta D los ejes se escriben ("cuerpo", "mente",
  // "negocio") en vez de codificarse por color. Estos tres grises existen solo
  // para que nada reviente mientras queden usos sin migrar — no son un sistema
  // de color, y deberían quedarse sin usar.
  fire: "#1D1D1F",
  water: "#4A4A4F",
  earth: "#6E6E73",

  amber: "#6E6E73",
  crimson: "#C0392B",

  line: "#E8E8ED",
  accent: "#1D1D1F",
  onAccent: "#FFFFFF", // texto/icono sobre una superficie de acento
  danger: "#C0392B",

  // Contrapartida de `danger`: confirma que un campo quedó bien escrito. Es el
  // segundo color semántico de la paleta, y como el rojo NO se invierte entre
  // temas — el verde es significado, no tono. 5.04:1 sobre blanco.
  //
  // Se usa solo en la validación de formularios. No es un color decorativo:
  // pintar de verde algo que no sea "esto es correcto" rompe la lectura.
  success: "#1E7F43",

  // Velo detrás de modales y hojas inferiores. Un solo valor para toda la app
  // — cuando cada pantalla elegía el suyo, la misma acción atenuaba distinto
  // según dónde se abriera.
  scrim: "rgba(29,29,31,0.32)",
} as const;

/** Tinte de la tinta clara con opacidad. */
export const lightInkAlpha = (a: number) => `rgba(29,29,31,${a})`;
/** Tinte del rojo claro con opacidad. */
export const lightDangerAlpha = (a: number) => `rgba(192,57,43,${a})`;

// Estados compartidos de tarjeta — mismos valores para "completado / activo
// ahora / bloqueado" en Rutina Diaria y en Rocas, para que un elemento de
// cualquiera de las dos pantallas se lea igual.
//
// Sin dorado, el color ya no basta para separar "hecho" de "activo ahora":
// ambos serían acento. La distinción la carga la FORMA (relleno vs contorno con
// punto interior, ver `stateMark`); estos bordes solo acompañan.
export const CARD_STATE_LIGHT = {
  done: {
    border: lightInkAlpha(0.16),
    avatarBg: lightInkAlpha(0.06),
    badgeBg: lightInkAlpha(0.1),
  },
  grace: { border: lightInkAlpha(0.55) },
  locked: { bg: LIGHT.deep, border: LIGHT.borderSubtle },
  failed: { border: lightDangerAlpha(0.32) },
};
