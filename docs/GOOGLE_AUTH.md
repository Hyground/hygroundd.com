# Google authentication operations

This runbook covers the manual configuration required by the Auth.js implementation in `apps/web`. Never commit or paste private values into issues, pull requests, chat, logs, or client-side variables.

## Architecture and security decisions

- Google is the only Auth.js provider.
- The provider uses the OAuth 2.0 Authorization Code flow with OpenID Connect and explicit PKCE, state, and nonce checks.
- The requested scopes are only `openid email profile`.
- Sign-in is rejected unless Google returns `email_verified: true` and the account identifier matches the `sub` claim.
- The stable identity is stored as `accounts.provider_account_id`; email is profile data and is not the authorization key.
- Sessions use opaque, database-backed tokens with an eight-hour maximum age. Auth.js owns the Secure, HttpOnly, SameSite cookie and CSRF flow.
- New users always receive the database default role `user`. No request parameter, profile claim, email address, or client code can assign `admin`.
- The retired `hygroundd_session` cookie is ignored and expired by the Next.js proxy.

## Required server-side variables

Configure these in `apps/web/.env.local` for local development and in Vercel Project Settings for Preview and Production. The committed `.env.example` contains names only.

| Variable | Purpose |
| --- | --- |
| `AUTH_GOOGLE_ID` | OAuth web client identifier from Google Cloud |
| `AUTH_GOOGLE_SECRET` | OAuth client secret from Google Cloud |
| `AUTH_SECRET` | High-entropy Auth.js signing/encryption secret |
| `DATABASE_URL` | TLS PostgreSQL connection string |

Do not use a `NEXT_PUBLIC_` prefix. Use separate databases and preferably separate Google OAuth clients for Preview and Production. Rotate a value immediately if it appears in source control or logs.

## Google Cloud Console

1. Open **Google Cloud Console → APIs & Services → OAuth consent screen**.
2. Configure the application name, support email, authorized domain `hygroundd.com`, developer contact, and the intended Internal or External audience.
3. Request only the standard `openid`, `email`, and `profile` scopes. No Google API scopes are needed.
4. Complete the publishing/testing-user requirements appropriate to the selected audience.
5. Open **Credentials → Create credentials → OAuth client ID → Web application**.
6. Add these exact authorized redirect URIs:

   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://hygroundd.com/api/auth/callback/google`
   - Preview: `https://<stable-preview-or-branch-domain>/api/auth/callback/google`

7. Add the matching authorized JavaScript origins if the console requires them: `http://localhost:3000`, `https://hygroundd.com`, and the exact Preview origin.

Google does not accept wildcard redirect URIs. Obtain the stable branch alias from the first Vercel Preview deployment, register that exact HTTPS callback, then redeploy. Do not test OAuth against an unregistered per-commit URL.

## PostgreSQL and migrations

Provision PostgreSQL through a Vercel Marketplace integration such as Neon, or another PostgreSQL provider that supports TLS and Vercel serverless workloads. Scope Preview credentials to a non-production database or database branch.

From a trusted workstation with the target `DATABASE_URL` loaded server-side, run:

```bash
corepack pnpm --filter @hygroundd/web db:migrate
```

Apply `apps/web/drizzle/0000_empty_blockbuster.sql` before enabling Google login. Never point a Preview deployment at the Production database unless that is an explicit operational decision.

## First administrator bootstrap

The bootstrap is deliberately unavailable over HTTP.

1. Apply the migration and configure OAuth.
2. Sign in once with the intended Google account. It will be created with role `user`.
3. From a protected database console, inspect the newly created Google account row and independently verify its `provider_account_id` (`sub`) belongs to the intended operator.
4. On a trusted workstation, load the Production `DATABASE_URL` and set `AUTH_BOOTSTRAP_ADMIN_SUB` temporarily to that exact `sub`.
5. Run:

   ```bash
   corepack pnpm --filter @hygroundd/web auth:bootstrap-admin
   ```

6. Remove `AUTH_BOOTSTRAP_ADMIN_SUB` immediately. Do not store it in Vercel.
7. Sign in again. The script revokes existing sessions so the new role is loaded in a fresh session.

The script locks the matching Google identity, requires exactly one match, updates the server-side role, and deletes that user's sessions. Additional administrators should be promoted through a separately audited database operation until an admin user-management feature exists.

## Vercel configuration

1. Confirm the monorepo project builds `apps/web` through the root Turbo scripts.
2. Connect separate Preview and Production PostgreSQL resources or branches.
3. Add `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, and `DATABASE_URL` to the appropriate Vercel environments. Mark secrets as sensitive where available.
4. Use branch-scoped Preview values when the feature branch has a dedicated database or Google client.
5. Redeploy after every environment-variable change; existing deployments do not receive updated values.
6. Run the database migration against each target before promoting its deployment.

## Manual verification gate

Automated tests do not contact Google or a real database. Before merging or deploying to Production, verify in Preview:

- Google displays the expected application and exact callback origin.
- A verified Google account signs in and receives only role `user` by default.
- An unverified/disallowed OAuth response fails closed with a friendly error.
- A normal user can use private `/card` mode but receives 403/denial for admin resources.
- The bootstrapped administrator can open `/admin` and `/api/admin/session`.
- Logout removes the Auth.js session and the database session no longer authorizes requests.
- A modified, expired, or revoked session token is rejected.
- External/protocol-relative `callbackUrl` values return to `/card`, not another origin.
- The retired password endpoints cannot authenticate and the old cookie is expired.
- Public pages remain available in a clean browser session.

Do not claim Production authentication works until the Production callback, secrets, migration, and real login/logout have been verified there under an approved release procedure.
