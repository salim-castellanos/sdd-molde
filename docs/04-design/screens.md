# Pantallas — identidad (HUs 001–005)

| Ruta | Actor | Propósito | Campos / acciones |
| --- | --- | --- | --- |
| `/login` | visitante | Entrar | email, password, submit, link a registro, link a forgot |
| `/register` | visitante | Crear cuenta | email, password, confirm, submit, link a login |
| `/forgot-password` | visitante | Pedir reset | email, submit, confirmación neutra |
| `/reset-password` | visitante con token | Nueva password | password, confirm, submit |
| `/app` | usuario | Home mínimo post-login | saludo, rol, logout |
| `/app/users` | admin | Listar usuarios y rol | tabla, cambiar rol (si tiene permiso) |

No hay más rutas en este corte. 404 para el resto.

## Estados de cada formulario

- idle
- submitting (botón disabled)
- error de campo
- error de servidor (mensaje genérico si es login/forgot)
- success + navegación
