/**
 * Builds the cursor images.
 *
 * The mark is a printer's registration mark — the crosshair-in-a-circle used
 * to align colour plates on press. It belongs to the same print vocabulary as
 * the paper tooth and the drawer's dotted frame.
 *
 * Two states:
 *   reg.png       hollow  — the default cursor
 *   reg-live.png  filled  — over links and buttons ("on target")
 *
 * PNG rather than SVG because Safari does not support SVG cursors. Each is
 * emitted at 1x and 2x and referenced through image-set().
 *
 * Every shape is drawn twice: once in cream at a heavier stroke as a halo,
 * then in green on top. Without the halo the mark disappears over a photo or
 * the drawer's dimmed backdrop.
 *
 * Run with: npm run gen:cursors
 */

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/cursor");

const GREEN = "#0C4A33";
const HALO = "#F4F2EA";

/** @param {boolean} live  filled centre for interactive elements */
function markSvg(live) {
  const shapes = (stroke, width) => `
    <g fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round">
      <circle cx="16" cy="16" r="6.25" />
      <path d="M16 1.5v6.5M16 24v6.5M1.5 16h6.5M24 16h6.5" />
    </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    ${shapes(HALO, 3.2)}
    ${shapes(GREEN, 1.25)}
    ${live ? `<circle cx="16" cy="16" r="2.6" fill="${GREEN}" stroke="${HALO}" stroke-width="1" />` : ""}
  </svg>`;
}

mkdirSync(OUT, { recursive: true });

for (const [name, live] of [
  ["reg", false],
  ["reg-live", true],
]) {
  const svg = Buffer.from(markSvg(live));
  for (const [suffix, size] of [
    ["", 32],
    ["@2x", 64],
  ]) {
    await sharp(svg, { density: 72 * (size / 32) })
      .resize(size, size)
      .png()
      .toFile(join(OUT, `${name}${suffix}.png`));
    console.log(`✓ public/cursor/${name}${suffix}.png (${size}px)`);
  }
}
