<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hygroundd Codex Guide

## Stack
Next.js 16 App Router, React 19, TypeScript y CSS global. No añadir dependencias sin necesidad clara.

## Architecture
- `src/app`: rutas y Route Handlers.
- `src/components`: UI reutilizable; `layout` es Hub, `card` es Card Manager.
- `src/lib/auth.ts`: sesión administrativa única.
- `src/data` y `src/types`: datos estáticos heredados; crear repositorios antes de CRUD persistente.

## Authentication
`CARD_ADMIN_USERNAME`, `CARD_ADMIN_PASSWORD_HASH` (scrypt) y `AUTH_SECRET` viven sólo en el servidor. `src/lib/auth.ts` firma la cookie HttpOnly `hygroundd_session`; usar `getSession()` o `requireAdmin()` en rutas/API. No crear logins independientes.

## Content
Tools, projects y posts públicos todavía no tienen repositorio ni persistencia. No escribir datos en archivos locales como solución serverless.

## Admin
`/admin` requiere `requireAdmin()`. Su CRUD y persistencia son la próxima fase.

## Routes
`/`, `/tools`, `/projects`, `/posts`, `/about`, `/login`, `/admin`, `/card`. Mantener `/card`; sin sesión usa datos demo exclusivamente.

## Commands
`npm run build` · `npm run lint`

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
Fase 2 completa: Home minimalista, header responsive y rutas públicas base. Fase 3 iniciada: sesión global, `/login`, `/admin` protegido y `/card` demo/privado server-side.

## Next Tasks
1. Crear ContentRepository y modelos para tools/projects/posts.
2. Construir vistas públicas con datos del repositorio.
3. Implementar CRUD admin con persistencia serverless real.
4. Añadir `/tools/card-manager` reutilizando `/card`.
5. QA de auth, móvil y rutas administrativas.
