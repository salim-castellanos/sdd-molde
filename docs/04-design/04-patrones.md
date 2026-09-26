# Patrones

Combinaciones de componentes. Card `formularios` apunta aquí.

## Formulario (auth y cualquier POST)

1. Label + input + hint opcional.
2. Error de campo **bajo** el input.
3. Error de servidor **arriba**.
4. Submit: una primaria; `submitting` → disabled.
5. Success = navegación o mensaje neutro (forgot).

Estados: `idle` | `submitting` | `field-error` | `server-error` | `success`.

**Copy del trato:** los labels dicen qué es para quien usa el producto, no el nombre del campo. Hint: un ejemplo en ese idioma. Primaria: el resultado (*Calcular…*), no *Enviar*.

Campos **opcionales:** vacío se **omite** del POST. El default lo pone el api (no un placeholder que finja valor enviado).

## Auth layout

Dos modos. Elige **uno** y déjalo escrito. “Sin aside” solo aplica al primero.

1. **Arquetipo / sin puerta de marca** (Clave v0): una columna, heading, form, un párrafo de ayuda, links secundarios. Lienzo, `--auth-max`. Sin aside.
2. **Hay puerta pública con atmósfera:** auth es **continuación**, no otro producto. Partido ≥ breakpoint (escena | form) o franja + form. Rutas `/login` y `/register`. No modal si Modal no está en el inventario.

[RELLENAR: 1 o 2. Si es 2: qué va a la izquierda (foto, color, una línea de producto).]

Promesas bajo el H1: **una frase por línea**. El H1 no repite el wordmark si el lockup ya está en la vista.

Si hay OAuth: divisor *o* + Button **secundario** + icono de marca (glifo del proveedor; el botón no se pinta de esa marca).

## Landing (si hay puerta `/`)

[RELLENAR: capítulos a viewport; **un trabajo por capítulo**. El preview se ve como el producto (no *Ejemplo*). Kit HTML primero (`kit/landing.html` o equivalente), luego `apps/web`.]

## Página protegida

Si no hay sesión → `/login`. Si hay sesión pero no permiso (`users.read`) → mensaje + link a `/app`, no un menú admin vacío.

**401** (`unauthenticated`: token ausente, inválido, expirado): el web **descarta** la sesión, va a `/login` y **no pinta** el cuerpo del api (*Token inválido o expirado*, *Token requerido*). Eso no es un FormError.

## Cifras (dinero, KPI)

Tipo KPI solo en **superficie ancha**. Don't: tiles de ancho fijo (~11rem) con montos de 8+ cifras a 1.75rem (el valor se sale). Do: un recuadro a ancho de columna, `clamp`, `tabular-nums`, celdas `min-width: 0` / `minmax(0,1fr)`, `overflow-wrap`. Un extracto / resumen pesa más que tres WidgetCard iguales.

## Vacío

[RELLENAR: “aún no hay usuarios” en `/app/users` si el listado puede estar vacío.]

## Confirmación destructiva

No aplica en E-001. [RELLENAR cuando haya delete.]
