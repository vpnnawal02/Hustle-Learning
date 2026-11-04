"use client";

import { useEffect, useState } from "react";
import type { ContentBlock } from "@/types/content";
import { tocEntries } from "@/lib/content/toc";

/**
 * "On this page" navigation: every entry links to its section
 * (smooth scroll with navbar offset), and the section currently in
 * view is underlined via IntersectionObserver scroll-spy.
 */
export default function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const entries = tocEntries(blocks);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  if (entries.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="rounded-md border border-rule bg-surface p-5"
    >
      <p className="text-[13px] font-semibold text-navy-500">On this page</p>
      <ol className="mt-2 flex flex-col gap-1.5">
        {entries.map((h, i) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block py-1 text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-4"
                    : "font-medium text-navy-500 hover:text-navy-900 hover:underline hover:underline-offset-4"
                }`}
              >
                {i + 1}. {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
