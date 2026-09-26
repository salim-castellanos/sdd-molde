---
id: 00N-slug
title:
status: draft
hu:
runbook:
supersedes:
superseded-by:
---

# Spec 00N — Título

End-to-end de **una** funcionalidad: datos/BD → api → pantalla → pruebas (HTTP y, si hay UI, Playwright). Si falta alguno y no dice “no aplica”, la spec no está lista.

## Insumos

Rutas concretas. Si un insumo no se usó, no lo pongas.

- HU:   (obligatoria; si falta, esta spec no vale)
- Diseño:
- Arquitectura:
- Gates:
- Steerings (cards):

## Contexto

Una frase. O “corte inicial; ver insumos”.

## In scope

## Tablero

Qué tiles del home cambian si esta spec se cumple, o *no aplica*. Citar la HU del tablero si existe. No se inventa un KPI.

## Out of scope

Si una sección no aplica al corte, escribe “no aplica” — no la borres. G1 exige las secciones, no prosa larga.

## Comportamiento

EARS. Lo que no esté en la HU ni en los insumos no se inventa: se pregunta o se actualiza la HU.

## Pantalla

Cómo se ve y qué ruta es. Citar `docs/04-design/screens.md` (una fila) y fundamentos/patrones que apliquen.

## Formulario y validación

Campos, reglas, cuándo se valida. O “sin formulario”. Opcional: vacío se omite; el default lo pone el api.

## Mensajes

Éxito, error de campo, error de servidor, vacío. Texto o referencia al patrón. Incluye el caso que no debe enumerar (p. ej. login). Si hay sesión: 401 ¿se pinta o se descarta y va a login?

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

**Qué se invoca** es el escenario (de ahí sale el assert). **Qué falla si se rompe** es el síntoma del fallo, no el valor que el test debe esperar.

## Delta

`ADDED` / `MODIFIED` / `REMOVED` cuando esto ya no sea el documento base.

Si esta spec sigue a otra de la **misma** HU, el frontmatter lleva `supersedes: <id de la anterior>` y la anterior `superseded-by: <este id>`. Las dos pueden seguir `implemented`. La vigente es la que no tiene `superseded-by`.
