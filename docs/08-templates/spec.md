---
id: 00N-slug
title:
status: draft
hu:
runbook:
---

# Spec 00N — Título

End-to-end de **una** funcionalidad: datos/BD → api → pantalla → pruebas (HTTP y, si hay UI, Playwright). Si falta alguno y no dice “no aplica”, la spec no está lista.

## Insumos

Rutas concretas. Si un insumo no se usó, no lo pongas.

- HU:
- Diseño:
- Arquitectura:
- Gates:
- Steerings (cards):

## Contexto

Una frase. O “corte inicial; ver insumos”.

## In scope

## Out of scope

Si una sección no aplica al corte, escribe “no aplica” — no la borres. G1 exige las secciones, no prosa larga.

## Comportamiento

EARS. Lo que no esté en la HU ni en los insumos no se inventa: se pregunta o se actualiza la HU.

## Pantalla

Cómo se ve y qué ruta es. Citar `docs/04-design/screens.md` (una fila) y fundamentos/patrones que apliquen.

## Formulario y validación

Campos, reglas, cuándo se valida. O “sin formulario”.

## Mensajes

Éxito, error de campo, error de servidor, vacío. Texto o referencia al patrón. Incluye el caso que no debe enumerar (p. ej. login).

## Autenticación y autorización

Quién puede. 401 / 403. Qué permiso de BD. Qué oculta la UI (sin ser autoridad). O “público”.

## Datos

Tablas u objetos que esta funcionalidad lee o escribe. O “no aplica”.

## Contratos

Tabla de endpoints en esta spec (mínimo). `./contracts/` solo si el payload no cabe o hay más de un consumidor.

## Pruebas

Una fila por criterio de aceptación. La spec **nombra** la batería; el `implement` la escribe. Card `pruebas`.

| AC | Capa (unit / integración / e2e HTTP / e2e Playwright) | Qué se invoca | Qué falla si se rompe |
| --- | --- | --- | --- |
| | | | |

Si una capa no aplica: “no aplica” y una frase. Sin esta tabla, G1 no pasa.

## Delta

`ADDED` / `MODIFIED` / `REMOVED` cuando esto ya no sea el documento base.
