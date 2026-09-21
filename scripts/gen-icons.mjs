/**
 * Builds every icon from one source drawing.
 *
 * Source: scripts/assets/mark-source.webp — Syed's hand-drawn mark, black ink
 * on a white background.
 *
 * The white has to go: the nav sits on cream, so a white-backed image would
 * show as a white box. We derive the alpha channel from the drawing's own
 * darkness (ink opaque, paper transparent) and recolour the ink to the site's
 * ink token, then trim the surrounding empty space.
 *
 * Outputs:
 *   public/logo/mark.webp   transparent, used by the nav
 *   app/icon.png            512, cream ground — the tab icon
 *   app/apple-icon.png      180, cream ground
 *   app/favicon.ico         16 / 32 / 48
 *
 * The icon files get a cream ground rather than transparency on purpose:
 * black ink on a transparent background disappears against a dark browser
 * theme. Cream reads on both.
 *
 * Run with: npm run gen:icons
 */

import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "scripts/assets/mark-source.webp");

const INK = { r: 20, g: 32, b: 26 }; // --color-ink
const GROUND = { r: 244, g: 242, b: 234 }; // --color-ground

/** Ink-on-transparent, trimmed to the drawing. */
async function makeMark() {
  const flat = sharp(SOURCE)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .grayscale();

  const { width, height } = await flat.clone().metadata();

  // Dark pixels become opaque, white paper becomes transparent.
  const alpha = await flat.clone().negate().linear(1.35, -18).toBuffer();

  return sharp({
    create: { width, height, channels: 3, background: INK },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer()
    .then((buf) => sharp(buf).trim({ threshold: 1 }).toBuffer());
}

/** Square icon: the mark centred on cream with a little breathing room. */
async function makeIcon(mark, size) {
  const inner = Math.round(size * 0.82);
  const art = await sharp(mark)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: GROUND },
  })
    .composite([{ input: art, gravity: "center" }])
    .png()
    .toBuffer();
}

const mark = await makeMark();
const meta = await sharp(mark).metadata();

mkdirSync(join(root, "public/logo"), { recursive: true });
await sharp(mark).resize(512, null, { withoutEnlargement: true }).webp({ quality: 92 })
  .toFile(join(root, "public/logo/mark.webp"));

writeFileSync(join(root, "app/icon.png"), await makeIcon(mark, 512));
writeFileSync(join(root, "app/apple-icon.png"), await makeIcon(mark, 180));
writeFileSync(
  join(root, "app/favicon.ico"),
  await pngToIco([await makeIcon(mark, 16), await makeIcon(mark, 32), await makeIcon(mark, 48)]),
);

console.log(`✓ trimmed mark to ${meta.width}x${meta.height}`);
console.log("✓ public/logo/mark.webp");
console.log("✓ app/icon.png, app/apple-icon.png, app/favicon.ico");
