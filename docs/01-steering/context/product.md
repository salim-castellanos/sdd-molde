# Producto — Clave

Forma: template `docs/08-templates/product.md`. Este archivo es el **único** sitio de la idea de negocio. No crees `vision.md` ni un README paralelo.

Clave es el **producto de ejemplo** de esta plantilla. Al hacer fork, reescribe este archivo entero.

## Propósito

Dar a una persona o a un equipo pequeño una identidad usable: crear cuenta, entrar, recuperar acceso y ver un espacio según su rol. No es un IdP de mercado. Es el menor producto que obliga a especificar backend, base de datos, diseño y frontend juntos.

## Usuarios

| Actor | Necesidad |
| --- | --- |
| Visitante | Registrarse o recuperar acceso sin hablar con un admin |
| Usuario | Entrar, ver su sesión, salir |
| Admin | Asignar roles y ver que los permisos se cumplen |
| Agente / desarrollador | Implementar contra una spec, no contra un chat |

## Objetivos

- Un visitante puede crear una cuenta con email y contraseña.
- Un usuario puede iniciar y cerrar sesión.
- Un usuario puede restablecer su contraseña con un token de un solo uso.
- Los permisos salen de la base de datos (rol → permisos), no de un `if` hardcodeado en el frontend.
- El frontend implementa los flujos que están en `docs/04-design/`, no inventa pantallas.

## No-objetivos (esta versión)

- OAuth / SSO / passkeys / MFA.
- Multi-tenant.
- App móvil nativa (la carpeta `apps/mobile` existe como hueco).
- Panel de admin rico. Basta un listado mínimo o seeds + verificación por API.
- Email real de producción. Un adapter de mail (consola / Ethereal / Mailhog) es suficiente.

## Definición de “correcto”

Una acción está permitida si y solo si el rol del usuario, leído en BD, tiene el permiso exigido por el endpoint. El frontend oculta acciones, pero no es la autoridad.
