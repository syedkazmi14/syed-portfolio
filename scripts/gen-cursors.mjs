/**
 * Builds the cursor images.
 *
 * The mark is a printer's registration mark — the crosshair used
 * to align colour plates on press. It belongs to the same print vocabulary as
 * the paper tooth and the drawer's dotted frame.
 *
 * One mark everywhere: two lines crossing through the centre. Interactivity
 * is carried by the hover label and the usual link styles, not by a second
 * cursor.
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

function markSvg() {
  const path = "M16 2.5v27M2.5 16h27";

  const shapes = (stroke, width) =>
    `<path d="${path}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    ${shapes(HALO, 3.2)}
    ${shapes(GREEN, 1.35)}
  </svg>`;
}

mkdirSync(OUT, { recursive: true });

{
  const svg = Buffer.from(markSvg());
  const name = "reg";
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
