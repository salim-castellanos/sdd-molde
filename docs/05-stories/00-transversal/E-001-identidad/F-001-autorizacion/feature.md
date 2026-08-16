---
id: F-001
epic: E-001
needs: []
---

# Feature F-001 — Autorización RBAC

Las acciones sensibles se deciden en el servidor con `users → roles → permissions`.

## HUs

- [HU-001](HU-001-roles-permisos.md) — modelo, seeds, 403, asignar rol

## Diseño / arch al componer

- Arch: `docs/03-architecture/06-autenticacion-autorizacion.md` + `08-contenedores.md`
- Diseño: fila `/app/users`
