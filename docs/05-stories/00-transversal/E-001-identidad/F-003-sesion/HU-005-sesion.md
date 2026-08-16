---
id: HU-005
feature: F-003
epic: E-001
module: 00-transversal
needs: [HU-001, HU-003]
screen: /app
---

# HU-005 — Sesión visible

Como usuario autenticado, quiero ver quién soy y qué rol tengo para saber qué puedo hacer.

**Aceptación**

- WHEN hay sesión, `GET /api/v1/me` SHALL devolver id, email, rol y lista de permisos.
- WHEN no hay sesión, THE mismo endpoint SHALL responder 401.
- THE home `/app` SHALL mostrar email, rol y logout.
