/**
 * Builds the cursor images.
 *
 * The mark is Syed's paw print — beige pad on a deep-green outline, the same
 * hand as the cat in the nav and the favicon. It replaced a printer's
 * registration mark, which was more conceptually tidy and much less his.
 *
 * PNG rather than SVG because Safari does not support SVG cursors. Each is
 * emitted at 1x and 2x and referenced through image-set().
 *
 * The old crosshair had to be drawn twice — a cream halo under the green — or
 * it vanished over a photo or the drawer's dimmed backdrop. The paw needs no
 * halo: it is a solid beige body inside a heavy green outline, so one of the
 * two always contrasts with whatever is behind it. Over the cream ground the
 * outline carries it; over a dark photo or the green button the body does.
 *
 * 32px is deliberate. Browsers accept larger cursor images but some platforms
 * quietly refuse anything over 32, and a paw this simple gains nothing from
 * the extra pixels.
 *
 * To change the artwork: replace scripts/assets/cursor-paw-source.png and
 * re-run. Never hand-edit the files in public/cursor.
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
const SOURCE = join(root, "scripts/assets/cursor-paw-source.png");

/** Canvas is 32; the paw is inset so its outline never clips at the edge. */
const INSET = 1;

mkdirSync(OUT, { recursive: true });

const name = "paw";

for (const [suffix, size] of [
  ["", 32],
  ["@2x", 64],
]) {
  const scale = size / 32;
  const inner = Math.round(size - INSET * 2 * scale);

  const paw = await sharp(SOURCE)
    .trim({ threshold: 8 }) // drop the transparent margin around the artwork
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: "lanczos3",
    })
    .toBuffer();

  const info = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: paw, gravity: "center" }])
    .png()
    .toFile(join(OUT, `${name}${suffix}.png`));

  console.log(
    `✓ public/cursor/${name}${suffix}.png (${size}px, ${info.size} bytes)`,
  );
}

console.log("\nHotspot stays 16 16 — set in the cursor block of app/globals.css.");
