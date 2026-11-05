import {
  CLASS_SLUGS,
  getClass,
  getClasses,
  getResourceCategories,
  getResourceCategory,
  getResourceFile,
  getSubject,
} from "./data/school";
import { isSchoolResourceSlug, publishedItems } from "./data/helpers";
import type {
  ChapterResourceItem,
  ClassFile,
  ResourceCategory,
  SubjectMeta,
} from "@/types/content";

/**
 * Discovery engine — the single flexible system behind all three
 * navigation workflows (material-first, class-first, subject-first).
 *
 * All data access flows through the cached loaders in lib/data/school,
 * so repeated resolution across workflows never re-reads from disk.
 *
 * Rules enforced here, once, for every workflow:
 * - Options are derived from `directory/` content, never hardcoded.
 * - An option is only offered when ≥1 published chapter item exists
 *   behind it — no dead ends, no misleading choices.
 * - Final listings resolve (class, subject, material) to the same
 *   published items regardless of entry path; every workflow
 *   canonicalises to the existing /:class/:subject/:resource URL.
 */

export interface CountedClass {
  cls: ClassFile;
  count: number;
}

export interface CountedSubject {
  subject: SubjectMeta;
  count: number;
}

export interface CountedMaterial {
  cat: ResourceCategory;
  count: number;
}

export interface ResolvedTriple {
  cls: ClassFile;
  subject: SubjectMeta;
  cat: ResourceCategory;
  items: ChapterResourceItem[];
}

/** Published item count for one exact triple. */
export async function countTriple(
  classSlug: string,
  subjectSlug: string,
  materialSlug: string,
): Promise<number> {
  const file = await getResourceFile(classSlug, subjectSlug, materialSlug);
  return publishedItems(file).length;
}

/** All seven materials with their platform-wide published totals. */
export async function getMaterialsWithCounts(): Promise<CountedMaterial[]> {
  const [cats, classes] = await Promise.all([
    getResourceCategories(),
    getClasses(),
  ]);
  const out: CountedMaterial[] = [];
  for (const cat of cats) {
    let n = 0;
    for (const cls of classes) {
      for (const subject of cls.subjects) {
        if (subject.status === "archived") continue;
        n += await countTriple(cls.slug, subject.slug, cat.slug);
      }
    }
    out.push({ cat, count: n });
  }
  return out;
}

/** Classes that actually hold published items for a material. */
export async function getClassesForMaterial(
  materialSlug: string,
): Promise<CountedClass[] | null> {
  if (!isSchoolResourceSlug(materialSlug)) return null;
  const classes = await getClasses();
  const out: CountedClass[] = [];
  for (const cls of classes) {
    let n = 0;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      n += await countTriple(cls.slug, subject.slug, materialSlug);
    }
    if (n > 0) out.push({ cls, count: n });
  }
  return out;
}

/** Subjects of a class that hold published items for a material. */
export async function getSubjectsForClassMaterial(
  classSlug: string,
  materialSlug: string,
): Promise<{ cls: ClassFile; cat: ResourceCategory; subjects: CountedSubject[] } | null> {
  const [cls, cat] = await Promise.all([
    getClass(classSlug),
    getResourceCategory(materialSlug),
  ]);
  if (!cls || cls.status !== "published" || !cat) return null;
  const subjects: CountedSubject[] = [];
  for (const subject of cls.subjects) {
    if (subject.status === "archived") continue;
    const n = await countTriple(cls.slug, subject.slug, cat.slug);
    if (n > 0) subjects.push({ subject, count: n });
  }
  return { cls, cat, subjects };
}

/** Distinct subjects offered across classes (registry-driven). */
export async function getSubjectUniverse(): Promise<
  { slug: string; name: string; tagline: string }[]
> {
  const classes = await getClasses();
  const seen = new Map<string, { slug: string; name: string; tagline: string }>();
  for (const cls of classes) {
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      if (!seen.has(subject.slug)) {
        seen.set(subject.slug, {
          slug: subject.slug,
          name: subject.name,
          tagline: subject.tagline,
        });
      }
    }
  }
  return [...seen.values()];
}

/** Published total for one subject across every class and material. */
export async function countSubject(subjectSlug: string): Promise<number> {
  const classes = await getClasses();
  const cats = await getResourceCategories();
  let n = 0;
  for (const cls of classes) {
    const subject = cls.subjects.find(
      (s) => s.slug === subjectSlug && s.status !== "archived",
    );
    if (!subject) continue;
    for (const cat of cats) {
      n += await countTriple(cls.slug, subject.slug, cat.slug);
    }
  }
  return n;
}

/**
 * Classes where a subject is offered AND has published items.
 * Null when the subject slug is unknown.
 */
export async function getClassesForSubject(
  subjectSlug: string,
): Promise<{ name: string; classes: CountedClass[] } | null> {
  const universe = await getSubjectUniverse();
  const meta = universe.find((s) => s.slug === subjectSlug);
  if (!meta) return null;
  const [classes, cats] = await Promise.all([
    getClasses(),
    getResourceCategories(),
  ]);
  const out: CountedClass[] = [];
  for (const cls of classes) {
    const subject = cls.subjects.find(
      (s) => s.slug === subjectSlug && s.status !== "archived",
    );
    if (!subject) continue;
    let n = 0;
    for (const cat of cats) {
      n += await countTriple(cls.slug, subject.slug, cat.slug);
    }
    if (n > 0) out.push({ cls, count: n });
  }
  return { name: meta.name, classes: out };
}

/** Materials holding published items for one class + subject pair. */
export async function getMaterialsForClassSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<{ cls: ClassFile; subject: SubjectMeta; materials: CountedMaterial[] } | null> {
  const found = await getSubject(classSlug, subjectSlug);
  if (!found || found.subject.status !== "published") return null;
  const cats = await getResourceCategories();
  const materials: CountedMaterial[] = [];
  for (const cat of cats) {
    const n = await countTriple(
      found.cls.slug,
      found.subject.slug,
      cat.slug,
    );
    if (n > 0) materials.push({ cat, count: n });
  }
  return { cls: found.cls, subject: found.subject, materials };
}

/**
 * Resolve a full (class, subject, material) selection to its published
 * items. Null only for structurally invalid combos (unknown slugs,
 * unpublished class/subject, unknown material) — a valid combo with
 * zero items resolves with an empty list so pages can render an
 * honest empty state instead of a 404.
 */
export async function resolveTriple(
  classSlug: string,
  subjectSlug: string,
  materialSlug: string,
): Promise<ResolvedTriple | null> {
  const found = await getSubject(classSlug, subjectSlug);
  const cat = await getResourceCategory(materialSlug);
  if (!found || !cat) return null;
  if (found.cls.status !== "published") return null;
  if (found.subject.status !== "published") return null;
  const file = await getResourceFile(
    found.cls.slug,
    found.subject.slug,
    cat.slug,
  );
  return {
    cls: found.cls,
    subject: found.subject,
    cat,
    items: publishedItems(file),
  };
}

/** Every structurally valid triple — feeds generateStaticParams. */
export async function getAllTriples(): Promise<
  { classSlug: string; subjectSlug: string; materialSlug: string }[]
> {
  const out: {
    classSlug: string;
    subjectSlug: string;
    materialSlug: string;
  }[] = [];
  const cats = await getResourceCategories();
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls || cls.status !== "published") continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      for (const cat of cats) {
        out.push({
          classSlug: cls.slug,
          subjectSlug: subject.slug,
          materialSlug: cat.slug,
        });
      }
    }
  }
  return out;
}

/** Triples with ≥1 published item — the build-time prerender set. */
export async function getPublishedTriples(): Promise<
  { classSlug: string; subjectSlug: string; materialSlug: string }[]
> {
  const all = await getAllTriples();
  const out: typeof all = [];
  for (const t of all) {
    if ((await countTriple(t.classSlug, t.subjectSlug, t.materialSlug)) > 0) {
      out.push(t);
    }
  }
  return out;
}

/* ---------- Shared SEO copy: identical across workflow variants ---------- */

export function canonicalResourceTitle(
  classLabel: string,
  subjectName: string,
  materialTitle: string,
): string {
  return `${classLabel} ${subjectName} ${materialTitle} — Chapter-wise | Hustle Learning`;
}

export function canonicalResourceDescription(input: {
  classLabel: string;
  subjectName: string;
  material: ResourceCategory;
  itemCount: number;
  sampleTitles: string[];
}): string {
  const { classLabel, subjectName, material, itemCount, sampleTitles } = input;
  return itemCount > 0
    ? `Chapter-wise ${material.title.toLowerCase()} for ${classLabel} ${subjectName}, including ${sampleTitles.join("; ")}. ${itemCount} chapter${itemCount === 1 ? "" : "s"} published.`
    : `${material.title} for ${classLabel} ${subjectName} — currently in preparation. Browse available ${subjectName} resources.`;
}

export function chapterTitlesOf(
  triple: ResolvedTriple,
  limit = 3,
): string[] {
  return triple.items.slice(0, limit).map(
    (i) =>
      triple.subject.chapters.find((c) => c.slug === i.chapterSlug)?.title ??
      i.chapterSlug,
  );
}
