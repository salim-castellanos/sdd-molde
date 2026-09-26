# AGENTS.md — runbooks

Orquestación. Un runbook activo: el paso corriente es `compose` o `implement`. `awaiting-human` no es la cola y no se cierra solo. Actualiza `step`, `progress` y *Estado actual* al cerrar un paso.

No implementes un paso `compose`. No compongas un paso `implement`.
