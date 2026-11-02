"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { queryIndex, type SearchEntry } from "@/lib/search-query";

/** Client-side live search over the static registry index. */
export default function SearchClient({ entries }: { entries: SearchEntry[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const results = useMemo(() => queryIndex(entries, q), [entries, q]);

  return (
    <div>
      <form
        role="search"
        aria-label="Search study material"
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex max-w-[640px] gap-2"
      >
        <label htmlFor="site-search" className="sr-only">
          Search chapters, subjects and resources
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder="Try “light class 10” or “JEE kinematics”…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-12 w-full rounded border border-border bg-surface px-4 text-base text-text-primary placeholder:text-text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none"
        />
      </form>

      <div aria-live="polite" className="mt-6">
        {q.trim() === "" ? (
          <p className="text-[15px] text-text-secondary">
            Type to search chapters, subjects, resources, classes and exam
            tracks.
          </p>
        ) : results.length === 0 ? (
          <p className="text-[15px] text-text-secondary">
            No matches for “{q}”. Try a chapter name (e.g. “electricity”), a
            subject, or a class.
          </p>
        ) : (
          <>
            <p className="text-sm text-text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
                  >
                    <span className="text-[13px] font-semibold text-text-muted">
                      {r.kind} · {r.context}
                    </span>
                    <span className="mt-0.5 block font-bold text-text-primary">
                      {r.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-text-secondary">
                      {r.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
