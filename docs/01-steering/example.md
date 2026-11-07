# Steering — instancia (`ecosystem/`)

## Qué es

`ecosystem/` agrupa productos de un mismo ecosistema. Cada hijo es el mismo árbol que la raíz y **otro git**. El molde no lo versiona. El método no se copia: desde el hijo se apunta a `../../docs/`.

```text
molde (raíz)                         --método-->  ecosystem/<instancia>/
ecosystem/<instancia>/ (loop SDD)    --producto-->  arch, diseño, HUs, runbooks, specs, apps
GAPS.md de esa instancia             --mismo turno-->  parche en el molde
```

## Cuándo cargarlo

Trabajar en `ecosystem/<instancia>/`. “El molde no decía X”. Hueco al componer o al implementar.

## Cuándo no

Fork del producto en la raíz: `apps/` y `docs/` de la raíz. No copies un hijo de `ecosystem/`.

## Circuito de mejora (obligatorio)

1. Detectas un hueco al usar el molde desde una instancia.
2. Fila en el `GAPS.md` de **esa** instancia (`open`).
3. En el mismo cambio, si el arreglo es del molde: parcheas `docs/`, template o `AGENTS.md`. Status del gap → `applied`.
4. Si el arreglo es solo de la instancia: `open` o `wont` con una línea de por qué.
5. No parches solo la instancia dejando el molde mudo.

Dolores de runtime (puerto, URL, Compose): card `lecciones` del molde + `LECCIONES.md` de la instancia. GAPS es “faltaba un concepto”.

## Si aplica, cargar

- `ecosystem/<instancia>/README.md`
- `ecosystem/<instancia>/GAPS.md`
- `ecosystem/<instancia>/LECCIONES.md` si el dolor fue de ejecución
- `ecosystem/<instancia>/AGENTS.md`
- `docs/00-howto/example.md`
