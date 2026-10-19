import { expect, test } from "@playwright/test";

test("public pages and the card demo remain available without a session", async ({ request }) => {
  for (const path of ["/", "/tools", "/projects", "/posts", "/about", "/card"]) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should remain public`).toBe(true);
  }
});

test("login exposes Google only and sanitizes an external return target", async ({ page }) => {
  await page.goto("/login?callbackUrl=https://evil.example/steal");
  await expect(page.getByRole("button", { name: "CONTINUAR CON GOOGLE" })).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.locator('input[name="callbackUrl"]')).toHaveValue("/card");
});

test("admin page and API reject unauthenticated requests on the server", async ({ page, request }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?callbackUrl=%2Fadmin$/);

  const apiResponse = await request.get("/api/admin/session");
  expect(apiResponse.status()).toBe(401);
});

test("legacy password endpoints cannot create a session", async ({ request }) => {
  const oldCardLogin = await request.post("/api/card/login", {
    form: { username: "admin", password: "password" },
  });
  expect(oldCardLogin.status()).toBe(404);

  const oldAuthLogin = await request.post("/api/auth/login", {
    form: { username: "admin", password: "password" },
  });
  expect(oldAuthLogin.ok()).toBe(false);
});

test("Auth.js rejects a sign-out POST without its CSRF flow", async ({ request }) => {
  const response = await request.post("/api/auth/signout", { maxRedirects: 0 });
  expect(response.ok()).toBe(false);
  expect(response.headers()["set-cookie"] ?? "").not.toContain("authjs.session-token=");
});

test("the legacy session cookie is actively expired", async ({ context, page }) => {
  await context.addCookies([{
    name: "hygroundd_session",
    value: "forged-old-session",
    domain: "127.0.0.1",
    path: "/",
  }]);
  await page.goto("/");
  const legacy = (await context.cookies()).find((cookie) => cookie.name === "hygroundd_session");
  expect(legacy).toBeUndefined();
});
