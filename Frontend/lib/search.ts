import { getAllPublishedExamItems } from "./data/exams";
import { getAllPublishedSchoolItems, getClasses } from "./data/school";
import { getExams } from "./data/exams";
import { getResourceCategories } from "./data/school";
import { urls } from "./urls";
import type { SearchEntry } from "./search-query";

export type { SearchEntry };
export { queryIndex } from "./search-query";

/**
 * Lightweight static search index assembled from the data registry.
 * No external search infrastructure — suitable for a static content site
 * at current scale. (Documented upgrade path: Pagefind.)
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];

  for (const cls of await getClasses()) {
    entries.push({
      kind: "class",
      title: `${cls.label} — ${cls.tagline}`,
      description: cls.description,
      href: urls.classPage(cls.slug),
      context: cls.label,
    });
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      entries.push({
        kind: "subject",
        title: `${cls.label} ${subject.name}`,
        description: subject.description,
        href: urls.subjectPage(cls.slug, subject.slug),
        context: `${cls.label} · ${subject.name}`,
      });
      for (const chapter of subject.chapters) {
        entries.push({
          kind: "chapter",
          title: `${chapter.title} — ${cls.label} ${subject.name}`,
          description: `Chapter ${chapter.number} resources: notes, NCERT solutions, important questions and more.`,
          href: urls.subjectPage(cls.slug, subject.slug),
          context: `${cls.label} · ${subject.name}`,
        });
      }
    }
  }

  for (const cat of await getResourceCategories()) {
    entries.push({
      kind: "resource",
      title: cat.title,
      description: cat.description,
      href: urls.resourceHub(cat.slug),
      context: "Study Resources",
    });
  }

  for (const exam of await getExams()) {
    entries.push({
      kind: "exam",
      title: `${exam.name} — ${exam.tagline}`,
      description: exam.description,
      href: urls.examPage(exam.slug),
      context: exam.name,
    });
    for (const subject of exam.subjects) {
      entries.push({
        kind: "subject",
        title: `${exam.name} ${subject.name}`,
        description: subject.description,
        href: urls.examSubjectPage(exam.slug, subject.slug),
        context: `${exam.name} · ${subject.name}`,
      });
    }
  }

  for (const { classSlug, subjectSlug, resourceSlug, item } of await getAllPublishedSchoolItems()) {
    entries.push({
      kind: "chapter",
      title: item.title,
      description: item.description,
      href: urls.chapterPage(classSlug, subjectSlug, resourceSlug, item.chapterSlug),
      context: `${classSlug} · ${subjectSlug}`,
    });
  }

  for (const { examSlug, subjectSlug, resourceSlug, item } of await getAllPublishedExamItems()) {
    entries.push({
      kind: "chapter",
      title: item.title,
      description: item.description,
      href: urls.examResourcePage(examSlug, subjectSlug, resourceSlug),
      context: `${examSlug} · ${subjectSlug}`,
    });
  }

  return entries;
}
