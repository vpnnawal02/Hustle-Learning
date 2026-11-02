"use cache";

import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  ChapterResourceItem,
  ClassFile,
  ClassSlug,
  ResourceCategory,
  ResourceFile,
  SubjectMeta,
} from "@/types/content";
import { publishedItems } from "./helpers";
import { loadChapterFile } from "../content/mdx";

/**
 * School data loaders — `directory/` is the sole source of truth.
 * - `directory/_resources.json` → resource categories
 * - `directory/class-N/_class.json` → class, subjects, chapter catalog
 * - `directory/class-N/<resource>/<subject>/<chapter>.mdx` → chapter items
 */

const DIR_ROOT = path.join(process.cwd(), "directory");

async function readJson<T>(rel: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(DIR_ROOT, rel), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const CLASS_SLUGS: ClassSlug[] = [
  "class-6",
  "class-7",
  "class-8",
  "class-9",
  "class-10",
];

export async function getClass(classSlug: string): Promise<ClassFile | null> {
  // No module-level cache here: Next's "use cache" memoizes this function,
  // and a hand-rolled cache would serve stale files during development.
  const file = await readJson<ClassFile>(`${classSlug}/_class.json`);
  if (!file || file.status === "archived") return null;
  return file;
}

export async function getClasses(): Promise<ClassFile[]> {
  const out: ClassFile[] = [];
  for (const slug of CLASS_SLUGS) {
    const c = await getClass(slug);
    if (c) out.push(c);
  }
  return out;
}

export async function getSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<{ cls: ClassFile; subject: SubjectMeta } | null> {
  const cls = await getClass(classSlug);
  if (!cls) return null;
  const subject = cls.subjects.find(
    (s) => s.slug === subjectSlug && s.status !== "archived",
  );
  if (!subject) return null;
  return { cls, subject };
}

export async function getResourceCategories(): Promise<ResourceCategory[]> {
  // No module-level cache: see getClass above.
  return (await readJson<ResourceCategory[]>(`_resources.json`)) ?? [];
}

export async function getResourceCategory(
  slug: string,
): Promise<ResourceCategory | null> {
  const all = await getResourceCategories();
  return all.find((r) => r.slug === slug) ?? null;
}

function chapterNumber(
  cls: ClassFile,
  subjectSlug: string,
  chapterSlug: string,
): number {
  const subject = cls.subjects.find((s) => s.slug === subjectSlug);
  const meta = subject?.chapters.find((c) => c.slug === chapterSlug);
  return meta?.number ?? Number.MAX_SAFE_INTEGER;
}

function toItem(
  rel: string,
  fm: Record<string, string>,
  blocks: ChapterResourceItem["blocks"],
  faqs: ChapterResourceItem["faqs"],
  fallbackSlug: string,
): ChapterResourceItem {
  return {
    id: fm.id || `${fallbackSlug}`,
    chapterSlug: fm.chapter || fallbackSlug,
    title: fm.title || fallbackSlug,
    description: fm.description || "",
    status:
      fm.status === "published" || fm.status === "archived"
        ? fm.status
        : "draft",
    updatedAt: fm.updatedAt || "",
    contentFile: rel,
    blocks,
    faqs: faqs ?? [],
  };
}

/**
 * Load the chapter items for one class/subject/resource by scanning its
 * subject folder. Items sort in registry chapter order.
 */
export async function getResourceFile(
  classSlug: string,
  subjectSlug: string,
  resourceSlug: string,
): Promise<ResourceFile | null> {
  const cls = await getClass(classSlug);
  if (!cls) return null;
  const subject = cls.subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return null;

  const dir = path.join(DIR_ROOT, classSlug, resourceSlug, subjectSlug);
  let entries: string[] = [];
  try {
    entries = (await fs.readdir(dir)).filter(
      (e) => e.endsWith(".mdx") && !e.startsWith("_"),
    );
  } catch {
    return { classSlug: cls.slug, subjectSlug, resourceSlug, items: [] };
  }

  const items: ChapterResourceItem[] = [];
  for (const entry of entries) {
    const slug = entry.slice(0, -".mdx".length);
    const rel = `directory/${classSlug}/${resourceSlug}/${subjectSlug}/${entry}`;
    const { frontmatter, blocks, faqs } = await loadChapterFile(rel);
    items.push(toItem(rel, frontmatter, blocks, faqs, slug));
  }
  items.sort(
    (a, b) =>
      chapterNumber(cls, subjectSlug, a.chapterSlug) -
      chapterNumber(cls, subjectSlug, b.chapterSlug),
  );
  return { classSlug: cls.slug, subjectSlug, resourceSlug, items };
}

export async function getChapterItem(
  classSlug: string,
  subjectSlug: string,
  resourceSlug: string,
  chapterSlug: string,
): Promise<{ file: ResourceFile; item: ChapterResourceItem } | null> {
  const file = await getResourceFile(classSlug, subjectSlug, resourceSlug);
  if (!file) return null;
  const item = file.items.find(
    (i) => i.chapterSlug === chapterSlug && i.status !== "archived",
  );
  if (!item) return null;
  return { file, item };
}

/** All published chapter items across every class/subject/resource (for sitemap + search). */
export async function getAllPublishedSchoolItems(): Promise<
  { classSlug: string; subjectSlug: string; resourceSlug: string; item: ChapterResourceItem }[]
> {
  const out: {
    classSlug: string;
    subjectSlug: string;
    resourceSlug: string;
    item: ChapterResourceItem;
  }[] = [];
  const categories = await getResourceCategories();
  for (const cls of await getClasses()) {
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      for (const cat of categories) {
        const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
        for (const item of publishedItems(file)) {
          out.push({
            classSlug: cls.slug,
            subjectSlug: subject.slug,
            resourceSlug: cat.slug,
            item,
          });
        }
      }
    }
  }
  return out;
}
