import Link from "next/link";
import { labs } from "@/lib/labs";

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <section className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/"
            className="text-sm text-muted transition hover:text-foreground"
          >
            C4 Motion Lab
          </Link>
          <span className="text-sm text-muted">{labs.length} labs</span>
        </header>

        <div className="grid gap-10 py-16 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="text-sm uppercase text-muted">Labs index</p>
            <h1 className="mt-4 text-5xl font-semibold leading-none">
              Scroll-based 3D studies.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Minimal route scaffolds for focused motion experiments.
            </p>
          </div>

          <div className="grid gap-3">
            {labs.map((lab) => (
              <Link
                key={lab.href}
                href={lab.href}
                className="rounded-lg border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/25 hover:bg-white/[0.055]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted">{lab.number}</span>
                  <span className="text-xs uppercase text-muted">
                    {lab.status}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-medium">{lab.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {lab.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
