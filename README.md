# syedk.dev

Personal portfolio for **Syed Kazmi** — a light, typography-led editorial site.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 ·
five runtime dependencies.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build; every route is prerendered
npm run lint
npx playwright test  # horizontal-overflow guard, 320/360/390/768px
npm run optimize:images
```

## Routes

```
/                 hero · selected work · experience · about · stack · contact
/work             all eight projects
/work/[slug]      one page per project (problem / solution / stack / links)
/cats             easter egg — reachable only via the cat drawing in About
```

Old routes (`/projects`, `/research`, `/hardware`, `/awards`, `/skills`,
`/contact`) permanently redirect via `next.config.ts`.

## Editing content

Everything is in `data/` — no content is hardcoded in components.

| File | Controls |
| --- | --- |
| `data/site.ts` | Name, headline, bio, education, portrait photo + caption, links |
| `data/projects.ts` | The 8 projects. **Repo/demo links go in each project's `links` array** |
| `data/experience.ts` | Roles, newest first |
| `data/skills.ts` | Stack groups |
| `data/awards.ts` | Recognition |

**Adding a project link:**

```ts
links: [
  { label: "Repo", href: "https://github.com/syedkazmi14/..." },
  { label: "Live demo", href: "https://..." },
],
```

An empty array renders nothing, so no placeholder links ever ship.

## Images

All images are WebP, resized by `scripts/optimize-images.mjs` to per-folder
budgets (cats 1400px, projects 1600px, photos 1200px). Drop a new file in
`public/`, run `npm run optimize:images`, and reference the `.webp`.

## Design system

See [`AGENTS.md`](AGENTS.md) — seven colors, three typefaces, one accent, one
animation. The constraints are the point; read it before adding anything.

## Custom artwork

`components/marginalia.tsx` holds the margin drawings (Saturn, the SC300, a
cat, a sauropod). These are **placeholders** — replace each with a real drawing
exported as SVG using `fill="none" stroke="currentColor"`, keeping the same
props signature, and color and sizing follow automatically.
