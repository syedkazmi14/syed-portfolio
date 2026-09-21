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

## Type — three families

`font-display` Instrument Serif · `font-sans` Schibsted Grotesk · `font-mono` IBM Plex Mono.
All three load via `next/font/google` in `app/layout.tsx`. Use the `label`
utility for small uppercase mono headings rather than re-specifying it.

## Hard rules

- **No shadows, glows, glassmorphism, gradient text, or blur washes.** Hairline
  borders (`border-rule`) do the separating. The one exception is the polaroid
  in `About.tsx`.
- **Radius**: `rounded-sm` (2px) on buttons and inputs, `0` on images.
- **Motion**: three effects, all cheap — the scroll reveal
  (`components/Reveal.tsx`), the nav's scroll-progress bar, and the hover photo
  in `components/HoverTile.tsx`. Do not add more, and do not add an animation
  library. Motion is never load-bearing: content is visible by default and the
  reveal's hide styles are scoped behind `[data-js]`, so a page is never blank
  when scripting fails.
- **Tailwind v4 gotcha**: `scale-*` utilities set the CSS `scale` property, not
  `transform`. Mixing them with a JS-written `transform` multiplies the two and
  silently pins the element at zero — this bit the progress bar. Write the
  initial transform inline instead.
- **Dependencies**: five runtime deps. `framer-motion`, `lucide-react`, and
  `@radix-ui/react-dialog` were deliberately removed. Icons are inline SVG in
  `components/icons.tsx`. Do not add a component library or an icon package.
- **Images**: everything under `public/` is WebP and size-budgeted by
  `scripts/optimize-images.mjs`. Run `npm run optimize:images` after adding any
  image, and add new folders to that script's `TARGETS`. Never commit a
  straight-from-camera file.

## Content rules

All content lives in `data/`. Never invent an accomplishment, metric, date,
company, or responsibility — if a fact is not already in `data/` or stated by
Syed, ask rather than filling the gap.

- `data/site.ts` — identity, headline, bio, education, portrait, links
- `data/projects.ts` — the 8 projects; `links: []` is the repo/demo slot
- `data/experience.ts` — 4 roles, reverse-chronological
- `data/skills.ts`, `data/awards.ts` — rendered by `Credentials.tsx`

The site makes **no claim about job-search status or availability.** This is
intentional. Do not add one.

## Verify before claiming done

`npm run build` and `npx playwright test` both have to pass. The Playwright
suite guards horizontal overflow at 320/360/390/768px and has already caught
one real nav overflow — do not skip it.
