"use client";

import Link from "next/link";
import { useState } from "react";
import { Lab02Scene, Lab02StaticScene } from "@/components/canvas/lab-02-scene";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { lab02Stages } from "@/lib/animation/lab-02-stages";

function Lab02ReducedMotionFallback() {
  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-7 md:px-10">
        <Header />

        <div className="absolute inset-0 opacity-75">
          <div className="h-full w-full">
            <Lab02StaticScene />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-end gap-10 pb-10 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase text-muted">Reduced motion</p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.98] md:text-6xl">
              A static map of the C4 journey.
            </h1>
          </div>

          <div className="grid gap-3">
            {lab02Stages.map((stage) => (
              <article
                key={stage.id}
                className="border-l bg-[#050609]/82 py-3 pl-4 pr-3 backdrop-blur-sm"
                style={{ borderColor: stage.accent }}
              >
                <p className="text-xs uppercase text-muted">
                  {stage.index} / {stage.label}
                </p>
                <h2 className="mt-2 text-xl font-medium">{stage.title}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
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
        <span>Lab 02</span>
        <span className="h-px w-10 bg-white/18" />
        <span>Camera journey</span>
      </div>
    </header>
  );
}

export function Lab02ScrollCamera() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = lab02Stages[activeStageIndex];

  if (prefersReducedMotion) {
    return <Lab02ReducedMotionFallback />;
  }

  return (
    <main className="h-screen overflow-hidden bg-[#050609] text-foreground">
      <section
        className="relative h-screen overflow-hidden"
        aria-label="Lab 02 scroll-controlled camera journey"
      >
        <div className="absolute inset-y-0 left-[8.333%] z-10 w-px bg-white/[0.045]" />
        <div className="absolute inset-y-0 right-[8.333%] z-10 w-px bg-white/[0.045]" />
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/10" />

        <div className="absolute inset-x-0 top-0 z-20 px-6 py-7 md:px-10">
          <Header />
        </div>

        <Lab02Scene onStageChange={setActiveStageIndex} />

        <div className="pointer-events-none absolute inset-0 z-10 mx-auto grid max-w-7xl grid-rows-[1fr_auto] px-6 pb-24 pt-24 md:px-10 md:pb-10">
          <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_430px]">
            <div className="hidden space-y-6 lg:block">
              {lab02Stages.map((stage, index) => {
                const isActive = index === activeStageIndex;

                return (
                  <article
                    key={stage.id}
                    aria-current={isActive ? "step" : undefined}
                    className={`border-l py-1.5 pl-5 transition duration-700 ${
                      isActive ? "text-foreground" : "border-white/10 text-muted"
                    }`}
                    style={{ borderColor: isActive ? stage.accent : undefined }}
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.16em]">
                      {stage.index} / {stage.label}
                    </p>
                    <h2
                      className={`mt-2 max-w-52 text-lg font-medium leading-tight ${
                        isActive ? "opacity-100" : "opacity-45"
                      }`}
                    >
                      {stage.title}
                    </h2>
                  </article>
                );
              })}
            </div>

            <div />

            <article
              className="self-end border-l bg-[#050609]/86 py-5 pl-5 pr-4 backdrop-blur-md lg:self-center lg:bg-[#050609]/80 lg:py-6 lg:pl-6"
              style={{ borderColor: activeStage.accent }}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                <span className="font-mono">{activeStage.index}</span>
                <span className="mx-2 text-white/25">/</span>
                {activeStage.label}
              </p>
              <h1 className="mt-4 max-w-md text-4xl font-semibold leading-[0.98] md:text-6xl">
                {activeStage.title}
              </h1>
              <p className="mt-5 max-w-sm text-base leading-7 text-muted md:text-lg md:leading-8">
                {activeStage.body}
              </p>
            </article>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-6 right-6 z-20 hidden items-end justify-between text-xs uppercase text-muted md:flex md:left-10 md:right-10">
          <span>C4 spatial process</span>
          <span>
            Stage {activeStage.index} / {activeStage.label}
          </span>
        </div>
      </section>
    </main>
  );
}
