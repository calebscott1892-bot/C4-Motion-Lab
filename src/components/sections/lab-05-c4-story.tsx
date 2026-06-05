"use client";

import Link from "next/link";
import { useRef } from "react";
import { Lab05Scene } from "@/components/canvas/lab-05-scene";
import { useCompactViewport } from "@/components/motion/use-compact-viewport";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import {
  lab05ProcessCards,
  lab05StorySteps,
} from "@/lib/animation/lab-05-story";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function getActiveStepIndex(progress: number) {
  return lab05StorySteps.reduce((activeIndex, step, index) => {
    if (progress >= step.progress) {
      return index;
    }

    return activeIndex;
  }, 0);
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
        <span>Lab 05</span>
        <span className="h-px w-10 bg-white/18" />
        <span>C4 story</span>
      </div>
    </header>
  );
}

function StoryCopy({
  activeStepIndex,
  ctaReveal,
  introReveal,
}: {
  activeStepIndex: number;
  ctaReveal: number;
  introReveal: number;
}) {
  const activeStep = lab05StorySteps[activeStepIndex];
  const isCta = activeStep.id === "cta";

  return (
    <article className="self-start pt-12 md:self-center md:pt-0">
      <p className="text-[0.7rem] uppercase tracking-normal text-muted">
        C4 Studios brand-motion demo
      </p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.99] sm:text-5xl md:text-6xl">
        {activeStep.title}
      </h1>
      <p
        className="mt-5 max-w-xl text-base leading-7 text-muted transition duration-700 md:text-lg md:leading-8"
        style={{
          opacity: Math.max(0.52, introReveal),
          transform: `translateY(${(1 - introReveal) * 8}px)`,
        }}
      >
        {activeStepIndex === 0
          ? "C4 Studios turns a static business website into a connected growth system for strategy, design, development, automation, and improvement."
          : activeStep.body}
      </p>

      <div
        aria-hidden={!isCta}
        className="mt-7 max-w-lg border-l border-[#efe7d8]/40 bg-[#050609]/82 py-4 pl-4 pr-4 backdrop-blur-sm transition duration-700"
        style={{
          opacity: ctaReveal,
          transform: `translateY(${(1 - ctaReveal) * 12}px)`,
          visibility: ctaReveal > 0.02 ? "visible" : "hidden",
        }}
      >
        <p className="text-[0.7rem] uppercase tracking-normal text-muted">
          Final frame
        </p>
        <p className="mt-2 text-base leading-7 text-[#f4f1e8]">
          One connected web system for the offer, the experience, the build,
          the automation, and the growth loop.
        </p>
      </div>
    </article>
  );
}

function StoryRail({ activeStepIndex }: { activeStepIndex: number }) {
  const isFinal = lab05StorySteps[activeStepIndex]?.id === "cta";

  return (
    <div
      className="hidden gap-3 transition duration-700 lg:grid"
      style={{
        opacity: isFinal ? 0.32 : 1,
        transform: `translateX(${isFinal ? 16 : 0}px)`,
      }}
    >
      {lab05StorySteps.map((step, index) => {
        const isActive = index === activeStepIndex;

        return (
          <article
            key={step.id}
            aria-current={isActive ? "step" : undefined}
            className="border-l border-t py-3 pl-4 pr-4 backdrop-blur-md transition duration-500"
            style={{
              backgroundColor: isActive
                ? "rgba(5,6,9,0.84)"
                : "rgba(5,6,9,0.42)",
              borderColor: isActive ? step.accent : "rgba(255,255,255,0.12)",
              opacity: isActive ? 1 : 0.46,
            }}
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-normal text-muted">
              {Math.round(step.progress * 100)
                .toString()
                .padStart(2, "0")}
              %
            </p>
            <h2 className="mt-2 text-lg font-medium leading-tight">
              {step.label}
            </h2>
            <p
              className="overflow-hidden text-sm leading-6 text-muted transition duration-500"
              style={{
                marginTop: isActive ? 8 : 0,
                maxHeight: isActive ? 88 : 0,
                opacity: isActive ? 1 : 0,
              }}
            >
              {step.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function MobileStepCard({ activeStepIndex }: { activeStepIndex: number }) {
  const activeStep = lab05StorySteps[activeStepIndex];

  if (activeStep.id === "cta") {
    return null;
  }

  return (
    <article
      className="border-l bg-[#050609]/86 py-3 pl-4 pr-3 backdrop-blur-md lg:hidden"
      style={{ borderColor: activeStep.accent }}
    >
      <p className="text-[0.7rem] uppercase tracking-normal text-muted">
        {activeStep.label}
      </p>
      <h2 className="mt-2 text-base font-medium leading-7 text-[#f4f1e8]">
        {activeStep.body}
      </h2>
    </article>
  );
}

function ProcessCardsSection() {
  return (
    <section
      className="relative border-t border-white/10 bg-[#050609] px-6 py-24 text-foreground md:px-10 md:py-32"
      aria-label="C4 Studios service system"
    >
      <div className="pointer-events-none absolute inset-x-[8.333%] top-0 h-px bg-[#efe7d8]/28" />
      <div className="mx-auto grid max-w-7xl gap-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] uppercase tracking-normal text-muted">
              System handoff
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.04] sm:text-4xl md:text-6xl">
              Build the next version of your business online.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
            The story resolves into the practical C4 service system: clarify
            the offer, shape the experience, build the product-grade website,
            automate the follow-up, and keep improving what works.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {lab05ProcessCards.map((card) => (
            <article
              key={card.id}
              className="min-h-48 border-l border-t bg-white/[0.018] p-5 transition duration-300 hover:bg-white/[0.026] md:min-h-56"
              style={{ borderColor: card.accent }}
            >
              <p className="text-[0.7rem] uppercase tracking-normal text-muted">
                {card.index}
              </p>
              <h3 className="mt-8 text-2xl font-medium leading-tight">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReducedMotionLab05({ compact = false }: { compact?: boolean }) {
  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-7 md:px-10">
        <Header />

        <div className="absolute inset-0 opacity-[0.82]">
          <Lab05Scene compact={compact} progress={0.74} reducedMotion />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-end gap-10 pb-10 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.7rem] uppercase tracking-normal text-muted">
              Reduced motion
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              From static site to growth system.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
              We design, build, and automate the digital layer behind better
              client experiences.
            </p>
          </div>

          <div className="grid gap-3">
            {lab05ProcessCards.map((card) => (
              <article
                key={card.id}
                className="border-l bg-[#050609]/82 py-3 pl-4 pr-3 backdrop-blur-sm"
                style={{ borderColor: card.accent }}
              >
                <p className="text-xs uppercase text-muted">
                  {card.index} / {card.title}
                </p>
                <h2 className="mt-2 text-xl font-medium">{card.body}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProcessCardsSection />
    </main>
  );
}

export function Lab05C4Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useCompactViewport();
  const activeStepIndex = getActiveStepIndex(progress);
  const activeStep = lab05StorySteps[activeStepIndex];
  const introReveal = smoothstep(progress, 0.02, 0.12);
  const ctaReveal = smoothstep(progress, 0.64, 0.84);
  const progressLabel = `${Math.round(progress * 100)
    .toString()
    .padStart(2, "0")}%`;

  if (prefersReducedMotion) {
    return <ReducedMotionLab05 compact={isCompact} />;
  }

  return (
    <main className="min-h-screen bg-[#050609] text-foreground">
      <section
        ref={sectionRef}
        className="relative min-h-[520vh] overflow-clip bg-[#050609]"
        aria-label="Lab 05 C4 Studios signature scroll story"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-y-0 left-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-y-0 right-[8.333%] z-10 w-px bg-white/[0.045]" />
          <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/10" />

          <div className="absolute inset-0 z-0">
            <Lab05Scene compact={isCompact} progress={progress} />
          </div>

          <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 py-7 md:px-10">
            <Header />

            <div className="grid min-h-0 items-center gap-8 py-9 lg:grid-cols-[450px_1fr_360px]">
              <StoryCopy
                activeStepIndex={activeStepIndex}
                ctaReveal={ctaReveal}
                introReveal={introReveal}
              />
              <div className="hidden lg:block" />
              <StoryRail activeStepIndex={activeStepIndex} />
            </div>

            <footer className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <MobileStepCard activeStepIndex={activeStepIndex} />

              <div className="max-w-5xl">
                <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase text-muted md:justify-start md:gap-8">
                  <span>C4 Studios</span>
                  <span>
                    {activeStep.id === "cta"
                      ? "Growth system"
                      : activeStep.label}
                  </span>
                  <span>{progressLabel}</span>
                </div>
                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="h-full origin-left"
                    style={{
                      backgroundColor: activeStep.accent,
                      transform: `scaleX(${progress})`,
                    }}
                  />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>

      <ProcessCardsSection />
    </main>
  );
}
