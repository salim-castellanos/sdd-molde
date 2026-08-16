# Estado del arte y por qué esta forma

Escrito para que el arquetipo no parezca capricho. Si una decisión deja de ser verdad, se actualiza este archivo y el ADR correspondiente.

## El problema que resuelve esta plantilla

Quien quiere SDD hoy se encuentra con:

- Toolkits de **proceso** (GitHub Spec Kit, OpenSpec) que instalan CLI, prompts y `.specify/` o `openspec/`.
- IDEs con **steering** propio (Kiro: `product.md` / `tech.md` / `structure.md`).
- Agentes que leen **`AGENTS.md`** (Cursor, Codex, Copilot, Gemini, Kiro).
- Métodos pesados (BMAD y similares) con muchos roles y muchos archivos.

Casi ninguno entrega a la vez: un workspace clonable, documentación humana visible, apps multi-artefacto, y un ejemplo real. Esa es la brecha.

## Convergencia 2025–2026

Los frameworks serios coinciden en un loop de cuatro tiempos, con nombres distintos:

| Fase | Spec Kit | OpenSpec | Kiro | Este repo |
| --- | --- | --- | --- | --- |
| Reglas duraderas | `constitution.md` | `config.yaml` + rules | steering always-on | `docs/02-gates/constitution.md` + `AGENTS.md` |
| Contexto de producto | (implícito) | context | `product.md` `tech.md` `structure.md` | `docs/01-steering/` |
| Qué construir | `spec.md` | `proposal` + delta spec | requirements | HU → spec compuesta en `docs/06-specs/` |
| Cómo | `plan.md` | `design.md` | design | `plan.md` |
| Orden | `tasks.md` | `tasks.md` | tasks | `tasks.md` |
| Calidad | clarify / analyze / checklist | verify / archive | (hooks + reviews) | `docs/02-gates/quality-gates.md` |

No reinventamos el loop. Lo hacemos **visible en `docs/`**, no escondido en un directorio de herramienta.

## Decisiones que tomamos (y las que rechazamos)

**Visible sobre oculto.** Steering y constitución están en `docs/`, no solo en `.kiro/` o `.specify/`. Un humano debe poder leer el repo en GitHub sin conocer el vendor.

**`AGENTS.md` corto.** La evidencia de 2026 (HumanLayer, TrueFoundry y práctica de Cursor) es que un archivo de standing instructions largo degrada el cumplimiento. Este archivo es un índice. El detalle se lee bajo demanda.

**HU y spec son capas distintas.** La HU es insumo. La spec se **compone** (HU + diseño + arquitectura + gates + steerings). Un runbook ordena dependencias (la paleta antes que crear el carro). Cargar todo junto produce drift; el catálogo de steering decide qué abrir.

**No CLI obligatorio.** Spec Kit y OpenSpec son buenos; no son el producto. Este arquetipo funciona con Cursor Plan Mode + skills. Si más adelante se añade MCP o `specify`, será un adaptador, no el núcleo.

**No BMAD completo.** Demasiados roles para un template que predica simplicidad. Un agente, un loop, gates explícitos.

**Monorepo primero.** El agente ve docs y código juntos. Los submodules son un *modo de extracción*, no el default. Ver [monorepo-vs-submodules.md](monorepo-vs-submodules.md).

**Ejemplo de identidad, no TODO app.** Login / registro / reset / roles ejercitan backend, BD, frontend y diseño. Es el menor dominio que se siente un producto.

**Código después de la spec.** Esta iteración deja `apps/` vacías a propósito. Implementar auth “para que se vea lleno” rompería el propio método.

## A qué nos adelantamos

- **Specs ejecutables:** OpenAPI / contratos en `docs/06-specs/NNN/contracts/` cuando el plan de una spec **compuesta** lo pida.
- **Delta specs (OpenSpec):** cuando el sistema ya existe, el cambio describe ADDED / MODIFIED / REMOVED, no reescribe el mundo. El template de spec lo contempla.
- **Gates medibles:** hoy son checklists. El siguiente paso natural son checks en CI que fallen si no hay spec, o evals de agente (línea AXIS / eval gates).
- **Skills como progressive disclosure:** el loop SDD es un skill del repo, no un prompt pegado. Compatible con el modelo de Cursor (rules cortas + skills bajo demanda).
- **`AGENTS.md` anidado por app:** cuando `apps/web` y `apps/api` diverjan, cada una trae lo suyo. Ya hay placeholder.

## Un contrato, no uno por creador

`AGENTS.md` (raíz + anidado) es el estándar de facto que ya leen Cursor, Kiro, Copilot, Codex y Claude Code. El procedimiento vive en `docs/`. Las carpetas de vendor, si existen, son punteros.

No copiamos el loop a `.kiro/steering/`, `CLAUDE.md` ni copilot-instructions. Eso sería un cerebro por agente.
