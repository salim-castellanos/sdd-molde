# Steering — runbook

## Qué es

El runbook es el **padre operativo** de un corte de trabajo. Define:

- qué HUs entran y en qué **secuencia** (dependencias de negocio)
- el diagrama (secuencia o equivalente) para no ejecutar al revés
- los pasos: entender → componer spec → ejecutar spec, en ese orden por cada HU
- el **estado**: paso actual, %, descripción, status de cada paso

No es una spec. No es un backlog plano. Es la orquestación.

Ejemplo: HU paleta + HU crear/editar/eliminar carro. El runbook pone primero paleta (componer + ejecutar) y después crear carro, porque en el medio del alta se abre la paleta.

## Cuándo cargarlo

Cualquier trabajo que no sea un typo. “Quiero hacer login”, “sigue con identidad”, “en qué vamos”.

## Cuándo no

Editar un steering o un ADR sin entregar producto.

## Cómo se crea

1. Lista las HUs del corte (`docs/05-stories/`).
2. Diagrama de secuencia: qué capacidad debe **existir** antes de cuál.
3. Por cada HU, dos pasos de runbook: `compose` y `implement` (más un `analyze` inicial).
4. Archivo: `docs/07-runbooks/NNN-slug/runbook.md` (template `docs/08-templates/runbook.md`).
5. Status inicial `in-progress`, `step: 1`, `progress: 0`.
6. Cada vez que un paso termina, se actualiza status, % y descripción. El % es pasos `done` / total.
7. En el **mismo turno**, card `status`: reescribe `STATUS.md`.

## Si aplica, cargar

- El runbook activo, no todos
- `docs/07-runbooks/README.md` si vas a crear uno
- `docs/08-templates/runbook.md`
- Tras un cambio: `STATUS.md` (card `status`)
