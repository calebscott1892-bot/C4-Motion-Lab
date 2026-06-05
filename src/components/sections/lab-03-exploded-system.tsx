"use client";

import Link from "next/link";
import { useRef } from "react";
import { Lab03Canvas } from "@/components/canvas/lab-03-canvas";
import { useCompactViewport } from "@/components/motion/use-compact-viewport";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { lab03Layers } from "@/lib/animation/lab-03-layers";

const lastLayerIndex = lab03Layers.length - 1;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

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
        <span>Lab 03</span>
        <span className="h-px w-10 bg-white/18" />
        <span>Exploded system</span>
      </div>
    </header>
  );
}

function LayerList({
  activeLayerIndex,
  finalReveal,
  labelReveal,
}: {
  activeLayerIndex: number;
  finalReveal: number;
  labelReveal: number;
}) {
  return (
    <div className="hidden gap-3 lg:grid">
      {lab03Layers.map((layer, index) => {
        const isActive = index === activeLayerIndex;
        const opacity = Math.min(
          1,
          0.24 + labelReveal * 0.54 + finalReveal * 0.18 + (isActive ? 0.2 : 0),
        );

        return (
          <article
            key={layer.id}
            aria-current={isActive ? "step" : undefined}
            className="border-l border-t py-3 pl-4 pr-4 backdrop-blur-md transition duration-500"
            style={{
              backgroundColor: isActive
                ? "rgba(5,6,9,0.86)"
                : "rgba(5,6,9,0.7)",
              borderColor: isActive ? layer.accent : "rgba(255,255,255,0.12)",
              opacity,
              transform: `translateX(${(1 - labelReveal) * 14}px)`,
            }}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              {layer.index} / {layer.label}
            </p>
            <h2 className="mt-2 text-xl font-medium leading-tight">
              {layer.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{layer.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function FinalOutcome({ finalReveal }: { finalReveal: number }) {
  return (
    <div
      aria-hidden={finalReveal < 0.5}
      className="mt-7 max-w-sm border-l border-white/18 bg-[#050609]/72 py-3 pl-4 pr-3 backdrop-blur-sm transition duration-700"
      style={{
        opacity: finalReveal,
        transform: `translateY(${(1 - finalReveal) * 12}px)`,
        visibility: finalReveal > 0.02 ? "visible" : "hidden",
      }}
    >
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        Commercial endpoint
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground">
        One connected growth layer, built to launch, measure, automate, and
        follow up.
      </p>
    </div>
  );
}

function ActiveLayerCard({ activeLayerIndex }: { activeLayerIndex: number }) {
  const layer = lab03Layers[activeLayerIndex] ?? lab03Layers[0];

  return (
    <article
      className="border-l bg-[#050609]/88 py-4 pl-5 pr-4 backdrop-blur-md lg:hidden"
      style={{ borderColor: layer.accent }}
    >
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        {layer.index} / {layer.label}
      </p>
      <h2 className="mt-3 text-2xl font-medium leading-tight">{layer.title}</h2>
      <p className="mt-2 text-base leading-7 text-muted">{layer.body}</p>
    </article>
  );
}

function Lab03ReducedMotionFallback() {
  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-7 md:px-10">
        <Header />

        <div className="absolute inset-0 opacity-[0.78]">
          <Lab03Canvas progress={0.78} reducedMotion />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-end gap-10 pb-10 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Reduced motion
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.98] md:text-6xl">
              C4 builds the full growth layer.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
              One connected service stack for identity, interface, search,
              workflows, reporting, and client follow-up.
            </p>
          </div>

          <div className="grid gap-3">
            {lab03Layers.map((layer) => (
              <article
                key={layer.id}
                className="border-l bg-[#050609]/82 py-3 pl-4 pr-3 backdrop-blur-sm"
                style={{ borderColor: layer.accent }}
              >
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {layer.index} / {layer.label}
                </p>
                <h2 className="mt-2 text-xl font-medium">{layer.body}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function Lab03ExplodedSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useCompactViewport();
  const layerProgress = smoothstep(progress, 0.12, 0.82);
  const labelReveal = smoothstep(progress, 0.34, 0.72);
  const finalReveal = smoothstep(progress, 0.82, 0.98);
  const activeLayerIndex = Math.min(
    lastLayerIndex,
    Math.floor(layerProgress * lab03Layers.length),
  );
  const progressLabel = `${Math.round(progress * 100)
    .toString()
    .padStart(2, "0")}%`;
  const isFinal = finalReveal > 0.45;

  if (prefersReducedMotion) {
    return <Lab03ReducedMotionFallback />;
  }

  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section
        ref={sectionRef}
        className="relative min-h-[560vh] overflow-clip bg-[#050609]"
        aria-label="Lab 03 exploded service-system diagram"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-y-0 left-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-y-0 right-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/10" />

          <div className="absolute inset-0 z-0">
            <Lab03Canvas compact={isCompact} progress={progress} />
          </div>

          <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 py-7 md:px-10">
            <Header />

            <div className="grid min-h-0 items-center gap-8 py-10 lg:grid-cols-[390px_1fr_360px]">
              <div className="self-start pt-16 md:self-center md:pt-0">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  Service-system decomposition
                </p>
                <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.98] md:text-6xl">
                  {isFinal
                    ? "C4 builds the full growth layer."
                    : "One system. Six growth layers."}
                </h1>
                <p className="mt-6 max-w-sm text-base leading-7 text-muted md:text-lg md:leading-8">
                  {isFinal
                    ? "From first impression to follow-up, C4 connects brand, website, search, automation, analytics, and CRM into one revenue-ready system."
                    : "A complete digital growth stack starts as one aligned object, then separates into the parts C4 can design, build, and improve."}
                </p>
                <FinalOutcome finalReveal={finalReveal} />
              </div>

              <div className="hidden lg:block" />

              <LayerList
                activeLayerIndex={activeLayerIndex}
                finalReveal={finalReveal}
                labelReveal={labelReveal}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <ActiveLayerCard activeLayerIndex={activeLayerIndex} />

              <div className="max-w-5xl">
                <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase text-muted md:justify-start md:gap-8">
                  <span>C4 Studios</span>
                  <span>
                    {isFinal ? "Full growth layer" : "Growth layer diagram"}
                  </span>
                  <span>{progressLabel}</span>
                </div>
                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="h-full origin-left bg-[#d8dee9]"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
