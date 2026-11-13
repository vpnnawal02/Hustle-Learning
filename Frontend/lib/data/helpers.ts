import type {
  ChapterResourceItem,
  ExamResourceFile,
  ExamResourceItem,
  SchoolResourceSlug,
} from "@/types/content";

/** Pure, synchronous helpers — no I/O, safe to import anywhere. */

/**
 * Keep in sync with `directory/_resources.json` (checked by
 * `npm run validate-content`) and `SchoolResourceSlug` in types/content.ts.
 */
const SCHOOL_RESOURCE_SLUGS: SchoolResourceSlug[] = [
  "ncert-solutions",
  "notes",
  "important-questions",
  "sample-papers",
  "pyqs",
  "worksheets",
  "formulas",
  "poem-explanations",
];

export function isSchoolResourceSlug(s: string): s is SchoolResourceSlug {
  return (SCHOOL_RESOURCE_SLUGS as string[]).includes(s);
}

export function publishedItems(
  file: { items: ChapterResourceItem[] } | null,
): ChapterResourceItem[] {
  if (!file) return [];
  return file.items.filter((i) => i.status === "published");
}

export function publishedExamItems(
  file: ExamResourceFile | null,
): ExamResourceItem[] {
  if (!file) return [];
  return file.items.filter((i) => i.status === "published");
}
