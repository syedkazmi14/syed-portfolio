import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config for the layout guards. Uses the locally-installed Google Chrome
 * (channel: "chrome") so CI/devs don't need a separate Playwright browser
 * download. Builds and serves the production output so the guard checks the
 * real shipped pages, not the dev overlay.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
