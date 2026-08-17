# Steering — lecciones de ejecución

## Qué es

Un **inbox** de dolores reales al correr el loop (puertos, Compose huérfano, tests verdes sin URL, ESM, cluster). No es `GAPS.md` (eso es “el molde no tenía el concepto”). Aquí el método existía y **la ejecución quemó contexto**.

La tabla vive en `docs/00-howto/lecciones.md`. No se copia a `AGENTS.md`. Las reglas que deben repetirse se **promueven** a gate, loop o card en el mismo turno (`promoted`). El inbox no se relee entero: solo filas `inbox` y el corte que acaba de doler.

## Cuándo cargarlo

Cerrar un runbook (G5). G4 falló por ambiente. “No abre localhost”. Puerto ocupado. “Ejecuta el runbook” y el runtime no es el del corte. El usuario pide lecciones / postmortem.

## Cuándo no

Redactar una HU. Elegir copy. Un typo.

## Cómo se llena

1. ¿El síntoma ya está en la tabla (misma causa)? No dupliques.
2. Si no: **una** fila (síntoma + regla de una línea).
3. Si volverá a pasar: parche a G4 / loop / card / README **ahora** → `promoted`.
4. Si es solo de esta instancia: `example/LECCIONES.md` y status `instance`.

## Si aplica, cargar

- [docs/00-howto/lecciones.md](../00-howto/lecciones.md) — tabla del molde
- En `example/`: [example/LECCIONES.md](../../example/LECCIONES.md)
- G5: `docs/02-gates/quality-gates.md`
