import { Search } from "lucide-react";

/** Site search scoped to the class page — submits to /search via GET. */
export default function ClassSearchBar({ classLabel }: { classLabel: string }) {
  return (
    <form
      role="search"
      aria-label={`Search ${classLabel} study material`}
      action="/search"
      method="get"
      className="mt-6 flex max-w-[640px] gap-2"
    >
      <label htmlFor="class-search" className="sr-only">
        Search chapters, topics, or papers
      </label>
      <input
        id="class-search"
        name="q"
        type="search"
        autoComplete="off"
        placeholder={`Search ${classLabel} chapters, topics, or papers…`}
        className="h-12 w-full rounded-md border border-border bg-surface px-4 text-base text-text-primary placeholder:text-text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        <Search size={18} strokeWidth={2.5} aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
