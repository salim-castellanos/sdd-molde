# Orquesta

Una **persona** recorre el corte. El agente que abre el chat es el **orquestador**: mira el paso y llama a un rol. Los roles no se hablan entre sí. Dejan notas en la mesa del runbook.

No es BMAD. No hay packs, PRDs ni un agente por carpeta de vendor. El método sigue en `docs/`.

## Roles

| Rol | Paso | Hace | No hace |
| --- | --- | --- | --- |
| Orquestador | siempre | Lee **Siguiente**, elige el rol, le pasa la card del paso y la mesa. Al volver, mueve el paso y reescribe `STATUS.md` | No codea el corte. No cierra `closed` |
| Analizar | `analyze` | Lee la HU y los insumos. Escribe hallazgos en la mesa | No compone spec. No toca `apps/` |
| Componer | `compose` | Una spec desde la HU (diseño, arch, gates) | No implementa |
| Implementar | `implement` | Ejecuta la spec. Puede usar el harness para arrancar o rebuild | No inventa alcance. No cierra G4 a mano |
| Probar | cierre de `implement` | Corre la batería que la spec nombra. Comprueba URL y semilla | No edita producto salvo anotar el fallo en la mesa y devolverlo |

Quien compone no llama al harness. Quien prueba no reescribe el runbook: se lo devuelve al orquestador.

## Mesa

Archivo `docs/07-runbooks/NNN-slug/mesa.md`, al lado del runbook. Se copia de `docs/08-templates/mesa.md` al empezar `analyze`.

Cada nota:

- **Rol** que la escribe.
- **Hallazgo** (una frase).
- **Para** el rol siguiente o el orquestador.
- **Estado:** `abierto` o `cerrado`.

El rol que entra **lee la mesa antes** de trabajar. Al salir **agrega** lo que descubrió. El orquestador no avanza el paso si queda una nota `abierto` que bloquea.

Ejemplo: implementar anota que un aviso de éxito pegado al formulario no se ve. Probar anota que la batería HTTP borró el libro del humano. El orquestador no marca `implement` done hasta que eso esté cerrado o pasado a `GAPS.md` si el hueco es del molde.

## Sincronización

No hay canal de red ni buzón entre procesos. La mesa es el sitio. El orquestador es el único que cambia el frontmatter del runbook y `STATUS.md`.

Si la herramienta puede lanzar un subagente, el orquestador lo usa para un rol y le pide que lea y escriba esa mesa. Si no puede, el mismo hilo cambia de rol y deja la nota igual: la mesa no depende de la herramienta.
