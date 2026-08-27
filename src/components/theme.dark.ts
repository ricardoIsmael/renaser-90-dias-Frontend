// ───────────────────────────────────────────────────────────────────────────
// TEMA OSCURO · definición independiente
//
// Este archivo es la ÚNICA fuente del tema oscuro. No se calcula invirtiendo
// el claro: es una paleta escrita a mano, con sus propias decisiones.
//
// Regla al editar: aquí solo valores oscuros. Tocar este archivo no puede
// alterar el tema claro, que vive entero en theme.light.ts.
//
// ── Por qué no es "el claro invertido" ─────────────────────────────────────
// En claro, `surface` es idéntico a `canvas` (ambos blancos) y la tarjeta se
// separa solo por su borde. Invertir eso literalmente daba negro sobre negro:
// 1.00:1 de contraste — la tarjeta desaparecía y solo flotaba su contorno, y el
// botón secundario quedaba en 1.23:1, prácticamente invisible.
//
// La regla "separar por borde, no por tono" funciona en claro porque sobre
// blanco hay sitio para bajar el tono del borde sin ensuciar el fondo. Sobre
// negro no hay margen hacia abajo, así que la separación tiene que SUBIR: aquí
// las superficies forman una escalera de luminancia real.
//
//   canvas   #000000  ──  el fondo, negro puro (bien en OLED)
//   surface  #1A1A20  ──  tarjeta, 1.21:1 sobre el fondo
//   elevated #2E2E38  ──  botón secundario / hundido, 1.56:1 sobre el fondo
//
// Los bordes suben con ella; si no, un borde tenue sobre una tarjeta ya
// levantada se pierde más que sobre el fondo.
//
// ── Tokens que NO se invierten ─────────────────────────────────────────────
//   · `danger`/`crimson`. Invertir #C0392B da un cian: un "error" turquesa. El
//     rojo es significado, no tono — se conserva, aclarado para el contraste.
//   · `onAccent`. Va SIEMPRE sobre la superficie de acento, así que sigue al
//     acento en vez de invertirse solo. Si el acento es blanco, esto es negro.
//   · `gold`. En claro apunta al negro (un dorado sobre blanco da 1.95:1,
//     ilegible). Sobre negro da 10.79:1, así que aquí sí es dorado de verdad y
//     devuelve el acento cálido en los puntos de identidad y logro.
//   · `accent` sigue siendo blanco, no dorado: es el relleno del botón PRIMARIO
//     y el blanco sobre negro da 19.29:1, el máximo. El dorado resalta; el
//     acento manda. Si ambos fueran dorados, la acción principal dejaría de
//     destacar sobre los adornos.
// ───────────────────────────────────────────────────────────────────────────

/** Paleta del tema oscuro. */
export const DARK = {
  canvas: "#000000",
  deep: "#101014",
  surface: "#1A1A20",
  elevated: "#2E2E38",

  borderSubtle: "#3A3A44",
  borderDefault: "#4A4A56",
  borderStrong: "#6B6B78",

  textPrimary: "#F5F5F7",
  // Suben respecto al espejo exacto del claro: sobre una tarjeta levantada
  // (#1A1A20, no negra) los grises del tema claro se quedaban cortos.
  textSecondary: "#ADADB5",
  textTertiary: "#82828C",
  textDisabled: "#55555E",

  gold: "#E3B341",
  goldHigh: "#F7D070",
  goldDark: "#B08A2E",

  fire: "#F5F5F7",
  water: "#C9C9D0",
  earth: "#ADADB5",

  amber: "#E3B341",
  crimson: "#FF6B61",

  line: "#3A3A44",
  accent: "#F5F5F7",
  onAccent: "#000000",
  danger: "#FF6B61",

  // Como `danger`, no se invierte: se aclara. El verde oscuro del tema claro
  // sobre una tarjeta #1A1A20 daría 1.9:1; este da 8.8:1.
  success: "#5FD08A",

  scrim: "rgba(0,0,0,0.65)",
} as const;

/** Tinte de la tinta oscura (clara sobre negro) con opacidad. */
export const darkInkAlpha = (a: number) => `rgba(245,245,247,${a})`;
/** Tinte del rojo oscuro con opacidad. */
export const darkDangerAlpha = (a: number) => `rgba(255,107,97,${a})`;

/** Tinte dorado — solo existe en oscuro. */
const goldAlpha = (a: number) => `rgba(227,179,65,${a})`;

// "Completado" es el estado que el dorado celebra: en oscuro su borde y sus
// rellenos se tiñen de oro en vez de gris, que era lo que hacía que una tarjeta
// cumplida se leyera igual que una pendiente.
export const CARD_STATE_DARK = {
  done: {
    border: goldAlpha(0.45),
    avatarBg: goldAlpha(0.14),
    badgeBg: goldAlpha(0.2),
  },
  // "Actúa ahora" mantiene el blanco del acento: es urgencia, no logro.
  grace: { border: darkInkAlpha(0.7) },
  locked: { bg: DARK.deep, border: DARK.borderSubtle },
  failed: { border: darkDangerAlpha(0.48) },
};
