import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { buildMetadata, canonical } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News & Updates | Hustle Learning",
  description:
    "Latest updates from Hustle Learning — new study material, batches, features and announcements.",
  canonical: canonical("/news"),
});

const UPDATES = [
  {
    date: "2026-10-15",
    dateLabel: "October 2026",
    title: "Study material platform launched",
    text: "Chapter-wise NCERT solutions, notes, important questions, sample papers, PYQs, worksheets and formula sheets for Classes 6–10 are now live, alongside dedicated JEE and NEET tracks.",
    href: "/resources",
    cta: "Browse study material",
  },
  {
    date: "2026-10-01",
    dateLabel: "October 2026",
    title: "JEE and NEET preparation tracks",
    text: "Structured Physics, Chemistry, Mathematics and Biology tracks with notes, chapter-wise PYQs, practice questions and mock tests.",
    href: "/jee",
    cta: "Explore JEE",
  },
  {
    date: "2026-09-20",
    dateLabel: "September 2026",
    title: "Admissions open: new session batches",
    text: "Online classes and personal home tuition batches for Classes 6–12 across all subjects. Request a callback to find the right plan.",
    href: "/#hero-enquiry",
    cta: "Get a free callback",
  },
];

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[860px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Newsroom
        </h1>
        <p className="mt-3 text-xl leading-snug font-bold text-text-secondary">
          News & Updates
        </p>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Announcements about new study material, batches and platform
          features.
        </p>
        <ol className="mt-8 flex flex-col gap-4">
          {UPDATES.map((update) => (
            <li key={update.title}>
              <article className="rounded-lg border border-border bg-surface p-5 sm:p-6">
                <p className="text-[13px] font-semibold text-text-muted">
                  <time dateTime={update.date}>{update.dateLabel}</time>
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-text-primary">
                  {update.title}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
                  {update.text}
                </p>
                <Link
                  href={update.href}
                  className="mt-4 inline-flex h-11 items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  {update.cta}
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  );
}
