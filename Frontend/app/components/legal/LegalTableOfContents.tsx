"use client";

import { useEffect, useState } from "react";

export interface LegalTocEntry {
  id: string;
  label: string;
}

/**
 * "Table of contents" navigation for long legal pages: every entry
 * links to its section, and the section currently in view is
 * highlighted via IntersectionObserver scroll-spy.
 */
export default function LegalTableOfContents({
  entries,
}: {
  entries: LegalTocEntry[];
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const observer = new IntersectionObserver(
      (updates) => {
        for (const u of updates) {
          if (u.isIntersecting) setActive(u.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );
    for (const e of entries) {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-md border border-border bg-surface p-5"
    >
      <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
        Table of contents
      </p>
      <ol className="mt-3 flex flex-col gap-2">
        {entries.map((entry) => {
          const isActive = entry.id === active;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4"
                    : "font-medium text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-4"
                }`}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
