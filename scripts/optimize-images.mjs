/**
 * Resizes project screenshots that are wider than MAX_WIDTH to exactly
 * MAX_WIDTH pixels wide (maintaining aspect ratio).  Re-encodes PNG at
 * maximum compression; JPEG at high quality with mozjpeg.
 *
 * Source files in public/projects/ are updated in-place.
 * Files that are already ≤ MAX_WIDTH are left untouched.
 *
 * Run with:  node scripts/optimize-images.mjs
 */

import { createRequire } from "node:module";
import { readdir, rename as renameFile, stat } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// sharp ships as a Next.js transitive dep; use createRequire to load CJS module
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dir = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dir, "..", "public", "projects");
const MAX_WIDTH = 1600;

console.log("Optimizing project screenshots…\n");

const files = await readdir(INPUT_DIR);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const inPath = join(INPUT_DIR, file);
  const before = (await stat(inPath)).size;

  const img = sharp(inPath);
  const meta = await img.metadata();

  if ((meta.width ?? 0) <= MAX_WIDTH) {
    console.log(
      `✓  ${file.padEnd(26)} ${meta.width}×${meta.height}  — already ≤${MAX_WIDTH}px`,
    );
    continue;
  }

  const tmpPath = inPath + ".opt";

  let pipeline = img.resize(MAX_WIDTH, null, {
    withoutEnlargement: true,
    kernel: "lanczos3",
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else {
    pipeline = pipeline.jpeg({ quality: 88, mozjpeg: true });
  }

  const info = await pipeline.toFile(tmpPath);
  await renameFile(tmpPath, inPath);

  const saved = ((before - info.size) / 1024).toFixed(0);
  console.log(
    `↓  ${file.padEnd(26)} ${meta.width}×${meta.height} → ${info.width}×${info.height}` +
      `  (${(info.size / 1024).toFixed(0)}KB, saved ${saved}KB)`,
  );
}

console.log("\n✓ Done. Rebuild Next.js to pick up the changes.");
