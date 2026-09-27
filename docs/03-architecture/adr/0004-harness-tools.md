# ADR 0004 — El runtime se opera con herramientas, no con comandos improvisados

- Estado: accepted
- Fecha: 2026-09-26

## Contexto

G4 y `LECCIONES.md` ya dicen qué comprobar (un Compose nombrado, Vite en el host, imagen reconstruida, semilla). El agente igual reescribe `docker compose` y `npm run dev` en cada turno y vuelve a chocar el puerto.

El estado del arte para que un modelo **invoque** una capacidad es MCP (spec 2025-06-18): `inputSchema`, `outputSchema` y `structuredContent`. El esquema JSON no prueba que el puerto sea el del corte.

## Decisión

- El contrato del harness vive en `docs/00-howto/harness.md`. No en `AGENTS.md` ni en `.cursor/`.
- Cada herramienta devuelve el mismo sobre (`harness.result/v1`): datos, chequeos de esquema y chequeos semánticos.
- La instancia aporta un perfil (`harness.profile.json`). El molde no hardcodea Mistratos.
- El ejecutable (CLI y, después, servidor MCP) es un adaptador de ese contrato. `.cursor/mcp.json`, si existe, es un puntero.

## Consecuencias

- Hasta que el ejecutable exista, el agente lee el contrato y no inventa otra forma de arrancar.
- Un `docker compose up` a mano no cierra G4 cuando la herramienta ya está.
