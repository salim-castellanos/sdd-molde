# Steering — diseño

Dos capas. No son el mismo trabajo.

| Capa | Qué es | Cuándo se llena |
| --- | --- | --- |
| **Kit (contrato)** | Principios, tokens, inventario, marca | Al existir producto |
| **Kit HTML** | `docs/04-design/kit/` — shell + componentes en HTML. Se **itera** aquí | Antes de implementar en `apps/web` |
| **Pantalla** | Una ruta de una HU | Al **componer**. `screens.md` + el kit ya listo |

El HTML del kit no es la app. El `implement` copia tokens y markup al stack de la spec. El kit no inventa fichas de negocio.

## Cuándo cargarlo

Llenar o cambiar el kit. Componer o implementar spec con UI. Nueva pantalla. “¿Qué ruta?”

## Cuándo no

Solo API / seeds sin pantalla. No abras el kit entero para una fila de `screens.md`.

## Si aplica, cargar

1. `docs/04-design/catalog.md`
2. Kit: `01`–`04` (+ `05-icono` si hay marca) y, si existe, `kit/index.html`.
3. `screens.md` — **una** fila al componer.
4. `auth-flows.md` si es identidad. `04-patrones.md` si hay form.
