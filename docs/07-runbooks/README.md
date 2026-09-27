# 07 — Runbooks

Un runbook = un corte de entrega. Guarda secuencia, estado y %. Las HUs del corte viven en [`../05-backlog/`](../05-backlog/), no aquí.

| ID | Corte | Status | Paso | % |
| --- | --- | --- | --- | --- |
| [001-identidad](001-identidad/runbook.md) | HUs 001–005 de Clave | `in-progress` | 2 | 8 |

Activo = el runbook cuyo paso es `compose` o `implement`. El agente carga **ese**. `ai-tested` = terminado y probado por la IA, sin visto humano; no es la cola. `closed` = lo aceptó el humano.

El rollup ejecutivo no vive aquí: [STATUS.md](../../STATUS.md). Esta tabla alimenta `delivery_pct`.
