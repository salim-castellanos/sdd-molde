# Steering — estado del proyecto

## Qué es

`STATUS.md` (raíz) es el informe ejecutivo. Una página: qué es el producto, funcionalidades, % por feature/épica/módulo, % de producto, % de entrega, siguiente paso.

Es un **rollup**. La verdad operativa sigue en el runbook y en el status de cada spec. Si discrepan, gana la evidencia (spec/runbook) y se reescribe `STATUS.md`.

## Cuándo cargarlo

“¿En qué vamos?”, “avance”, “informe ejecutivo”, “actualiza el estado”, al **crear** o **cerrar un paso** de runbook.

## Cuándo no

Para componer o implementar: el runbook activo. `STATUS.md` no sustituye el paso corriente.

## Cómo se actualiza

1. Lee `docs/05-stories/catalog.md` (mapa HU → feature → épica → módulo). No hace falta abrir cada HU.
2. Mira `docs/06-specs/` y el frontmatter `status` de cada spec que exista.
3. Lee frontmatter / tabla de `docs/07-runbooks/README.md` y el runbook que haya cambiado.
4. Aplica la fórmula de `STATUS.md` (0 / 50 / 100 por HU).
5. Reescribe `STATUS.md` (fecha, tablas, siguiente paso). Una línea en el README solo si el enlace o el resumen de una frase cambió — **no dupliques los %** en el README.

Mismo turno que el runbook. No “ya lo actualizo después”.

## Si aplica, cargar

- `STATUS.md`
- Catálogo de stories (mapa)
- Runbook(s) tocados
