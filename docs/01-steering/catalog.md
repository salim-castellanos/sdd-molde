# Catálogo de steering (padre)

Este archivo se lee **siempre**. Los demás steerings **no**.

1. Encaja la pregunta del usuario en la columna *Trigger*.
2. Abre **solo** esas cards.
3. La card decide si hace falta más documentación y **cuál**. No cargues el destino si la card dice que no aplica.

Si ningún trigger encaja, pregunta. No abras el catálogo entero de docs.

| id | Trigger | Card | La card puede apuntar a |
| --- | --- | --- | --- |
| product | idea de negocio, visión, alcance, actores, “qué es este producto” | [product.md](product.md) | [context/product.md](context/product.md) |
| tech | stack, librería, ORM, “podemos usar X” | [tech.md](tech.md) | [context/tech.md](context/tech.md) |
| structure | dónde va un archivo, nombres, monorepo | [structure.md](structure.md) | [context/structure.md](context/structure.md) |
| arquitectura | NFR, estilo, IAM, config, C4, ADR | [arquitectura.md](arquitectura.md) | `docs/03-architecture/catalog.md` + **un** archivo |
| formularios | validar inputs, errores de campo, Zod | [formularios.md](formularios.md) | `docs/04-design/ui-notes.md` + context/tech |
| diseño | pantallas, tokens, patrones, a11y | [diseno.md](diseno.md) | `docs/04-design/catalog.md` + **un** archivo |
| historia | módulo, épica, feature, HU | [historia.md](historia.md) | `docs/05-stories/catalog.md` + **una** HU |
| especificacion | cómo se **compone** una spec y a partir de qué | [especificacion.md](especificacion.md) | HU + diseño + arch + gates |
| carga | qué spec/HU/doc abrir ahora (no todas) | [carga.md](carga.md) | runbook activo + esta tabla |
| runbook | secuencia, dependencias, ejecutar un corte | [runbook.md](runbook.md) | `docs/07-runbooks/` |
| status | “en qué vamos”, avance, informe ejecutivo, al cerrar un paso de runbook | [status.md](status.md) | `STATUS.md` |
| ide | abrir el repo, Kiro/Cursor/otro, agregar carpeta, tentación de clonar config por agente | [ide.md](ide.md) | `AGENTS.md` + `docs/00-howto/abrir-en-el-ide.md` |
| pruebas | unitarias, humo, e2e, G4, “probé con curl” | [pruebas.md](pruebas.md) | `docs/00-howto/pruebas.md` + sección Pruebas de la spec |
| example | trabajar en example/, hueco del molde, GAPS | [example.md](example.md) | `example/README.md` + `example/GAPS.md` |

Constitución y gates no son steering: `docs/02-gates/`. Se leen al cruzar de fase, no al abrir el chat.
