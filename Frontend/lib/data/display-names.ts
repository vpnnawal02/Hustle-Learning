import type { ResourceCategory } from "@/types/content";

/**
 * Per-subject display labels for resource categories (slugs unchanged).
 * English shows its legacy `notes` collection as "Chapter Summary"
 * (new poems belong in `poem-explanations`).
 */
const RESOURCE_LABEL_OVERRIDES: Record<
  string,
  Record<string, { title: string; shortTitle: string }>
> = {
  english: {
    notes: { title: "Chapter Summary", shortTitle: "Summary" },
  },
};

/** Category with any per-subject display label applied (slugs unchanged). */
export function displayCategory(
  subjectSlug: string,
  cat: ResourceCategory,
): ResourceCategory {
  const override = RESOURCE_LABEL_OVERRIDES[subjectSlug]?.[cat.slug];
  return override ? { ...cat, ...override } : cat;
}
