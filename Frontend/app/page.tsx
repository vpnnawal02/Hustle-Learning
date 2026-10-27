export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">

      <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-12 px-4 py-12 md:px-6 md:py-24">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
            EdTech Platform
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-[-1px] sm:text-5xl md:text-[56px]">
            Learn Smart. Hustle Hard.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-[1.6] text-text-secondary">
            Frontend foundation is ready — Next.js + Tailwind CSS with the
            Hustle Learning design tokens. Light theme by default, dark theme
            supported.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <span className="inline-flex h-11 items-center justify-center rounded bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover">
              Get Started
            </span>
            <span className="inline-flex h-11 items-center justify-center rounded border border-border bg-surface px-5 text-sm font-semibold text-text-primary">
              Browse Courses
            </span>
          </div>
        </section>

        <section
          aria-label="Design tokens"
          className="grid gap-6 sm:grid-cols-3"
        >
          {[
            { label: "Brand Navy", value: "#14213D", swatch: "bg-brand-navy" },
            { label: "Brand Amber", value: "#FCA311", swatch: "bg-brand-amber" },
            { label: "Surface", value: "Themed", swatch: "bg-surface-muted" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div
                className={`h-12 rounded border border-border ${item.swatch}`}
                aria-hidden="true"
              />
              <p className="mt-4 text-base font-semibold">{item.label}</p>
              <p className="font-mono text-sm text-text-muted">{item.value}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 text-sm text-text-secondary md:px-6">
          Hustle Learning — Frontend scaffold. Backend: Supabase Functions.
          Database: Supabase.
        </div>
      </footer>
    </div>
  );
}
