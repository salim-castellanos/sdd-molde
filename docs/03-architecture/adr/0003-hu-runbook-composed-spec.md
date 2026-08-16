# ADR 0003 — HU, runbook y spec compuesta

- Estado: accepted
- Fecha: 2026-08-15

## Contexto

Tratar la spec como el lugar de la historia (y ejecutarla directo) mezcla insumos con el artefacto derivado. Tampoco se pueden cargar todos los steerings en cada turno.

## Decisión

- Las HUs viven en `docs/05-stories/`.
- El runbook en `docs/07-runbooks/` ordena compose → implement y guarda estado.
- La spec en `docs/06-specs/` se **compone**; no se escribe para codear.
- `docs/01-steering/catalog.md` es el padre: cards delgadas apuntan a docs.

## Consecuencias

- Más archivos, menos contexto por turno.
- Una HU de dependencia (roles, paleta) se entrega antes de la que la usa.
- El mega-spec `001-auth` deja de ser el ejecutable.
