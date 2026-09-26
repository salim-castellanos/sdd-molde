# Documentación

**Molde** — plantilla SDD. [Qué es](00-howto/que-es.md). El código del fork está en `/apps`. El informe ejecutivo del **producto** (Clave en este molde) está en [`STATUS.md`](../STATUS.md).

## Índice

| Carpeta | Para qué | Se lee |
| --- | --- | --- |
| [00-howto](00-howto/) | Cómo usar la plantilla | Al clonar |
| [01-steering](01-steering/) | Padre `catalog.md` + cards (incluye `ide`) | Catálogo siempre; cards si el trigger pega |
| [02-gates](02-gates/) | Constitución y G0–G5 | Al cruzar de fase |
| [03-architecture](03-architecture/) | [Catálogo](03-architecture/catalog.md): AF, NFR, estilos, IAM, config | Un archivo del catálogo |
| [04-design](04-design/) | [Catálogo](04-design/catalog.md): principios, tokens, patrones | Un archivo + una pantalla |
| [05-backlog](05-backlog/) | **HUs** (fuente del qué): [catálogo](05-backlog/catalog.md) módulo → épica → feature → HU | Una HU |
| [06-specs](06-specs/) | Specs **compuestas** (rehacibles si la HU vive) | La spec del paso |
| [07-runbooks](07-runbooks/) | Orden + estado + % | El runbook activo |
| [08-templates](08-templates/) | Formatos | Al crear un artefacto |

## Cadena

```text
HU (05-backlog)     ← fuente del qué; no se tira
  + diseño + arch + gates + cards
        ↓
 spec (06-specs)    ← se puede volver a componer
        ↓
 runbook (07)       ← solo el orden
        ↓
 código (apps/)
```

Si abres `06` o `07` y no ves HUs: están un nivel antes, en `05-backlog/catalog.md`.
