# Atributos funcionales (sistema)

Capacidades del **sistema**, no HUs. Las HUs viven en `docs/05-stories/`. Aquí se lista qué debe poder existir para que esas HUs tengan sentido.

**Estado:** Clave relleno.

| ID | Capacidad | Módulo | Épica / features que la cubren |
| --- | --- | --- | --- |
| AF-01 | Registrar cuenta email+password | transversal | E-001 / F-002 |
| AF-02 | Iniciar y cerrar sesión | transversal | E-001 / F-002 |
| AF-03 | Restablecer password por token | transversal | E-001 / F-002 |
| AF-04 | Autorizar por rol→permiso en BD | transversal | E-001 / F-001 |
| AF-05 | Exponer identidad de la sesión (`/me`) | transversal | E-001 / F-003 |

[RELLENAR: AF-06… de tu dominio. No copies login si tu producto no tiene identidad propia.]

## Trazabilidad

```text
AF (este archivo) → Épica → Feature → HU → spec compuesta → código
```

Si un AF no tiene HU, o es backlog o sobra.
