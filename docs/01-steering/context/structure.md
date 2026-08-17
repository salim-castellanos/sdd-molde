# Estructura

## Workspace

```text
/
├── AGENTS.md                      # único contrato de agente (cualquier tool)
├── STATUS.md                      # informe ejecutivo (derivado)
├── solucion-sdd.code-workspace    # nombre en el Explorer (opcional)
├── .vscode/                       # chrome de editor, no cerebro
├── .cursor/                       # punteros opcionales a AGENTS.md / docs/
├── docs/                          # conocimiento del molde
├── apps/                          # artefactos de tu fork (vacíos)
└── example/                       # mismo árbol que la raíz; producto aún vacío
```

No hay `.kiro/`. Kiro lee `AGENTS.md`. Card `ide`.

## Documentación (orden de lectura)

`00-howto` → `01-steering/catalog.md` (padre) → cards de steering → docs que la card apunta → HU → runbook → spec compuesta → `apps/`.

## Dónde nace el código (cuando se implemente)

### `apps/api`

```text
apps/api/
├── AGENTS.md
├── src/
│   ├── modules/auth/
│   ├── modules/identity/
│   ├── db/
│   └── http/
└── tests/
```

Un módulo = un bounded context chico. No “utils” globales para reglas de negocio.

### `apps/web`

```text
apps/web/
├── AGENTS.md
├── src/
│   ├── pages/            # rutas = pantallas de docs/04-design
│   ├── features/auth/
│   ├── shared/ui/
│   └── lib/api/
└── tests/
```

Una pantalla de diseño → una page. No crear rutas huérfanas.

`refs/` (si existe): clone de una plantilla de terceros. No es `apps/`. No se importa.

### `apps/mobile`

Hueco. No se escribe código hasta que un runbook y una spec lo pidan.

### `apps/infra`

Compose y, más adelante, lo mínimo de provisionamiento.

Una instancia (`example/`) puede definir otra partición y sufijos en `example/docs/01-steering/context/structure.md`. Eso no se copia a este archivo si el molde sigue siendo Fastify/TS.

## Nombres

| Cosa | Convención |
| --- | --- |
| Módulo / épica / feature / HU | `docs/05-backlog/NN-mod/E-NNN/F-NNN/HU-NNN-slug.md` |
| Catálogo arch / diseño / HUs | `docs/0N-*/catalog.md` |
| Spec (compuesta) | `docs/06-specs/NNN-slug/` |
| Runbook | `docs/07-runbooks/NNN-slug/runbook.md` |
| ADR | `docs/03-architecture/adr/0001-titulo.md` |
| Rutas HTTP | `/api/v1/...` kebab |
| Tablas | snake_plural (`users`, `role_permissions`) |
| Componentes React | PascalCase, un componente por archivo |

## Qué no crear

- Specs escritas “para ejecutar” sin HU + insumos.
- `shared/` en la raíz del monorepo hasta que dos apps lo necesiten de verdad.
- Carpetas `tmp`, `old`, `new2`.
