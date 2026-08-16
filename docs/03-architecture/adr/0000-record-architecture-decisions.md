# ADR 0000 — Registrar decisiones de arquitectura

- Estado: accepted
- Fecha: 2026-08-15

## Contexto

El workspace va a acumular decisiones (monorepo, stack, auth). Si quedan solo en el chat, el siguiente agente las reinventará.

## Decisión

Usamos ADRs cortos en `docs/03-architecture/adr/`, numerados, con la plantilla `docs/08-templates/adr.md`.

## Consecuencias

- Una decisión reversible se documenta igual; el estado puede pasar a `superseded`.
- No todo es ADR: el detalle de una feature vive en su spec.
