# Estilo — backend

**Estado:** Clave relleno.

## Decisión

**Monolito modular** en `apps/api`: módulos `auth` e `identity`, HTTP (Fastify) en el borde, persistencia (Drizzle + PostgreSQL) detrás. No microservicios. No hexágono completo (puertos/adaptadores para todo) hasta que haya un segundo adaptador real.

## Capas (por módulo)

```text
http (rutas, Zod) → application (casos de uso) → db (schema, queries)
```

La autorización se resuelve en el borde HTTP con datos de BD, no en un `utils/acl` suelto.

## Qué no es

- Nest “porque sí”, BFF aparte, cola, CQRS.
- `User.isAdmin` como única fuente.

## Cuándo cambiar

Segundo consumidor del mismo caso de uso (p. ej. CLI + HTTP) → extraer puerto. Segundo equipo dueño de un módulo → valorar extraer app (submodule), no un mesh.

[RELLENAR: si tu API no es Fastify / no es modular monolito, reescribe esta página y un ADR.]
