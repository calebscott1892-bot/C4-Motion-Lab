# C4 Motion Lab

C4 Motion Lab is a focused Next.js lab for learning and demonstrating premium scroll-based 3D web interactions. It is designed as a reusable creative-development playground, a portfolio asset, and a practical capability demo for C4 Studios.

The project favors simple geometry, clear scroll phases, readable code, and production-minded performance choices. The goal is to prove interaction patterns before introducing real brand assets, GLB models, shaders, or heavier art direction.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- GSAP, Lenis, and Leva installed for future experiments

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

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
    canvas/      React Three Fiber scenes and objects
    motion/      scroll, reduced-motion, and viewport hooks
    sections/    page-level lab compositions
  lib/
    animation/   lab copy, timing, and stage data
    three/       shared canvas performance settings
```

## Labs

### Lab 01: Pinned 3D Hero

Route: `/labs/lab-01-pinned-hero`

- Demonstrates: A pinned full-screen hero where scroll progress moves a centered 3D object through Strategy, Design, Development, and Automation states.
- Technical focus: R3F canvas setup, scroll progress mapping, authored transform states, `useFrame` interpolation, HTML overlays, reduced-motion fallback.
- Could become: A premium C4 service hero or process intro that explains the studio method without relying on a generic flat section.

### Lab 02: Scroll Camera Journey

Route: `/labs/lab-02-scroll-camera`

- Demonstrates: A camera journey through floating objects representing Discover, Design, Build, Automate, and Grow.
- Technical focus: Drei `ScrollControls`, depth staging, camera interpolation, stage activation, responsive static fallback.
- Could become: A spatial process section for a C4 or client site where the visitor feels like they are moving through a system.

### Lab 03: Exploded Service-System Diagram

Route: `/labs/lab-03-exploded-object`

- Demonstrates: A unified growth system that separates into Brand, Website, SEO, Automation, Analytics, and CRM layers.
- Technical focus: Data-driven 3D layer components, scroll-based separation, crisp labels, mobile simplification, reduced-motion service stack.
- Could become: A commercial C4 service section showing that the offer is a complete growth layer, not just a website build.

### Lab 04: 3D Logo Hero

Route: `/labs/lab-04-3d-logo`

- Demonstrates: A premium C4-style mark built from simple geometry, with subtle light, scroll push-in, separation, and CTA resolution.
- Technical focus: Brand-motion staging, primitive mark construction, lighting polish, camera framing, accessible static fallback.
- Could become: A homepage intro, launch signature, or brand-led case-study opener once the real C4 mark is imported.

### Lab 05: C4 Signature Scroll Story

Route: `/labs/lab-05-c4-story`

- Demonstrates: A cinematic C4 Studios story: static website shell, approach, website panels, layer split, connected ecosystem, CTA resolve, and service-card handoff.
- Technical focus: Multi-phase scroll narrative, R3F scene orchestration, primitive C4-style brand object, camera rigging, reusable process data, HTML copy layers, reduced-motion support.
- Could become: A public C4 capability section showing how a static business website becomes a digital growth system.

## Performance and Accessibility Choices

- Shared canvas settings live in `src/lib/three/canvas-settings.ts`.
- DPR is capped to reduce GPU cost on high-density displays.
- WebGL canvases are route-isolated, so the homepage and labs index do not mount every scene at once.
- Reduced-motion support is built into the labs through `prefers-reduced-motion` checks and static/simplified scene states.
- Mobile layouts simplify dense scenes and keep copy readable over the canvas.
- Scenes currently use simple primitives only: no external models, heavy shaders, or particle systems.

## Current Limitations

- The C4 mark is still a primitive-built placeholder, not the final SVG or GLB brand asset.
- The scenes are designed prototypes, not final client production sections.
- GSAP, Lenis, and Leva are installed but not yet deeply used across the labs.
- No custom shaders or advanced material systems have been added yet.
- Real-device WebGL profiling is still needed before shipping any lab as a production site section.
- Copy and brand language should be tightened again once the final C4 identity assets are available.

## Roadmap

- Replace placeholder marks with the real C4 SVG or GLB mark.
- Define a Spline, Blender, and GLB workflow for production-ready brand objects.
- Add shader and material experiments once the base interactions are stable.
- Build a particle or network-interface lab for automation, CRM, and data-flow stories.
- Turn Lab 03 or Lab 05 into a production C4 Studios website section.

## Maintainer Notes

Keep labs small, named, and route-isolated. Start with simple primitives until the interaction pattern is clear. Add abstractions only when they make multiple labs easier to maintain.
