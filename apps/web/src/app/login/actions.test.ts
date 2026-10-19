import { beforeEach, describe, expect, it, vi } from "vitest";

const { signIn, signOut } = vi.hoisted(() => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("@/auth", () => ({ signIn, signOut }));

import { endSession, startGoogleSignIn } from "@/app/login/actions";

describe("authentication actions", () => {
  beforeEach(() => vi.clearAllMocks());

  it("starts only the Google provider and preserves a safe local destination", async () => {
    const form = new FormData();
    form.set("callbackUrl", "/admin");
    await startGoogleSignIn(form);
    expect(signIn).toHaveBeenCalledWith("google", { redirectTo: "/admin" });
  });

  it("replaces an external callback with the safe card route", async () => {
    const form = new FormData();
    form.set("callbackUrl", "https://evil.example/steal");
    await startGoogleSignIn(form);
    expect(signIn).toHaveBeenCalledWith("google", { redirectTo: "/card" });
  });

  it("uses the official Auth.js sign-out flow", async () => {
    await endSession();
    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/" });
  });
});
