---
id: E-001
module: 00-transversal
---

# Épica E-001 — Identidad usable

Un visitante puede tener cuenta, entrar, recuperar acceso y ver un espacio según permisos **reales** (BD), no flags de UI.

## Por qué es transversal

Registro, login y cada pantalla de negocio futura preguntan “¿quién es y qué puede?”. No pertenece a un módulo de catálogo o ventas.

## Features

| Feature | Outcome |
| --- | --- |
| [F-001 Autorización](F-001-autorizacion/feature.md) | RBAC en BD; 403 en API |
| [F-002 Autenticación](F-002-autenticacion/feature.md) | Registro, sesión, reset |
| [F-003 Sesión](F-003-sesion/feature.md) | `/me` y home |

## Fuera de la épica

SSO, MFA, mobile, multi-tenant.

## Runbook

`docs/07-runbooks/001-identidad/` — F-001 se entrega antes (dependencia tipo paleta).
