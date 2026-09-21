/**
 * Builds every icon from one source drawing.
 *
 * Source: scripts/assets/mark-cat-source.webp — Syed's drawn cat head, grey
 * fill with a deep-green outline. It already ships a real alpha channel, so
 * unlike the earlier ink portrait there is nothing to key out: the artwork is
 * trimmed and resized, and its own colours are preserved.
 *
 * (The previous mark, scripts/assets/mark-source.webp, is still in the repo if
 * this one is ever reverted.)
 *
 * Outputs:
 *   public/logo/mark.webp   transparent, used by the nav
 *   app/icon.png            512, cream ground — the tab icon
 *   app/apple-icon.png      180, cream ground
 *   app/favicon.ico         16 / 32 / 48
 *
 * The icon files get a cream ground rather than transparency on purpose: a
 * dark-outlined mark on a transparent background disappears against a dark
 * browser theme. Cream reads on both.
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
const SOURCE = join(root, "scripts/assets/mark-cat-source.webp");

const GROUND = { r: 244, g: 242, b: 234 }; // --color-ground

/** The artwork, trimmed of its transparent margin. */
async function makeMark() {
  return sharp(SOURCE).ensureAlpha().trim({ threshold: 1 }).png().toBuffer();
}

/**
 * Square icon: the mark centred on cream with breathing room.
 * `fit: "contain"` matters — the cat is wider than it is tall, and a square
 * resize would squash it.
 */
async function makeIcon(mark, size) {
  const inner = Math.round(size * 0.84);
  const art = await sharp(mark)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
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
await sharp(mark)
  .resize(512, null, { withoutEnlargement: true })
  .webp({ quality: 92 })
  .toFile(join(root, "public/logo/mark.webp"));

writeFileSync(join(root, "app/icon.png"), await makeIcon(mark, 512));
writeFileSync(join(root, "app/apple-icon.png"), await makeIcon(mark, 180));
writeFileSync(
  join(root, "app/favicon.ico"),
  await pngToIco([
    await makeIcon(mark, 16),
    await makeIcon(mark, 32),
    await makeIcon(mark, 48),
  ]),
);

const ratio = (meta.width / meta.height).toFixed(3);
console.log(`✓ trimmed mark to ${meta.width}x${meta.height} (aspect ${ratio})`);
console.log("✓ public/logo/mark.webp");
console.log("✓ app/icon.png, app/apple-icon.png, app/favicon.ico");
console.log(`\nNav <Image> should use this aspect — currently 40x40 square.`);
