# Autenticación y autorización

**Estado:** Clave relleno. Cruza con HUs del módulo `00-transversal` / E-001.

## Autenticación (quién eres)

| Tema | Decisión Clave | [RELLENAR] |
| --- | --- | --- |
| Factor | Email + password | SSO / passkeys / MFA |
| Prueba de sesión | Cookie httpOnly, SameSite=Lax, Secure fuera de local | JWT en header para mobile (cuando exista spec) |
| Duración | 7 días o logout | |
| Password | ≥10, letra+dígito; Argon2id o bcrypt ≥12 | |
| Reset | Token 1 uso, TTL 1 h, hash en BD | Proveedor de mail real |
| Enumeración | Login y forgot: misma respuesta | |

## Autorización (qué puedes)

| Tema | Decisión Clave |
| --- | --- |
| Modelo | RBAC: `users → roles → permissions` en PostgreSQL |
| Dónde se decide | Solo el api. 403 si el permiso no está |
| UI | Oculta con `/me`; no es autoridad |
| Seeds | `user`, `admin`; primer admin por seed |
| Permisos v0 | `me.read`, `users.read`, `users.role.assign` |

## Flujo

```text
request → sesión válida? → permiso del endpoint en BD? → 401 / 403 / handler
```

## Relación con HUs

F-001 Autorización = HU-001. F-002 Autenticación = HU-002…004. F-003 Sesión = HU-005.

Si cambias este archivo, reabre el `compose` de esas HUs.
