# tools

CLI del harness. Contrato: `docs/00-howto/harness.md`.

```text
node tools/harness.mjs status --profile example/harness.profile.json
node --test tools/harness.test.mjs
```

`status`, `up`, `down`, `web` y `origin` están en este corte. `origin` publica el git en Cursor Origin desde la imagen Linux `tools/origin`. No publica la web. El servidor MCP no.
