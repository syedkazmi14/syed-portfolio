import { test, expect } from "@playwright/test";

/**
 * Horizontal-overflow guard.
 *
 * Phase 1 fixed a /contact overflow caused by a `whitespace-nowrap` value
 * escaping an auto-sized grid track (min-width is ignored on inline elements,
 * and an implicit grid track sizes to max-content). This locks every route
 * across the small-screen widths so that whole class of bug can't ship again.
 *
 * Narrow widths (< 768) render the scrollable mobile room; 768 renders the
 * immersive desktop room — both are covered.
 */
const routes = [
  "/",
  "/projects",
  "/research",
  "/hardware",
  "/skills",
  "/awards",
  "/contact",
  "/cats",
];
const widths = [320, 360, 390, 768];

for (const route of routes) {
  for (const width of widths) {
    test(`no horizontal overflow: ${route} @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      // let the media-query room swap and entrance animation settle
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
