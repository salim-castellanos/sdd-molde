# Steering — historia de usuario

## Qué es

Jerarquía: **módulo → épica → feature → HU**.

| Tipo | Pregunta | No es |
| --- | --- | --- |
| Módulo | ¿Transversal o un contexto de negocio? | Un dump de HUs |
| Épica | ¿Qué outcome agrupa features? | Una HU gorda |
| Feature | ¿Qué incremento se parte en HUs? | Un sprint |
| HU | ¿Quién necesita qué y por qué? (EARS) | Ejecutable / spec |

Auth y autorización van en `00-transversal`. “Crear carro” no.

## Cuándo cargarlo

Crear o partir necesidades. “Quiero un login”. “La paleta es otra HU”.

## Cuándo no

Implementar. Eso es spec + runbook.

## Cómo se crea

1. `docs/05-backlog/catalog.md` — ¿qué módulo?
2. Épica / feature si no existen (`docs/08-templates/epic.md`, `feature.md`).
3. HU bajo `…/F-NNN-slug/HU-NNN-slug.md`. `needs` + `screen`.
4. Fila en el catálogo del backlog.
5. El runbook ordena compose/implement (la dependencia primero).

## Si aplica, cargar

- `docs/05-backlog/catalog.md`
- La HU concreta, no el módulo entero
- Template `docs/08-templates/story.md` si es nueva
