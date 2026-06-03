// Generates favicon.ico + apple-icon.png from app/icon.svg (the cat mascot).
// Run with: node scripts/gen-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "app/icon.svg"), "utf8");

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)",
  });
  return resvg.render().asPng();
}

// apple touch icon (opaque-ish, 180px)
writeFileSync(join(root, "app/apple-icon.png"), renderPng(180));

// multi-resolution favicon.ico
const ico = await pngToIco([renderPng(16), renderPng(32), renderPng(48)]);
writeFileSync(join(root, "app/favicon.ico"), ico);

console.log("✓ generated app/favicon.ico and app/apple-icon.png");
