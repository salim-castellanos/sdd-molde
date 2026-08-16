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

- Spec: sección **Pruebas** (template).
- Tasks: `verificar:` cita capa + criterio.
- G1 / G3 / G4: `docs/02-gates/quality-gates.md`.
- Card: `docs/01-steering/pruebas.md`.

Instancia Express: `example/docs/03-architecture/09-pruebas.md`.
