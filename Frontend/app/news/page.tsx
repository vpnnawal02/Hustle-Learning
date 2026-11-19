import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, canonical } from "@/lib/seo";
import NewsExplorer from "./NewsExplorer";

export const metadata: Metadata = buildMetadata({
  title: "Hustle Learning News – CBSE Updates, Board Exam 2027 & Prep Guides",
  description:
    "Latest CBSE updates, board exam 2027 schedules, sample papers, preparation strategies and practical exam guidance for Classes 10 and 12.",
  canonical: canonical("/news"),
});

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "News" },
        ])}
      />
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <section
          aria-labelledby="news-heading"
          className="rounded-md bg-brand-navy px-5 py-8 sm:px-8 sm:py-10"
        >
          <h1
            id="news-heading"
            className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl lg:text-[44px]"
          >
            Hustle Learning News
          </h1>
          <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-brand-white/85 sm:text-2xl">
            Board Exam 2027, CBSE updates & prep guides.
          </p>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-brand-white/75">
            Latest CBSE updates, examination news and educational resources
            for students — date sheets, sample papers, preparation strategies
            and practical exam guidance for the 2026–27 board season.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resources"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Explore study material
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
            >
              Browse courses
            </Link>
          </div>
        </section>
        <NewsExplorer />
      </main>
      <Footer />
    </div>
  );
}
