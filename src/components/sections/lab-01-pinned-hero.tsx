"use client";

import Link from "next/link";
import { useRef } from "react";
import { Lab01Canvas } from "@/components/canvas/lab-01-canvas";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { lab01States } from "@/lib/animation/lab-01-states";

export function Lab01PinnedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  const activeIndex = Math.min(
    lab01States.length - 1,
    Math.floor(progress * lab01States.length),
  );
  const activeState = lab01States[activeIndex];
  const progressLabel = `${Math.round(progress * 100)
    .toString()
    .padStart(2, "0")}%`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        ref={sectionRef}
        className="relative min-h-[430vh] overflow-clip bg-background"
        aria-label="Lab 01 pinned hero scroll study"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="absolute inset-0 z-0 mx-auto h-full max-w-5xl">
            <Lab01Canvas
              progress={progress}
              reducedMotion={prefersReducedMotion}
            />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 py-6 md:px-10">
            <header className="pointer-events-auto flex items-center justify-between gap-6">
              <Link
                href="/labs"
                className="text-sm text-muted transition hover:text-foreground"
              >
                Back to labs
              </Link>
              <div className="flex items-center gap-3 text-xs uppercase text-muted">
                <span>Lab 01</span>
                <span className="h-px w-8 bg-white/20" />
                <span>Pinned hero</span>
              </div>
            </header>

            <div className="grid min-h-0 items-center gap-8 py-10 lg:grid-cols-[300px_1fr_330px]">
              <div className="hidden space-y-3 lg:block">
                {lab01States.map((state, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <article
                      key={state.id}
                      aria-current={isActive ? "step" : undefined}
                      className={`border-l pl-4 transition duration-300 ${
                        isActive
                          ? "border-[#7ea8ff] text-foreground"
                          : "border-white/10 text-muted"
                      }`}
                    >
                      <p className="text-sm uppercase">{state.label}</p>
                      <h2
                        className={`mt-2 text-xl font-medium leading-tight ${
                          isActive ? "opacity-100" : "opacity-45"
                        }`}
                      >
                        {state.title}
                      </h2>
                    </article>
                  );
                })}
              </div>

              <div className="hidden lg:block" />

              <article className="self-end border-l border-white/12 bg-background/55 py-1 pl-5 backdrop-blur-sm lg:self-center lg:bg-transparent lg:backdrop-blur-none">
                <p className="text-sm uppercase text-[#9fbfff]">
                  {activeState.label}
                </p>
                <h1 className="mt-4 max-w-sm text-4xl font-semibold leading-none md:text-5xl">
                  {activeState.title}
                </h1>
                <p className="mt-5 max-w-sm text-base leading-7 text-muted">
                  {activeState.body}
                </p>
              </article>
            </div>

            <footer className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mb-3 max-w-md text-sm leading-6 text-muted">
                  Primitive object staged across four production states.
                </p>
                <div className="h-px overflow-hidden bg-white/12">
                  <div
                    className="h-full origin-left bg-[#7ea8ff]"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </div>
              </div>
              <p className="font-mono text-sm text-muted">{progressLabel}</p>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
