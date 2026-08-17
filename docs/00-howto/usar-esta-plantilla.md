# Usar esta plantilla

Esto es **Molde** (`sdd-molde`). Qué es: [que-es.md](que-es.md).

## Si vas a construir TU producto

1. Clona o usa “Use this template”.
2. Reescribe `docs/01-steering/context/product.md` (la card `product` apunta ahí).
3. Confirma `context/tech.md` y `context/structure.md`.
4. Edita `docs/02-gates/constitution.md`.
5. Sustituye las HUs de `docs/05-backlog/` por las tuyas (o archiva las de Clave).
6. Crea un runbook en `docs/07-runbooks/` que ordene esas HUs (dependencias primero).
7. Pide al agente: *sigue el runbook N*. No le pidas una spec suelta ni código.

## Si vas a continuar ESTE ejemplo

Pide: *compón la spec del paso 2 del runbook 001-identidad*.

## Qué no copies a ciegas

- El nombre **Clave** y el stack TypeScript son del ejemplo.
- `AGENTS.md` + `docs/` son el contrato. No clones el proceso a `.kiro/` ni a `CLAUDE.md`.
- No agregues CLI de Spec Kit “por si acaso”.

## Checklist de un fork limpio

- [ ] `context/product.md` es verdadero.
- [ ] Hay HUs propias y un runbook que las ordena.
- [ ] `docs/06-specs/` no tiene specs huérfanas (sin paso `compose`).
- [ ] `apps/` no tiene código de un dominio sin spec.
