# Constitución

Principios siempre verdaderos. Si solo aplica a veces, no pertenece aquí.

## I. Runbook antes que spec, spec antes que código

WHEN se vaya a entregar comportamiento,
THE trabajo SHALL vivir en un runbook en `docs/07-runbooks/`
AND una spec SHALL existir solo como resultado de un paso `compose`
AND el código SHALL implementar esa spec, no la HU cruda ni el chat.
AND `STATUS.md` SHALL reescribirse en el mismo trabajo (rollup, no una verdad paralela).

## II. La HU es insumo, no ejecutable

WHERE hay una necesidad de usuario,
THE SHALL documentarse como HU bajo `docs/05-stories/<módulo>/E-…/F-…/HU-NNN-slug.md`.
THE spec SHALL componerse a partir de esa HU más diseño, arquitectura, gates y steerings aplicables.
THE plantilla SHALL NOT tratar la spec como el lugar donde “vive” la historia.

## III. Carga mínima

THE agente SHALL leer el catálogo de steering y el runbook activo.
THE agente SHALL NOT cargar todos los steerings, todas las HUs ni todas las specs.
IF una card no dispara, su documentación SHALL quedarse en disco.

## IV. Constitución gana a la conveniencia

IF una implementación es más rápida pero viola este archivo,
THEN no se hace. Se cambia la constitución en un commit explícito, o se cambia el enfoque.

## V. Simplicidad

THE diseño SHALL preferir menos piezas a más “por si acaso”.
IF una abstracción no tiene un segundo consumidor real,
THEN no se introduce.

## VI. Seguridad por defecto

THE secretos SHALL NO entrar al git.
THE autorización SHALL resolverse en el servidor con datos de BD.
THE frontend MAY ocultar acciones; SHALL NOT ser la autoridad.

## VII. Aceptación comprobable

WHERE una historia tenga criterio de aceptación,
THE implementación de su spec SHALL incluir al menos una prueba que falle si ese criterio se rompe.

## VIII. Sin drift

IF el código cambia el comportamiento, THEN la spec y, si aplica, la HU se actualizan en el mismo trabajo.
IF la HU cambia, THEN el runbook reabre el paso `compose` de esa HU.

## IX. Parar en el gate

THE agente SHALL NO saltar de `compose` a `implement` ni de fase de spec sin el gate de `quality-gates.md`.
THE agente SHALL preguntar al humano si un gate G2+ está ambiguo.

## X. Un contrato de agente

`AGENTS.md` (raíz y anidados) es la única fuente de instrucciones de agente.
THE plantilla SHALL NOT mantener un cerebro por herramienta (`.kiro/steering`, `CLAUDE.md`, `.cursorrules`, copilot-instructions con el proceso copiado).
IF una herramienta exige un archivo propio, THAT file SHALL ser un puntero de una línea a `AGENTS.md`.
`.vscode/` MAY existir como chrome de editor. `.cursor/` MAY existir como puntero. Ni uno ni otro SHALL añadir reglas que no estén en `docs/`.
Documentación en español. Código, APIs e identificadores en inglés.

## XI. El workspace se explica solo

WHEN se agregue una carpeta, app o tipo de artefacto,
THE SHALL ser comprensible al abrir el repo en cualquier IDE que lea `AGENTS.md`:
README o `AGENTS.md` anidado, mapa raíz actualizado, y fila en `catalog.md` si el agente debe saber cuándo cargarlo.
THE plantilla SHALL NOT dejar carpetas mudas ni leftover de un rename.

## XII. El ejemplo pulimenta el molde

`example/` es el mismo árbol que la raíz, vacío de producto, para recorrer el loop con un problema real.
THE example SHALL NOT duplicar constitución, howto, templates ni cards de procedimiento (se apuntan al molde).
WHEN se detecte un hueco al usar el molde desde `example/`,
THE SHALL registrarse en `example/GAPS.md`
AND el arreglo del molde SHALL hacerse en el mismo trabajo si aplica (`docs/`, templates, `AGENTS.md`).
THE plantilla SHALL NOT dejar mejoras solo en `example/` cuando el dolor es del arquetipo.
