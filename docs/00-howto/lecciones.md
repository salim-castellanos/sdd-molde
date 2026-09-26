# Lecciones de ejecución

Inbox del molde. Card: `docs/01-steering/lecciones.md`. No es `example/GAPS.md`.

`inbox` = aún no está en un gate/loop. Al empezar un `implement` se leen estas filas y el `LECCIONES.md` de la instancia. `promoted` = la regla ya vive en el destino; no se relee. `instance` = solo la instancia (`example/LECCIONES.md`).

Origen de esta tabla: cierre del runbook `001-cuenta` (Mistratos, HU-000) y cortes `002-facebook` / `004-simular`.

| id | Corte | Síntoma | Regla | Destino | Status |
| --- | --- | --- | --- | --- | --- |
| orphan-compose | 001-cuenta | `3001` era el api **demo**; el compose nuevo no era el que escuchaba | Un proyecto Compose **nombrado**; `docker compose ls` + `docker ps` antes de asumir el puerto | G4; loop implement | `promoted` |
| host-port-5432 | 001-cuenta | `password authentication failed` contra `localhost:5432` (Postgres del host + Docker) | El host publica **otro** puerto (aquí 5433). No pelear el 5432 del Windows | `example/LECCIONES.md` | `instance` |
| vite-localhost-v6 | 001-cuenta | `http://localhost:5173` no abre: Vite solo en `127.0.0.1` | Vite `server.host: true` (`0.0.0.0`) | G4 URL; `apps/web` vite.config | `promoted` |
| g4-sin-url | 001-cuenta | Batería verde; el humano no tenía web ni el api del corte | G4 exige URL del corte que **abre**, escrita en `STATUS.md` | G4; card `status` | `promoted` |
| cluster-sync | 001-cuenta | `CLUSTER=1` + `sequelize.sync` en cada worker → `owners` duplicado / workers en crash loop | Compose local `CLUSTER=0` hasta que el sync sea solo del primary | cfg instancia; compose | `instance` |
| esm-env | 001-cuenta | Integración: `DATABASE_URL is not set` (import de service carga `config` antes que `env.js`) | `config` con getters; todo test de BD importa `tests/helpers/env.js` **primero**; `node --test --test-concurrency=1` si hay `sync({ force })` | howto pruebas; 09-pruebas | `promoted` |
| execute-runbook | 001-cuenta | “Ejecuta el runbook” con paso en `compose`; el implement se bloqueó (runbook aún decía compose) | El pedido recorre **desde el paso corriente hasta cerrar**. Frontmatter `implement` **antes** de `npm install` | loop | `promoted` |
| g1-politica | 001-cuenta | HU decía “la política” sin cifra; se inventó 10 en la spec | G1: si hay política/tope sin cifra, la cifra entra a la HU o a un insumo **en el compose** | G1 | `promoted` |
| no-demo | 001-cuenta | Tras matar `demo@example.com`, el humano pidió user/pass | README/STATUS: “no hay demo; se registra”. No reintroducir el arquetipo | README instancia | `instance` |
| seed-book | 017-agenda | G4 con URL y libro vacío: el humano no ve el corte | Último paso de G4: semilla local + credenciales en STATUS. No un demo en la imagen | G4; loop implement; howto pruebas | `promoted` |
| pw-toHaveText | 001-cuenta | Playwright: `toHaveTextContent is not a function` | En Playwright: `toHaveText` / `toContainText`, no el matcher de Testing Library | 09-pruebas | `promoted` |
| g4-web-host | 004-simular | Api Compose healthy; `localhost:5173` no abre | G4: Vite (u otro web en el host) tiene que estar **escuchando**. `docker ps` del api no basta | G4; loop implement | `promoted` |
| pw-kills-vite | 004-simular | Tras Playwright, el humano ya no tiene web | Si Playwright arrancó el `webServer`, al terminar lo mata. Relanzar Vite o dejarlo corriendo antes (`reuseExistingServer`) | howto pruebas; loop | `promoted` |
| stale-image | 004-simular | Tests verdes contra api de test; el browser no ve el campo nuevo | El humano habla con la **imagen** Compose. Rebuild del servicio tocado. E2e y browser = mismo runtime | G4; loop; pruebas | `promoted` |
| 401-no-paint | 004-simular | 401 pintaba *Token inválido o expirado* en el form | Descartar sesión → `/login`; no FormError con el cuerpo del api | 04-patrones; ui-notes | `promoted` |
| kpi-overflow | 004-simular | COP largo se sale del WidgetCard 11rem | KPI solo en superficie ancha; extracto, no tiles iguales | 03-componentes; 04-patrones | `promoted` |
| oauth-glyph | 002-facebook | Icono OAuth `currentColor` se leía apagado; el humano pedía el azulito | Botón secundario del producto; **glifo** con color del proveedor. No pintar el botón entero | 03-componentes; ui-notes | `promoted` |
| optional-omit | 004-simular | Fecha opcional; vacío debía usar el default del api | Vacío se omite del POST; default en el api | template spec; 04-patrones | `promoted` |
