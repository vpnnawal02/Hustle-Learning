import type { MetadataRoute } from "next";
import { getAllPublishedExamItems, getExams } from "@/lib/data/exams";
import {
  getAllPublishedSchoolItems,
  getClasses,
  getResourceCategories,
  getResourceFile,
} from "@/lib/data/school";
import {
  getClassesForMaterial,
  getClassesForSubject,
  getMaterialsForClassSubject,
  getSubjectsForClassMaterial,
  getSubjectUniverse,
} from "@/lib/discovery";
import { publishedItems } from "@/lib/data/helpers";
import { SITE_URL } from "@/lib/site";
import { urls } from "@/lib/urls";

/**
 * Dynamic XML sitemap — published, content-bearing pages only.
 * Draft / empty / coming-soon pages are excluded (they carry noindex).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const push = (path: string, lastModified?: string, priority = 0.7) =>
    entries.push({
      url: `${SITE_URL}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly" as const,
      priority,
    });

  // Core static pages.
  push("/", undefined, 1);
  push("/resources", undefined, 0.9);
  push("/classes", undefined, 0.6);
  push("/courses", undefined, 0.6);
  push("/news", undefined, 0.6);
  push("/subscribe", undefined, 0.5);

  // Resource category hubs (only with published content).
  const categories = await getResourceCategories();
  const classes = await getClasses();
  for (const cat of categories) {
    let has = false;
    for (const cls of classes) {
      for (const subject of cls.subjects) {
        const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
        if (publishedItems(file).length > 0) {
          has = true;
          break;
        }
      }
      if (has) break;
    }
    if (has) push(urls.resourceHub(cat.slug), undefined, 0.8);
  }

  // Class + subject pages (published only).
  for (const cls of classes) {
    if (cls.status !== "published") continue;
    push(urls.classPage(cls.slug), undefined, 0.9);
    for (const subject of cls.subjects) {
      if (subject.status !== "published") continue;
      push(urls.subjectPage(cls.slug, subject.slug), undefined, 0.8);
    }
  }

  // Resource pages with ≥1 published chapter.
  const seenResource = new Set<string>();
  for (const cls of classes) {
    for (const subject of cls.subjects) {
      for (const cat of categories) {
        const key = `${cls.slug}/${subject.slug}/${cat.slug}`;
        if (seenResource.has(key)) continue;
        seenResource.add(key);
        const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
        if (publishedItems(file).length > 0) {
          push(urls.resourcePage(cls.slug, subject.slug, cat.slug), undefined, 0.7);
        }
      }
    }
  }

  // Published chapter pages.
  for (const { classSlug, subjectSlug, resourceSlug, item } of await getAllPublishedSchoolItems()) {
    if (item.blocks.length === 0) continue;
    push(
      urls.chapterPage(classSlug, subjectSlug, resourceSlug, item.chapterSlug),
      item.updatedAt,
      0.8,
    );
  }

  // Discovery selection pages — only steps that list real options.
  // Final-listing variants are excluded: they canonicalise to resourcePage().
  push(urls.materialsHub(), undefined, 0.7);
  push(urls.subjectsHub(), undefined, 0.7);
  for (const cat of categories) {
    const classesForMaterial = await getClassesForMaterial(cat.slug);
    if (classesForMaterial && classesForMaterial.length > 0) {
      push(urls.materialHub(cat.slug), undefined, 0.6);
      for (const cls of classes) {
        const sel = await getSubjectsForClassMaterial(cls.slug, cat.slug);
        if (sel && sel.subjects.length > 0) {
          push(urls.materialClass(cat.slug, cls.slug), undefined, 0.6);
          push(urls.classMaterial(cls.slug, cat.slug), undefined, 0.6);
        }
      }
    }
  }
  for (const s of await getSubjectUniverse()) {
    const classesForSubject = await getClassesForSubject(s.slug);
    if (classesForSubject && classesForSubject.classes.length > 0) {
      push(urls.subjectHub(s.slug), undefined, 0.6);
      for (const { cls } of classesForSubject.classes) {
        const pair = await getMaterialsForClassSubject(cls.slug, s.slug);
        if (pair && pair.materials.length > 0) {
          push(urls.subjectClass(s.slug, cls.slug), undefined, 0.6);
        }
      }
    }
  }

  // JEE / NEET tracks.
  for (const exam of await getExams()) {
    if (exam.status !== "published") continue;
    push(urls.examPage(exam.slug), undefined, 0.9);
    for (const subject of exam.subjects) {
      if (subject.status !== "published") continue;
      push(urls.examSubjectPage(exam.slug, subject.slug), undefined, 0.8);
    }
  }
  for (const { examSlug, subjectSlug, resourceSlug, item } of await getAllPublishedExamItems()) {
    push(
      urls.examResourcePage(examSlug, subjectSlug, resourceSlug),
      item.updatedAt,
      0.7,
    );
  }

  return entries;
}
