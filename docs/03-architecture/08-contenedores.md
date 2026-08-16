# Contenedores (C4 L2)

**Estado:** Clave relleno.

```text
[Visitante / Usuario / Admin]
        │
        ▼
   [apps/web]  ──HTTP──►  [apps/api]  ──SQL──►  [PostgreSQL]
                              │
                              └──mail──►  [Mail catcher]
```

| Contenedor | Responsabilidad | No hace |
| --- | --- | --- |
| web | Flujos de UI, cookie de browser | Autorizar |
| api | Authn, authz, identidad | Renderizar páginas |
| postgres | Users, roles, permissions, tokens de reset | Lógica de producto |
| mail | Capturar / entregar reset | Identidad |

Mobile no está en el runbook `001-identidad`. Infra local = Compose.

## Modelo de autorización (dato)

```text
users ─┬─ role_id ─► roles ─┬─ role_permissions ─► permissions
       └─ email, password_hash
```

## Límites

- Un bounded context en este corte: identidad.
- Sin bus, CDN ni WAF. HTTPS = corte de infra posterior.

[RELLENAR: contenedores extra de tu producto.]
