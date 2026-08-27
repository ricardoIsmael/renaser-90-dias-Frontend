# Retratos de Macaco para la Activación

Las imágenes van en **JPG**. Ninguna necesita transparencia —el fondo es parte
de la ilustración— y en JPG pesan ~210 KB frente a los ~2,1 MB del mismo arte
en PNG.

| archivo            | expresión                                    | estado |
|--------------------|----------------------------------------------|--------|
| `saludo.jpg`       | sentado, sonrisa tranquila                   | puesta |
| `celebrando.jpg`   | riendo con los ojos cerrados                 | puesta |
| `preocupado.jpg`   | ojos grandes, cejas caídas                   | puesta |
| `triste.jpg`       | cabizbajo, brazos cruzados                   | puesta |
| `explicando.jpg`   | sentado en la roca con musgo                 | FALTA  |

Al añadir la que falta, basta con descomentarla en
`src/features/activacion/retratos.ts` y asignarla a la pose `resting`. Nada más
del módulo referencia archivos de imagen.

**No hace falta recortarles el fondo.** El retrato ya no recorta en círculo
(`ARTE_CON_ESCENA`), así que la composición se ve entera. Un recorte a mano
deja halos sucios en los bordes y se nota más que el fondo original.
