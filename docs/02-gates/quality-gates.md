# Quality gates

Se marcan en el runbook (paso) y en la spec (`status`). No se inventan gates extra.

## G0 — Runbook ready

Antes de componer la primera spec del corte.

- [ ] Hay HUs en `docs/05-backlog/` con aceptación.
- [ ] Hay diagrama de secuencia o equivalente (dependencias).
- [ ] Cada HU del corte tiene pasos `compose` + `implement` en el runbook.
- [ ] El paso 1 `analyze` está `done`.

## G1 — Spec ready (spec **compuesta**)

Antes de escribir `plan.md`.

- [ ] Sección **Insumos** lista HU + diseño + arch + steerings + gates (rutas concretas).
- [ ] Cubre el flujo completo: datos/BD, api, pantalla, validación, mensajes, authn/authz y **pruebas por capa** (unitaria, integración, e2e HTTP, e2e Playwright si hay UI) o “no aplica” en cada una.
- [ ] La spec no inventa comportamiento que no esté en la HU o en un insumo. Si la HU nombra una política/tope **sin cifra**, la cifra queda en la HU o en un insumo **en este compose**.
- [ ] Lo que esté en `PARKING.md` (instancia) o en la lista “fuera” del runbook no aparece en **In scope**. Se anota ahí; no se implementa en este corte.
- [ ] In/out of scope está escrito.
- [ ] No hay decisiones de librerías (eso es plan).
- [ ] Un humano diría “sí, eso es lo que quiero”.

**Status spec:** `spec-ready`

## G2 — Plan ready

- [ ] El plan cita la spec compuesta, no la HU cruda.
- [ ] Si hace falta stack, se cargó la card `tech` (no se adivinó).
- [ ] Lista archivos/módulos y riesgos.
- [ ] Si hay API, hay contrato.

**Status spec:** `plan-ready`

## G3 — Task ready

- [ ] Tasks ordenadas; cimientos primero.
- [ ] Cada task dice cómo se verifica (`verificar:` + capa + criterio de la spec).
- [ ] Nada fuera de la spec.

**Status spec:** `task-ready`  
**Runbook:** el paso `compose` pasa a `done`; el `implement` deja de estar `blocked`.  
**STATUS.md:** HU de este paso → `in-spec` (50). Reescribe el rollup.

## G4 — Done

- [ ] Tasks del corte `[x]`.
- [ ] Pasan las pruebas que la spec nombró (unitaria, integración/humo, e2e). Curl o el chat no cuentan.
- [ ] Verificación: cada fila de **Pruebas** tiene el test que nombra. El assert sale del AC y de **Qué se invoca**. **Qué falla si se rompe** es el síntoma, no el valor esperado.
- [ ] Runtime del corte: **un** Compose para lo que corre en Docker (`docker compose ls` / `docker ps`); los puertos del corte no los tiene otro proyecto.
- [ ] Si la URL del corte es Vite (u otro dev server) **en el host**, ese puerto **está escuchando**. Un api Compose healthy **no** prueba que `/` abre.
- [ ] Si el humano habla con una **imagen** Compose del api: esa imagen es el código de este implement (`up -d --build` del servicio tocado). Un e2e contra otro puerto de test no cierra G4 solo.
- [ ] `STATUS.md` (o README) tiene la **URL del corte** y esa URL abre. Tests verdes no bastan.
- [ ] Si el corte deja un libro que el humano puede clicar: semilla local corrida contra el runtime del corte, escenarios del corte **añadidos**, credenciales en **Probar:** (no un demo en la imagen).
- [ ] Sin secretos nuevos.
- [ ] Sin rutas fuera de `docs/04-design/`.

**Status spec:** `implemented`  
**Runbook:** paso `implement` → `done`; el runbook pasa a `ai-tested`. No a `closed`.  
**STATUS.md:** HU → `done` (100). Reescribe el rollup. En **Probado por la IA** entra este corte. No entra en **Aceptado por el humano**.

## G5 — No drift (cierre de runbook)

- [ ] Cada HU del corte tiene spec y la spec describe el código.
- [ ] Si la forma del sistema cambió, hay ADR.
- [ ] `context/` sigue siendo verdad.
- [ ] `STATUS.md` coincide con runbooks + specs.
- [ ] Card `lecciones`: fila nueva si el corte dolió en ejecución, o explícito “ninguna nueva”. Si la regla debe repetirse, se **promueve** a gate/loop/card en el mismo turno.
- [ ] No se reejecuta el **Probar** histórico de un runbook anterior. El **Probar** vigente es el de `STATUS.md`.
- [ ] El humano dijo, en este trabajo, que usó el corte y le cuadra. Una prueba del agente (browser, api, tests) no cumple esta fila.

**Status runbook:** `closed` solo con esa frase del humano. Si solo lo probó el agente, se queda en `ai-tested`.

## Estados de una spec

`draft` → `spec-ready` → `plan-ready` → `task-ready` → `implemented` → `closed`

Dos specs `implemented` de la misma HU: la nueva lleva `supersedes` (id de la anterior) y la anterior `superseded-by` (id de la nueva). La vigente es la que no tiene `superseded-by`. Las dos siguen en `implemented`.

## Estados de un runbook

`in-progress` — se está componiendo o implementando. Es lo que falta por desarrollar.  
`ai-tested` — el desarrollo terminó y el agente lo probó (tests, api o browser). El humano no lo ha dado por bueno. No bloquea el siguiente corte.  
`closed` — el humano lo usó y lo aceptó. El agente no pone `closed` porque él mismo lo haya clicado.

`awaiting-human` no se usa: decía “espera” y se leía como trabajo sin hacer.

## Qué falta

Si preguntan “qué falta por implementar”, la respuesta son solo los `in-progress` y las HUs sin spec. Los `ai-tested` se listan aparte: terminados y probados por la IA, sin visto humano. Los `closed` no faltan.

## Índice

`node docs/02-gates/check-index.mjs` en la raíz del molde. Sobre la instancia: `node docs/02-gates/check-index.mjs example`. Falla si hay dos archivos con el mismo `id` de HU, o dos specs `implemented` de la misma HU sin el par `supersedes` / `superseded-by`.
