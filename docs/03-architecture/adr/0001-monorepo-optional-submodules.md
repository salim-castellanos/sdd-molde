# ADR 0001 — Monorepo con extracción opcional a submodules

- Estado: accepted
- Fecha: 2026-08-15

## Contexto

Hace falta un workspace que alguien clone y use con SDD. También hace falta no mentir: api, web, mobile e infra pueden terminar en repos distintos.

## Decisión

Empezar en monorepo. `docs/` nunca se parte. `apps/*` se pueden extraer a git submodules cuando duela de verdad. El procedimiento está en `docs/00-howto/monorepo-vs-submodules.md`.

## Consecuencias

- Un clone, un agente, un loop.
- Extraer más tarde cuesta un subtree split; empezar con submodules cuesta todos los días.
