# Monorepo vs git submodules

## Decisión actual

Un solo repositorio. `apps/api`, `apps/web`, `apps/mobile` y `apps/infra` son carpetas hermanas. Es el modo más simple para un agente y para una persona que clona e itera.

## Por qué no submodules desde el día 0

- Un clone deja de ser `git clone` y pasa a ser `clone --recurse-submodules` + pins + PRs cruzados.
- HUs, runbooks y specs viven arriba, en `docs/`. Si cada app es otro repo, el agente pierde el “qué” o hay que duplicarlo.
- El ejemplo de identidad toca API + web + (luego) mobile. En monorepo ese cambio es un commit.

## Cuándo extraer

Extrae una app a repo propio cuando se cumpla **más de una**:

- Otro equipo la entrega con ciclo y permisos distintos.
- Quieres versionarla y publicarla por separado.
- El clone del monorepo se volvió lento de verdad (no “por si acaso”).

## Cómo extraer (cuando toque)

1. Crea el repo destino vacío.
2. Mueve el historial de esa carpeta (`git subtree split` o filtro equivalente).
3. En este workspace, reemplaza la carpeta por un submodule:

```text
apps/api   →  git submodule que apunta al repo de API
```

4. Deja un `apps/README.md` actualizado y un `AGENTS.md` en el repo hijo.
5. Las specs **no se mudan**. Siguen en este workspace. El repo hijo implementa; este repo gobierna.

## Contrato

`docs/` es el cerebro. `apps/` son brazos. Aunque un brazo viva en otro git, el cerebro no se fragmenta.
