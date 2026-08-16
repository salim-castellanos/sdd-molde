# Contexto (C4 L1)

**Estado:** ejemplo Clave relleno. Fork: reescribe o `[RELLENAR]`.

## Propósito

Clave da identidad mínima (cuenta, sesión, reset, permisos en BD) a un equipo pequeño. No es un IdP de mercado.

## Actores

| Actor | Relación con el sistema |
| --- | --- |
| Visitante | Registro, login, forgot |
| Usuario | Sesión, `/app` |
| Admin | Asigna roles |
| Mail catcher | Recibe el enlace de reset (local) |

[RELLENAR: actores de tu producto; quita los de Clave si no aplican]

## Sistemas vecinos

Ninguno en v0. No hay IdP externo, pasarela de pago ni CRM.

[RELLENAR: sistemas con los que hablas]

## Fuera de frontera

Mobile, SSO, multi-tenant, nube de producción.

## Diagrama

```text
[Visitante / Usuario / Admin] → [Clave] → [PostgreSQL]
                                    └────→ [Mail]
```
