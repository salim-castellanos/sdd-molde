# Catálogo — sistema de diseño

Padre de `docs/04-design/`. Abre **un** archivo. Clave es un sistema mínimo (no un Storybook). Las secciones existen para que un fork sepa **qué documentar**.

**Kit** (`01`–`04`, flujos de auth): contrato del producto. Se escribe una vez y se crece cuando nace un componente o patrón. **Pantallas** (`screens.md`): inventario de rutas; una fila por HU al componer.

| id | Archivo | Pregunta | Trigger |
| --- | --- | --- | --- |
| prin | [01-principios.md](01-principios.md) | ¿Qué es “buen diseño” aquí? | a11y, heurísticas, “se ve mal”, iterar puerta/auth |
| fund | [02-fundaciones.md](02-fundaciones.md) | Color, tipo, espacio, contraste | tokens, marca, tema |
| comp | [03-componentes.md](03-componentes.md) | ¿Qué piezas reutilizables hay? | botón, input, alert |
| pat | [04-patrones.md](04-patrones.md) | Formularios, vacío, error, auth, **shell**, **puerta** | validar form, layout app, landing, login |
| flow | [auth-flows.md](auth-flows.md) | Flujos de identidad | registro / login / reset |
| scr | [screens.md](screens.md) | Inventario de rutas | “qué pantalla es esta” |
| notes | [ui-notes.md](ui-notes.md) | Restricciones cortas (legado) | markup rápido |
| mark | [05-icono.md](05-icono.md) | Wordmark, favicon, app icon | logo, icono, marca |
| html | [kit/](kit/) | Preview HTML (shell, componentes) | iterar UI, “ver el kit” |

Al componer una spec con UI: `scr` (una fila) + `flow` (un flujo) + `pat` si hay form. No cargues `comp` entero si no creas un componente nuevo.

Al **iterar** puerta o auth: `prin` (sección puerta pública) + `pat` (Auth layout) + el HTML del kit de esa pantalla. El arquetipo “una columna, sin aside” no gana si el fork ya tiene atmósfera en `/`.
