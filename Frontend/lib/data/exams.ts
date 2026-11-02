"use cache";

import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  ExamFile,
  ExamResourceFile,
  ExamResourceItem,
  ExamSlug,
} from "@/types/content";
import { publishedExamItems } from "./helpers";
import { loadChapterFile } from "../content/mdx";

/**
 * Competitive-exam loaders — `directory/competitive/` is the sole source.
 * - `directory/competitive/<exam>/_exam.json` → exam, subjects, resources
 * - `directory/competitive/<exam>/<subject>/<resource>/<chapter>.mdx`
 */

const EXAM_ROOT = path.join(process.cwd(), "directory", "competitive");

async function readJson<T>(rel: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(EXAM_ROOT, rel), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const EXAM_SLUGS: ExamSlug[] = ["jee", "neet"];

export async function getExam(examSlug: string): Promise<ExamFile | null> {
  const file = await readJson<ExamFile>(`${examSlug}/_exam.json`);
  if (!file || file.status === "archived") return null;
  return file;
}

export async function getExams(): Promise<ExamFile[]> {
  const out: ExamFile[] = [];
  for (const slug of EXAM_SLUGS) {
    const e = await getExam(slug);
    if (e) out.push(e);
  }
  return out;
}

export async function getExamResourceFile(
  examSlug: string,
  subjectSlug: string,
  resourceSlug: string,
): Promise<ExamResourceFile | null> {
  const exam = await getExam(examSlug);
  if (!exam) return null;
  const dir = path.join(EXAM_ROOT, examSlug, subjectSlug, resourceSlug);
  let entries: string[] = [];
  try {
    entries = (await fs.readdir(dir)).filter(
      (e) => e.endsWith(".mdx") && !e.startsWith("_"),
    );
  } catch {
    return { examSlug: exam.slug, subjectSlug, resourceSlug, items: [] };
  }

  const items: ExamResourceItem[] = [];
  for (const entry of entries) {
    const slug = entry.slice(0, -".mdx".length);
    const rel = `directory/competitive/${examSlug}/${subjectSlug}/${resourceSlug}/${entry}`;
    const { frontmatter, blocks, faqs } = await loadChapterFile(rel);
    items.push({
      id: frontmatter.id || slug,
      subjectSlug,
      chapterSlug: frontmatter.chapter || slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      status:
        frontmatter.status === "published" || frontmatter.status === "archived"
          ? frontmatter.status
          : "draft",
      updatedAt: frontmatter.updatedAt || "",
      contentFile: rel,
      blocks,
      faqs,
    });
  }
  return { examSlug: exam.slug, subjectSlug, resourceSlug, items };
}

export async function getAllPublishedExamItems(): Promise<
  { examSlug: string; subjectSlug: string; resourceSlug: string; item: ExamResourceItem }[]
> {
  const out: {
    examSlug: string;
    subjectSlug: string;
    resourceSlug: string;
    item: ExamResourceItem;
  }[] = [];
  for (const exam of await getExams()) {
    for (const subject of exam.subjects) {
      for (const res of exam.resources) {
        const file = await getExamResourceFile(exam.slug, subject.slug, res.slug);
        for (const item of publishedExamItems(file)) {
          out.push({
            examSlug: exam.slug,
            subjectSlug: subject.slug,
            resourceSlug: res.slug,
            item,
          });
        }
      }
    }
  }
  return out;
}
