/**
 * Converts every raster image under public/ to WebP, resized to fit the
 * dimensions it is actually displayed at.
 *
 * The previous version of this script only looked at public/projects, which is
 * how 285MB of full-resolution (4032x3024) phone photos ended up in public/cats.
 * It now walks every configured folder so that can't happen again.
 *
 * Originals are replaced. They remain recoverable from git history.
 *
 * Run with:  npm run optimize:images
 */

import { createRequire } from "node:module";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dir = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dir, "..", "public");

/** Per-folder budgets, sized to how each image is actually rendered. */
const TARGETS = [
  { dir: "cats", maxWidth: 1400, quality: 80 },
  { dir: "projects", maxWidth: 1600, quality: 82 },
  { dir: "photos", maxWidth: 1200, quality: 84 },
  { dir: "interests", maxWidth: 1400, quality: 84 },
];

const SOURCE_EXT = [".png", ".jpg", ".jpeg"];
const kb = (b) => (b / 1024).toFixed(0);

let totalBefore = 0;
let totalAfter = 0;

for (const { dir, maxWidth, quality } of TARGETS) {
  const inputDir = join(PUBLIC, dir);

  let files;
  try {
    files = await readdir(inputDir);
  } catch {
    console.log(`—  public/${dir} not found, skipping\n`);
    continue;
  }

  console.log(`public/${dir}  (max ${maxWidth}px, q${quality})`);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!SOURCE_EXT.includes(ext)) continue;

    const inPath = join(inputDir, file);
    const outPath = join(inputDir, `${basename(file, ext)}.webp`);
    const before = (await stat(inPath)).size;

    const img = sharp(inPath);
    const meta = await img.metadata();

    const info = await img
      .resize(maxWidth, null, { withoutEnlargement: true, kernel: "lanczos3" })
      .webp({ quality, effort: 6 })
      .toFile(outPath);

    await unlink(inPath);

    totalBefore += before;
    totalAfter += info.size;

    console.log(
      `   ${file.padEnd(30)} ${meta.width}x${meta.height} -> ${info.width}x${info.height}` +
        `   ${kb(before)}KB -> ${kb(info.size)}KB`,
    );
  }
  console.log("");
}

const saved = totalBefore - totalAfter;
console.log(
  `Done. ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB ` +
    `(saved ${(saved / 1048576).toFixed(1)}MB, ${((saved / totalBefore) * 100).toFixed(1)}%)`,
);
console.log("Remember to update image paths from .png to .webp.");
