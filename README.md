# Syed's Workshop — Interactive Portfolio

An interactive personal portfolio for **Syed Kazmi**, built as a premium dark
"engineering workshop." The homepage is a hoverable/clickable workshop scene
(monitor, soldering station, whiteboard, trophy shelf, toolbox, desk phone) that
navigates to each section. On mobile the scene becomes a tap-friendly card grid.

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
npm run build    # production build (statically prerendered)
npm start        # serve the production build
npm run lint     # eslint
```

Requires Node 20.9+ (built and tested on Node 26).

---

## 2. Where to update your links

All personal links live in one place: **[`data/site.ts`](data/site.ts)**.

```ts
links: {
  github:     "https://github.com/your-username",       // ← replace
  linkedin:   "https://www.linkedin.com/in/your-handle", // ← replace
  email:      "mailto:syed@example.com",                 // ← replace
  emailPlain: "syed@example.com",                        // ← replace (shown text)
  resume:     "/resume.pdf",                             // ← see below
}
```

These feed the hero buttons, navbar, contact section, and footer automatically.

**Resume:** the Resume button points to `/resume.pdf`. Drop your file at
`public/resume.pdf` (any filename works — just match it here), or set `resume`
to an external URL (e.g. a Google Drive / Notion link).

**Content** lives in plain TypeScript data files — edit these to change copy:

| File | Controls |
| --- | --- |
| [`data/site.ts`](data/site.ts) | Name, headline, subheadline, links, nav |
| [`data/projects.ts`](data/projects.ts) | Projects (problem/solution/tech, badges) |
| [`data/experience.ts`](data/experience.ts) | Work timeline |
| [`data/skills.ts`](data/skills.ts) | Skill categories ("toolbox drawers") |
| [`data/awards.ts`](data/awards.ts) | Awards |
| [`data/research.ts`](data/research.ts) | Research focus areas + featured research projects |
| [`data/workshop.ts`](data/workshop.ts) | The 6 workshop objects (labels, targets, scene positions) |

The contact form is **frontend-only** — on submit it shows a success state. To
make it send, wire `handleSubmit` in
[`components/ContactPanel.tsx`](components/ContactPanel.tsx) to an API route,
[Formspree](https://formspree.io), [Resend](https://resend.com), etc.

---

## 3. Where to replace the placeholder artwork

Everything is structured so you can swap the SVG placeholders for real
images/AI-generated assets without touching layout code.

### Project card images

Each project renders an abstract SVG by default. To use a real screenshot,
add an `image` field in [`data/projects.ts`](data/projects.ts):

```ts
{
  id: "blue-relief",
  // ...
  image: "/projects/blue-relief.png",  // put the file in public/projects/
}
```

When `image` is set, [`components/ProjectVisual.tsx`](components/ProjectVisual.tsx)
renders it instead of the placeholder. (To swap the abstract SVGs themselves,
edit the `Motif` switch in that file.)

### Workshop objects (monitor, soldering station, etc.)

Each object is its own SVG component in
[`components/workshop/`](components/workshop):

```
MonitorArt.tsx · SolderingArt.tsx · WhiteboardArt.tsx
TrophyShelfArt.tsx · ToolboxArt.tsx · DeskPhoneArt.tsx
```

Replace the SVG inside any of these to change the artwork — the interactive
wrapper, glow, tooltip, and navigation are handled separately by
[`components/WorkshopObject.tsx`](components/WorkshopObject.tsx). To swap in an
`<img>`/`next/image`, just return it from the art component (it's sized to fill
its container). Reposition objects in the scene via the `area` percentages in
[`data/workshop.ts`](data/workshop.ts).

### About photo

The About section uses an "SK" monogram tile. Replace it with a photo in
[`components/AboutSection.tsx`](components/AboutSection.tsx) (a commented example
is included — drop `public/me.jpg`).

### Theme / colors

The whole palette and animations are defined as tokens in
[`app/globals.css`](app/globals.css) under `@theme` (accent colors `neon`,
`heat`, `mint`, `iris`). Change them once and the whole site updates.

---

## Project structure

```
app/
  layout.tsx            # SEO metadata, fonts, <html>/<body>
  page.tsx              # assembles all sections
  globals.css           # theme tokens, animations, effect utilities
components/
  Navbar.tsx Footer.tsx Hero.tsx Section.tsx SectionHeader.tsx
  WorkshopScene.tsx     # desktop room + mobile card grid
  WorkshopObject.tsx    # interactive hotspot wrapper (hover/focus/click)
  workshop/             # the 6 object SVGs (swappable artwork)
  ProjectsSection.tsx ProjectCard.tsx ProjectVisual.tsx
  ExperienceTimeline.tsx ResearchBoard.tsx AwardsShelf.tsx
  SkillsToolbox.tsx AboutSection.tsx ContactPanel.tsx
  effects/              # AmbientBackground, Particles
  ui/                   # Button, Badge, Modal (Radix), Reveal
  icons/                # GitHub / LinkedIn brand glyphs
data/                   # all content (see table above)
lib/                    # types, cn() helper, accent class map
```

Accessibility: every object/card is a real `<button>`/`<a>` (keyboard
focusable), the modal traps focus and closes on Esc, animations respect
`prefers-reduced-motion`, and sections are anchor-navigable.
