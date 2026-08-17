# Tech — stack del ejemplo

Al hacer fork, cambia este archivo y `structure.md` juntos. No dejes un stack “por si acaso”.

## Decisiones actuales

| Capa | Elección | Por qué |
| --- | --- | --- |
| Lenguaje | TypeScript (strict) | Un solo lenguaje en api + web |
| API | Node 22 + Fastify | Poco ceremonial, fácil de leer para un agente |
| Persistencia | PostgreSQL 16 + Drizzle ORM | Roles/permisos viven en SQL; Drizzle mantiene el esquema cerca del código |
| Auth | Sesión en cookie httpOnly + CSRF para web; JWT de acceso corto si un cliente no-browser lo necesita | La web es el primer cliente |
| Web | React 19 + Vite + React Router | SPA simple, sin SSR hasta que duela |
| Estilos | Tailwind CSS | Útil para bajar un diseño a markup sin inventar un design system |
| Validación | Zod (compartible api/web si hace falta) | Un schema, dos bordes |
| Tests API | node:test o Vitest + supertest | Capas: unit / integración / e2e. Card `pruebas` |
| Tests web | Vitest + Testing Library | Flujos, no snapshots masivos |
| Local | Docker Compose (Postgres + mail catcher) | Cero nube para el ejemplo |
| Paquetes | pnpm workspaces | Monorepo mínimo |

## Cosas prohibidas en el ejemplo

- ORMs que escondan el modelo de roles (`User.isAdmin = true` como única fuente).
- Secretos en el repo.
- Autenticación “solo en el frontend”.
- Añadir Redis, Kafka, Nest, Next, Prisma o un design system “por si crece”. Si una spec lo exige, se discute en un ADR primero.
- Clonar una plantilla admin (shadcn-admin, TailAdmin, MUI) **como** `apps/web`. Si se usa, va a `refs/` (gitignore), se teñe en el kit y se copia al producto. Licencia MIT: uso comercial con aviso de copyright. Clerk u otro IdP de la demo no se copian.

## Versiones

Se pinnean al scaffold de `apps/`. Hasta entonces, este archivo manda la intención.

## Contratos

El contrato **mínimo** es la tabla de endpoints en la spec. `docs/06-specs/NNN-slug/contracts/` (u OpenAPI) cuando hay más de un consumidor o el payload deja de caber en la tabla. El código no es el primer contrato.
