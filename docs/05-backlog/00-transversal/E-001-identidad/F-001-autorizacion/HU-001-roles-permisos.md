---
id: HU-001
feature: F-001
epic: E-001
module: 00-transversal
needs: []
screen: /app/users
---

# HU-001 — Roles y permisos desde BD

Como admin, quiero que las acciones sensibles dependan de permisos persistidos, no de un flag en el cliente.

**Aceptación**

- THE modelo SHALL ser `users → roles → permissions` en PostgreSQL.
- WHEN un usuario autenticado llama un endpoint protegido, THE api SHALL resolver permisos en BD.
- IF el usuario no tiene el permiso, THE api SHALL responder 403 aunque la UI haya mostrado el botón.
- WHEN un admin con `users.role.assign` cambia el rol de otro usuario, THE cambio SHALL aplicarse en la siguiente petición autorizada.
- THE seeds SHALL crear roles `user` y `admin` y el primer admin. Un registro público SHALL recibir `user`.
- THE sistema SHALL NO quedar sin ningún admin (rechazar quitar el último).

**Notas para componer**

- Pantalla: `/app/users`. Arch: catálogo `iam` + `c4`.
- Dependencia de HU-002…005. El runbook la ejecuta primero.
