# Apps

Artefactos generados. Hoy son huecos: el runbook `001-identidad` está en componer specs, no en código.

| Carpeta | Artefacto | ¿Submodule algún día? |
| --- | --- | --- |
| [api](api/) | Backend HTTP + BD | sí |
| [web](web/) | Frontend web | sí |
| [mobile](mobile/) | Cliente móvil | sí |
| [infra](infra/) | Compose / provisionamiento | sí |

`docs/` no se extrae. Ver [../docs/00-howto/monorepo-vs-submodules.md](../docs/00-howto/monorepo-vs-submodules.md).

Cuando una app exista de verdad, su `AGENTS.md` local gana sobre el de la raíz en caso de conflicto específico de stack.
