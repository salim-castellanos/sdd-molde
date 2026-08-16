# Quality gates

Se marcan en el runbook (paso) y en la spec (`status`). No se inventan gates extra.

## G0 — Runbook ready

Antes de componer la primera spec del corte.

- [ ] Hay HUs en `docs/05-stories/` con aceptación.
- [ ] Hay diagrama de secuencia o equivalente (dependencias).
- [ ] Cada HU del corte tiene pasos `compose` + `implement` en el runbook.
- [ ] El paso 1 `analyze` está `done`.

## G1 — Spec ready (spec **compuesta**)

Antes de escribir `plan.md`.

- [ ] Sección **Insumos** lista HU + diseño + arch + steerings + gates (rutas concretas).
- [ ] Cubre el flujo completo: datos/BD, api, pantalla, validación, mensajes, authn/authz y **pruebas por capa** (unitaria, integración, e2e HTTP, e2e Playwright si hay UI) o “no aplica” en cada una.
- [ ] La spec no inventa comportamiento que no esté en la HU o en un insumo.
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
- [ ] Sin secretos nuevos.
- [ ] Sin rutas fuera de `docs/04-design/`.

**Status spec:** `implemented`  
**Runbook:** paso `implement` → `done`; `step` y `progress` actualizados.  
**STATUS.md:** HU → `done` (100). Reescribe el rollup.

## G5 — No drift (cierre de runbook)

- [ ] Cada HU del corte tiene spec y la spec describe el código.
- [ ] Si la forma del sistema cambió, hay ADR.
- [ ] `context/` sigue siendo verdad.
- [ ] `STATUS.md` coincide con runbooks + specs.

**Status runbook:** `closed`

## Estados de una spec

`draft` → `spec-ready` → `plan-ready` → `task-ready` → `implemented` → `closed`
