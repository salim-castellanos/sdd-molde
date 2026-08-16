# Catálogo — arquitectura

Padre de `docs/03-architecture/`. Ábrelo; **no** cargues el resto. Elige **un** archivo según el trigger.

Clave ya tiene un ejemplo relleno. Al hacer fork: deja la fila, cambia el contenido o marca `[RELLENAR]`.

| id | Archivo | Pregunta que responde | Trigger |
| --- | --- | --- | --- |
| ctx | [01-contexto.md](01-contexto.md) | ¿Qué sistema es, para quién, límites? | alcance, C4 contexto |
| af | [02-atributos-funcionales.md](02-atributos-funcionales.md) | ¿Qué capacidades debe poder el sistema? | “qué hace” a nivel sistema (no una HU) |
| nfr | [03-atributos-no-funcionales.md](03-atributos-no-funcionales.md) | ¿Qué calidad (ISO 25010) y con qué medida? | SLA, seguridad, “que sea rápido” |
| be | [04-estilo-backend.md](04-estilo-backend.md) | ¿Qué estilo de API? capas, hexágono, modular | módulos api, “dónde va la regla” |
| fe | [05-estilo-frontend.md](05-estilo-frontend.md) | ¿SPA, SSR, cómo se parte la UI? | apps/web, rutas, estado |
| iam | [06-autenticacion-autorizacion.md](06-autenticacion-autorizacion.md) | ¿Sesión, roles, quién decide 403? | login, permisos, `/me` |
| cfg | [07-gestion-configuracion.md](07-gestion-configuracion.md) | ¿Secretos, env, 12-factor? | `.env`, Compose, flags |
| c4 | [08-contenedores.md](08-contenedores.md) | ¿Qué procesos y qué no hacen? | C4 contenedores, mail, BD |
| adr | [adr/](adr/) | ¿Por qué se eligió X? | una decisión ya tomada — **un** ADR |

`system.md` es un alias de [08-contenedores.md](08-contenedores.md).

Al componer una spec: este catálogo + **solo** las filas que la HU mueve (casi siempre `iam` + `c4`).
