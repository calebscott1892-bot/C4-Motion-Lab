import Link from "next/link";
import type { Lab } from "@/lib/labs";

type LabPlaceholderProps = {
  lab: Lab;
};

export function LabPlaceholder({ lab }: LabPlaceholderProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/labs"
            className="text-sm text-muted transition hover:text-foreground"
          >
            Back to labs
          </Link>
          <span className="text-sm text-muted">{lab.number}</span>
        </header>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm uppercase text-muted">{lab.status}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-none md:text-7xl">
              {lab.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {lab.description}
            </p>
          </div>

          <div className="h-72 rounded-lg border border-white/10 bg-white/[0.025] p-5">
            <div className="flex h-full items-center justify-center rounded-md border border-dashed border-white/12">
              <span className="text-sm text-muted">Canvas slot</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
