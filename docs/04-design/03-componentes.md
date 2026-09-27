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
| Icono de marca | [RELLENAR] | OAuth si la HU lo pide | Glifo del proveedor (Tabler brands / Simple Icons), 20px. El **botón** es el secundario del producto. El glifo **puede** llevar el color de esa marca. Don't: Lucide; don't: pintar el botón entero de Meta/Google. |

[RELLENAR: añade Button secundario, Select, etc. cuando una HU lo pida.]

Cada componente nuevo = fila + (si es visualmente rico) un do/don't de una línea.

## Cursor

Lo que se puede pulsar se ve pulsable. `a` con href, `button` habilitado, `select`, `summary` y `[role=button]` usan `cursor: pointer`. Deshabilitado: `cursor: not-allowed`. No hace falta repetirlo en cada componente: una regla global. Tailwind deja el `button` en `cursor: default`; esa regla global va **después** y gana.

**WidgetCard / KPI:** vacío = cero. Don't: COP (u otro monto largo) a tamaño KPI en tile estrecho — ver patrón *Cifras*.
