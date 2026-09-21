import { test, expect } from "@playwright/test";

/**
 * Horizontal-overflow guard.
 *
 * Locks every route across small-screen widths. Originally added after a
 * /contact overflow caused by a `whitespace-nowrap` value escaping an
 * auto-sized grid track; kept through the redesign because it catches that
 * whole class of bug cheaply.
 */
const routes = [
  "/",
  "/work/blue-relief",
  "/work/telekinetics",
  "/work/copilot-sdk",
  "/cats",
];
const widths = [320, 360, 390, 768];

for (const route of routes) {
  for (const width of widths) {
    test(`no horizontal overflow: ${route} @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      // let the scroll-reveal transition settle
      await page.waitForTimeout(400);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(
        scrollWidth,
        `${route} @ ${width}px overflows: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`,
      ).toBeLessThanOrEqual(clientWidth);
    });
  }
}
