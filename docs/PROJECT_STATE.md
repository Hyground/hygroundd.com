# Project State

## Implemented
- Home V2, navegación responsive y rutas públicas base.
- Sesión administrativa compartida en cookie HttpOnly.
- `/login`, `/admin` protegido y Card Manager con demo público aislado.

## Architecture Decisions
- `src/lib/auth.ts` es la fuente única de auth.
- El contenido futuro debe acceder mediante repositorio, no directamente desde UI.
- Card Manager no persiste datos de usuario todavía.

## Pending
- ContentRepository, CRUD admin y persistencia compatible con serverless.
- Rutas detalle de projects/posts y herramientas no implementadas.

## Known Issues
- El dashboard de Card Manager conserva cambios sólo mientras la página está abierta.

## Important Notes
- Nunca exponer variables `CARD_ADMIN_*` ni `AUTH_SECRET`.
- `/card` mantiene compatibilidad; público recibe sólo props demo desde el servidor.
