"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BellRing, Search, X } from "lucide-react";
import NewsCard, { CategoryPill, NewsMeta } from "@/app/components/NewsCard";
import {
  NEWS_ARTICLES,
  categoryCounts,
  type NewsArticle,
  type NewsCategory,
} from "@/app/components/news-articles";

const PAGE_SIZE = 9;

function FeaturedHero({ article }: { article: NewsArticle }) {
  return (
    <article className="lift grid overflow-hidden rounded-lg border border-border bg-surface md:grid-cols-2">
      <Link
        href={`/news/${article.slug}`}
        aria-label={article.title}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-surface-muted md:aspect-auto md:min-h-[280px]"
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          priority
          className="object-cover object-center"
        />
      </Link>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryPill category={article.category} />
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-on-accent uppercase">
            Top story
          </span>
        </div>
        <div className="mt-3">
          <NewsMeta article={article} />
        </div>
        <h2 className="mt-2 text-2xl leading-tight font-bold text-balance text-text-primary sm:text-[28px]">
          <Link
            href={`/news/${article.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-text-secondary">
          {article.summary}
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Read full story
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SecondaryCard({ article }: { article: NewsArticle }) {
  return (
    <article className="lift flex gap-4 overflow-hidden rounded-lg border border-border bg-surface p-4">
      <Link
        href={`/news/${article.slug}`}
        aria-label={article.title}
        className="relative block w-28 shrink-0 self-stretch overflow-hidden rounded-md bg-surface-muted sm:w-36"
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes="160px"
          loading="lazy"
          className="object-cover object-center"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <CategoryPill category={article.category} />
        <h3 className="mt-2 line-clamp-2 text-[15px] leading-snug font-bold text-text-primary">
          <Link
            href={`/news/${article.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <div className="mt-auto pt-2">
          <NewsMeta article={article} />
        </div>
      </div>
    </article>
  );
}

export default function NewsExplorer() {
  const [category, setCategory] = useState<"All" | NewsCategory>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");
  const counts = useMemo(() => categoryCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS_ARTICLES.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (!q) return true;
      return [a.title, a.summary, a.category, a.primaryKeyword]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, query]);

  const featured = useMemo(() => NEWS_ARTICLES.slice(0, 3), []);
  const popular = useMemo(
    () => NEWS_ARTICLES.filter((a) => a.priority === "high").slice(3, 6),
    [],
  );
  const dateSheet = useMemo(
    () =>
      ["news-001", "news-002", "news-003"].flatMap((id) =>
        NEWS_ARTICLES.find((a) => a.id === id) ?? [],
      ),
    [],
  );

  const shown = filtered.slice(0, visible);

  const pick = (c: "All" | NewsCategory) => {
    setCategory(c);
    setVisible(PAGE_SIZE);
  };

  const onQuery = (v: string) => {
    setQuery(v);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <form
        role="search"
        aria-label="Search news stories"
        onSubmit={(e) => e.preventDefault()}
        className="relative mt-8 w-full"
      >
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted"
        />
        <label htmlFor="news-search" className="sr-only">
          Search news stories
        </label>
        <input
          id="news-search"
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search date sheets, sample papers, Class 10…"
          autoComplete="off"
          className="h-12 w-full rounded-md border border-border bg-surface pr-10 pl-10 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQuery("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </form>
      {category === "All" && !query.trim() && dateSheet.length === 3 && (
        <div className="mt-8 rounded-lg border border-accent/60 bg-accent/10 p-5 sm:p-6">
          <p className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-on-accent uppercase">
            Highest priority · Board Exam 2027
          </p>
          <p className="mt-2 text-lg leading-snug font-bold text-balance text-text-primary sm:text-xl">
            CBSE Date Sheet 2027 — Class 10 &amp; 12 complete schedules
          </p>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            Start with the complete schedule, then jump to your class.
            Confirm every date against the official CBSE circular.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href={`/news/${dateSheet[0].slug}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Complete schedule
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={`/news/${dateSheet[1].slug}`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
            >
              Class 10 schedule
            </Link>
            <Link
              href={`/news/${dateSheet[2].slug}`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
            >
              Class 12 schedule
            </Link>
          </div>
        </div>
      )}

      {category === "All" && !query.trim() && (
        <div className="mt-8 grid gap-6">
          <FeaturedHero article={featured[0]} />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.slice(1).map((a) => (
              <SecondaryCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div
            role="group"
            aria-label="Filter by category"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto scroll-px-4 px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
          >
            <button
              type="button"
              onClick={() => pick("All")}
              aria-pressed={category === "All"}
              className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                category === "All"
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text-primary"
              }`}
            >
              All · {NEWS_ARTICLES.length}
            </button>
            {counts.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => pick(c.name)}
                aria-pressed={category === c.name}
                className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  category === c.name
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text-primary"
                }`}
              >
                {c.name} · {c.count}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-4 text-sm text-text-secondary">
            Showing {shown.length} of {filtered.length}{" "}
            {filtered.length === 1 ? "story" : "stories"}
            {category !== "All" && ` in ${category}`}
            {query.trim() && ` matching “${query.trim()}”`}
          </p>

          {filtered.length === 0 ? (
            <div className="mt-4 rounded-md border border-border bg-surface p-6 text-center">
              <p className="text-[15px] font-bold text-text-primary">
                No stories match “{query.trim()}”
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Try a different keyword or browse a category instead.
              </p>
              <button
                type="button"
                onClick={() => {
                  onQuery("");
                  pick("All");
                }}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
              >
                Clear search & filters
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {shown.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-8 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
              >
                Load more stories
              </button>
            </div>
          )}
        </div>

        <aside aria-label="News sidebar" className="min-w-0">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <nav
              aria-label="Categories"
              className="rounded-lg border border-border bg-surface p-5"
            >
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                Categories
              </p>
              <ul className="mt-3 flex flex-col">
                {counts.map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => pick(c.name)}
                      className="flex w-full items-center justify-between gap-2 rounded px-1 py-2 text-left text-sm font-medium text-text-secondary hover:text-text-primary"
                    >
                      <span className="underline-offset-4 hover:underline">
                        {c.name}
                      </span>
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold text-text-muted">
                        {c.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                Popular now
              </p>
              <ul className="mt-3 flex flex-col gap-4">
                {popular.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <Link
                      href={`/news/${a.slug}`}
                      aria-label={a.title}
                      className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-md bg-surface-muted"
                    >
                      <Image
                        src={a.image}
                        alt=""
                        fill
                        sizes="96px"
                        loading="lazy"
                        className="object-cover object-center"
                      />
                    </Link>
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm leading-snug font-bold text-text-primary">
                        <Link
                          href={`/news/${a.slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {a.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {a.dateLabel} · {a.readMinutes} min
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-brand-navy p-5 text-white dark:bg-surface dark:text-text-primary dark:border dark:border-border">
              <p className="flex items-center gap-2 text-base font-bold">
                <BellRing size={18} aria-hidden="true" className="text-accent" />
                Never miss a CBSE update
              </p>
              <p className="mt-2 text-sm leading-relaxed opacity-80">
                Date sheets, sample papers and prep guides — plus study
                resources that match each story.
              </p>
              <Link
                href="/subscribe"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Subscribe for updates
              </Link>
            </div>

            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                Official sources
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href="https://www.cbse.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    CBSE official website
                  </a>
                </li>
                <li>
                  <a
                    href="https://cbseacademic.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    CBSE Academic (sample papers)
                  </a>
                </li>
              </ul>
            </div>

            <nav
              aria-label="Keep learning"
              className="rounded-lg border border-accent/50 bg-accent/10 p-5"
            >
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                Keep learning
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm font-medium">
                <li>
                  <Link
                    href="/courses/class-10"
                    className="text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    Class 10 courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    Free study material
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enroll"
                    className="text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    Enrol now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}
