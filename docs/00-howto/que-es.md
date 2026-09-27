# Qué es Molde

[English](./que-es.en.md) | **Español**

**Molde** es una plantilla de workspace para **Spec-Driven Development** (SDD). **Una persona** y un orquestador trabajan el mismo árbol: `AGENTS.md` + `docs/` + `apps/`. El orquestador abre el rol del paso (analizar, componer, implementar, probar). Los roles se dejan notas en la mesa del runbook. Card `orquesta`.

No es un producto de negocio. El producto lo escribes tú al hacer fork (`docs/01-steering/context/product.md`). En el molde, **Clave** es solo el ejemplo mínimo (identidad). Una instancia aparte (`example/`, otro git) puede ser otro producto; no viaja en el clone.

## En una frase

Un solo contrato, un catálogo que decide qué leer, **HUs que viven** (`05-backlog`), un runbook que ordena el corte, una spec **compuesta** (rehacible desde la HU) y gates antes de decir “listo”. Una persona cambia de rol; el orquestador no es una orquesta de productos.

## No es BMAD

[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) es un marco **multi-agente**: Analyst, PM, Architect, Scrum Master, Dev, QA… se pasan PRDs y *story files*. Sirve si quieres una orquesta de roles.

Molde es **más chico a propósito**:

| | BMAD | Molde |
| --- | --- | --- |
| Quién trabaja | Varios agentes-rol que se pasan PRDs | Una persona. El orquestador abre **un** rol del paso y la mesa |
| Dónde vive el método | Packs, agentes, workflows | `AGENTS.md` + `docs/` (visible en GitHub) |
| Qué se implementa | Story enriquecida por el SM | Spec **compuesta** (HU + diseño + arch + gates) |
| Orden | Workflows del método | Runbook (secuencia + %) |
| Vendor | Instalación / módulos | Sin CLI. Sin `.kiro/`, sin `CLAUDE.md` duplicado |

Si BMAD te queda grande y Spec Kit te esconde el proceso en `.specify/`, Molde es el medio: SDD visible, un loop, roles del paso sin teatro de packs.

## Familia (no competimos: ubicamos)

| Pieza | Qué es | Molde |
| --- | --- | --- |
| [Spec Kit](https://github.com/github/spec-kit) | CLI + prompts (`spec` → `plan` → `tasks`) | Mismo loop, **sin** CLI obligatorio |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | Delta specs | Compatible cuando el sistema ya existe |
| [Kiro](https://kiro.dev) | IDE + steering | Las cards `product` / `tech` / `structure` son el mismo oficio, en `docs/` |
| BMAD | Orquesta de agentes y PRDs | No es el núcleo. Los roles de Molde caben en un paso y una mesa (`orquesta.md`) |

Detalle de por qué el árbol tiene esta forma: [estado-del-arte.md](estado-del-arte.md). Cómo se ejecuta: [sdd-loop.md](sdd-loop.md).

## Qué obtienes al clonar

- Contrato único: [AGENTS.md](../../AGENTS.md).
- Catálogo de carga: [docs/01-steering/catalog.md](../01-steering/catalog.md) — solo las cards cuyo trigger pega.
- Constitución y gates G0–G5: `docs/02-gates/`.
- Huecos de `apps/` (api, web, infra) para **tu** fork.
- Templates de HU, spec, runbook, ADR.

No incluye el código de un producto real. `example/` (si lo ves en un workspace de desarrollo) es **otro repositorio**.
