import type { UserRole } from "@/db/schema";

export type AuthorizedIdentity = {
  user?: {
    id?: string;
    googleSubject?: string;
    role?: UserRole;
  };
} | null;

export function safeRedirectPath(value: unknown, fallback = "/") {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }
  if (value.includes("\\") || /[\u0000-\u001f\u007f]/.test(value)) return fallback;
  return value;
}

export function hasVerifiedGoogleIdentity(
  account: { provider?: string; providerAccountId?: string } | null | undefined,
  profile: { sub?: unknown; email?: unknown; email_verified?: unknown } | undefined,
) {
  return Boolean(
    account?.provider === "google" &&
      typeof profile?.sub === "string" &&
      profile.sub.length > 0 &&
      account.providerAccountId === profile.sub &&
      typeof profile.email === "string" &&
      profile.email_verified === true,
  );
}

export function adminAuthorizationStatus(session: AuthorizedIdentity) {
  if (!session?.user?.id || !session.user.googleSubject) return 401 as const;
  if (session.user.role !== "admin") return 403 as const;
  return 200 as const;
}
