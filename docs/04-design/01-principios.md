# Principios de diseño

Para quien no viene de diseño: reglas cortas, no teoría. Estado: Clave v0.

## Heurísticas que sí aplicamos (Nielsen, recortadas)

1. **Visibilidad de estado** — submitting deshabilita el botón; error se ve.
2. **Habla el usuario** — “Email o contraseña incorrectos”, no códigos internos en UI.
3. **Prevención** — type password; confirm en registro y reset.
4. **Reconocer, no recordar** — labels visibles, no solo placeholder.
5. **Errores recuperables** — el campo dice qué falló; no se borra el form entero.
6. **Mínimo** — una columna, una acción primaria.

[RELLENAR: 1 principio de tu marca. Ej. “nunca un modal para auth”.]

## Puerta pública (si el producto tiene `/`)

Reglas de oficio. El fork las concreta (copy, tokens). Si no las escribes, el agente pedalea.

1. **Un capítulo, un trabajo.** El viewport siguiente no repite el proof del anterior (ni el slogan como H1 otra vez).
2. **El preview es el producto.** En una puerta de marketing no etiquetes *Ejemplo*, *demo*, *no es tu cuenta*, *cifras de ejemplo*. El visitante ya sabe dónde está.
3. **Foto ≠ ilustración.** Ilustración decorativa (undraw, mascota, B/C de marca) no. Foto del objeto o captura de la app, si el producto las usa, sí. Si el producto es negocio/activo: la foto muestra **riqueza en marcha** (obra, local), no un paisaje vacío.
4. **Contraste al mover un panel.** Fondo claro + tinta, o fondo de marca + texto claro. Nunca texto “sobre marca” encima de una tarjeta blanca (el copy desaparece).
5. **Auth continúa la puerta.** Si `/` ya tiene atmósfera (color de marca, foto, mesh), login/registro no son una columna huérfana en lienzo gris. No modal si el inventario dice Modal: no y existen `/login` y `/register`.
6. **Copy apilado: una frase, una línea.** Varias promesas bajo un H1 van cada una en su bloque, no en un párrafo corrido.
7. **CSS.** El modificador (`--glass`, tema invertido) va **después** de la base o con más especificidad.
8. **Ningún blanco puro.** `#FFFFFF` no entra al kit. El papel más claro es un lienzo teñido (`--bg` / `--on-primary`). Los componentes usan un mist (marca mezclada al lienzo), no leche.

[RELLENAR: si no hay puerta pública, borra esta sección.]

## Accesibilidad (piso, no certificado)

| Tema | Clave v0 | [RELLENAR] |
| --- | --- | --- |
| Contraste | texto oscuro / fondo claro | ratio 4.5:1 medido |
| Teclado | forms nativos, tab order natural | focus visible |
| Labels | cada input con label | |
| Imágenes | no hay | alt cuando existan |

No prometemos WCAG AA completo en v0. Sí: no inventar icon-only sin texto.

## Qué no hacer (anti-patterns)

- OAuth buttons fantasma, ilustraciones **decorativas**, animaciones, dark mode “por si acaso”. Foto del producto (si el kit la usa) no es ilustración.
- Autorizar en el cliente.
- Más de una acción primaria por pantalla de auth.
- Etiquetar el preview de la puerta como *ejemplo* / *demo*.
- Inventar un modal de login si ya hay `/login` y Modal no está en el inventario.
- `#FFFFFF` en un kit con marca. El papel más claro es un lienzo teñido.
