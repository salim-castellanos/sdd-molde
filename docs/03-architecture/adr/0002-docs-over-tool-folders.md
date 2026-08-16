# ADR 0002 — Documentación visible en `docs/`, no en carpetas de vendor

- Estado: accepted
- Fecha: 2026-08-15

## Contexto

Spec Kit usa `.specify/`. Kiro usa `.kiro/steering/`. OpenSpec usa `openspec/`. Son válidos y están atados a una herramienta.

## Decisión

El conocimiento canónico vive en `docs/{00…08}-*`. El padre de carga es `docs/01-steering/catalog.md`. `.cursor/` solo adapta el loop. `AGENTS.md` apunta a `docs/`.

## Consecuencias

- Un lector en GitHub entiende el producto sin instalar CLI.
- Si se añade Spec Kit u OpenSpec después, se mapean a estas carpetas; no al revés.
