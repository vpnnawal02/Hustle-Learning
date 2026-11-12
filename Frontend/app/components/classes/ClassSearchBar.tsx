import { Search } from "lucide-react";

/**
 * Wide icon-led search bar — no submit button, Enter submits to /search.
 */
export default function ClassSearchBar({ classLabel }: { classLabel: string }) {
  return (
    <form
      role="search"
      aria-label={`Search ${classLabel} study material`}
      action="/search"
      method="get"
      className="flex flex-col gap-0.5"
    >
      <label htmlFor="class-search" className="sr-only">
        Search chapters, topics, or papers
      </label>
      <div className="relative">
        <Search
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-muted"
        />
        <input
          id="class-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder={`Search chapters, topics, or papers`}
          className="h-12 w-full rounded-sm border border-border bg-surface pr-4 pl-11 text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold whitespace-nowrap text-on-accent transition-colors duration-[var(--motion-quick)] ease-out hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent-pressed motion-reduce:transition-none"
      >
        <Search size={18} strokeWidth={1.5} aria-hidden="true" />
        Search
      </button>
    </form>
  );
}
