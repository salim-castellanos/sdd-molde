# Componentes

Inventario. Si no está aquí, no se inventa un kit.

| Componente | ¿Existe en Clave? | Uso | Estados |
| --- | --- | --- | --- |
| Button (primario) | sí (intención) | submit | idle, submitting (disabled), |
| TextField | sí | email, password | default, error, disabled |
| InlineError | sí | bajo el campo | — |
| FormError | sí | arriba del form | — |
| Link | sí | login↔register, forgot | — |
| PageAuth (layout) | sí | columnas auth | — |
| DataTable | sí (admin users) | `/app/users` | [RELLENAR vacío] |
| Modal | no | — | no usar en auth |
| Toast | no | — | [RELLENAR] |
| IconButton | no | — | |

[RELLENAR: añade Button secundario, Select, etc. cuando una HU lo pida.]

Cada componente nuevo = fila + (si es visualmente rico) un do/don't de una línea.
