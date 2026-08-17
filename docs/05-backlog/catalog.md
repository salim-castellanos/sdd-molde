# Catálogo — backlog

Padre de `docs/05-backlog/`. Jerarquía **módulo → épica → feature → HU**.

No cargues todas las HUs. Abre el catálogo, luego **una** HU (y su feature/épica solo si estás partiendo o trazando).

## Módulos

| Módulo | Para qué | Qué va aquí |
| --- | --- | --- |
| [00-transversal](00-transversal/) | Cruza todo el producto | Identidad, authn/authz, auditoría… |
| [RELLENAR 01-…] | Un bounded context de negocio | Ej. catálogo, pedidos — **no** crear la carpeta vacía hasta la primera épica |

Auth no es un módulo de negocio. Es **transversal**.

## Mapa Clave (E-001)

```text
00-transversal /
  E-001-identidad /          épica
    epic.md
    F-001-autorizacion /     feature (la “paleta”)
      feature.md
      HU-001-roles-permisos.md
    F-002-autenticacion /
      feature.md
      HU-002-registro.md
      HU-003-login.md
      HU-004-reset-password.md
    F-003-sesion /
      feature.md
      HU-005-sesion.md
```

| ID | Tipo | Título | Padre | needs |
| --- | --- | --- | --- | --- |
| E-001 | épica | Identidad usable | 00-transversal | — |
| F-001 | feature | Autorización RBAC | E-001 | — |
| HU-001 | HU | Roles y permisos | F-001 | — |
| F-002 | feature | Autenticación | E-001 | F-001 |
| HU-002 | HU | Registro | F-002 | HU-001 |
| HU-003 | HU | Login / logout | F-002 | HU-001 |
| HU-004 | HU | Reset password | F-002 | HU-001 |
| F-003 | feature | Sesión visible | E-001 | F-001, F-002 |
| HU-005 | HU | Ver quién soy | F-003 | HU-001, HU-003 |

El **runbook** ordena la ejecución. Este catálogo ordena el **significado**. Los % viven en [`STATUS.md`](../../STATUS.md), no aquí.

## Cómo se crea (fork)

1. ¿Módulo de negocio o transversal? Carpeta `NN-slug/` + fila aquí.
2. Épica: `E-NNN-slug/epic.md` (template `docs/08-templates/epic.md`).
3. Feature: `F-NNN-slug/feature.md`.
4. HU: un archivo, EARS, `needs`, `screen`. Template `story.md`.
5. No cuelgues una HU suelta en la raíz de `05-backlog/`.
