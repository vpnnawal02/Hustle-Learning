import type {
  ChapterResourceItem,
  ExamResourceFile,
  ExamResourceItem,
  SchoolResourceSlug,
} from "@/types/content";

/** Pure, synchronous helpers — no I/O, safe to import anywhere. */

export function isSchoolResourceSlug(s: string): s is SchoolResourceSlug {
  return (
    [
      "ncert-solutions",
      "notes",
      "important-questions",
      "sample-papers",
      "pyqs",
      "worksheets",
      "formulas",
    ] as string[]
  ).includes(s);
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
