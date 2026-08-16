# Steering — carga (qué abrir ahora)

## Problema

Cargar todas las HUs, todas las specs y todos los steerings pudre el contexto. Hay que elegir.

## Cuándo cargarlo

Al empezar un turno, al cambiar de paso del runbook, o cuando no sepas qué archivos abrir.

## Estrategia

1. `AGENTS.md` + este catálogo (`catalog.md`) + constitución si vas a cruzar fase.
2. Runbook **activo** (`docs/07-runbooks/` — el que no está `closed`). Lee solo ese.
3. Del runbook, el **paso corriente**: su HU, su spec, su tipo (`analyze` / `compose` / `implement`).
4. Cards del catálogo cuyo trigger coincide con ese paso. No el resto.
5. Si la card manda a un catálogo (03/04/05), abre **ese** `catalog.md` y luego **un** destino. No el folder.
6. Specs: **solo** la del paso. Una spec `closed` se abre si la HU actual `needs` esa capacidad (ejemplo: crear carro necesita la spec ya hecha de paleta).

## No cargar

- Specs `draft` de otro runbook.
- Todas las filas de `screens.md` si el paso es una sola ruta.
- `context/tech.md` para redactar una HU.

## Si el runbook no existe

No abras specs. Crea o retoma un runbook (`runbook.md`).
