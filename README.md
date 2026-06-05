# C4 Motion Lab

C4 Motion Lab is a dedicated Next.js learning and portfolio lab for premium scroll-based 3D web interactions. It is built for experimenting with React Three Fiber, Drei, scroll progress, camera motion, reduced-motion fallbacks, and commercially useful creative-development patterns for C4 Studios.

The project is intentionally minimal. The labs use simple geometry instead of external models so the focus stays on interaction structure, scene composition, pacing, and performance.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- GSAP, Lenis, and Leva installed for future motion experiments

## Project Structure

```txt
src/
  app/
    page.tsx
    labs/
      page.tsx
      lab-01-pinned-hero/page.tsx
      lab-02-scroll-camera/page.tsx
      lab-03-exploded-object/page.tsx
      lab-04-3d-logo/page.tsx
      lab-05-c4-story/page.tsx
  components/
    canvas/      3D scenes and R3F objects
    layout/      shared layout space
    motion/      browser motion hooks
    sections/    page-level lab compositions
  lib/
    animation/   lab data and scroll state constants
    three/       shared canvas settings
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Labs

### Lab 01: Pinned 3D Hero

Route: `/labs/lab-01-pinned-hero`

- Interaction pattern: A pinned full-screen hero where scroll progress moves a centered 3D object through Strategy, Design, Development, and Automation states.
- Technical concepts: R3F canvas setup, authored transform states, smooth interpolation in `useFrame`, HTML overlays synced to scroll progress, reduced-motion fallback.
- Real C4 use: A premium service hero for explaining the C4 process without jumping straight into a full case study.
- Readiness: Strong interactive prototype. Good for internal demos and screen recording after content tuning.

### Lab 02: Scroll Camera Journey

Route: `/labs/lab-02-scroll-camera`

- Interaction pattern: A scroll-controlled camera path through floating objects representing Discover, Design, Build, Automate, and Grow.
- Technical concepts: Drei `ScrollControls`, depth-based object staging, camera interpolation, stage activation, responsive fallback scene.
- Real C4 use: A spatial process section that makes the studio workflow feel immersive rather than flat.
- Readiness: Strong prototype. Needs device profiling and copy polish before client use.

### Lab 03: Exploded Service-System Diagram

Route: `/labs/lab-03-exploded-object`

- Interaction pattern: A unified 3D growth system separates into Brand, Website, SEO, Automation, Analytics, and CRM layers as the page scrolls.
- Technical concepts: Data-driven 3D layers, scroll-based separation, readable labels, compact viewport behavior, reduced-motion service stack.
- Real C4 use: A commercial service section showing that C4 builds the full digital growth layer, not just isolated pages.
- Readiness: Commercially useful prototype. Best candidate for conversion into a real C4 service page section.

### Lab 04: 3D Logo Hero

Route: `/labs/lab-04-3d-logo`

- Interaction pattern: A placeholder C4-style 3D mark rotates subtly, catches light, and separates/pushes in with scroll before resolving into a CTA.
- Technical concepts: Brand-motion staging with primitives, lighting polish, scroll-linked transforms, camera framing, accessible static fallback.
- Real C4 use: A future homepage or launch intro once the placeholder mark is replaced with a real brand asset.
- Readiness: Strong brand-motion prototype. Needs final logo geometry before production.

### Lab 05: C4 Signature Story

Route: `/labs/lab-05-c4-story`

- Interaction pattern: A cinematic scroll story that moves from a C4-style mark to website panels, exploded growth layers, connected ecosystem, CTA, and service cards.
- Technical concepts: Multi-phase scroll narrative, R3F scene orchestration, camera rigging, reusable process data, HTML story overlays, reduced-motion narrative fallback.
- Real C4 use: A portfolio-grade capability demo showing how C4 turns a static website into a digital growth system.
- Readiness: Portfolio prototype. Good enough to refine toward public posting, but still needs real brand assets and production profiling.

## Performance and Accessibility Notes

- Reduced-motion support is included across the labs through `prefers-reduced-motion` checks and static or simplified scene states.
- Canvas DPR is capped through `src/lib/three/canvas-settings.ts` to reduce GPU load on high-density displays.
- Canvases are route-isolated, so each lab loads its own WebGL experience instead of putting every scene on the homepage.
- Mobile behavior is simplified where needed, especially for dense scroll stories and layered diagrams.
- Current scenes use simple primitives only. No external models, shaders, or particle systems are required yet.

## Roadmap

- Replace placeholder C4 marks with real C4 brand assets.
- Add a Blender/GLB workflow for production-ready model import.
- Explore Spline for quick art-direction prototypes, then rebuild final interactions in maintainable R3F where needed.
- Add shader and material experiments once the base interaction patterns are stable.
- Build a particle or network-interface lab for automation, CRM, and data-flow stories.
- Turn Lab 03 or Lab 05 into a production C4 Studios website section.

## Maintainer Notes

Keep new labs small, named, and route-isolated. Prefer simple geometry until the interaction pattern is clear. Add abstractions only when two or more labs genuinely benefit from sharing the same logic.
