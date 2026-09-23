/**
 * Builds the footer skyline: Austin and Dallas on one horizon.
 *
 * Both sources are dusk photographs, so the sky cannot simply be left in — a
 * dark Dallas sky would render as a solid slab under the site's grayscale +
 * green treatment. Instead the sky is cut out: each column is scanned down
 * from the top, following the sky's gradient, until something that is not sky
 * begins (see `skyAlpha`).
 *
 * Each city is cropped to its skyline (no water, no reflection), its outer
 * edge is feathered, and the two overlap in the middle so the join reads as
 * one horizon. The output keeps its own colour and an alpha channel; the
 * grayscale, green tint and low opacity are applied in CSS, the same way the
 * SC300 backdrop is done.
 *
 * To change the artwork: replace the files in scripts/assets and re-run.
 * Never hand-edit public/skyline/skyline.webp.
 *
 * Run with: npm run gen:skyline
 */

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(root, "scripts/assets");
const OUT = join(root, "public/skyline");

/** Height every city is scaled to, and the total canvas width. */
const H = 520;
/** How far the two cities overlap, as a fraction of one city's width. */
const OVERLAP = 0.22;

const CITIES = [
  {
    file: "austinSkyline.jpg",
    // Fractions of the source: keep the skyline, drop the river and the
    // photographer's watermark below it.
    // Stops before the far-right haze band, which reads as a slab of
    // "building" once the sky is gone; the Dallas overlap covers the seam.
    crop: { top: 0.28, bottom: 0.68, left: 0, right: 0.66 },
    tolerance: 13,
    lookahead: 110,
  },
  {
    file: "dallasSkyline.webp",
    crop: { top: 0.02, bottom: 0.5, left: 0, right: 1 },
    tolerance: 14,
    lookahead: 70,
  },
];

/**
 * Finds the skyline by scanning each column down from the top and stopping at
 * the first real edge; returns an alpha array (0 sky, 255 city).
 *
 * A flood fill was tried first and abandoned: smooth glass facades look just
 * like a sunset gradient, so the fill leaked sideways into the towers. A
 * column scan cannot do that. `running` follows the sky's slow gradient; a
 * pixel is an edge only if it differs from it by more than `tolerance` AND
 * the difference is still there `lookahead` rows further down — which is what
 * separates a building from a thin streak of cloud.
 */
function skyAlpha(rgb, w, h, { tolerance, lookahead }) {
  const alpha = new Uint8Array(w * h).fill(255);
  const SLOPE_ROWS = 24;

  const edge = new Int32Array(w);
  for (let x = 0; x < w; x++) {
    const px = (y) => [
      rgb[(y * w + x) * 3],
      rgb[(y * w + x) * 3 + 1],
      rgb[(y * w + x) * 3 + 2],
    ];
    const ref = px(0);
    // Sky colour SLOPE_ROWS ago, so the reference can follow a gradient that
    // gets steeper towards the horizon instead of lagging behind it.
    const history = [ref.slice()];
    // How far off the extrapolated sky colour is `d` rows below the last one.
    const off = (i, base, slope, d) => {
      let worst = 0;
      for (let c = 0; c < 3; c++) {
        worst = Math.max(
          worst,
          Math.abs(rgb[i * 3 + c] - (base[c] + slope[c] * d)),
        );
      }
      return worst;
    };
    let stop = h;
    for (let y = 1; y < h; y++) {
      const old = history[Math.max(0, history.length - SLOPE_ROWS)];
      const span = Math.min(SLOPE_ROWS, history.length);
      const slope = ref.map((v, c) => (v - old[c]) / span);
      const i = y * w + x;

      if (off(i, ref, slope, 1) > tolerance) {
        // Real edge only if it is still off the sky's trend further down.
        let still = 0;
        const ahead = Math.min(lookahead, h - 1 - y);
        for (let k = 1; k <= ahead; k++) {
          if (off((y + k) * w + x, ref, slope, k + 1) > tolerance) still++;
        }
        if (ahead === 0 || still / ahead > 0.6) {
          stop = y;
          break;
        }
        continue;
      }
      for (let c = 0; c < 3; c++) {
        ref[c] = ref[c] * 0.7 + rgb[i * 3 + c] * 0.3;
      }
      history.push(ref.slice());
    }
    edge[x] = stop;
  }

  // A one-column spike of sky (or city) is noise, not architecture.
  const med = new Int32Array(w);
  for (let x = 0; x < w; x++) {
    const a = edge[Math.max(0, x - 1)];
    const b = edge[x];
    const c = edge[Math.min(w - 1, x + 1)];
    med[x] = Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < med[x]; y++) alpha[y * w + x] = 0;
  }

  // The column scan cannot see sky under an overhang (the ball on Reunion
  // Tower, the gap beside a stem). Reclaim it: grow the sky sideways and
  // downwards from the cut, but only through pixels that match both their
  // neighbour and that row's sky colour, so glass is left alone.
  const rowSky = new Float32Array(h * 3);
  for (let y = 0; y < h; y++) {
    let n = 0;
    for (let x = 0; x < w; x++) {
      if (alpha[y * w + x] === 0) {
        for (let c = 0; c < 3; c++) rowSky[y * 3 + c] += rgb[(y * w + x) * 3 + c];
        n++;
      }
    }
    if (n) for (let c = 0; c < 3; c++) rowSky[y * 3 + c] /= n;
    else if (y > 0) for (let c = 0; c < 3; c++) rowSky[y * 3 + c] = rowSky[(y - 1) * 3 + c];
  }
  const STEP = 6;
  const ROW = 22;
  const stack = [];
  for (let i = 0; i < w * h; i++) if (alpha[i] === 0) stack.push(i);
  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    const y = (i - x) / w;
    for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
      if (j < 0 || alpha[j] === 0) continue;
      const jy = Math.floor(j / w);
      let step = 0;
      let row = 0;
      for (let c = 0; c < 3; c++) {
        step = Math.max(step, Math.abs(rgb[j * 3 + c] - rgb[i * 3 + c]));
        row = Math.max(row, Math.abs(rgb[j * 3 + c] - rowSky[jy * 3 + c]));
      }
      if (step <= STEP && row <= ROW) {
        alpha[j] = 0;
        stack.push(j);
      }
    }
  }

  // Anything left that is not joined to the ground is a wisp of cloud or a
  // crane's far end, floating in mid-air. Keep only what connects to the base.
  const grounded = new Uint8Array(w * h);
  const rise = [];
  for (let x = 0; x < w; x++) {
    const i = (h - 1) * w + x;
    if (alpha[i]) {
      grounded[i] = 1;
      rise.push(i);
    }
  }
  while (rise.length) {
    const i = rise.pop();
    const x = i % w;
    const y = (i - x) / w;
    for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
      if (j >= 0 && alpha[j] && !grounded[j]) {
        grounded[j] = 1;
        rise.push(j);
      }
    }
  }
  for (let i = 0; i < w * h; i++) if (!grounded[i]) alpha[i] = 0;
  return alpha;
}

async function cutout({ file, crop, ...detect }) {
  const src = sharp(join(ASSETS, file));
  const { width, height } = await src.metadata();
  const region = {
    left: Math.round(crop.left * width),
    top: Math.round(crop.top * height),
    width: Math.round((crop.right - crop.left) * width),
    height: Math.round((crop.bottom - crop.top) * height),
  };
  const cropped = src.extract(region).resize({ height: H, kernel: "lanczos3" });
  const { data: rgba, info } = await cropped
    .clone()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // Sky detection runs on a lightly blurred copy so JPEG noise does not
  // make a smooth gradient look like edges.
  const smooth = await cropped
    .clone()
    .removeAlpha()
    .blur(0.7)
    .raw()
    .toBuffer();
  const alpha = skyAlpha(smooth, w, h, detect);

  // Soften the cut so the silhouette is not aliased.
  const softAlpha = await sharp(Buffer.from(alpha), {
    raw: { width: w, height: h, channels: 1 },
  })
    .blur(0.8)
    .extractChannel(0) // blur widens a 1-channel buffer to 3; keep one
    .raw()
    .toBuffer();

  const out = Buffer.from(rgba);
  for (let i = 0; i < w * h; i++) out[i * 4 + 3] = softAlpha[i];
  return { data: out, w, h };
}

mkdirSync(OUT, { recursive: true });

const cities = [];
for (const c of CITIES) cities.push(await cutout(c));

const cityW = cities.map((c) => c.w);
const overlapPx = Math.round(Math.min(...cityW) * OVERLAP);
const totalW = cityW[0] + cityW[1] - overlapPx;
/** Dallas fades in first (over solid Austin); Austin fades out after. */
const fadeIn = Math.round(overlapPx * 0.6);
const fadeOut = overlapPx - fadeIn;

const layers = [];
for (const [n, city] of cities.entries()) {
  const { data, w, h } = city;
  const left = n === 0 ? 0 : cityW[0] - overlapPx;

  // Join the two cities without a gap. Two layers that are each half faded
  // add up to only three-quarters opaque, and the lattice behind shows
  // through the seam. So Dallas fades in over an Austin that is still solid,
  // and only once Dallas is fully in does Austin fade out beneath it.
  const px = Buffer.from(data);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const t =
        n === 0
          ? Math.min(1, (w - 1 - x) / fadeOut)
          : Math.min(1, x / fadeIn);
      const k = (y * w + x) * 4 + 3;
      px[k] = Math.round(px[k] * t);
    }
  }
  // Fade the base so the crop never ends on a hard horizontal line.
  const fade = Math.round(h * 0.16);
  for (let y = h - fade; y < h; y++) {
    const t = (h - 1 - y) / fade;
    for (let x = 0; x < w; x++) {
      const k = (y * w + x) * 4 + 3;
      px[k] = Math.round(px[k] * t);
    }
  }
  layers.push({
    input: await sharp(px, { raw: { width: w, height: h, channels: 4 } })
      .png()
      .toBuffer(),
    left,
    top: 0,
  });
}

const info = await sharp({
  create: {
    width: totalW,
    height: H,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(layers)
  .webp({ quality: 82, alphaQuality: 90 })
  .toFile(join(OUT, "skyline.webp"));

console.log(
  `✓ public/skyline/skyline.webp (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB)`,
);
