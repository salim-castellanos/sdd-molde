# Harness

El agente no reescribe Docker ni npm cuando la tarea es operar el proyecto. Llama una herramienta. La herramienta devuelve un sobre estructurado. El esquema dice la forma. Los chequeos semánticos dicen si **este** corte está de verdad en marcha.

El ejecutable del corte 2 es el CLI. No hay servidor MCP todavía. No se inventa otro `docker compose` en el chat.

```text
node tools/harness.mjs status --profile example/harness.profile.json
```

Desde `example/`: `node ../tools/harness.mjs status --profile harness.profile.json`. `up`, `down` y `web` usan el mismo `--profile`. `down` lleva `--project`. Stdout es el sobre. Exit 0 solo si `ok` es true.

## Estado del arte

| Pieza | Qué resuelve | Aquí |
| --- | --- | --- |
| [MCP](https://modelcontextprotocol.io/specification/draft/server/tools) (2025-06-18) | El modelo invoca herramientas con `inputSchema`. El resultado va en `structuredContent` y debe cumplir `outputSchema`. | Adaptador. No es el lugar del contrato. |
| Skill / `AGENTS.md` | Cuándo llamar. | Card `harness`. Una fila en `AGENTS.md`. |
| Checklist G4 | Qué tiene que ser verdad. | Sigue. La herramienta lo **mide**. |
| `LECCIONES.md` | El incidente ya ocurrió. | El perfil y los chequeos lo absorben. No se rediagnostica. |

MCP valida que el JSON tenga la forma anunciada. No sabe que el 3001 lo tiene otro proyecto Compose. Esa segunda validación es nuestra (`checks[].level = "semantic"`).

## Sobre (`harness.result/v1`)

Toda herramienta, éxito o fallo, devuelve este objeto. `outputSchema` del adaptador MCP es este sobre, no el payload suelto.

| Campo | Qué es |
| --- | --- |
| `ok` | `true` solo si el esquema cumple **y** ningún chequeo semántico falló. Un proceso con exit 0 y el puerto ajeno es `ok: false`. |
| `tool` | Nombre estable (`runtime.status`). |
| `schema` | Siempre `harness.result/v1`. |
| `data` | Payload de esa herramienta. Puede ser `{}` si falló antes de tener datos. |
| `checks` | Lista. Cada ítem: `id`, `level` (`schema` \| `semantic`), `ok`, `detail`. |
| `error` | `null` si `ok`. Si no: `code` estable y `message` de una línea. |
| `next` | La próxima llamada (`runtime.down --project example-local`). Vacío si no hay paso siguiente. No es una frase. |

`code` de error: `port_owned_by_other_project`, `forbidden_project_running`, `stack_down`, `web_not_listening`, `web_is_container`, `unknown_project`, `docker_unavailable`, `compose_mismatch`, `profile_invalid`, `stale_image`, `seed_missing`, `tool_not_implemented`, `not_a_git_repo`, `worktree_dirty`, `branch_mismatch`, `remote_not_origin`, `origin_login_required`, `origin_push_failed`.

`runtime.up` no incluye el chequeo del 5173. Puede volver `ok: true` con `next: runtime.web`. Quien afirma que la URL abre es `runtime.status`. `up` no pasa `--build` (eso es `runtime.rebuild`). `down` de un proyecto ajeno usa el compose que declara `docker compose ls`. No mata un proceso que no sea Compose.

Ejemplo (el 3001 no es el corte):

```json
{
  "ok": false,
  "tool": "runtime.status",
  "schema": "harness.result/v1",
  "data": {
    "composeProject": "example-local",
    "ports": { "3001": "example-local", "5173": "down", "5433": "mistratos" }
  },
  "checks": [
    { "id": "envelope", "level": "schema", "ok": true, "detail": "harness.result/v1" },
    { "id": "compose.project", "level": "semantic", "ok": false, "detail": "3001 pertenece a example-local, el perfil pide mistratos" }
  ],
  "error": {
    "code": "port_owned_by_other_project",
    "message": "El api del corte no es el proceso que escucha en 3001."
  },
  "next": "runtime.down --project example-local"
}
```

## Perfil de la instancia

El molde no nombra Mistratos. La instancia tiene `harness.profile.json` en su raíz: proyecto Compose, archivo, puertos, cwd del web, comando de semilla, proyectos que no se deben levantar al lado.

Chequeo de esquema del perfil: JSON válido y campos requeridos. Chequeo semántico: el archivo Compose existe, el puerto de Postgres del host no es 5432 si el perfil dice 5433, `CLUSTER` del servicio api es `0`.

## Herramientas

Orden de implementación. Las tres primeras son un solo corte: sin ellas el agente sigue improvisando.

| Herramienta | Cuándo la llama el agente | Semántica que no basta con el esquema |
| --- | --- | --- |
| `runtime.status` | Antes de decir que la URL abre, y antes de `up` | Un solo proyecto Compose del perfil. 3001 y 5433 son de ese proyecto. 5173 escucha en el host (Vite no es Compose). |
| `runtime.up` | Hay que levantar api y Postgres | No crea un segundo proyecto. No publica 5432. No arranca Vite. Es idempotente si el proyecto del perfil ya está sano. |
| `runtime.down` | Hay que bajar el corte, o liberar un puerto ajeno | Solo el proyecto nombrado en el argumento. No mata un Postgres del host que no es el del perfil. |
| `runtime.web` | Hace falta el browser en 5173, o Playwright lo mató | `npm run dev` en el cwd del perfil. Al volver, 5173 acepta conexión. |
| `runtime.rebuild` | Cambió el api y el humano habla con la imagen | Reconstruye solo el servicio `api` del proyecto del perfil. `status` después: la imagen no es anterior al árbol. |
| `runtime.seed` | El corte deja un libro que se puede clicar | Corre la semilla del perfil contra esa base. No mete un usuario demo en la imagen. `data` repite las cuentas que el perfil declara. |
| `index.check` | Se tocó una HU o una spec | Envuelve `node docs/02-gates/check-index.mjs`. `ok: false` si hay id duplicado o dos specs `implemented` sin `supersedes`. |
| `tests.run` | G4, la spec nombró una batería | Api con `--test-concurrency=1`. No declara el web verde si Playwright dejó 5173 muerto: el chequeo `web_not_listening` queda en `checks`. |
| `origin.push` | Hay que guardar el git de la instancia en Origin | Linux en la imagen `sdd-origin`. El disco del repo es la carpeta del perfil. La sesión vive en el volumen `origin-home-<id>`. No reemplaza un remoto que no sea `origin.cursor.com`. No publica la web. |

Fuera de este harness: login de Facebook, usura, auditoría, el módulo `reports`. Eso es producto (`PARKING.md` o una HU).

## Orquestación

```text
AGENTS.md (una fila) + card harness
        │
        ▼
 docs/00-howto/harness.md     contrato y esquemas
 harness.profile.json         números de esta instancia
        │
        ▼
 CLI  node tools/harness.mjs <tool>     mismo sobre por stdout
        │
        ▼
 MCP  .cursor/mcp.json → el CLI         el modelo hace tool-call
        structuredContent = el sobre
        outputSchema      = harness.result/v1
```

Reglas de llamada:

1. Operar el runtime empieza por `runtime.status`. Si `ok` es false, se ejecuta `next`. No se intenta otro `docker compose`.
2. `runtime.up` no sustituye a `runtime.web`. Api sano y 5173 muerto es el fallo que ya está en las lecciones.
3. G4 no se cierra con el texto del chat. Se cierra con `runtime.status` `ok: true` más la batería que la spec nombró (`tests.run`).
4. El adaptador MCP copia el sobre a `structuredContent` y el mismo JSON en un bloque `content` de texto, para clientes que aún no leen el campo estructurado.
5. Si `outputSchema` está declarado, un resultado `ok: true` que no cumple el esquema es un fallo del servidor (`isError`), no un éxito.

## Cortes

1. Contrato, card, perfil de Mistratos, ADR 0004.
2. **Hecho.** CLI `runtime.status`, `runtime.up`, `runtime.down`, `runtime.web`. Pruebas en `tools/harness.test.mjs` (sin Docker). MCP no está.
3. Servidor MCP delgado sobre el CLI. `.cursor/mcp.json` de una línea. Ahí el modelo deja de usar la shell para arrancar.
4. `runtime.rebuild`, `runtime.seed`, `index.check`, `tests.run`.
5. G4 nombra el resultado de `runtime.status`. Un curl no lo sustituye.

`origin.push` no espera a esos cortes. Publica el git. La página (`runtime.publish`) sigue sin herramienta.

## Origin

El CLI `origin` es de Linux. En Windows se corre dentro de la imagen `tools/origin/Dockerfile` (`sdd-origin:bookworm`), con la carpeta del perfil montada en `/src`. Un contenedor que se tira al salir no sirve para el login: la sesión queda en el volumen Docker `origin-home-<id>`.

```text
node tools/harness.mjs origin --profile example/harness.profile.json
```

El perfil declara `git.repo` y `git.branch`. La primera vez, si no hay sesión, `ok` es false, `error.code` es `origin_login_required` y `data.loginUrl` es el enlace que el humano abre. `next` vuelve a ser `origin.push`. Con sesión, crea el repo si no hay remoto y hace push de esa rama. Si el remoto ya apunta a otro host, no lo toca.

No se adelanta el corte 3 sin el 2: un MCP que no mide el puerto solo cambia el transporte del mismo error.
