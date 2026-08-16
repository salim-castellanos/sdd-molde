# Atributos no funcionales

Modelo: ISO/IEC 25010:2023 (checklist). Cada fila debe ser **medible** o explícitamente fuera de alcance. No dejes “que sea seguro” sin escenario.

**Estado:** Clave v0 — relleno lo que importa; el resto es fuera de alcance a propósito.

| Característica | ¿Aplica v0? | Objetivo medible (Clave) | Cómo se prueba | ADR / nota |
| --- | --- | --- | --- | --- |
| Functional suitability | sí | Las HUs E-001 cubren AF-01…05 | G4 de cada spec | — |
| Performance efficiency | mínimo | Login p95 &lt; 500 ms en local, 1 usuario | test de aceptación, no load farm | [RELLENAR prod] |
| Compatibility | no | — | — | Un browser moderno. [RELLENAR] |
| Interaction capability | sí | Auth usable en una columna, errores de campo | pantallas + ui-notes | ver diseño |
| Reliability | mínimo | Seeds idempotentes; reset token 1 uso | tests HU 001 y 004 | — |
| Security | sí | Cookie httpOnly; 403 en API; no enumerar email en login; hash password | tests + review G4 | [06-iam](06-autenticacion-autorizacion.md) |
| Maintainability | sí | Un lenguaje (TS); un módulo = un contexto | review structure | [04-be](04-estilo-backend.md) |
| Flexibility | no | — | — | No multi-cloud. [RELLENAR] |
| Safety | no | — | — | No hay daño físico. |

## Escenarios (ATAM lite)

Usa: *fuente, estímulo, artefacto, respuesta, medida*.

1. **Seguridad / 403.** Fuente: cliente con sesión `user`. Estímulo: `GET /users`. Artefacto: api. Respuesta: 403. Medida: siempre, no solo en UI.
2. **Seguridad / enumeración.** Fuente: atacante. Estímulo: login con email inexistente vs password mala. Respuesta: mismo mensaje. Medida: textos idénticos.
3. [RELLENAR: un escenario de tu NFR #1]

## Prioridad Clave v0

`Security` > `Functional suitability` > `Maintainability` > el resto.
