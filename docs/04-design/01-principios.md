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

## Accesibilidad (piso, no certificado)

| Tema | Clave v0 | [RELLENAR] |
| --- | --- | --- |
| Contraste | texto oscuro / fondo claro | ratio 4.5:1 medido |
| Teclado | forms nativos, tab order natural | focus visible |
| Labels | cada input con label | |
| Imágenes | no hay | alt cuando existan |

No prometemos WCAG AA completo en v0. Sí: no inventar icon-only sin texto.

## Qué no hacer (anti-patterns)

- OAuth buttons fantasma, ilustraciones, animaciones, dark mode “por si acaso”.
- Autorizar en el cliente.
- Más de una acción primaria por pantalla de auth.
