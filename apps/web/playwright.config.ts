import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: process.env.PLAYWRIGHT_EXTERNAL_SERVER ? undefined : {
    command: "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      AUTH_GOOGLE_ID: "test-client.apps.googleusercontent.com",
      AUTH_GOOGLE_SECRET: "test-only-not-a-secret",
      AUTH_SECRET: "test-only-auth-secret-at-least-32-characters",
      DATABASE_URL: "postgresql://test:test@127.0.0.1:65432/test",
    },
  },
});
