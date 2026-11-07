# El ecosistema

`ecosystem/` agrupa las instancias de un mismo ecosistema. No es un repositorio. Cada hijo es **un producto**: su propio git, su `STATUS.md`, sus HUs y su `apps/`. El molde no versiona esos hijos.

```text
ecosystem/
├── AGENTS.md
├── <instancia>/          # un git
└── <otra-instancia>/     # otro git
```

| | Molde (raíz) | Instancia (`ecosystem/<instancia>/`) |
| --- | --- | --- |
| Método | `docs/` | Punteros a `../../docs/` |
| Producto | `docs/` del molde / fork | `docs/` de la instancia |
| Código | `apps/` | `apps/` de la instancia |
| Estado | `STATUS.md` | `STATUS.md` de la instancia |
| Huecos del molde | — | `GAPS.md` de la instancia |

Un cambio toca una instancia. Si el hueco es del molde, el parche va a `docs/` en el mismo turno (card `example`).

No implementes producto en una instancia sin que quien itera lo pida.
