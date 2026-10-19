<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Startup context

Before starting any task, read `SYSTEM_CONTEXT.md`. It is the unified project guide and documented system tree. Treat this file as the bootstrap entry point and `SYSTEM_CONTEXT.md` as the canonical working context.

# Hygroundd Codex Guide

## Stack
Next.js 16 App Router, React 19, TypeScript y CSS global. No añadir dependencias sin necesidad clara.

## Architecture
- La aplicación Next.js vive en `apps/web`; ejecutar tareas desde la raíz con los scripts de Turbo.
- `apps/web/src/app`: rutas y Route Handlers.
- `apps/web/src/components`: UI reutilizable; `layout` es Hub, `card` es Card Manager.
- `apps/web/src/auth.ts`: configuración única de Auth.js y Google.
- `apps/web/src/lib/auth.ts`: DAL de sesión y autorización server-side.
- `apps/web/src/db`: esquema Drizzle para identidades, sesiones y roles.
- `apps/web/src/data` y `apps/web/src/types`: datos estáticos heredados; crear repositorios antes de CRUD persistente.

## Authentication
Auth.js es la única autenticación. Google OAuth/OIDC es el único proveedor; no agregar credenciales, contraseñas, Magic Links ni proveedores alternativos sin una decisión explícita de arquitectura. `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET` y `DATABASE_URL` son server-only. La identidad estable es `accounts.provider_account_id` (`sub` de Google), nunca el email. Exigir `email_verified`. Usar `getSession()`, `requireUser()` o `requireAdmin()` cerca del recurso protegido y volver a verificar roles dentro de cada Route Handler o Server Action. Los roles sólo se modifican mediante operaciones administrativas de base de datos; ver `docs/GOOGLE_AUTH.md`.

## Content
La base actual persiste exclusivamente autenticación, identidades OAuth, sesiones y roles. Tools, projects y posts públicos todavía no tienen repositorio ni persistencia. No escribir datos en archivos locales como solución serverless.

## Admin
`/admin` requiere `requireAdmin()` y rol persistido `admin`. Sus APIs deben responder 401 sin sesión y 403 sin rol. Su CRUD de contenido es una fase posterior.

## Routes
`/`, `/tools`, `/projects`, `/posts`, `/about`, `/login`, `/admin`, `/card`. Las rutas públicas siguen sin login. Mantener `/card`: sin sesión usa datos demo y con una sesión Google válida usa el modo privado.

## Commands
`npm run lint` · `npm run typecheck` · `npm run test` · `npm run build` · `npm run test:e2e`

## Token Efficiency Rules
- Leer este archivo primero y luego `docs/PROJECT_STATE.md` sólo si hace falta contexto.
- Inspeccionar únicamente archivos de la tarea; buscar antes de abrir archivos grandes.
- Nunca recorrer `node_modules` o `.next`, salvo la guía Next requerida por este archivo.
- Preferir parches pequeños, reutilizar arquitectura y mantener salida de terminal corta.
- Ejecutar verificaciones dirigidas antes del build completo.
- Actualizar PROJECT_STATE sólo ante cambios de arquitectura/estado; respuestas concisas.

## Agent Scopes
UI: componentes/estilos. AUTH: login/sesión/seguridad. TOOLS: herramientas individuales. CONTENT: projects/posts/admin CRUD. QA: build, responsive y regresión. Cada tarea debe limitarse a su scope.

## Current State
Fase 2 completa: Home minimalista, header responsive y rutas públicas base. Fase 3 implementada en `feature/google-auth`: Auth.js con Google, sesiones PostgreSQL, roles server-side, `/login`, `/admin` protegido y `/card` demo/privado. Requiere secretos, migración y validación OAuth manual antes de producción.

## Next Tasks
1. Configurar Google Cloud, secretos de Vercel y PostgreSQL según `docs/GOOGLE_AUTH.md`.
2. Aplicar migraciones, validar OAuth en Preview y promover el primer admin de forma operativa.
3. Crear ContentRepository y modelos para tools/projects/posts.
4. Construir vistas públicas y CRUD admin con persistencia serverless real.
5. Añadir `/tools/card-manager` reutilizando `/card`.

## Current Project Rules
- `/card` is the current Card Manager: do not modify it unless explicitly requested.
- **Current design rule:** Home is the visual source of truth; all tools reuse the Hygroundd design system.
- **Assets:** tool assets are mapped centrally; never hardcode repeated paths and always provide a fallback when a custom asset is absent.
- **Card:** `/card` functionality must not change without explicit request; its visual styling may use shared Hygroundd components.
- Tools come from `src/data/tools.ts`; do not handwrite tool cards in pages.
- Home must stay responsive. `AdSlot` is the single advertising abstraction.
- No AdSense, public accounts, database, or unnecessary dependencies without an explicit request.
