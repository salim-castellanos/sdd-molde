# Steering — ide / workspace

## Cuándo cargarlo

Abrir el repo en cualquier IDE agentico. “No se entiende el Explorer”. Agregar carpeta o tipo de artefacto. Tentación de crear `.kiro/`, `CLAUDE.md` o un skill que copie el loop.

## Cuándo no

Redactar una HU. Elegir copy de un botón.

## Un contrato, no uno por agente

| Superficie | Rol | ¿Fuente de verdad? |
| --- | --- | --- |
| `AGENTS.md` (raíz + anidados) | Contrato de **cualquier** agente | **Sí** |
| `docs/` referenciado desde ahí | Detalle (catálogo, loop, HUs, …) | **Sí** |
| `.vscode/` | Chrome del editor (título, Mermaid, nest) | No. No instruye al agente |
| `.cursor/` | Atajo opcional de Cursor | No. Solo punteros a `AGENTS.md` / `docs/` |
| `.kiro/`, `CLAUDE.md`, `copilot-instructions.md` | — | **Prohibido** como copia del proceso |

Kiro lee `AGENTS.md` de fábrica. No hace falta `.kiro/steering/` si el catálogo vive en `docs/01-steering/`.

## Al agregar algo

1. ¿Dónde vive? `docs/AGENTS.md` / `structure`.
2. ¿Se entiende en el Explorer? README o `AGENTS.md` anidado.
3. ¿El agente sabe cuándo cargarlo? Fila en `catalog.md` (no un rule de vendor).
4. ¿Siguen verdad `README.md` y el `AGENTS.md` raíz?
5. ¿Hace falta un archivo de herramienta? Solo si es un puntero de una línea. Nunca un segundo cerebro.

## Si aplica, cargar

- [context/structure.md](context/structure.md) sección IDE
- `docs/00-howto/abrir-en-el-ide.md`
- Landing EN/ES: `docs/00-howto/i18n.md` (no un segundo cerebro)
