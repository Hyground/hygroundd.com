import { describe, expect, it } from "vitest";
import {
  adminAuthorizationStatus,
  hasVerifiedGoogleIdentity,
  safeRedirectPath,
} from "@/lib/auth-policy";

describe("Google identity policy", () => {
  const account = { provider: "google", providerAccountId: "123456789" };
  const profile = { sub: "123456789", email: "user@example.com", email_verified: true };

  it("accepts only a verified Google profile whose sub matches the account", () => {
    expect(hasVerifiedGoogleIdentity(account, profile)).toBe(true);
    expect(hasVerifiedGoogleIdentity(account, { ...profile, email_verified: false })).toBe(false);
    expect(hasVerifiedGoogleIdentity(account, { ...profile, sub: "999999999" })).toBe(false);
    expect(hasVerifiedGoogleIdentity({ ...account, provider: "credentials" }, profile)).toBe(false);
  });
});

describe("safe redirects", () => {
  it("allows local paths and rejects external or ambiguous targets", () => {
    expect(safeRedirectPath("/admin?tab=users", "/card")).toBe("/admin?tab=users");
    expect(safeRedirectPath("https://evil.example", "/card")).toBe("/card");
    expect(safeRedirectPath("//evil.example", "/card")).toBe("/card");
    expect(safeRedirectPath("/\\evil.example", "/card")).toBe("/card");
  });
});

describe("admin authorization", () => {
  it("fails closed for invalid sessions and non-admin users", () => {
    expect(adminAuthorizationStatus(null)).toBe(401);
    expect(adminAuthorizationStatus({ user: { id: "u1", role: "admin" } })).toBe(401);
    expect(adminAuthorizationStatus({ user: { id: "u1", googleSubject: "123", role: "user" } })).toBe(403);
    expect(adminAuthorizationStatus({ user: { id: "u1", googleSubject: "123", role: "admin" } })).toBe(200);
  });
});
