# What Molde is

**English** | [Español](./que-es.md)

**Molde** is a workspace template for **Spec-Driven Development** (SDD). One agent (Cursor, Kiro, Copilot, Claude Code, Codex) and one human share the same tree: `AGENTS.md` + `docs/` + `apps/`.

It is not a business product. You write the product when you fork (`docs/01-steering/context/product.md`). In the template, **Clave** is only the smallest example (identity). A separate instance (`example/`, another git) can be another product; it does not ship in the clone.

## In one sentence

One agent contract, a catalog that decides what to load, a runbook that orders the cut, a **composed** spec (not a lone user story), and gates before anyone says “done”.

## It is not BMAD

[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) is a **multi-agent** framework: Analyst, PM, Architect, Scrum Master, Dev, QA… they hand off PRDs and story files. Use it if you want a role orchestra.

Molde is **smaller on purpose**:

| | BMAD | Molde |
| --- | --- | --- |
| Who works | Several role-agents | One agent + the human |
| Where the method lives | Packs, agents, workflows | `AGENTS.md` + `docs/` (readable on GitHub) |
| What gets implemented | Story enriched by the SM | **Composed** spec (story + design + arch + gates) |
| Order | Method workflows | Runbook (sequence + %) |
| Vendor | Install / modules | No CLI. No `.kiro/`, no duplicated `CLAUDE.md` |

If BMAD is too heavy and Spec Kit hides the process in `.specify/`, Molde is the middle: visible SDD, one loop, no role theater.

## Family (we locate, we do not compete)

| Piece | What it is | Molde |
| --- | --- | --- |
| [Spec Kit](https://github.com/github/spec-kit) | CLI + prompts (`spec` → `plan` → `tasks`) | Same loop, **no** required CLI |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | Delta specs | Fits once the system already exists |
| [Kiro](https://kiro.dev) | IDE + steering | The `product` / `tech` / `structure` cards are the same job, in `docs/` |
| BMAD | Agent orchestra | Rejected as the core (`estado-del-arte.md`) |

Why the tree looks like this: [estado-del-arte.md](estado-del-arte.md). How to run it: [sdd-loop.md](sdd-loop.md). Languages: [i18n.md](i18n.md).

## What you get when you clone

- Single contract: [AGENTS.md](../../AGENTS.md).
- Load catalog: [docs/01-steering/catalog.md](../01-steering/catalog.md) — only cards whose trigger matches.
- Constitution and gates G0–G5: `docs/02-gates/`.
- Empty `apps/` slots (api, web, infra) for **your** fork.
- Templates for stories, specs, runbooks, ADRs.

It does not include a real product’s code. `example/` (if you see it in a development workspace) is **another repository**.
