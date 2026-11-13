/**
 * Central type definitions for the Hustle Learning content platform.
 *
 * JSON files under `data/` must conform to these interfaces.
 * `scripts/validate-content.mjs` enforces the same rules at build time.
 */

export type PublicationStatus = "draft" | "published" | "archived";

/** School class slug, e.g. "class-10". */
export type ClassSlug =
  | "class-6"
  | "class-7"
  | "class-8"
  | "class-9"
  | "class-10";

export interface ClassMeta {
  slug: ClassSlug;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  board: string;
  status: PublicationStatus;
}

export interface ChapterMeta {
  slug: string;
  title: string;
  /** Chapter number within the subject (1-based). */
  number: number;
  status: PublicationStatus;
}

export interface SubjectMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: PublicationStatus;
  chapters: ChapterMeta[];
}

/** One class registry file: `directory/class-N/_class.json`. */
export interface ClassFile extends ClassMeta {
  subjects: SubjectMeta[];
  /** Unique editorial paragraph: what this class year demands academically. */
  focus: string;
  faqs: { question: string; answer: string }[];
}

export type SchoolResourceSlug =
  | "ncert-solutions"
  | "notes"
  | "important-questions"
  | "sample-papers"
  | "pyqs"
  | "worksheets"
  | "formulas"
  | "poem-explanations";

export interface ResourceCategory {
  slug: SchoolResourceSlug;
  title: string;
  shortTitle: string;
  description: string;
  /** Lucide icon name used by ResourceCard (see components/resources/icons.ts). */
  icon: string;
  /** One-line card blurb (used on grouped resource grids). */
  blurb: string;
  /** Editorial introduction paragraphs (unique per category). */
  intro: string[];
  /** Practical bullets: how students should use this resource type. */
  howTo: string[];
  faqs: { question: string; answer: string }[];
}

/** Long-form content is stored as structured blocks (MDX-compatible).
 *  Each block maps 1:1 to a future MDX component; `contentFile` in
 *  ChapterResourceItem points at the MDX file once authored. */
export interface ListItem {
  text: string;
  children: ListItem[];
}

export type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: ListItem[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "formula"; label: string; expression: string }
  | { type: "callout"; tone: "tip" | "note" | "warning"; text: string }
  | { type: "qa"; question: string; answer: string; demo?: boolean; options?: string[] }
  | { type: "stanza"; label: string; lines: string[] }
  | { type: "keyPoints"; points: string[] };

export interface ChapterResourceItem {
  id: string;
  chapterSlug: string;
  title: string;
  description: string;
  status: PublicationStatus;
  updatedAt: string;
  /** Path to the chapter file under `directory/`, e.g. "directory/class-10/ncert-solutions/science/chemical-reactions-and-equations.mdx". */
  contentFile?: string;
  downloadFile?: string;
  blocks: ContentBlock[];
  faqs?: { question: string; answer: string }[];
}

/** A resource file assembled at runtime by scanning `directory/<class>/<resource>/<subject>/`. */
export interface ResourceFile {
  classSlug: ClassSlug;
  subjectSlug: string;
  resourceSlug: string;
  items: ChapterResourceItem[];
}

export type ExamSlug = "jee" | "neet";

export interface ExamChapterMeta {
  slug: string;
  title: string;
  status: PublicationStatus;
}

export interface ExamSubject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: PublicationStatus;
  chapters: ExamChapterMeta[];
}

export interface ExamResourceCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

/** One exam registry file: `directory/competitive/<exam>/_exam.json`. */
export interface ExamFile {
  slug: ExamSlug;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  status: PublicationStatus;
  subjects: ExamSubject[];
  resources: ExamResourceCategory[];
  /** Editorial sections rendered on the exam landing page. */
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
}

export interface ExamResourceItem {
  id: string;
  subjectSlug: string;
  chapterSlug?: string;
  title: string;
  description: string;
  status: PublicationStatus;
  updatedAt: string;
  /** Path to the chapter file under `directory/competitive/…`, e.g. "directory/competitive/jee/physics/notes/kinematics.mdx". */
  contentFile?: string;
  blocks: ContentBlock[];
  faqs?: { question: string; answer: string }[];
}

export interface ExamResourceFile {
  examSlug: ExamSlug;
  subjectSlug: string;
  resourceSlug: string;
  items: ExamResourceItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}
