import { beforeEach, describe, expect, it, vi } from "vitest";

const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/lib/auth", () => ({ getSession }));

import { GET } from "@/app/api/admin/session/route";

describe("admin session API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 for a missing or invalid session", async () => {
    getSession.mockResolvedValue(null);
    expect((await GET()).status).toBe(401);
  });

  it("returns 403 for an authenticated non-admin", async () => {
    getSession.mockResolvedValue({
      user: { id: "u1", googleSubject: "123456", role: "user" },
    });
    expect((await GET()).status).toBe(403);
  });

  it("allows a server-authorized administrator", async () => {
    getSession.mockResolvedValue({
      user: { id: "u1", googleSubject: "123456", role: "admin" },
    });
    const response = await GET();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, role: "admin" });
  });
});
