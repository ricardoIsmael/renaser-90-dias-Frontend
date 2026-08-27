// ───────────────────────────────────────────────────────────────────────────
// Design tokens · punto de unión de los dos temas
//
// Este archivo YA NO define colores. Solo une las dos paletas y expone la API
// que consumen los ~68 archivos que lo importan:
//
//   components/theme.light.ts  ← tema claro   (definición independiente)
//   components/theme.dark.ts   ← tema oscuro  (definición independiente)
//
// Están separados a propósito. Mientras un tema se definía como "el otro
// invertido", cualquier ajuste pensado para uno se colaba en el otro y salían
// pantallas a medias: fondo de un tema con los textos del contrario. Ahora
// editar el oscuro NO PUEDE tocar el claro, ni al revés.
//
// ── Cómo cambia de tema ────────────────────────────────────────────────────
// `colors` es un objeto VIVO: no se reemplaza, se reescribe en el sitio con
// applyColorScheme(). Es lo que permite que las ~1153 lecturas de `colors.x`
// repartidas por 68 archivos cambien de tema sin tocar ninguna de ellas.
//
// El precio es que cualquier valor copiado FUERA de un render queda congelado
// en el tema de arranque:
//
//     const AXIS = { body: colors.fire };    // ❌ se copia una vez, al importar
//     <View style={{ color: colors.fire }}/>  // ✓ se lee en cada render
//
// Por eso los objetos derivados (cardState, stateMark) se declaran por tema y
// se reescriben también, en vez de calcularse una sola vez.
//
// OJO: los estilos en línea (`colors`) son solo LA MITAD del sistema. La otra
// mitad son las clases (bg-canvas, text-text-primary…), que se resuelven contra
// las variables de global.css. Los dos lados tienen que decir lo mismo o media
// app cambia de tema y la otra media no.
// ───────────────────────────────────────────────────────────────────────────

import {
  LIGHT,
  CARD_STATE_LIGHT,
  lightInkAlpha,
  lightDangerAlpha,
} from "./theme.light";
import {
  DARK,
  CARD_STATE_DARK,
  darkInkAlpha,
  darkDangerAlpha,
} from "./theme.dark";

export type ColorScheme = "light" | "dark";

/**
 * Registro de temas. Cada entrada apunta a UN archivo y a nada más: esto es lo
 * que elige el botón de Perfil → Apariencia. Cambiar de modo es, literalmente,
 * cambiar de qué archivo se lee.
 *
 * `source` es informativo, para poder mostrar en pantalla qué archivo está en
 * uso y para los mensajes de error de abajo.
 */
export const THEMES = {
  light: {
    label: "Claro",
    source: "components/theme.light.ts",
    palette: LIGHT,
    cardState: CARD_STATE_LIGHT,
    inkAlpha: lightInkAlpha,
    dangerAlpha: lightDangerAlpha,
  },
  dark: {
    label: "Oscuro",
    source: "components/theme.dark.ts",
    palette: DARK,
    cardState: CARD_STATE_DARK,
    inkAlpha: darkInkAlpha,
    dangerAlpha: darkDangerAlpha,
  },
} as const;

// ── Guardia contra la mezcla de paletas ────────────────────────────────────
// El cambio de tema reescribe un objeto compartido, y reescribir FUSIONA: si un
// archivo define un token que el otro no, al cambiar de modo el valor viejo se
// queda pegado y la pantalla acaba con media paleta de cada tema. Como los dos
// archivos se editan por separado —que es justo lo que los hace seguros— ese
// desfase es cuestión de tiempo.
//
// Esto lo convierte en un error ruidoso en cuanto ocurre, en vez de un color
// suelto que nadie sabe de dónde sale.
if (__DEV__) {
  const compare = (a: object, b: object, what: string) => {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    const soloClaro = ka.filter((k) => !kb.includes(k));
    const soloOscuro = kb.filter((k) => !ka.includes(k));
    if (soloClaro.length || soloOscuro.length) {
      console.error(
        `[theme] ${what}: los dos temas no declaran los mismos tokens.\n` +
          (soloClaro.length ? `  solo en claro:  ${soloClaro.join(", ")}\n` : "") +
          (soloOscuro.length ? `  solo en oscuro: ${soloOscuro.join(", ")}\n` : "") +
          "  Al cambiar de modo, esos tokens conservarían el valor del tema anterior."
      );
    }
  };
  compare(LIGHT, DARK, "paleta");
  for (const state of ["done", "grace", "locked", "failed"] as const) {
    compare(CARD_STATE_LIGHT[state], CARD_STATE_DARK[state], `cardState.${state}`);
  }
}

/** Paleta viva. Se lee igual que siempre (`colors.canvas`), pero su contenido
 *  cambia con el tema — ver la nota de arriba sobre valores congelados. */
export const colors: { -readonly [K in keyof typeof LIGHT]: string } = { ...LIGHT };

/** Estados compartidos de tarjeta (Rutina Diaria y Rocas). También vivo. */
export const cardState = {
  done: { ...CARD_STATE_LIGHT.done },
  grace: { ...CARD_STATE_LIGHT.grace },
  locked: { ...CARD_STATE_LIGHT.locked },
  failed: { ...CARD_STATE_LIGHT.failed },
};

// Los cuatro estados de una marca de cumplimiento (hábito o roca).
// En el tema dorado el estado se leía por color; en monocromo se lee por
// forma, así que estos valores describen geometría además de color:
//
//   pending  ○  contorno fino
//   now      ◉  contorno grueso + punto interior  ← sin el punto, "now" y
//   done     ●  relleno                              "done" se leen igual
//   failed   ⊘  contorno punteado
function buildStateMark(p: typeof LIGHT | typeof DARK) {
  return {
    pending: {
      borderColor: p.borderStrong,
      borderWidth: 1.6,
      backgroundColor: "transparent",
      borderStyle: "solid" as const,
      dot: false,
    },
    now: {
      borderColor: p.accent,
      borderWidth: 2,
      backgroundColor: "transparent",
      borderStyle: "solid" as const,
      dot: true,
    },
    done: {
      borderColor: p.accent,
      borderWidth: 1.6,
      backgroundColor: p.accent,
      borderStyle: "solid" as const,
      dot: false,
    },
    failed: {
      borderColor: p.textTertiary,
      borderWidth: 1.6,
      backgroundColor: "transparent",
      borderStyle: "dashed" as const,
      dot: false,
    },
  };
}

export const stateMark = buildStateMark(LIGHT);

export type StateMarkKind = keyof typeof stateMark;

/** Esquema aplicado ahora mismo. */
let current: ColorScheme = "light";
export const getColorScheme = () => current;

/**
 * Tinte de la tinta con opacidad, siguiendo al tema.
 *
 * Un `rgba(29,29,31,0.06)` escrito a mano es el gris clarísimo que separa
 * superficies en claro — y exactamente nada sobre un fondo negro. Este helper
 * delega en la definición de cada tema, así que el mismo velo sigue separando
 * en los dos.
 *
 * Llamarlo dentro del render, nunca al declarar una constante de módulo: eso
 * lo congelaría igual que copiar el color.
 */
export function inkAlpha(a: number): string {
  return THEMES[current].inkAlpha(a);
}

/** Lo mismo para el rojo semántico, que tampoco es igual en los dos temas. */
export function dangerAlpha(a: number): string {
  return THEMES[current].dangerAlpha(a);
}

/**
 * Reescribe las paletas en el sitio. Idempotente: llamarla con el esquema que
 * ya está puesto no hace nada, así que puede invocarse durante el render sin
 * riesgo de bucle.
 *
 * Devuelve `true` si hubo cambio real, para que quien llame decida si necesita
 * repintar.
 */
export function applyColorScheme(scheme: ColorScheme): boolean {
  if (scheme === current) return false;
  current = scheme;

  // Todo sale del registro: no hay condicionales sueltos decidiendo colores
  // por su cuenta, que es como acababan mezclándose los temas.
  const theme = THEMES[scheme];
  const palette = theme.palette;
  Object.assign(colors, palette);

  // Los objetos anidados se reescriben nivel a nivel: un Object.assign en el
  // padre sustituiría las referencias hijas por otras nuevas, y cualquier
  // componente que hubiera guardado `cardState.done` seguiría apuntando a la
  // vieja.
  const nextCard = theme.cardState;
  Object.assign(cardState.done, nextCard.done);
  Object.assign(cardState.grace, nextCard.grace);
  Object.assign(cardState.locked, nextCard.locked);
  Object.assign(cardState.failed, nextCard.failed);

  const nextMark = buildStateMark(palette);
  Object.assign(stateMark.pending, nextMark.pending);
  Object.assign(stateMark.now, nextMark.now);
  Object.assign(stateMark.done, nextMark.done);
  Object.assign(stateMark.failed, nextMark.failed);

  return true;
}

/**
 * Las mismas paletas en el formato de variables CSS que consumen las clases.
 * Se DERIVAN de theme.light.ts / theme.dark.ts, de modo que el bloque
 * correspondiente de global.css puede comprobarse contra esto y detectar
 * cualquier desajuste — ver scripts/check-theme.mjs.
 *
 * `scrim` queda fuera: es un rgba() con transparencia, no un color sólido, y
 * este formato solo admite tripletes R G B.
 */
export function cssVarsFor(scheme: ColorScheme): Record<string, string> {
  const palette = THEMES[scheme].palette;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette)) {
    if (!value.startsWith("#")) continue;
    const name = key.replace(/(?<!^)(?=[A-Z])/g, "-").toLowerCase();
    out[`--${name}`] =
      `${parseInt(value.slice(1, 3), 16)} ` +
      `${parseInt(value.slice(3, 5), 16)} ` +
      `${parseInt(value.slice(5, 7), 16)}`;
  }
  return out;
}
