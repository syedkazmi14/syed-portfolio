import { test, expect } from "@playwright/test";

/**
 * Nav-clipping guard.
 *
 * The sibling no-overflow spec cannot catch this. It compares
 * documentElement.scrollWidth against clientWidth, and the header is
 * `position: fixed` — a fixed element's overflow never extends the document's
 * scroll width. So the nav could spill 76px past the right edge of a 320px
 * phone, have its last link silently clipped, and every one of those tests
 * would still pass. It did exactly that until the phone nav was cut to two
 * links.
 *
 * This measures what actually matters instead: the right edge of the last
 * visible nav item against the viewport. Zero-width items are skipped, since
 * that is how the hidden ones are hidden.
 *
 * Widths are real devices rather than round numbers: 320 is the original
 * iPhone SE, 360 a common Android, 375 the SE 2/3, 390 the iPhone 12–16, and
 * 414 the iPhone 11 / XR. 768 checks the tablet case where all four labels
 * are back.
 */
const widths = [320, 360, 375, 390, 414, 768];

for (const width of widths) {
  test(`nav fits without clipping @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    const nav = await page.evaluate(() => {
      const el = document.querySelector('nav[aria-label="Main"]');
      if (!el) return null;

      const items = [...el.querySelectorAll("li")].filter(
        (li) => li.getBoundingClientRect().width > 0,
      );
      const last = items[items.length - 1];

      return {
        labels: items.map((li) => li.textContent?.trim() ?? ""),
        lastRight: last.getBoundingClientRect().right,
        navRight: el.getBoundingClientRect().right,
        viewport: window.innerWidth,
      };
    });

    expect(nav, "main nav not found").not.toBeNull();
    if (!nav) return;

    expect(nav.labels.length, `@ ${width}px the nav rendered no links`)
      .toBeGreaterThan(0);

    expect(
      nav.lastRight,
      `@ ${width}px the nav is clipped: "${nav.labels.at(-1)}" ends at ` +
        `${nav.lastRight.toFixed(0)}px, past the ${nav.viewport}px viewport ` +
        `(showing: ${nav.labels.join(", ")})`,
    ).toBeLessThanOrEqual(nav.viewport);
  });
}
