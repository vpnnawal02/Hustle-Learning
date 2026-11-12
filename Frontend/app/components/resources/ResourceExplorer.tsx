"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import DiscoveryOptions from "@/app/components/discovery/DiscoveryOptions";

export interface ExplorerChapter {
  number: number;
  slug: string;
  title: string;
  href: string;
}

export interface ExplorerSubject {
  slug: string;
  name: string;
  tagline: string;
  count: number;
  href: string;
  chapters: ExplorerChapter[];
}

export interface ExplorerClass {
  slug: string;
  label: string;
  totalChapters: number;
  subjects: ExplorerSubject[];
}

function hashFor(slug: string) {
  return `#class-${slug}`;
}

function slugFromHash(hash: string): string | null {
  const m = hash.match(/^#class-([a-z0-9-]+)$/);
  return m ? m[1] : null;
}

/**
 * Interactive class → subject → chapter discovery. Tabs switch the
 * visible class (hash-synced, so direct URLs, refresh and back/forward
 * all work); the search filters the selected class's chapters live.
 * Server-prerenders the default class, so SEO and no-JS users still
 * get real content and working links.
 */
export default function ResourceExplorer({
  classes,
  defaultSlug,
  shortTitle,
}: {
  classes: ExplorerClass[];
  defaultSlug: string;
  shortTitle: string;
}) {
  const [selectedSlug, setSelectedSlug] = useState(defaultSlug);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Adopt deep links (#class-9) after mount; keeps SSR deterministic.
  useEffect(() => {
    const applyHash = () => {
      const slug = slugFromHash(window.location.hash);
      if (slug && classes.some((c) => c.slug === slug)) {
        setSelectedSlug(slug);
        setQuery("");
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [classes]);

  const selected =
    classes.find((c) => c.slug === selectedSlug) ?? classes[0];
  const classesWithContent = classes.filter((c) => c.totalChapters > 0);

  const selectClass = (slug: string) => {
    setSelectedSlug(slug);
    setQuery("");
    window.history.pushState(null, "", hashFor(slug));
  };

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (trimmed === "") return null;
    return selected.subjects.flatMap((subject) =>
      subject.chapters
        .filter((chapter) =>
          `${chapter.title} ${subject.name}`.toLowerCase().includes(trimmed),
        )
        .map((chapter) => ({ ...chapter, subjectName: subject.name })),
    );
  }, [trimmed, selected]);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <div role="group" aria-label="Select a class" className="mt-6">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {classes.map((cls) => {
            const active = cls.slug === selected.slug;
            const hasContent = cls.totalChapters > 0;
            return (
              <li key={cls.slug} className="min-w-0">
                <button
                  type="button"
                  onClick={() => selectClass(cls.slug)}
                  aria-pressed={active}
                  aria-label={`${cls.label}: ${hasContent ? `${cls.totalChapters} chapters available` : "coming soon"}`}
                  className={`flex min-h-[56px] w-full flex-col items-start justify-center gap-0.5 rounded-sm border px-4 py-2 text-left transition-colors ${
                    active
                      ? "border-accent bg-surface font-bold text-text-primary"
                      : "border-border bg-surface text-text-secondary hover:border-accent hover:text-text-primary"
                  }`}
                >
                  <span className="text-sm font-semibold">{cls.label}</span>
                  <span className="text-[13px] font-medium text-text-muted">
                    {hasContent
                      ? `${cls.totalChapters} chapter${cls.totalChapters === 1 ? "" : "s"}`
                      : "Coming soon"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected.totalChapters > 0 ? (
        <>
          <div className="mt-6">
            <label
              htmlFor="explorer-search"
              className="block text-sm font-semibold text-text-primary"
            >
              Search chapters in {selected.label}
            </label>
            <div className="relative mt-2 max-w-[560px]">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-muted"
              />
              <input
                ref={inputRef}
                id="explorer-search"
                name="chapter-search"
                type="search"
                autoComplete="off"
                placeholder="Search chapters, topics or concepts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query !== "") clearSearch();
                }}
                className="h-12 w-full rounded-md border border-border bg-surface pr-12 pl-11 text-[15px] text-text-primary placeholder:text-text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none"
              />
              {query !== "" && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {results !== null ? (
            <div aria-live="polite" className="mt-6">
              {results.length > 0 ? (
                <>
                  <p className="text-sm font-semibold text-text-secondary">
                    {results.length} result{results.length === 1 ? "" : "s"}{" "}
                    in {selected.label}
                  </p>
                  <ul className="mt-2 border-t border-border">
                    {results.map((chapter) => (
                      <li key={`${chapter.subjectName}-${chapter.slug}`}>
                        <Link
                          href={chapter.href}
                          className="group flex min-h-[52px] items-center gap-3 border-b border-border py-2.5 transition-colors hover:bg-surface-muted/50"
                        >
                          <span
                            aria-hidden="true"
                            className="w-14 shrink-0 text-[13px] font-bold text-text-muted"
                          >
                            Ch. {chapter.number}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                              {chapter.title}
                            </span>
                            <span className="mt-0.5 block text-[13px] text-text-muted">
                              {chapter.subjectName}
                            </span>
                          </span>
                          <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-primary"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="rounded-md border border-border bg-surface-muted/60 px-5 py-8 text-center">
                  <p className="font-bold text-text-primary">
                    No chapters match “{query.trim()}”
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[52ch] text-sm leading-[1.6] text-text-secondary">
                    Try a chapter name (e.g. “electricity”), a topic, or a
                    subject in {selected.label} {shortTitle.toLowerCase()}.
                  </p>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-4 inline-flex min-h-[44px] items-center rounded-md border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <DiscoveryOptions
              label={`${selected.label} subjects`}
              options={selected.subjects.map((subject) => ({
                href: subject.href,
                title: subject.name,
                meta: subject.tagline,
                badge: `${subject.count} chapter${subject.count === 1 ? "" : "s"}`,
                ariaLabel: `${subject.name}, ${selected.label}: ${subject.count} chapters`,
              }))}
            />
          )}
        </>
      ) : (
        <div className="mt-6 rounded-md border border-border bg-surface-muted/60 px-5 py-8 text-center">
          <p className="font-bold text-text-primary">
            No {shortTitle.toLowerCase()} for {selected.label} yet
          </p>
          <p className="mx-auto mt-1.5 max-w-[52ch] text-sm leading-[1.6] text-text-secondary">
            Our academic team is preparing these chapters.
            {classesWithContent.length > 0 &&
              " Meanwhile, explore what is already published:"}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {classesWithContent.map((cls) => (
              <button
                key={cls.slug}
                type="button"
                onClick={() => selectClass(cls.slug)}
                className="inline-flex min-h-[44px] items-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-text-primary transition-colors hover:border-accent"
              >
                {cls.label} · {cls.totalChapters} chapters
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
