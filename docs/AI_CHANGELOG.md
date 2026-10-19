## 2026-10-18
- Replaced the shared username/password cookie with Google-only Auth.js OAuth/OIDC.
- Added PostgreSQL/Drizzle persistence for Google identities, database sessions, and `user`/`admin` roles.
- Added server-side admin authorization, safe return paths, official sign-out, legacy-cookie expiration, and a non-HTTP first-admin bootstrap.
- Added Vitest and Playwright coverage plus the Google Cloud, Vercel, migration, and manual verification runbook.
- Upgraded Next.js and its ESLint config to 16.3.8 and pinned `sharp` 0.35.5 after the production dependency audit.
Files: `apps/web/src/auth.ts`, auth DAL/UI/routes, DB schema/migration, tests, `docs/GOOGLE_AUTH.md`.
Status: lint, typecheck, 9 unit tests, production build, 6 E2E tests, and `pnpm audit --prod` passed with synthetic configuration. Real Google/DB verification remains a deployment gate.

## 2026-09-14
- Added Home V2, responsive navigation and shared admin auth.
- Added `/login`, protected `/admin`, and public/demo separation for `/card`.
Files: app routes, Header, auth helpers.
Status: `npm run build` passed.
Next: content repository and admin persistence.

## 2026-09-14
- Replaced the public Home with the responsive Tools Hub catalog.
- Added centralized tools data, search/filter UI and AdSlot placeholders.
Files: tools data, tools components, Home and tools route.
Status: lint and build passed.
Next: tool detail routes when real implementations exist.
