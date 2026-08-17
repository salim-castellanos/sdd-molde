# Abrir en el IDE

Cualquier IDE agentico que lea `AGENTS.md` (Cursor, Kiro, VS Code + Copilot, Claude Code, Codex, …). El cerebro no cambia con la herramienta.

## Agente

1. Lee el `AGENTS.md` de la raíz.
2. Sigue `docs/01-steering/catalog.md` y `docs/00-howto/sdd-loop.md`.
3. Los `AGENTS.md` anidados aplican al árbol donde estás.

Si tu herramienta pide otro archivo (`CLAUDE.md`, `.kiro/steering/`, …): **una línea** *“Lee /AGENTS.md”*. No copies el loop.

## Editor (familia VS Code: Cursor, Kiro, VS Code)

Opcional, no es el contrato del agente.

1. Abre `solucion-sdd.code-workspace` o la carpeta raíz.
2. Extensiones recomendadas: Mermaid (diagramas del runbook).
3. Título de ventana y README al arrancar salen de `.vscode/`.

## Comprobación

Un agente que **solo** conozca `AGENTS.md` (sin `.cursor/`, sin `.kiro/`):

- [ ] No codea desde una HU.
- [ ] Encuentra el catálogo y el runbook activo.
- [ ] En `docs/05-backlog/` lee el `AGENTS.md` local y no implementa.
- [ ] Entiende que `docs/06-specs/` vacío es correcto.

Si eso falla, el contrato no está en `AGENTS.md` — está escondido en un vendor. Muévelo.
