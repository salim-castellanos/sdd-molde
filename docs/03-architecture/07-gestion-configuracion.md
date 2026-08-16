# Gestión de la configuración

Inspirado en 12-factor: config fuera del código, secretos fuera de git.

**Estado:** Clave v0 (intención; `apps/` aún no existe).

| Pieza | Dónde | En git? |
| --- | --- | --- |
| Código y defaults no secretos | repo | sí |
| Variables de entorno | `.env` local, no commiteado | no |
| Contrato de variables | `.env.example` (nombres, sin valores reales) | sí |
| Compose (Postgres, mail) | `apps/infra` | sí (sin passwords de prod) |
| Feature flags | no en v0 | [RELLENAR] |
| Secretos de prod | [RELLENAR: vault / secret manager] | no |

## Variables previstas (nombres)

```text
DATABASE_URL=
SESSION_SECRET=
MAIL_FROM=
APP_WEB_ORIGIN=
NODE_ENV=
```

[RELLENAR: añade las tuyas cuando exista el plan de la spec que las introduzca.]

## Entornos

| Env | Quién | Notas |
| --- | --- | --- |
| local | Compose | Mail catcher |
| [RELLENAR staging] | | |
| [RELLENAR prod] | | HTTPS, Secure cookies |

## Qué no hacer

Commitear `.env`, secretos en `AGENTS.md`, un `config.json` con passwords.
