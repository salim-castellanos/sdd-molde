# AGENTS.md

Único contrato de agente de este repo. Cursor, Kiro, Copilot, Claude Code, Codex u otro: empiezan **aquí**. El detalle está en `docs/`, referenciado, no copiado a carpetas de vendor.

No crees `CLAUDE.md`, `.kiro/steering/`, `.cursorrules`, `GEMINI.md` ni `.github/copilot-instructions.md` con el mismo texto. Si una herramienta exige un archivo propio, ese archivo es **una línea** que apunta a este.

## Qué es este repo

**Molde** (`sdd-molde`): plantilla SDD para un solo agente. Qué es y qué no (BMAD, Spec Kit): `docs/00-howto/que-es.md`. Conocimiento en `docs/`. Software en `apps/`. Una instancia de producto puede vivir en `example/` como **otro git**. Monorepo; cada app puede ser submodule después.

`AGENTS.md` anidados (este directorio y los hijos) dicen el propósito del árbol. Card `ide` al agregar una pieza. `.vscode/` es chrome del editor (común a forks de VS Code), no cerebro del agente.

`example/` es **otro repositorio git** (producto Mistratos). El molde no lo versiona. El método sigue en `docs/` de esta raíz.

## Carga (obligatorio)

1. Este archivo y `docs/01-steering/catalog.md`.
2. Solo las cards cuyo trigger coincide. Cada card dice qué doc cargar.
3. Si entregas producto: runbook **activo** en `docs/07-runbooks/`. Paso corriente. Al crear o avanzar el runbook, reescribe `STATUS.md` (card `status`). Al **cerrar** (G5): card `lecciones`.
4. “¿En qué vamos?” → `STATUS.md`, no el runbook entero.
5. No cargues todas las HUs, specs ni `context/`.
6. Procedimiento: `docs/00-howto/sdd-loop.md`. Carga fina: card `carga`.

Constitución (`docs/02-gates/constitution.md`) al cruzar de fase.

## Dónde va cada cosa

| Pregunta | Sitio |
| --- | --- |
| ¿Qué steering abro? | `docs/01-steering/catalog.md` |
| ¿Qué es una HU / spec / runbook? | cards `historia`, `especificacion`, `runbook` |
| ¿Backlog (módulo → épica → feature → HU)? | `docs/05-backlog/catalog.md` |
| ¿Specs compuestas? | `docs/06-specs/` |
| ¿En qué vamos / avance ejecutivo? | `STATUS.md` |
| ¿En qué paso de entrega? | `docs/07-runbooks/` |
| ¿Cómo se ejecuta el loop? | `docs/00-howto/sdd-loop.md` |
| ¿Gates? | `docs/02-gates/` |
| ¿Código? | `apps/*` (tu fork) · `example/apps/` (instancia, cuando exista spec) |
| ¿Hueco del molde al usar el ejemplo? | `example/GAPS.md` + card `example` |
| ¿Qué dolió al ejecutar (puertos, URL, G4 ambiente)? | card `lecciones` |

## Loop

```
catalog (padre)
    ↓
 runbook (secuencia + estado)
    ↓
 analyze → compose spec (HU + diseño + arch + gates + cards) → G1–G3
    ↓
 implement spec → G4
    ↓
 siguiente paso del runbook → G5 al cerrar
    ↓
 STATUS.md (mismo turno)
    ↓
 lecciones (G5: fila si dolió; promover a gate/loop)
```

Una spec no se crea para ejecutar. Se compone en el runbook y se ejecuta en el paso siguiente.

## No hagas

- No implementes desde una HU. Compón la spec primero.
- No implementes infra ni plataforma (Docker, Compose, cluster) sin documentar antes (arch / ADR).
- No cierres G4 ni un `implement` porque “se probó a mano”. La spec nombra la batería; esas pruebas tienen que existir y pasar.
- No crees una spec porque “hay que codear”. Abre o crea un runbook.
- No cargues todos los steerings ni todas las specs.
- No dupliques este archivo en una carpeta de herramienta.
- No pongas secretos en el repo.
- No conviertas este archivo en un manual. Si crece, va a `docs/`.
- No agregues una carpeta muda. Card `ide`.
- No dejes un arreglo solo en `example/` si el hueco es del molde. `GAPS.md` + parche a `docs/`.
- No cierres G4 con tests verdes si el humano no tiene una URL del corte que abre.

## Convenciones

- Método (HU, spec, runbook, cards): español. Landing pública: inglés + español (`README.md` / `README.es.md`, sufijo `.en.md`). Card/howto: `docs/00-howto/i18n.md`. Código, APIs e identificadores: inglés.
- Commits: `feat(auth):`, `docs(spec):`, `docs(runbook):`.
- HU, spec y código no divergen en silencio.
- El `AGENTS.md` más cercano al archivo en el que trabajas gana en conflictos de stack.
