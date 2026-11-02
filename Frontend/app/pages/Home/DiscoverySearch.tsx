"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface Suggestion {
  title: string;
  meta: string;
  href: string;
  group: string;
}

/**
 * Discovery search: live suggestions (max 6, grouped by class) over a
 * client-side filter of the chapter index, full keyboard support,
 * "/" focuses the field. Falls back to /search for full results.
 * TODO(backed): replace the client-side filter with a search backend
 * once query volume justifies it.
 */
export default function DiscoverySearch({ index }: { index: Suggestion[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index
      .filter((e) => {
        const hay = `${e.title} ${e.meta}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 6);
  }, [index, q]);

  // "/" focuses the field when the user is not already typing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        el.tagName !== "INPUT" &&
        el.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside pointer press.
  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open ]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" && results.length > 0) {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length > 0) {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (open && active >= 0 && results[active]) {
        e.preventDefault();
        go(results[active].href);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const groups = useMemo(() => {
    const map = new Map<string, Suggestion[]>();
    for (const r of results) {
      const list = map.get(r.group) ?? [];
      list.push(r);
      map.set(r.group, list);
    }
    return [...map.entries()];
  }, [results]);

  // Flat index for aria-activedescendant.
  const flat = results;

  return (
    <div ref={boxRef} className="relative mt-6 w-full max-w-[640px]">
      <form
        role="search"
        aria-label="Search study material"
        onSubmit={(e) => {
          e.preventDefault();
          if (open && active >= 0 && results[active]) go(results[active].href);
          else if (q.trim())
            router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <label htmlFor="discovery-search" className="sr-only">
          Search a chapter, topic or class
        </label>
        <input
          ref={inputRef}
          id="discovery-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder="Search a chapter, topic or class, e.g. Class 10 Light"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onInputKey}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-activedescendant={
            active >= 0 && flat[active]
              ? `${listId}-${flat[active].href}`
              : undefined
          }
          className="h-12 w-full rounded-md border border-border-strong bg-surface pr-28 pl-4 text-base text-navy-900 placeholder:text-navy-500 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/20 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute inset-y-0 right-0 rounded-r-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed sm:px-6"
        >
          Search
        </button>
      </form>

      {open && q.trim() !== "" && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute inset-x-0 top-full z-30 mt-2 rounded-md border border-rule bg-surface shadow-[0_4px_14px_rgba(15,27,51,0.08)]"
        >
          {results.length === 0 ? (
            <button
              type="button"
              onClick={() =>
                router.push(`/search?q=${encodeURIComponent(q.trim())}`)
              }
              className="flex min-h-[44px] w-full items-center px-4 py-3 text-left text-[15px] text-navy-700 hover:bg-canvas"
            >
              No quick match — search everything for “{q.trim()}”
            </button>
          ) : (
            groups.map(([group, items]) => (
              <div key={group}>
                <p className="px-4 pt-3 pb-1 text-xs font-medium tracking-[0.04em] text-navy-500 uppercase">
                  {group}
                </p>
                <ul>
                  {items.map((item) => {
                    const idx = flat.indexOf(item);
                    const selected = idx === active;
                    return (
                      <li
                        key={item.href}
                        id={`${listId}-${item.href}`}
                        role="option"
                        aria-selected={selected}
                      >
                        <button
                          type="button"
                          tabIndex={-1}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => go(item.href)}
                          className={`flex min-h-[44px] w-full flex-col justify-center gap-0.5 px-4 py-2 text-left ${
                            selected ? "bg-canvas" : ""
                          }`}
                        >
                          <span className="text-[15px] font-semibold text-navy-900">
                            {item.title}
                          </span>
                          <span className="text-[13px] text-navy-500">
                            {item.meta}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
