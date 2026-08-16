# Steering — example (instancia)

## Qué es

`example/` es el **mismo árbol** que la raíz y un **repo git aparte** (Mutuo). En el disco del molde vive en esa carpeta; no entra al git de la raíz. El método (howto, gates, templates, cards) no se copia: se apunta al molde (`../docs/`).

```text
molde (raíz)           --estructura y método-->  example/
example/ (loop SDD)    --producto: arch, diseño, HUs, runbooks, specs, apps-->
example/GAPS.md        --parche en el mismo turno-->  molde
```

## Cuándo cargarlo

Trabajar en `example/`. “El molde no decía X”. Hueco al componer o al implementar.

## Cuándo no

Fork de *tu* producto en la raíz: usas `apps/` y `docs/` de la raíz, no copies `example/`.

## Circuito de mejora (obligatorio)

1. Detectas un hueco al usar el molde desde `example/`.
2. Fila en `example/GAPS.md` (`open`).
3. **En el mismo cambio**, si el arreglo es del molde: parcheas `docs/`, template o `AGENTS.md`. Status del gap → `applied`.
4. Si el arreglo es solo de la instancia: `open` o `wont` con una línea de por qué.
5. No parches solo `example/` dejando el molde mudo.

## Si aplica, cargar

- `example/README.md`
- `example/GAPS.md`
- `example/AGENTS.md`
- `docs/00-howto/example.md`
