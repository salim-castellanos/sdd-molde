# AGENTS.md — docs/

Estás en el conocimiento, no en el código. El informe ejecutivo del producto está en la raíz: `STATUS.md`.

| Carpeta | Qué es | No es |
| --- | --- | --- |
| `00-howto/` | Cómo usar la plantilla | Producto Clave |
| `01-steering/` | `catalog.md` (padre) + cards | Enciclopedia: el detalle está en `context/` o en 03/04 |
| `02-gates/` | Constitución y G0–G5 | Steering |
| `03-architecture/` | Catálogo + AF/NFR/estilos/IAM/config/C4/ADR | Spec de una HU |
| `04-design/` | Catálogo + principios/tokens/componentes/patrones | Código React |
| `05-stories/` | Catálogo; módulo → épica → feature → HU | Ejecutable |
| `06-specs/` | Specs **compuestas** | Punto de partida |
| `07-runbooks/` | Secuencia + estado + % | Una spec larga |
| `08-templates/` | Formato para copiar | Instancias |

La instancia (mismo árbol, producto propio) vive en `example/` (card `example`). El método no se copia allí.

Al agregar una carpeta de primer nivel aquí: README + fila en este archivo + `docs/README.md` + fila en `catalog.md` si el agente debe saber cuándo cargarla. No crees un steering de Kiro ni un rule de Cursor que no sea puntero.
