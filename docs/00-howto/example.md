# La carpeta `example/`

Mismo árbol que la raíz, **otro git**. En este workspace vive en `example/`; el molde no lo commitea. Se llena recorriendo el loop. El método sigue en este `docs/`.

| | Molde (raíz) | Instancia (`example/`) |
| --- | --- | --- |
| Método (howto, gates, templates, cards de procedimiento) | `docs/` | Punteros a `../docs/` |
| Producto (arch, diseño, HUs, specs, runbooks, context) | `docs/` del molde / fork | `example/docs/` (se escribe aquí) |
| Código | `apps/` | `example/apps/` |
| Estado | `STATUS.md` | `example/STATUS.md` |
| Huecos del molde | — | `example/GAPS.md` |

No implementes producto en `example/` sin que quien itera lo pida (arquitectura → … → runbook → compose → implement).

## Devolver una mejora

Card `example`. Gap en `GAPS.md` + parche al molde en el mismo turno.

Dolores de **ejecución** (puertos, URL, Compose huérfano): card `lecciones`, no otra fila GAPS salvo que falte un concepto del molde.
