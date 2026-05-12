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

- **Cinematic scroll-driven journey** — a single pinned 760vh stage where scroll position drives layered image crossfades, video time-scrubbing, chapter caption reveals, and an editorial side rail
- **Cover + 8 editorial chapters** — ED. 00 The Pour → ED. 07 The Collection, surfaced as cinematic captions over a continuous visual journey instead of stacked content cards
- **Brewing ritual** woven into ED. 06 as five numbered editorial steps (not a separate boxed section)
- **Ingredient whispers** — subtle floating Hindi-named particles (Adrak, Elaichi, Dalchini, Kesar…) drifting behind the chapter captions
- **Editorial Collection** with three editorial product cards as the resolution after the journey ends
- **Colophon** with project credits, spec sheet, and a closing cinematic spread
- **Closing CTA** + magazine-style footer
- Fixed editorial header with collapsible drawer navigation (drawer links jump to specific chapters via anchor sentinels)
- Scroll progress indicator powered by Framer Motion `useScroll`
- Loading screen with brand reveal
- Full `prefers-reduced-motion` support — falls back to a clean stacked layout
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
    SectionTitle/
    ProductCard/
  sections/   # composed page sections
    CinematicJourney/   # the pinned scroll-driven stage (cover + 8 chapters)
    Collection/         # the resolution: three editorial product cards
    Colophon/           # credits, spec sheet, closing spread
    CTA/                # closing edition with project links
    Footer/             # brand, columns, build credits
  data/       # typed content modules
    journeyData.ts      # cover + chapter content for the journey
    productData.ts      # collection products
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
```

**Why this shape:**
- `components/` holds reusable building blocks (cards, titles, chrome).
- `sections/` composes those blocks into magazine "spreads."
- `CinematicJourney/` is the centerpiece — a single pinned section that owns the entire scroll narrative (video scrub, layered images, captions, side rail) instead of stacking many small content sections.
- `data/` keeps copy out of components so editorial content is editable in one place.
- `types/` centralizes the small public type surface.

## How scroll controls the experience

`CinematicJourney` declares a tall outer `<section>` (760 vh on desktop, 600 vh on small screens). Inside it sits a `position: sticky; top: 0; height: 100vh` stage that stays pinned while the user scrolls through the track.

A single Framer Motion `useScroll({ target, offset: ['start start', 'end end'] })` produces one `MotionValue<number>` — `scrollYProgress`, going 0 → 1 across the track. Everything reads from it:

- **Video scrub** — `useMotionValueEvent` reads progress; a RAF-throttled handler sets `video.currentTime = progress × duration`, so scrolling literally drags the cinematic loop forward or backward.
- **Image crossfade** — each chapter image is mounted as a full-bleed layer. A `useTransform` per layer maps progress to a `[0, 1, 1, 0]` opacity window centered on that chapter's stop, with a small scale offset for parallax feel.
- **Caption reveals** — the same windowing approach drives the editorial captions (label, headline, body, optional ritual steps), so text fades in only while its chapter is active.
- **Side rail** — `useMotionValueEvent` also updates a single piece of React state (`stopIndex`) so the side rail re-renders only when the active chapter changes, never on every frame.
- **Anchor sentinels** — drawer links like `#ed-03` work because each chapter has an invisible 1-pixel sentinel positioned within the track at the right scroll location via CSS `calc()`.

If the user has `prefers-reduced-motion: reduce`, the component swaps to a flat stacked layout (one chapter per article, native image lazy-loading, no pinning, no scrubbing). No scroll listeners, no Framer side effects.

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
