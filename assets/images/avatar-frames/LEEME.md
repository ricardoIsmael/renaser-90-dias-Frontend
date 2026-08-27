# Frames de animación de los avatares

Buzón de entrada para el arte generado. Deja aquí lo que salga de ChatGPT y
avísame; yo recorto, optimizo y monto el reproductor.

## Cómo nombrar lo que dejes

**Si ChatGPT devuelve UNA imagen con todas las viñetas dentro** (lo preferible,
porque los frames nacen coherentes entre sí):

    macaco-idle-hoja.png

**Si devuelve una imagen por frame** (menos fiable, pero sirve):

    macaco-idle-01.png
    macaco-idle-02.png
    macaco-idle-03.png
    ...

El número va con dos dígitos y en el orden en que se reproducen. Sin ceros
saltados, sin empezar en 0.

Para otros personajes o animaciones, mismo patrón:
`<personaje>-<animacion>-hoja.png` o `<personaje>-<animacion>-NN.png`.
Personajes: `macaco`, `gorila`, `caballo`, `aguila`.

## Reparto de trabajo entre arte y código

Esto es lo que evita que la animación se vea barata, así que conviene no
mezclarlo:

- **Los frames** llevan lo que el código no puede inventar: ojos (parpadeo,
  dirección de la mirada), boca y posiciones de mano o brazo.
- **El código** lleva lo que hace perfecto y el arte hace mal: respiración,
  cabeceo, balanceo, inclinación.

Por eso los prompts piden que el CUERPO quede idéntico y congelado en todos los
frames. No es una limitación: es lo que hace que el resultado no tiemble.

## Las hojas `macaco3d-*` terminan sin fondo

Son las del tutorial, y su último paso de proceso es siempre:

```bash
node tools/avatar-frames/con-alfa.mjs --sustituir assets/images/avatar-frames/macaco3d-<pose>
```

Van con canal alfa porque el retrato de la Activación se pinta sobre tres
superficies distintas y en los dos temas de la app. Mientras estuvieron
compuestas sobre negro, el retrato tenía que pintar un círculo negro detrás
para tapar el cuadro de la imagen — y ese círculo, en el tema claro, era un
disco negro sobre una pantalla blanca.

Una hoja que se quede en `sobre-negro.mjs` vuelve a traer el disco. Esa
herramienta sigue siendo el paso intermedio útil (normaliza un fondo cualquiera
a negro plano, que es lo que `con-alfa.mjs` espera), pero no es el final.

**Mira el aviso de motas al terminar.** La herramienta descarta los grupos de
píxeles sueltos cuyo brillo no llega al umbral, porque son ruido del fondo; si
avisa de que alguno lo roza, es que puede estar a punto de borrar arte. En
estas hojas ya pasó: en dos frames de `explica` y dos de `piensa`, las yemas de
los dedos quedan separadas del brazo y son grupos legítimos de 45 a 324 px.

## Antes de darlos por buenos

Mira los frames al 100 % y compara el primero contra el que más cambia. Si el
contorno del cuerpo engorda o adelgaza, o el marrón del pelaje salta de tono,
el generador derivó y esos frames no sirven para animar — se vería como un
hervor en el contorno.

Referencia de lo que NO debe pasar: hubo un `macaco-happy2.png` junto al
`macaco-happy.png` de `../avatar-states/` — el mismo personaje generado dos
veces por separado, con el puño en alto en vez del plátano y el pelaje de otro
tono. Esa es exactamente la deriva a evitar. Se borró el 2026-08-04 por no
usarse (`git show` en ese commit lo recupera si hace falta la comparación).
