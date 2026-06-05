"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lab04Scene } from "@/components/canvas/lab-04-scene";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return isCompact;
}

const motionNotes = [
  {
    body: "Give the mark weight before the page begins to move.",
    index: "01",
    title: "Identity",
  },
  {
    body: "Let the scroll feel guided, close, and intentional.",
    index: "02",
    title: "Interaction",
  },
  {
    body: "Connect the intro to the conversion path behind it.",
    index: "03",
    title: "System",
  },
] as const;

function Header() {
  return (
    <header className="pointer-events-auto relative z-20 flex items-center justify-between gap-6">
      <Link
        href="/labs"
        className="text-sm text-muted transition hover:text-foreground"
      >
        Back to labs
      </Link>
      <div className="flex items-center gap-3 text-xs uppercase text-muted">
        <span>Lab 04</span>
        <span className="h-px w-10 bg-white/18" />
        <span>Brand motion</span>
      </div>
    </header>
  );
}

function HeroCopy({
  copyReveal,
  finalReveal,
}: {
  copyReveal: number;
  finalReveal: number;
}) {
  const isFinal = finalReveal > 0.5;

  return (
    <div className="self-start pt-14 md:self-center md:pt-0">
      <p className="text-[0.7rem] uppercase tracking-normal text-muted">
        C4 brand-motion prototype
      </p>
      <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
        {isFinal
          ? "A brand intro for the product era."
          : "Websites that move like products."}
      </h1>
      <p
        className="mt-6 max-w-md text-base leading-7 text-muted transition duration-700 md:text-lg md:leading-8"
        style={{
          opacity: Math.max(0.5, copyReveal),
          transform: `translateY(${(1 - copyReveal) * 8}px)`,
        }}
      >
        Built with strategy, motion, and automation.
      </p>
      <div
        aria-hidden={finalReveal < 0.5}
        className="mt-7 hidden max-w-sm border-l border-white/18 bg-[#050609]/72 py-3 pl-4 pr-3 backdrop-blur-sm transition duration-700 md:block"
        style={{
          opacity: finalReveal,
          transform: `translateY(${(1 - finalReveal) * 12}px)`,
        visibility: finalReveal > 0.02 ? "visible" : "hidden",
      }}
    >
        <p className="text-[0.7rem] uppercase tracking-normal text-muted">
          Studio promise
        </p>
        <p className="mt-2 text-sm leading-6 text-[#f4f1e8]">
          A web presence that feels designed, engineered, and ready to scale.
        </p>
      </div>
    </div>
  );
}

function MotionNotes({ finalReveal }: { finalReveal: number }) {
  return (
    <div className="hidden gap-3 lg:grid">
      {motionNotes.map(({ body, index, title }, itemIndex) => {
        const isFinal = finalReveal > 0.5 && itemIndex === 2;

        return (
          <article
            key={index}
            className="border-l border-t py-3.5 pl-4 pr-4 backdrop-blur-md transition duration-500"
            style={{
              backgroundColor: isFinal
                ? "rgba(5,6,9,0.84)"
                : "rgba(5,6,9,0.56)",
              borderColor: isFinal ? "#f2f0e8" : "rgba(255,255,255,0.12)",
              opacity: itemIndex === 2 ? 0.46 + finalReveal * 0.54 : 0.76,
            }}
          >
            <p className="text-[0.7rem] uppercase tracking-normal text-muted">
              {index}
            </p>
            <h2 className="mt-2 text-lg font-medium leading-tight">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </article>
        );
      })}
    </div>
  );
}

function CtaSection() {
  return (
    <section className="grid min-h-screen border-t border-white/10 bg-[#050609] px-6 py-24 text-foreground md:px-10 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-10 self-center lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-[0.7rem] uppercase tracking-normal text-muted">
            Production direction
          </p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.03] md:text-6xl">
            Turn the placeholder mark into a real C4 launch signature.
          </h2>
        </div>
        <div className="max-w-xl">
          <p className="text-base leading-7 text-muted md:text-lg md:leading-8">
            The next pass can swap this primitive mark for the real identity,
            then tune material, camera distance, scroll timing, and page copy
            around the finished brand system.
          </p>
          <Link
            href="/labs"
            className="mt-8 inline-flex border border-white/16 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/34 hover:bg-white/[0.04]"
          >
            Review all labs
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReducedMotionLab04({ compact = false }: { compact?: boolean }) {
  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-7 md:px-10">
        <Header />

        <div className="absolute inset-0 opacity-[0.86]">
          <Lab04Scene compact={compact} progress={0.58} reducedMotion />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-end gap-10 pb-10 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.7rem] uppercase tracking-normal text-muted">
              Reduced motion
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              Websites that move like products.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Built with strategy, motion, and automation.
            </p>
          </div>
        </div>
      </section>
      <CtaSection />
    </main>
  );
}

export function Lab043DLogoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useCompactViewport();
  const copyReveal = smoothstep(progress, 0.1, 0.36);
  const finalReveal = smoothstep(progress, 0.72, 0.96);
  const progressLabel = `${Math.round(progress * 100)
    .toString()
    .padStart(2, "0")}%`;

  if (prefersReducedMotion) {
    return <ReducedMotionLab04 compact={isCompact} />;
  }

  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section
        ref={sectionRef}
        className="relative min-h-[420vh] overflow-clip bg-[#050609]"
        aria-label="Lab 04 premium 3D logo hero interaction"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-y-0 left-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-y-0 right-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/10" />

          <div className="absolute inset-0 z-0">
            <Lab04Scene compact={isCompact} progress={progress} />
          </div>

          <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 py-7 md:px-10">
            <Header />

            <div className="grid min-h-0 items-center gap-8 py-10 lg:grid-cols-[410px_1fr_330px]">
              <HeroCopy copyReveal={copyReveal} finalReveal={finalReveal} />
              <div className="hidden lg:block" />
              <MotionNotes finalReveal={finalReveal} />
            </div>

            <footer className="max-w-5xl">
              <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase text-muted md:justify-start md:gap-8">
                <span>C4 Studios</span>
                <span>{finalReveal > 0.5 ? "Launch signature" : "Logo motion study"}</span>
                <span>{progressLabel}</span>
              </div>
              <div className="h-px overflow-hidden bg-white/10">
                <div
                  className="h-full origin-left bg-[#e8dfd0]"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </footer>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
