# Componentes

Inventario. Si no está aquí, no se inventa un kit.

| Componente | ¿Existe en Clave? | Uso | Estados |
| --- | --- | --- | --- |
| Button (primario) | sí (intención) | submit | idle, submitting (disabled), |
| TextField | sí | email, password | default, error, disabled |
| InlineError | sí | bajo el campo | — |
| FormError | sí | arriba del form | — |
| Link | sí | login↔register, forgot | — |
| PageAuth (layout) | sí | columnas auth | según `04-patrones` Auth: columna **o** split |
| DataTable | sí (admin users) | `/app/users` | [RELLENAR vacío] |
| Modal | no | — | no usar en auth |
| Toast | no | — | [RELLENAR] |
| IconButton | no | — | |
| Icono UI | [RELLENAR] | nav | Lucide o equivalente. **No** logos de marca. |
| Icono de marca | [RELLENAR] | OAuth si la HU lo pide | Tabler brands / Simple Icons. No Lucide. |

[RELLENAR: añade Button secundario, Select, etc. cuando una HU lo pida.]

Cada componente nuevo = fila + (si es visualmente rico) un do/don't de una línea.
