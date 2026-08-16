# Documentación

El código generado está en `/apps`. El informe ejecutivo del producto está en [`STATUS.md`](../STATUS.md).

## Índice

| Carpeta | Para qué | Se lee |
| --- | --- | --- |
| [00-howto](00-howto/) | Cómo usar la plantilla | Al clonar |
| [01-steering](01-steering/) | Padre `catalog.md` + cards (incluye `ide`) | Catálogo siempre; cards si el trigger pega |
| [02-gates](02-gates/) | Constitución y G0–G5 | Al cruzar de fase |
| [03-architecture](03-architecture/) | [Catálogo](03-architecture/catalog.md): AF, NFR, estilos, IAM, config | Un archivo del catálogo |
| [04-design](04-design/) | [Catálogo](04-design/catalog.md): principios, tokens, patrones | Un archivo + una pantalla |
| [05-stories](05-stories/) | [Catálogo](05-stories/catalog.md): módulo → épica → feature → HU | Una HU |
| [06-specs](06-specs/) | Specs **compuestas** | La spec del paso |
| [07-runbooks](07-runbooks/) | Secuencia + estado + % | El runbook activo |
| [08-templates](08-templates/) | Formatos | Al crear un artefacto |

## Cadena

HU ─(+ diseño + arch + gates + cards)→ spec ─(runbook)→ código.

El runbook ordena las HUs que dependen entre sí.
