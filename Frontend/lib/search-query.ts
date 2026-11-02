/** Client-safe search types + ranking. No Node imports — safe to bundle. */

export interface SearchEntry {
  kind: "chapter" | "class" | "subject" | "resource" | "exam";
  title: string;
  description: string;
  href: string;
  context: string;
}

const KIND_RANK: Record<SearchEntry["kind"], number> = {
  chapter: 0,
  subject: 1,
  resource: 2,
  class: 3,
  exam: 4,
};

export function queryIndex(
  entries: SearchEntry[],
  q: string,
  limit = 24,
): SearchEntry[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const scored = entries
    .map((e) => {
      const hay = `${e.title} ${e.description} ${e.context}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (e.title.toLowerCase().includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
        else return null;
      }
      return { e, score: score * 10 - KIND_RANK[e.kind] };
    })
    .filter((x): x is { e: SearchEntry; score: number } => x !== null)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.e);
}
