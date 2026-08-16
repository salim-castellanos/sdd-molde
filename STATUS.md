---
updated: 2026-08-15
product_pct: 0
delivery_pct: 8
---

# Estado — Clave

Informe ejecutivo. **Derivado**: se recalcula desde el catálogo de HUs + specs + runbooks. No se edita a mano “porque sí”.

| | |
| --- | --- |
| Producto | Identidad mínima (cuenta, sesión, reset, permisos en BD) |
| Avance de **producto** | **0%** — HUs escritas; ninguna spec ejecutada |
| Avance de **entrega** | **8%** — runbook `001-identidad`, paso 2/12 |
| Siguiente | Componer spec de HU-001 (autorización) |
| Pedir | *actualiza el estado del proyecto* |

## Funcionalidades

| ID | Qué | Módulo / épica / feature | Estado HU | % |
| --- | --- | --- | --- | --- |
| HU-001 | Roles y permisos (RBAC) | transversal / E-001 / F-001 | `backlog` | 0 |
| HU-002 | Registro | transversal / E-001 / F-002 | `backlog` | 0 |
| HU-003 | Login / logout | transversal / E-001 / F-002 | `backlog` | 0 |
| HU-004 | Reset password | transversal / E-001 / F-002 | `backlog` | 0 |
| HU-005 | Sesión visible (`/me`) | transversal / E-001 / F-003 | `backlog` | 0 |

`backlog` = hay HU, no spec `task-ready`. `in-spec` = compose cerrado (G3). `done` = implement cerrado (G4).

## Avance por corte

| Corte | % | Cómo |
| --- | --- | --- |
| Módulo `00-transversal` | 0 | promedio de sus épicas |
| Épica E-001 Identidad | 0 | promedio de F-001…003 |
| F-001 Autorización | 0 | HU-001 |
| F-002 Autenticación | 0 | HU-002…004 |
| F-003 Sesión | 0 | HU-005 |
| **Producto** | **0** | promedio de módulos con ≥1 épica |

## Entrega (runbooks)

| Runbook | Status | Paso | % |
| --- | --- | --- | --- |
| [001-identidad](docs/07-runbooks/001-identidad/runbook.md) | `in-progress` | 2 compose HU-001 | 8 |

`delivery_pct` = promedio del `progress` de runbooks no archivados.

## Cómo se calcula (no inventar otra fórmula)

1. Cada HU: `0` backlog · `50` in-spec · `100` done. Evidencia: existe `docs/06-specs/…` con status ≥ `task-ready` → 50; status `implemented` o `closed` → 100.
2. Feature = promedio de sus HUs. Épica = promedio de features. Módulo = promedio de épicas.
3. Producto = promedio de módulos que tienen al menos una épica. No cuentes `[RELLENAR 01-…]`.
4. Entrega = promedio de `progress` en `docs/07-runbooks/*/runbook.md`.

Al crear o avanzar un runbook, este archivo se reescribe **en el mismo turno**. Card: `docs/01-steering/status.md`.
