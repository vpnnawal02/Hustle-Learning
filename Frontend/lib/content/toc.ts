import type { ContentBlock } from "@/types/content";

/** Slugify heading text into a stable anchor id. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export interface TocEntry {
  id: string;
  text: string;
}

/**
 * H2 entries with deterministic unique ids, shared by the renderer
 * (which stamps the ids on headings) and the TOC (which links to them).
 */
export function tocEntries(blocks: ContentBlock[]): TocEntry[] {
  const used = new Map<string, number>();
  const out: TocEntry[] = [];
  for (const b of blocks) {
    if (b.type !== "heading" || b.level !== 2) continue;
    const base = slugifyHeading(b.text) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    out.push({ id: n === 0 ? base : `${base}-${n + 1}`, text: b.text });
  }
  return out;
}
