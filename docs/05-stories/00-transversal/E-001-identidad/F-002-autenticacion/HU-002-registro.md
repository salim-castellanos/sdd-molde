---
id: HU-002
feature: F-002
epic: E-001
module: 00-transversal
needs: [HU-001]
screen: /register
---

# HU-002 — Registro

Como visitante, quiero crear una cuenta con email y contraseña para entrar al producto sin un administrador.

**Aceptación**

- WHEN un visitante envía email válido y password que cumple la política, THE sistema SHALL crear el usuario con rol `user` y abrir sesión.
- IF el email ya existe, THE sistema SHALL rechazar el registro AND SHALL NOT revelar un hash ni datos de la cuenta existente más allá de `email_taken`.
- IF la password no cumple la política, THE sistema SHALL rechazar y listar las reglas fallidas.
- IF un visitante ya autenticado abre `/register`, THE web SHALL redirigir a `/app`.
