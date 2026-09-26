# Pruebas (método)

La spec nombra la batería. El `implement` la ejecuta. Curl o el chat no cierran G4.

## Capas (backend)

| Capa | Invoca | No es |
| --- | --- | --- |
| Unitaria | service / dominio, dependencias falsas | HTTP, Docker |
| Integración / humo | service + repository (o app sin `listen`) | UI, cluster |
| E2E de spec | HTTP del contrato; un caso por AC | “probar en el browser a mano” |

Una spec con UI **debe** listar además e2e de browser (Playwright u homólogo) que recorra el flujo. El e2e HTTP del api no sustituye la pantalla.

Una spec solo de api declara “no aplica” en Playwright.

## Dónde se indica

- Spec: sección **Pruebas** (template). El assert sale de **Qué se invoca** y del AC. **Qué falla si se rompe** es el síntoma.
- Tasks: `verificar:` cita capa + criterio.
- G1 / G3 / G4: `docs/02-gates/quality-gates.md`.
- Card: `docs/01-steering/pruebas.md`.

Instancia Express: `example/docs/03-architecture/09-pruebas.md`.

## Trampas (no re-diagnosticar)

- Tests de BD: el helper de env es el **primer** import (ESM carga `config` si importas el service antes). `config` no congela `DATABASE_URL` en el load: usa getter.
- `node --test` en paralelo + `sync({ force })` → `--test-concurrency=1`.
- Playwright: `toHaveText` / `toContainText`, no `toHaveTextContent` (eso es Testing Library / jest-dom).
- Playwright `webServer`: si no había Vite, el test lo arranca y **al terminar lo apaga**. Local: deja el dev server corriendo **antes** (`reuseExistingServer`) o relánzalo después. G4 pide la URL del humano, no la del worker de test.
- El browser del humano y la batería e2e deben pegarle al **mismo** runtime. Un api de test en otro puerto no prueba la imagen Compose del `:3001`.
- G4 no cierra si solo pasó `npm test`: hace falta la URL del corte **abierta** (Compose del api ≠ Vite del web).
- Tras G4, si el humano debe ver el libro: semilla **local** (HTTP al runtime del corte), no un `demo@` en la imagen. Amplía los escenarios del corte. Credenciales en `STATUS.md` **Probar:**. Instancia Mistratos: `example/apps/api` → `npm run seed`.
