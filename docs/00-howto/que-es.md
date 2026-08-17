# Qué es Molde

[English](./que-es.en.md) | **Español**

**Molde** es una plantilla de workspace para **Spec-Driven Development** (SDD). Un agente (Cursor, Kiro, Copilot, Claude Code, Codex) y un humano trabajan el mismo árbol: `AGENTS.md` + `docs/` + `apps/`.

No es un producto de negocio. El producto lo escribes tú al hacer fork (`docs/01-steering/context/product.md`). En el molde, **Clave** es solo el ejemplo mínimo (identidad). Una instancia aparte (`example/`, otro git) puede ser otro producto; no viaja en el clone.

## En una frase

Un solo contrato de agente, un catálogo que decide qué leer, un runbook que ordena el corte, una spec **compuesta** (no una HU suelta) y gates antes de decir “listo”.

## No es BMAD

[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) es un marco **multi-agente**: Analyst, PM, Architect, Scrum Master, Dev, QA… se pasan PRDs y *story files*. Sirve si quieres una orquesta de roles.

Molde es **más chico a propósito**:

| | BMAD | Molde |
| --- | --- | --- |
| Quién trabaja | Varios agentes-rol | Un agente + el humano |
| Dónde vive el método | Packs, agentes, workflows | `AGENTS.md` + `docs/` (visible en GitHub) |
| Qué se implementa | Story enriquecida por el SM | Spec **compuesta** (HU + diseño + arch + gates) |
| Orden | Workflows del método | Runbook (secuencia + %) |
| Vendor | Instalación / módulos | Sin CLI. Sin `.kiro/`, sin `CLAUDE.md` duplicado |

Si BMAD te queda grande y Spec Kit te esconde el proceso en `.specify/`, Molde es el medio: SDD visible, un loop, sin teatro de roles.

## Familia (no competimos: ubicamos)

| Pieza | Qué es | Molde |
| --- | --- | --- |
| [Spec Kit](https://github.com/github/spec-kit) | CLI + prompts (`spec` → `plan` → `tasks`) | Mismo loop, **sin** CLI obligatorio |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | Delta specs | Compatible cuando el sistema ya existe |
| [Kiro](https://kiro.dev) | IDE + steering | Las cards `product` / `tech` / `structure` son el mismo oficio, en `docs/` |
| BMAD | Orquesta de agentes | Lo rechazamos como núcleo (`estado-del-arte.md`) |

Detalle de por qué el árbol tiene esta forma: [estado-del-arte.md](estado-del-arte.md). Cómo se ejecuta: [sdd-loop.md](sdd-loop.md).

## Qué obtienes al clonar

- Contrato único: [AGENTS.md](../../AGENTS.md).
- Catálogo de carga: [docs/01-steering/catalog.md](../01-steering/catalog.md) — solo las cards cuyo trigger pega.
- Constitución y gates G0–G5: `docs/02-gates/`.
- Huecos de `apps/` (api, web, infra) para **tu** fork.
- Templates de HU, spec, runbook, ADR.

No incluye el código de un producto real. `example/` (si lo ves en un workspace de desarrollo) es **otro repositorio**.
