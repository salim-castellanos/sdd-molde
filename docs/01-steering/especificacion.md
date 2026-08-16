# Steering — especificación

## Qué es

Una spec **no se escribe para ejecutar**. Se **compone**. Es el flujo **completo** de **una** funcionalidad: datos/objetos de BD → api → pantalla → batería (unitaria, integración, e2e HTTP y, si hay UI, e2e Playwright). No termina en el api. Card `pruebas`.

Insumos (ninguno se implementa solo):

```text
HU
 + sistema de diseño
 + arquitectura
 + steerings aplicables
 + gates
        ↓
     spec E2E
        ↓
  implementación + pruebas
```

El runbook tiene un paso “componer spec de HU-N” y después “ejecutar esa spec”.

## Cuándo cargarlo

El runbook está en un paso `compose`. O el usuario pregunta “cómo se arma una spec”.

## Cuándo no

El usuario acaba de dictar una idea: primero es HU, no spec. “Implementa login” sin runbook: primero runbook.

## Cómo se compone

1. Abre **una** HU.
2. Por el catálogo, abre solo las cards que el trabajo dispara (casi siempre `diseno` + `arquitectura`; `formularios` si hay form; `tech` si el contrato lo pide).
3. Carga solo los docs que esas cards listen.
4. Escribe `docs/06-specs/NNN-slug/spec.md` con sección **Insumos** (rutas concretas). Template: `docs/08-templates/spec.md`.
5. Plan y tasks salen de **esa** spec, no de la HU cruda.
6. Gate G1 sobre la spec compuesta.

## Si aplica, cargar

- La HU del paso del runbook
- Este archivo (ya lo estás leyendo)
- `docs/08-templates/spec.md`
- Los destinos de las cards disparadas — no `docs/06-specs/` entero
