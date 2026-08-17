---
id: HU-004
feature: F-002
epic: E-001
module: 00-transversal
needs: [HU-001]
screen: [/forgot-password, /reset-password]
---

# HU-004 — Reset de contraseña

Como usuario que olvidó su password, quiero restablecerla con un enlace de un solo uso.

**Aceptación**

- WHEN alguien pide reset para un email, THE sistema SHALL responder éxito siempre.
- IF el email existe, THE sistema SHALL emitir un token de un solo uso con caducidad y enviarlo por mail.
- WHEN el token es válido, THE usuario SHALL poder definir una password nueva AND el token SHALL quedar inválido.
- IF el token expiró, se reutilizó o no existe, THE sistema SHALL rechazar el cambio.
- Forgot-password: 5 intentos / 15 min / IP+email → 429.
