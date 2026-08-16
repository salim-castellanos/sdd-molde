# Estilo — frontend

**Estado:** Clave relleno.

## Decisión

**SPA** (React + Vite + React Router). Sin SSR. Sin microfrontends. Una page por fila de `docs/04-design/screens.md`.

## Organización

```text
pages/  →  features/auth/  →  shared/ui  →  lib/api
```

El cliente **oculta** con `/me`. **No autoriza.**

## Estado de sesión

Cookie de sesión (httpOnly) la pone el api. El web no guarda el access token en `localStorage`.

## Qué no es

Next, OAuth buttons, design system publicado como paquete.

[RELLENAR: si tu UI es SSR, nativa o multi-app, reescribe y ADR.]
