# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Design system — "Deep Green"

The site is a light, typography-led editorial layout. It is deliberately small.
Before adding anything, check it against these rules.

## Colors — seven, no more

Defined in `app/globals.css` under `@theme`. There is **one** accent (`green`).
Do not introduce a second accent, a dark mode, or a theme toggle.

```
ground #F4F2EA   ink #14201A    body #3D4A43   muted #5C6B62
faint  #9AA49D   rule #D8D4C6   rule-soft #E2DED1
green  #0C4A33   green-deep #0A3A28   green-wash #E9EEE9
```

## Type — four families

`font-display` Young Serif · `font-sans` Archivo · `font-mono` Fragment Mono ·
`font-urdu` Amiri. The first three load via `next/font/google` in
`app/layout.tsx`; Amiri is a committed local subset, below. Use the `label`
utility for small uppercase mono headings rather than re-specifying it.

**Young Serif and Fragment Mono are single-weight (400).** Never pair a weight
class with `font-mono`, and never set italic on `font-display` — either would
be synthesised by the browser and look wrong. Archivo is variable, so weights
on body text are fine.

Young Serif also sets appreciably wider than most display serifs: the hero
scale in `components/Hero.tsx` is tuned to it, and at the previous 5.2rem the
two-line headline wrapped to four even at 1440px. Re-measure the hero if the
display face ever changes again.

### The Urdu face

`font-urdu` is **Amiri**, and only ever renders `siteConfig.nameUrdu` — Syed's
name, in `components/NameToggle.tsx`. It is not a text face here.

Amiri is **Naskh, not Nastaliq**, and that was a considered trade rather than a
default. Nastaliq is the traditional hand for Urdu, but it is written down a
steep diagonal — letters climb onto the shoulder of the one before — so it sets
roughly half the width of the Latin and wants twice the line-height. Beside
Young Serif it reads as compressed. Amiri runs horizontally on a flat baseline
and is close enough in colour to share a headline. Syed chose it from a
six-face comparison. **Do not "fix" it back to Nastaliq.**

The file is `app/fonts/amiri-urdu-subset.woff2` — **9KB**, carrying only the
eight codepoints that string needs (`U+20, 627, 62f, 633, 638, 645, 6a9, 6cc`).
`next/font/google` has no text-subsetting option, so it is committed and loaded
with `next/font/local`. To regenerate it, ask Google for the subset directly:

```
curl -sG -A 'Mozilla/5.0' https://fonts.googleapis.com/css2 \
  --data-urlencode 'family=Amiri' --data-urlencode 'text=سید کاظمی'
```

then download the `src: url(...)` it returns. Without a browser User-Agent the
API serves TTF instead of woff2.

Two things keep the toggle honest, and both are load-bearing:

- The name line in `components/Hero.tsx` carries a fixed `min-h`. Amiri sets
  taller than Young Serif, so without it, flipping the name shoves the role
  line and both buttons down the page. Measured: zero drift in either state.
- The Urdu span keeps `lang="ur"` so a screen reader pronounces it, and the
  button carries an `sr-only` sentence naming the action — otherwise an
  English-only reader lands on a control labelled in a script they cannot read.

The Playwright overflow suite never clicks the toggle, so it only ever sees the
Latin state. **Check the Urdu state by hand after touching the hero.** At the
time of writing the Urdu sets narrower than the Latin at every guarded width.

## Hard rules

- **No shadows, glows, glassmorphism, gradient text, or blur washes.** Hairline
  borders (`border-rule`) do the separating. No exceptions — the About photos
  are lifted off the page by translucent tape, not a shadow.
- **Radius**: `rounded-sm` (2px) on buttons and inputs, `0` on images.
- **Texture**: the ground is not flat. It carries a **jali** lattice — the
  perforated stone screens of Lahore Fort and the Badshahi Mosque — as one
  motif at two densities, the way a real screen varies its weave by position:
  `--jali` at 24px on `body`, `--jali-fine` at 12px on the header and the
  drawer's edge band. The fine tile is drawn at 12px with thinner strokes, not
  scaled down from the 24px one, or the strokes go to half-pixel mush.
  `--jali-bold` is the same motif at 48px in green, used by `.jali-resolve`
  for the band that closes the page below the footer's colophon.
  `--jali` bakes its own `stroke-opacity` because a `background-image` on
  `body` has no opacity of its own; `--jali-fine` is solid ink and its two
  users set strength on their pseudo-element. The header's texture must stay on
  a pseudo-element: it has a `backdrop-filter`, and a background on the header
  itself would be blurred with everything behind it. Keep the alphas tiny —
  this is texture in the stock, not a pattern.
- **Multiple photos**: projects, experience and interests all take
  `images?: string[]`. The **first is primary** — it is what the hover wash and
  the OG card use — and the rest are paged through by
  `components/PhotoCarousel.tsx`. The frame is a fixed aspect with the arrows
  laid *over* it, so extra photos never cost extra height, and only the active
  image is mounted. One photo renders as a plain figure with no controls.
- **Imagery**: photographs appear three ways — `HoverTile` (fades a photo in
  behind a row on hover) `SectionBackdrop` (a grayscale, green-tinted wash
  far behind a section) and `PhotoSticker` (a small rotated photo tucked in a
  corner). Prefer the sticker for personal photos — a section-sized personal
  photo reads as wallpaper and swamps the type. Both are `aria-hidden` and purely atmospheric. Keep
  backdrop opacity at or below ~0.18 or body copy starts to suffer, and use
  `fit="contain"` for die-cut cutouts with transparent backgrounds.
  Separately, the About section has a scrapbook pile (`AboutScrapbook.tsx`):
  the portrait taped down at the bottom, and phrases in the bio that tape
  `aboutPhotos` on top. Photos appear instantly, with no drop animation.
- **Motion**: four effects, all cheap — the scroll reveal
  (`components/Reveal.tsx`), the nav's scroll-progress bar, the hover photo
  in `components/HoverTile.tsx`, and the avatar's blink/tilt. Do not add more, and do not add an animation
  library. Motion is never load-bearing: content is visible by default and the
  reveal's hide styles are scoped behind `[data-js]`, so a page is never blank
  when scripting fails.
- **The drawer**: project and experience rows open `components/Drawer.tsx`
  rather than navigating. It **must** render through a portal onto `<body>` —
  the sections holding those lists use `isolate` for their photo backdrops, and
  an isolated ancestor traps the drawer so the header paints over it. Project
  rows keep a real `href` and only hijack unmodified left-clicks, so the eight
  project pages stay crawlable and cmd-click still opens a tab.
- **Tailwind v4 gotcha**: `scale-*` utilities set the CSS `scale` property, not
  `transform`. Mixing them with a JS-written `transform` multiplies the two and
  silently pins the element at zero — this bit the progress bar. Write the
  initial transform inline instead. `translate-*` behaves the same way, though
  `transition-transform` does cover it (it compiles to
  `transform, translate, scale, rotate`).
- **Dependencies**: **three** runtime deps — `next`, `react`, `react-dom`.
  `framer-motion`, `lucide-react`, `@radix-ui/react-dialog`, `clsx` and
  `tailwind-merge` were all deliberately removed. Icons are inline SVG in
  `components/icons.tsx`; there is no `cn()` helper, so write class strings
  directly or use a template literal. Do not add a component library, an icon
  package, or a classname utility.
- **`sharp` is a pinned devDependency** (exact, no caret). All three image
  scripts need it. It used to resolve only as a transitive dependency of Next,
  which would have broken them silently the day Next moved it.
- **Images**: everything under `public/` is WebP and size-budgeted by
  `scripts/optimize-images.mjs`. Run `npm run optimize:images` after adding any
  image, and add new folders to that script's `TARGETS`. Never commit a
  straight-from-camera file.

## The cursor

A printer's registration mark — the crosshair used to align colour plates on
press, in the same print vocabulary as the paper tooth and the drawer's dotted
frame. One mark everywhere, lines closed through the centre.

Interactivity is carried by `components/CursorLabel.tsx`, a small label that
rides beside the cursor over anything with a `data-cursor-label` attribute
("View project" on a project tile, "View details" on an experience row) — not
by a second cursor image. It is mounted once in the root layout, writes
position straight to the DOM in a rAF so moving the mouse never renders, and
is skipped entirely on coarse pointers and under reduced motion.

`npm run gen:cursors` builds `public/cursor/*.png` from
`scripts/gen-cursors.mjs`. PNG, not SVG: Safari does not support SVG cursors.
Each shape is drawn twice — a cream halo under the green — or the mark vanishes
over photos and the drawer backdrop.

The CSS is scoped to `pointer: fine`, keeps a standard keyword fallback on
every rule, and leaves the I-beam alone on text inputs. It does override the
cursor people set at OS level, which is a real accessibility cost; deleting the
block in `globals.css` restores system cursors everywhere.

## Turbopack cache

If a change to `app/globals.css` does not appear in the browser, check the
served CSS before debugging the rule — Turbopack has served a stale stylesheet
more than once in this project. `rm -rf .next` and restart. Lightning CSS also
rewrites colours (`rgba(20,32,26,0.035)` becomes `#14201a09`), so grep the
compiled output by shape, not by the literal colour you wrote.

The footer's closing photo slot (`siteConfig.footerPhoto`) is
**height-constrained, not width-constrained**, so it accepts any aspect Syed
drops in. Give it real intrinsic `width`/`height` — the first attempt used a
portrait photo with 4:3 dimensions hardcoded and it overflowed the band.

## The logo mark

Syed's own drawn cat head — beige fill, deep-green outline. The source lives at
`scripts/assets/mark-cat-source.webp` and already carries a real alpha
channel, so nothing is keyed out: it is trimmed, resized, and its own colours
are preserved. Every icon is derived from it by `npm run gen:icons`:

- `public/logo/mark.webp` — ink on transparent, trimmed; used by the nav
- `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` — on a cream ground

The icon files sit on **deep green**, while the nav keeps the artwork as drawn
on the page's cream. That split is deliberate: the beige fill is only a few
steps from the cream ground, so a cream-backed favicon washes out at 32px and
the outline thins to nothing. On green the beige reads as a solid silhouette.
Green also survives a dark browser theme, which transparency does not.

**The mark is 1.34:1, not square.** The nav `<Image>` is sized to that aspect;
a square box squashes it. Re-check those dimensions if the artwork changes —
`gen:icons` prints the trimmed aspect for exactly this reason.

To change the mark: replace the source file and re-run `npm run gen:icons`.
Never hand-edit the outputs. **Then clear `.next/dev/cache/images`** — the
optimiser keys its cache on the URL, and since the path does not change it
will keep serving the old artwork through restarts. Note the dev cache is at
`.next/dev/cache/images`, not `.next/cache/images`.

The previous ink-portrait mark is still at `scripts/assets/mark-source.webp`
if this is ever reverted.

## Content rules

All content lives in `data/`. Never invent an accomplishment, metric, date,
company, or responsibility — if a fact is not already in `data/` or stated by
Syed, ask rather than filling the gap.

- `data/site.ts` — identity, tagline, bio, education, portrait, links.
  `tagline` is the share-card line only; nothing on the page renders it.
  `nameUrdu` is Syed's own spelling, supplied by him — not transliterated by a
  tool. `role` is already title-cased ("Software Developer"); the hero renders
  it verbatim rather than re-casing it.
- `data/projects.ts` — the projects; `links: []` is the repo/demo slot.
  Everything below `name` is **optional**: entries often arrive with only a
  name, a date and a line of copy, and every surface omits what is missing.
  A half-filled project beats an invented one — never pad these out.
  All of them render on the homepage as a two-column grid; there is no
  separate index page. `/work/<slug>` detail pages still exist for permalinks
  and crawlers, and `/work` redirects to the homepage section.
- `data/experience.ts` — 4 roles, reverse-chronological
- `data/skills.ts`, `data/awards.ts` — rendered by `Credentials.tsx`.
  `awards.ts` also exports `certifications`, kept separate on purpose: a
  credential earned by examination is a different claim from a prize.
- `data/interests.ts` — the four interest tiles. **Every `body` here is Syed's
  own writing.** It replaced the draft copy that briefly lived in this file.
  Leave the prose alone: do not tighten, correct or restyle it without being
  asked. Reading has no photo yet; the drawer omits the figure cleanly.

The site makes **no claim about job-search status or availability.** This is
intentional. Do not add one.

Rendering a static array of prose? **Do not key on a prefix slice of the
text** (`key={p.slice(0, 24)}`). Two paragraphs sharing an opening phrase
collide, and React silently drops one. Use the index — these arrays never
reorder.

## Verify before claiming done

`npm run build` and `npx playwright test` both have to pass. The Playwright
suite guards horizontal overflow at 320/360/390/768px and has already caught
one real nav overflow — do not skip it.
