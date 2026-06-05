import Link from "next/link";

const labs = [
  {
    href: "/labs/lab-01-pinned-hero",
    title: "Lab 01 — Pinned 3D Hero",
    description: "A centred 3D object with scroll-reactive text states.",
  },
  {
    href: "/labs/lab-02-scroll-camera",
    title: "Lab 02 — Scroll Camera Journey",
    description: "Move through a simple 3D scene with scroll.",
  },
  {
    href: "/labs/lab-03-exploded-object",
    title: "Lab 03 — Exploded Object Diagram",
    description: "Split a service system into layered 3D parts.",
  },
  {
    href: "/labs/lab-04-3d-logo",
    title: "Lab 04 — 3D Logo Hero",
    description: "Prototype a premium brand-motion hero.",
  },
  {
    href: "/labs/lab-05-c4-story",
    title: "Lab 05 — C4 Scroll Story",
    description: "Combine the labs into one signature C4 demo.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d10] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/50">
          C4 Motion Lab
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Spatial web experiments for premium 3D scroll design.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          A dedicated lab for learning React Three Fiber, Drei, GSAP, Lenis,
          and cinematic web interactions before using them in client work.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {labs.map((lab) => (
            <Link
              key={lab.href}
              href={lab.href}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <h2 className="text-xl font-medium">{lab.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                {lab.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
