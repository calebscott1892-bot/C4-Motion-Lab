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
        className="relative min-h-[430vh] overflow-clip bg-[#07080a]"
        aria-label="Lab 01 pinned hero scroll study"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-y-0 left-[8.333%] w-px bg-white/[0.045]" />
          <div className="absolute inset-y-0 right-[8.333%] w-px bg-white/[0.045]" />
          <div className="absolute left-0 right-0 top-[62%] h-px bg-white/[0.045]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="absolute inset-0 z-0 mx-auto h-full max-w-5xl lg:-translate-x-16">
            <Lab01Canvas
              progress={progress}
              reducedMotion={prefersReducedMotion}
            />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 py-7 md:px-10">
            <header className="pointer-events-auto flex items-center justify-between gap-6">
              <Link
                href="/labs"
                className="text-sm text-muted transition hover:text-foreground"
              >
                Back to labs
              </Link>
              <div className="flex items-center gap-3 text-xs uppercase text-muted">
                <span>Lab 01</span>
                <span className="h-px w-10 bg-white/18" />
                <span>Scroll study</span>
              </div>
            </header>

            <div className="grid min-h-0 items-center gap-8 py-10 lg:grid-cols-[320px_1fr_410px]">
              <div className="hidden space-y-5 lg:block">
                {lab01States.map((state, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <article
                      key={state.id}
                      aria-current={isActive ? "step" : undefined}
                      className={`border-l py-1 pl-5 transition duration-500 ${
                        isActive
                          ? "text-foreground"
                          : "border-white/10 text-muted"
                      }`}
                      style={{
                        borderColor: isActive ? activeState.color : undefined,
                      }}
                    >
                      <p className="text-xs uppercase">{state.label}</p>
                      <h2
                        className={`mt-2 text-lg font-medium leading-tight ${
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

              <article
                className="self-end border-l bg-[#07080a]/90 py-4 pl-5 pr-4 backdrop-blur-sm lg:self-center lg:bg-[#07080a]/95 lg:py-4 lg:pr-0"
                style={{ borderColor: activeState.color }}
              >
                <p className="text-xs uppercase" style={{ color: activeState.color }}>
                  {activeState.label}
                </p>
                <h1 className="mt-5 max-w-md text-4xl font-semibold leading-[0.96] md:text-6xl lg:text-7xl">
                  {activeState.title}
                </h1>
                <p className="mt-6 max-w-sm text-base leading-7 text-muted md:text-lg md:leading-8">
                  {activeState.body}
                </p>
              </article>
            </div>

            <footer className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-5xl">
                <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase text-muted md:justify-start md:gap-8">
                  <span>C4 Studios</span>
                  <span>Motion system 01</span>
                  <span>{activeState.label}</span>
                </div>
                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="h-full origin-left"
                    style={{
                      backgroundColor: activeState.color,
                      transform: `scaleX(${progress})`,
                    }}
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
