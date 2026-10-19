# Project State

## Current

- The active Next.js application is `apps/web` inside a pnpm/Turbo workspace.
- Tools Hub Home has a responsive catalog, filters, and category counts.
- Tool catalog and asset fallbacks are centralized under `apps/web/src/data`.
- Auth.js uses Google OAuth 2.0/OpenID Connect as its only provider.
- PostgreSQL + Drizzle persist users, Google identities, sessions, and `user`/`admin` roles.
- Google accounts are authorized using their stable `sub`; sign-in rejects unverified email claims.
- `/admin` and `/api/admin/*` require server-side admin authorization.
- `/card` remains public in demo mode and switches to private mode for a valid Google session.
- The legacy password routes and signed `hygroundd_session` implementation have been removed; the old cookie is actively expired by `src/proxy.ts`.

## Deployment gate

Google login is not considered production-ready until all of the following are complete:

1. A Vercel-compatible PostgreSQL database is provisioned for each environment.
2. `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, and `DATABASE_URL` are configured server-side.
3. The Drizzle migration has been applied to Preview and Production databases.
4. Exact Google callback URLs are registered.
5. A real Google login, logout, revoked/expired session, user denial, and admin authorization are manually verified in Preview.
6. The first administrator is promoted with the one-time operational procedure in `docs/GOOGLE_AUTH.md`.

## Pending

- Complete the deployment gate and manual OAuth verification.
- Content repository and admin CRUD for tools, projects, and posts.
- Analytics/popularity data.
- Real tool detail implementations.
- AdSense integration and SEO expansion.

## Important Notes

- Public pages and non-persistent tools do not require an account.
- Tools marked coming soon do not link to fake functionality.
- Authentication persistence must use PostgreSQL; never write accounts or sessions to repository files.
- Do not add password, credentials, email Magic Link, or alternate OAuth providers without an explicit architecture change.
