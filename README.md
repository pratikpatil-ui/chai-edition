# Chai Edition

> India, brewed in editions.

A cinematic React + TypeScript digital magazine exploring Indian chai culture through regional stories, brewing rituals, warm visuals, and a personal love for the perfect cup. Built as a premium AI-assisted frontend portfolio project.

- **Live demo:** _add your Vercel URL here_
- **Repository:** _add your GitHub URL here_

---

## Project objective

Build a polished, production-ready frontend portfolio piece that feels like a luxury digital magazine mixed with a cinematic documentary — not a café site, not a tea-shop landing page, not a generic food blog. The goal is to demonstrate editorial UI design, scroll-driven motion, accessibility, performance, and disciplined React + TypeScript engineering.

## Why I built it

I'm a full-stack and React Native developer who loves Indian chai — masala, ginger, cutting, kulhad, saffron-cardamom, and the regional variations I've tasted and made over the years. I wanted a portfolio project where the **subject** was personal, the **execution** was premium, and the **process** showcased modern AI-assisted frontend workflows.

> I designed it like a cinematic digital magazine, where each scroll section is an edition of Indian chai culture.

## Tech stack

- **React 18** + **TypeScript** + **Vite 5**
- **Framer Motion** for restrained scroll-reveal and section transitions
- **CSS Modules** for scoped, modular styling (no framework lock-in)
- **Vercel** for deployment
- Google Fonts: **Fraunces** (display) + **Inter** (body)

No backend. No CMS. No heavyweight UI library. The project is deliberately small enough to read end-to-end in an interview.

## Features

- Cinematic editorial cover with fixed video background and poster fallback
- Seven scroll-driven editions (ED. 00 — ED. 06)
- Editorial Field Notes grid for chai ingredients
- A five-step brewing ritual section
- An editorial Collection with three product cards
- Colophon page with project credits and spec sheet
- Closing CTA + magazine-style footer
- Fixed editorial header with collapsible drawer navigation on mobile
- Scroll progress indicator powered by Framer Motion `useScroll`
- Loading screen with brand reveal
- Full `prefers-reduced-motion` support
- Open Graph + Twitter meta, semantic HTML, single H1

## AI-assisted workflow

AI helped accelerate visual asset creation and development, but I owned the concept, naming direction, product positioning, prompts, art direction, frontend architecture, asset integration, QA, performance checks, accessibility checks, GitHub workflow, and Vercel deployment.

AI was used as an accelerator, not an author. It helped with:

- Concept exploration and visual mood boarding
- AI-generated photographic/editorial imagery and cinematic loop video
- Drafting copy variations for headings and tasting notes
- Scaffolding TypeScript components and CSS module styles

## What I personally owned

- Concept and product positioning ("a cinematic digital magazine on Indian chai")
- Naming direction (Chai Edition, ED. 00 — ED. 06, Field Notes, Colophon)
- Prompts, art direction, and visual standards
- Frontend architecture and component decomposition
- TypeScript types and data modeling
- Asset integration, layout, and motion budget
- QA, accessibility checks, performance checks
- GitHub workflow and Vercel deployment

## Architecture

```
src/
  assets/
    images/   # 12 editorial images (AI-assisted)
    videos/   # cinematic loop in webm + mp4
  components/ # presentational + structural
    Header/
    LoadingScreen/
    ScrollProgress/
    VideoBackground/
    SectionTitle/
    EditionCard/
    ProductCard/
  sections/   # composed page sections
    Hero/
    Editions/
    FieldNotes/
    BrewingRitual/
    Collection/
    Colophon/
    CTA/
    Footer/
  data/       # typed content modules
    editionData.ts
    productData.ts
    ingredientData.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
```

**Why this shape:**
- `components/` holds reusable building blocks (cards, titles, chrome).
- `sections/` composes those blocks into magazine "spreads."
- `data/` keeps copy out of components so editorial content is editable in one place.
- `types/` centralizes the small public type surface.

## Performance considerations

- Background video uses `preload="metadata"`, `muted`, `playsInline`, with a poster image so the first paint is instant.
- WebM source is listed before MP4 for better compression on supporting browsers.
- All non-hero images use `loading="lazy"` and `decoding="async"`.
- Animations are restricted to `opacity` and `transform` — no layout thrash.
- No scroll-listener spaghetti; Framer Motion's `useScroll` + `whileInView` keeps work off the main thread.
- CSS modules are code-split per component by Vite.

## Accessibility considerations

- Single `<h1>` (Chai Edition), proper `<h2>` / `<h3>` hierarchy below.
- All meaningful images carry descriptive `alt` text; decorative video + ornaments are `aria-hidden`.
- Mobile nav drawer uses `role="dialog"`, `aria-modal`, escape-key dismissal, and body scroll lock.
- Focus is visible (`:focus-visible` ring in the brand saffron).
- All animations respect `prefers-reduced-motion` (both Framer Motion variants and a global CSS override).
- Color contrast pairs cream (`#F5EBDD`) on espresso (`#120D0A`) for body text well above WCAG AA.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.

## Security considerations

- No API keys, secrets, or `.env` files committed.
- No `dangerouslySetInnerHTML`; all rendered content is static and typed.
- External links use `rel="noopener noreferrer"`.
- `vercel.json` ships sensible defaults: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and HSTS.

## Local setup

Requires Node 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` runs `tsc -b && vite build` and emits a static site to `dist/`.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. In Vercel, **New Project → Import** the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy. `vercel.json` provides security headers and cache rules out of the box.

## Future improvements

- Replace placeholder assets with the final AI-generated cinematic frames.
- Add a `/print` route that re-flows the editions as a printable PDF zine.
- Subtle ambient audio toggle (chai stove + steam) gated behind a user gesture.
- Migrate to view-transition-based section animations once Safari ships full support.
- Add a Lighthouse CI workflow on PRs to lock in performance budgets.
