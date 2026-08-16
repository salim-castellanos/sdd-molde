# Patrones

Combinaciones de componentes. Card `formularios` apunta aquí.

## Formulario (auth y cualquier POST)

1. Label + input + hint opcional.
2. Error de campo **bajo** el input.
3. Error de servidor **arriba**.
4. Submit: una primaria; `submitting` → disabled.
5. Success = navegación o mensaje neutro (forgot).

Estados: `idle` | `submitting` | `field-error` | `server-error` | `success`.

## Auth layout

Una columna, heading, form, un párrafo de ayuda, links secundarios. Sin aside.

## Página protegida

Si no hay sesión → `/login`. Si hay sesión pero no permiso (`users.read`) → mensaje + link a `/app`, no un menú admin vacío.

## Vacío

[RELLENAR: “aún no hay usuarios” en `/app/users` si el listado puede estar vacío.]

## Confirmación destructiva

No aplica en E-001. [RELLENAR cuando haya delete.]
