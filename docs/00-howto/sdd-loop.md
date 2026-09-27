# Loop SDD

```text
AGENTS.md + catalog.md (padre)
              │
              ▼
     runbook activo (estado, %, paso)
              │
              ▼
        analyze  →  G0
              │
    ┌─────────┴─────────┐
    │  por cada HU      │
    │  compose spec     │  HU + diseño + arch + gates + cards
    │       G1–G3       │
    │  implement spec   │  G4
    └─────────┬─────────┘
              ▼
           close runbook  →  G5
              │
              ▼
         STATUS.md (rollup)
```

La HU es la **fuente del qué**. La spec es un **resultado** (se puede rehacer con otro modelo si la HU y los insumos siguen). El runbook solo ordena (paleta antes que crear carro).

## Roles

| Artefacto | Pregunta | No es |
| --- | --- | --- |
| HU | ¿Quién necesita qué y por qué? **Vive en `05-backlog`.** | Ejecutable / spec |
| Diseño / arch / gates / cards | Insumos al componer | La necesidad |
| Spec | ¿Qué es correcto **después** de unir la HU con esos insumos? | El backlog; no se guarda “en vez de” la HU |
| Runbook | ¿En qué orden y en qué paso vamos? | Una spec larga ni un dump de HUs |
| `STATUS.md` | ¿Cómo va el producto? (ejecutivo) | El paso a paso |
| Código | ¿Cómo quedó? | La fuente del “qué” |

## Cómo pedirlo

- “Sigue el runbook 001-identidad.”
- “Compón la spec del paso corriente.”
- “Crea un runbook para estas HUs: …”
- “¿Qué steering aplica a esta pregunta?”
- “Actualiza el estado del proyecto.” / “¿En qué vamos?”

## Qué no saltarse

**SPEC FIRST.** Cualquier modificación de comportamiento se escribe o se reabre en la spec **antes** de tocar `apps/`. Copy, labels, mensajes, 401, pantalla: también. De HU o del chat a PR es un defecto de proceso. Typo y lint que no cambian el “qué”: sí, directo.

## Procedimiento por fase

Cualquier agente (Cursor, Kiro, Copilot, Claude Code, …) sigue esto. El del chat es el orquestador (card `orquesta`): abre un rol y lee la mesa del corte antes de avanzar. No hay una copia por herramienta.

### Compose

Precondición: runbook en paso `compose`. Si no hay runbook, créalo.

1. Una HU (`needs`, `screen`) bajo su feature/épica/módulo.
2. Cards del catálogo de steering que el paso dispara; de arch/diseño, sus `catalog.md` y un archivo.
3. Solo los destinos de esas cards.
4. `docs/06-specs/NNN-slug/` desde `docs/08-templates/spec.md`.
5. Sección **Insumos** con rutas. G1. No implementes.
6. Plan y tasks. El runbook se actualiza al cerrar G3. Luego `STATUS.md`.

### Plan

Spec en `spec-ready`. Lee la spec, no la HU cruda (el compose ya unió). Si cambió el **qué**, primero la HU. Card `tech` solo si toca stack. G2.

### Tasks

`plan-ready`. Cimientos primero, “verificar:” en cada una. G3 → `compose` done; `implement` deja de estar `blocked`.

### Implement

Runbook en `implement` y spec `task-ready`. Si no, detente. Antes de mutar `apps/`: card `harness` si hay que levantar o mirar el runtime (no reescribas Docker). Si la instancia tiene `LECCIONES.md`, léelo. Del molde, solo las filas `inbox` de `docs/00-howto/lecciones.md` (las `promoted` ya están en G4). Si el humano pidió **ejecutar el runbook**, recorre desde el paso corriente hasta cerrar: pasa el frontmatter a `implement` **antes** de mutar `apps/` (npm install, Compose). Un runbook `ai-tested` no es ese paso: el desarrollo ya terminó.

Solo esas tasks. Escribe y corre la batería que la spec nombró (unit / integración / e2e). Curl no cierra G4. Antes de marcar `implement` done: `docker compose ls` + `docker ps` (un proyecto Compose del corte). Si el web no es servicio Compose, el puerto de la URL (Vite) tiene que estar **escuchando** — levántalo (`npm run dev` en `apps/web` o el de la instancia). Si cambiaste el api que el humano usa por imagen: rebuild de **ese** servicio. Playwright: si **él** arrancó el `webServer`, al terminar lo mata; deja otra vez la URL del humano arriba. Escribe la URL en `STATUS.md`. Si hay libro que clicar: **último paso** = semilla local (escenarios del corte) y credenciales en **Probar:**. Verificación antes de dar el paso por `done`: cada fila de **Pruebas** tiene su test; el assert es el AC y **Qué se invoca**; **Qué falla si se rompe** es el síntoma. Actualiza `step` y `progress`. Reescribe `STATUS.md`. Al terminar la verificación del agente, status `ai-tested`, no `closed`. `closed` solo si el humano dice que lo usó.

### Gate

Checklist `docs/02-gates/quality-gates.md`. Fallo = archivo + hueco. G2+ ambiguo: pregunta. G5 = drift HU / spec / código del corte. Cerrar runbook incluye `STATUS.md` y card `lecciones`.
