# Syed's Workshop — Interactive Portfolio

An interactive portfolio for **Syed Kazmi** built like a video-game **level-select
screen**. The homepage is _only_ the workshop — a full-viewport scene where every
object is a **portal**. Clicking an object **zooms into it** and navigates to its
own dedicated, themed page. On mobile the scene becomes a tap-friendly card grid.

```
Monitor           → /projects     (software projects + software experience)
Whiteboard        → /research      (research & AI work)
Soldering Station → /hardware      (hardware + IT experience & builds)
Trophy Shelf      → /awards         (awards & recognition)
Toolbox           → /skills         (skills & stack)
Desk Phone        → /contact        (about + contact form)
```

The hub is the world; the pages are the destinations. Each page has a themed
design, detailed content, and a **Back to Workshop** button.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 ·
Framer Motion · Radix Dialog · lucide-react. All artwork is custom SVG/CSS — no
image assets or paid licenses required.

---

## 1. How to run it

```bash
npm install      # install dependencies
npm run dev      # start the dev server  → http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (every route is statically prerendered)
npm start        # serve the production build
npm run lint     # eslint
```

Requires Node 20.9+ (built and tested on Node 26).

---

## 2. Where to update your links

All personal links live in one place: **[`data/site.ts`](data/site.ts)** — the
`links` object (`github`, `linkedin`, `email`, `emailPlain`, `resume`). They feed
the hub header, every page footer, and the contact page automatically.

**Resume:** the Resume button points to `/resume.pdf`. Drop your file at
`public/resume.pdf`, or set `resume` to an external URL.

**Content** lives in plain TypeScript data files:

| File | Controls |
| --- | --- |
| [`data/site.ts`](data/site.ts) | Name, headline, links |
| [`data/projects.ts`](data/projects.ts) | Projects (problem/solution/tech, badges) |
| [`data/experience.ts`](data/experience.ts) | Roles — `type` decides the page: `software` → /projects, `hardware`/`it` → /hardware |
| [`data/skills.ts`](data/skills.ts) | Skill categories ("toolbox drawers") |
| [`data/awards.ts`](data/awards.ts) | Awards |
| [`data/research.ts`](data/research.ts) | Research focus areas + featured research projects |
| [`data/workshop.ts`](data/workshop.ts) | The 6 portals: labels, captions, **`target` route**, and scene `area` positions |

The contact form is **frontend-only** — on submit it shows a success state. To
make it send, wire `handleSubmit` in
[`components/ContactPanel.tsx`](components/ContactPanel.tsx) to an API route,
[Formspree](https://formspree.io), [Resend](https://resend.com), etc.

---

## 3. Where to replace the placeholder artwork

### Workshop objects (the portals)

Each object is its own SVG component in
[`components/workshop/`](components/workshop):

```
MonitorArt.tsx · SolderingArt.tsx · WhiteboardArt.tsx
TrophyShelfArt.tsx · ToolboxArt.tsx · DeskPhoneArt.tsx
```

Replace the SVG inside any of these (or return an `<img>` / `next/image` — it's
sized to fill its container). The interactive wrapper, hover glow, tooltip, and
**zoom transition** are handled separately by
[`components/WorkshopObject.tsx`](components/WorkshopObject.tsx) +
[`components/WorkshopHub.tsx`](components/WorkshopHub.tsx). Reposition objects in
the scene via the `area` percentages in [`data/workshop.ts`](data/workshop.ts).

### Project images

Each project renders an abstract SVG by default. Add `image: "/projects/x.png"`
to a project in [`data/projects.ts`](data/projects.ts) and
[`ProjectVisual.tsx`](components/ProjectVisual.tsx) uses it instead.

### Branding — neon sign, cat mascot & favicon

- **Neon workshop sign** — [`components/NeonSign.tsx`](components/NeonSign.tsx) is
  the homepage centerpiece. The letters are **not a font** — each glyph is a
  hand-routed monoline tube path in the `GLYPHS` map, rendered as layered strokes
  (outer glow → glass tube → white-hot core → traveling shimmer) so it reads as
  real neon glass. It's mounted on an acrylic backboard with hanging chains +
  standoffs and casts glow/reflection onto the room. Edit the wording by changing
  the `buildWord("…")` calls (add glyphs to `GLYPHS` if you use new letters);
  tune colors via the `neon-title` / `neon-sub` gradients. Subtle flicker /
  breathe / shimmer come from `.neon-*` classes in
  [`app/globals.css`](app/globals.css).
- **Cat mascot** — the animated hacker-cat is
  [`components/CatMascot.tsx`](components/CatMascot.tsx): a transparent,
  container-free SVG (hover → blink / ear-twitch / head-tilt / glow). It's the
  hub avatar, page-chrome icon, and About avatar. To use a real photo on the
  About page instead, see the commented example in
  [`AboutSection.tsx`](components/AboutSection.tsx).
- **Favicon** — a simplified, transparent version of the same cat face. The
  source is [`app/icon.svg`](app/icon.svg); `app/favicon.ico` +
  `app/apple-icon.png` are generated from it. After editing the cat, regenerate:

  ```bash
  npm run gen:icons
  ```

### Theme / colors

All palette + animation tokens are in [`app/globals.css`](app/globals.css) under
`@theme` (accents `neon`, `heat`, `mint`, `iris`). Each page's accent is set on
its `<PageShell accent="…">`.

---

## Project structure

```
app/
  layout.tsx              # SEO metadata, fonts, <html>/<body>
  page.tsx                # the workshop HUB (full viewport, no chrome)
  globals.css             # theme tokens, animations, effect utilities
  projects/page.tsx       # ┐
  research/page.tsx       # │ destination pages — each exports its own
  hardware/page.tsx       # │ <metadata> and renders <PageShell> + content
  awards/page.tsx         # │
  skills/page.tsx         # │
  contact/page.tsx        # ┘
components/
  WorkshopHub.tsx         # hub: overlaid header, immersive room, zoom → router.push
  WorkshopScene.tsx       # WorkshopRoom (desktop diorama) + PortalCardGrid (mobile)
  WorkshopObject.tsx      # one interactive portal (hover/focus/click + rect)
  parallax/Parallax.tsx   # mouse-driven 2.5D depth layers (ParallaxStage/Layer)
  workshop/               # the 6 portal SVGs + room props:
                          #   Environment (brick wall + workbench), SleepingCat,
                          #   props.tsx (keyboard, mug, PCBs, sticky notes, …)
  PageShell.tsx           # themed page chrome: back button, entrance, footer
  ProjectGrid.tsx ProjectCard.tsx ProjectVisual.tsx
  ExperienceTimeline.tsx ResearchBoard.tsx AwardsShelf.tsx
  SkillsToolbox.tsx AboutSection.tsx ContactPanel.tsx
  effects/                # AmbientBackground, Particles
  ui/                     # Button, Badge, Modal (Radix), Reveal
  icons/                  # GitHub / LinkedIn brand glyphs
data/                     # all content (see table above)
lib/                      # types, cn() helper, accent class map
```

### How the zoom transition works

`WorkshopHub` captures the clicked object's on-screen rectangle, expands an
accent-tinted overlay from that rectangle to fill the viewport, then
`router.push()`-es to the route. The destination's `PageShell` mounts with a
matching accent flash that fades out — so it reads as zooming _into_ the object.
Routes are prefetched on load so it feels instant. Everything respects
`prefers-reduced-motion` (the zoom is skipped and navigation is immediate).

Accessibility: every portal/card is a real `<button>`, every page link is a real
`<a>`, the project modal traps focus and closes on Esc, and animations respect
reduced-motion.
```
