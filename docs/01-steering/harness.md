# Steering — harness

## Qué es

Herramientas que el agente **llama** para operar el runtime (arrancar, parar, ver, sembrar, probar). El contrato está en [../00-howto/harness.md](../00-howto/harness.md). No se copia a `AGENTS.md`.

## Cuándo cargarlo

Arrancar, parar, reiniciar, “no abre localhost”, puerto ocupado, Compose, Vite, semilla, rebuild del api, antes de afirmar que la URL del corte abre. Publicar el git de la instancia en Origin (`origin.push`).

## Cuándo no

Redactar una HU. Elegir copy. Elegir una librería (eso es `tech`).

## Si aplica, cargar

- [docs/00-howto/harness.md](../00-howto/harness.md)
- En la instancia: `harness.profile.json` y `LECCIONES.md`
- Llamar: `node tools/harness.mjs status --profile example/harness.profile.json` (desde la raíz del molde). No reescribas el comando Docker.
