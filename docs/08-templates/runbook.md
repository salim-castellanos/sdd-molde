---
id: 00N-slug
status: in-progress
step: 1
progress: 0
---

# Runbook 00N — Título

## Objetivo

## Negocio (secuencia)

```mermaid
sequenceDiagram
  participant A as HU dependencia
  participant B as HU que la usa
  Note over A,B: A se compone y ejecuta antes
```

## Pasos

| # | Tipo | Qué | Insumos | Status | % |
| --- | --- | --- | --- | --- | --- |
| 1 | analyze | … | HUs | `pending` | 0 |
| 2 | compose | Spec de HU-… | HU + diseño + arch + cards | `pending` | 0 |
| 3 | implement | Ejecutar esa spec | spec | `blocked` | 0 |

## Estado actual

- Paso corriente:
- Siguiente:
- Bloqueos:

Al crear este archivo y al cerrar cada paso: reescribir `STATUS.md` (card `status`). Al cerrar el runbook: card `lecciones`.
