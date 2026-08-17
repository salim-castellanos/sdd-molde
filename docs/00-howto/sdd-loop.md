# Loop SDD

```text
AGENTS.md + catalog.md (padre)
              │
              ▼
     runbook activo (estado, %, paso)
              │
              ▼
        analyze  →  G0
              │
    ┌─────────┴─────────┐
    │  por cada HU      │
    │  compose spec     │  HU + diseño + arch + gates + cards
    │       G1–G3       │
    │  implement spec   │  G4
    └─────────┬─────────┘
              ▼
           close runbook  →  G5
              │
              ▼
         STATUS.md (rollup)
```

La spec es un **resultado**. El runbook es quien decide el orden (paleta antes que crear carro).

## Roles

| Artefacto | Pregunta | No es |
| --- | --- | --- |
| HU | ¿Quién necesita qué y por qué? | Ejecutable |
| Diseño / arch / gates / cards | Insumos | La spec |
| Spec | ¿Qué es correcto **después** de unir insumos? | El backlog |
| Runbook | ¿En qué orden y en qué paso vamos? | Una spec larga |
| `STATUS.md` | ¿Cómo va el producto? (ejecutivo) | El paso a paso |
| Código | ¿Cómo quedó? | La fuente del “qué” |

## Cómo pedirlo

- “Sigue el runbook 001-identidad.”
- “Compón la spec del paso corriente.”
- “Crea un runbook para estas HUs: …”
- “¿Qué steering aplica a esta pregunta?”
- “Actualiza el estado del proyecto.” / “¿En qué vamos?”

## Qué no saltarse

De HU a PR es un defecto de proceso. Typo y lint, sí. Si el arreglo cambia comportamiento, se reabre el `compose`.

## Procedimiento por fase

Cualquier agente (Cursor, Kiro, Copilot, Claude Code, …) sigue esto. No hay una copia por herramienta.

### Compose

Precondición: runbook en paso `compose`. Si no hay runbook, créalo.

1. Una HU (`needs`, `screen`) bajo su feature/épica/módulo.
2. Cards del catálogo de steering que el paso dispara; de arch/diseño, sus `catalog.md` y un archivo.
3. Solo los destinos de esas cards.
4. `docs/06-specs/NNN-slug/` desde `docs/08-templates/spec.md`.
5. Sección **Insumos** con rutas. G1. No implementes.
6. Plan y tasks. El runbook se actualiza al cerrar G3. Luego `STATUS.md`.

### Plan

Spec en `spec-ready`. Lee la spec, no la HU. Card `tech` solo si toca stack. G2.

### Tasks

`plan-ready`. Cimientos primero, “verificar:” en cada una. G3 → `compose` done; `implement` deja de estar `blocked`.

### Implement

Runbook en `implement` y spec `task-ready`. Si no, detente. Si el humano pidió **ejecutar el runbook**, recorre desde el paso corriente hasta cerrar: pasa el frontmatter a `implement` **antes** de mutar `apps/` (npm install, Compose).

Solo esas tasks. Escribe y corre la batería que la spec nombró (unit / integración / e2e). Curl no cierra G4. Antes de marcar `implement` done: `docker compose ls` + `docker ps` (un runtime del corte) y una URL que abre, escrita en `STATUS.md`. Actualiza `step` y `progress`. Reescribe `STATUS.md`.

### Gate

Checklist `docs/02-gates/quality-gates.md`. Fallo = archivo + hueco. G2+ ambiguo: pregunta. G5 = drift HU / spec / código del corte. Cerrar runbook incluye `STATUS.md` y card `lecciones`.
