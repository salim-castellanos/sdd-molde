---
id: HU-003
feature: F-002
epic: E-001
module: 00-transversal
needs: [HU-001]
screen: /login
---

# HU-003 — Login y logout

Como usuario, quiero entrar y salir para usar el producto con mi cuenta.

**Aceptación**

- WHEN un usuario envía credenciales correctas, THE sistema SHALL abrir sesión y llevarlo a `/app`.
- IF las credenciales son incorrectas, THE sistema SHALL responder el mismo error genérico que si el email no existiera.
- WHEN un usuario autenticado cierra sesión, THE sistema SHALL invalidar la sesión y tratar las siguientes peticiones como anónimas.
- IF un visitante ya autenticado abre `/login`, THE web SHALL redirigir a `/app`.
- Login: 5 intentos / 15 min / IP+email → 429.
