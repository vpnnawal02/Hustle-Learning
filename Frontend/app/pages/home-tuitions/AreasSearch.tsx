"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";

export interface TuitionRegion {
  region: string;
  localities: string[];
}

export default function AreasSearch({ regions }: { regions: TuitionRegion[] }) {
  const [query, setQuery] = useState("");
  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return regions;
    return regions
      .map((r) => ({
        region: r.region,
        localities: r.localities.filter((l) =>
          l.toLowerCase().includes(q) || r.region.toLowerCase().includes(q),
        ),
      }))
      .filter((r) => r.localities.length > 0);
  }, [q, regions]);

  const totalLocalities = regions.reduce((n, r) => n + r.localities.length, 0);

  return (
    <div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted"
          />
          <label htmlFor="area-search" className="sr-only">
            Search tutors by area or locality in Delhi
          </label>
          <input
            id="area-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your locality — e.g. Rohini, Saket, Laxmi Nagar"
            className="h-12 w-full rounded-md border border-border bg-surface pr-3.5 pl-10 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
          />
        </div>
        <p className="text-sm text-text-secondary" role="status">
          {q
            ? `${filtered.reduce((n, r) => n + r.localities.length, 0)} of ${totalLocalities} localities match “${query.trim()}”`
            : `Showing all ${totalLocalities} localities across ${regions.length} regions`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-md border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-text-primary">
            No exact match for “{query.trim()}” yet.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            We still likely cover your area. Share your locality in the{" "}
            <Link
              href="/hire-a-tutor"
              className="font-semibold text-text-primary underline underline-offset-2"
            >
              enquiry form
            </Link>{" "}
            and we will confirm a home tutor near you on WhatsApp.
          </p>
        </div>
      ) : (
        <>
        <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <article
              key={r.region}
              className="flex h-full flex-col rounded-md border border-border bg-surface p-5 sm:p-6"
            >
              <h3 className="flex items-center gap-2 text-base font-bold text-text-primary">
                <MapPin size={17} aria-hidden="true" className="shrink-0 text-amber-600" />
                {r.region}
              </h3>
              <p className="mt-1 text-[13px] text-text-muted">
                Home tutors available in {r.localities.length} localit{r.localities.length === 1 ? "y" : "ies"}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {r.localities.map((locality) => (
                  <li
                    key={locality}
                    className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[12.5px] font-medium text-text-secondary"
                  >
                    {locality}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Link
                  href="/hire-a-tutor"
                  aria-label={`Find a home tutor in ${r.region}, Delhi`}
                  className="inline-flex text-sm font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-700"
                >
                  Find a tutor in {r.region}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 md:hidden">
          {filtered.map((r) => {
            const panelId = `area-panel-${r.region.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            const expanded = openRegion === r.region;
            return (
              <div
                key={r.region}
                className="rounded-md border border-border bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenRegion(expanded ? null : r.region)}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <span>
                    <span className="flex items-center gap-2 text-base font-bold text-text-primary">
                      <MapPin size={17} aria-hidden="true" className="shrink-0 text-amber-600" />
                      {r.region}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-text-muted">
                      Home tutors available in {r.localities.length} localit{r.localities.length === 1 ? "y" : "ies"}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {r.localities.map((locality) => (
                          <li
                            key={locality}
                            className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[12.5px] font-medium text-text-secondary"
                          >
                            {locality}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/hire-a-tutor"
                        aria-label={`Find a home tutor in ${r.region}, Delhi`}
                        className="mt-3 inline-flex text-sm font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-700"
                      >
                        Find a tutor in {r.region}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </>
      )}
    </div>
  );
}
