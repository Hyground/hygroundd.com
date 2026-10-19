# Hygroundd System Context

> Canonical startup context. Read after `AGENTS.md` and before task-specific files.

## Working rules

- Search with `rg` before reading or editing files; inspect only the current task scope.
- Ignore `node_modules`, `.next`, `dist`, and `build`, except for the relevant local Next.js 16 guide before writing framework code.
- Preserve the existing architecture and unrelated user changes.
- Reuse components, avoid unnecessary dependencies, and run focused checks before general checks.
- Never use repository files as runtime persistence on Vercel.
- Report changed files, checks, errors, and manual deployment requirements concisely.

## Stack and workspace

- pnpm workspace with Turbo at the repository root.
- Active application: `apps/web`.
- Next.js 16.3 App Router, React 19.2, TypeScript, and global CSS.
- Auth.js v5 with Google OAuth/OIDC only.
- PostgreSQL with Drizzle ORM and versioned migrations.

## System tree

```text
hygroundd.com/
|-- AGENTS.md                     # Bootstrap and active project rules
|-- SYSTEM_CONTEXT.md             # Unified startup context
|-- docs/
|   |-- PROJECT_STATE.md          # Current implementation and deployment gate
|   |-- GOOGLE_AUTH.md            # OAuth, Vercel, migration, and admin runbook
|   |-- ASSETS.md
|   `-- AI_CHANGELOG.md
|-- apps/
|   `-- web/
|       |-- drizzle/              # Versioned PostgreSQL migrations
|       |-- e2e/                  # Playwright tests
|       |-- scripts/              # Operational scripts; no HTTP exposure
|       `-- src/
|           |-- app/              # Pages and Route Handlers
|           |   |-- api/auth/[...nextauth]/
|           |   |-- api/admin/    # Server-authorized admin endpoints
|           |   |-- login/
|           |   |-- admin/
|           |   `-- card/
|           |-- auth.ts           # Auth.js config and Google-only provider
|           |-- db/               # Drizzle client and auth schema
|           |-- lib/auth.ts       # Session/authorization DAL
|           |-- components/       # Shared UI and tools
|           |-- data/             # Static catalog and centralized assets
|           `-- proxy.ts          # Legacy cookie expiration only
|-- packages/
`-- services/
```

Confirm task-specific files with `rg`; this tree records architectural responsibilities, not every file.

## Authentication and authorization

```text
Google Authorization Code + OIDC
  -> Auth.js checks PKCE + state + nonce
  -> require email_verified and matching Google sub
  -> PostgreSQL account identity (provider_account_id = sub)
  -> opaque database session (8-hour max)
  -> role loaded from users.role
       |-- user  -> private user features, including /card private mode
       `-- admin -> /admin and /api/admin/*
```

- Providers other than Google are forbidden unless architecture is explicitly changed.
- Never identify or authorize a user by name or email alone.
- New users default to `user`; client input and OAuth profile fields cannot grant `admin`.
- Bootstrap the first admin only with the audited operational script in `docs/GOOGLE_AUTH.md`.
- Use `getSession()`, `requireUser()`, and `requireAdmin()` close to protected resources.
- Route Handlers and Server Actions must repeat their own authorization checks; UI visibility is not security.
- Auth.js owns OAuth cookies, CSRF, sign-in, and sign-out. Do not recreate these flows.
- Server-only variables: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, and `DATABASE_URL`.
- The legacy `hygroundd_session` is never accepted and is actively expired.

## Product behavior

- Public without login: `/`, `/tools`, `/projects`, `/posts`, `/about`, and `/card` demo mode.
- `/login` offers only “Continuar con Google”.
- `/card` behavior stays intact: demo without a session, private mode with a valid Google session.
- `/admin` requires the persisted `admin` role.
- Home remains the responsive visual source of truth.
- Tool entries come from `apps/web/src/data/tools.ts`; do not duplicate them in pages.
- Tool assets use the centralized mapping and a fallback.
- `AdSlot` remains the single advertising abstraction.

## Persistence boundaries

- PostgreSQL currently persists only Auth.js users, Google accounts, sessions, and roles.
- Tools, projects, posts, and Card Manager data do not yet have a persistent repository.
- Do not introduce content persistence, public accounts beyond Google identity, AdSense, or unrelated databases without an explicit request.

## Verification commands

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

OAuth is not production-ready until secrets are configured, migrations are applied, callbacks are registered, the first admin is bootstrapped, and the manual Preview gate in `docs/GOOGLE_AUTH.md` passes.
