// Compatibility exports. New routes should import from @/lib/auth.
export { createSession, credentialsMatch, hasValidSession, sessionCookie as cardSession } from "@/lib/auth";
