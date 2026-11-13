"use cache";

import { promises as fs } from "node:fs";
import path from "node:path";

export interface AvailabilityMatrix {
  subjects: Record<string, string[]>;
  resourceClasses: Record<string, string[]>;
}

const ALL_CLASSES = ["class-6", "class-7", "class-8", "class-9", "class-10"];

/**
 * Offered (subject × resource × class) matrix — `directory/_availability.json`
 * is the single source of truth. Published content outside the matrix fails
 * `npm run validate-content`, so UI code can rely on it and additionally
 * filter listings (e.g. subject pages only show offered resources).
 */
export async function getAvailability(): Promise<AvailabilityMatrix> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "directory", "_availability.json"),
      "utf-8",
    );
    const parsed = JSON.parse(raw) as Partial<AvailabilityMatrix>;
    return {
      subjects: parsed.subjects ?? {},
      resourceClasses: parsed.resourceClasses ?? {},
    };
  } catch {
    return { subjects: {}, resourceClasses: {} };
  }
}

/** Resource slugs offered for a subject (registry order preserved by callers). */
export async function getOfferedResources(
  subjectSlug: string,
): Promise<string[]> {
  const matrix = await getAvailability();
  return matrix.subjects[subjectSlug] ?? [];
}

/** Whether a (class, subject, resource) triple may hold published content. */
export async function isResourceOffered(
  classSlug: string,
  subjectSlug: string,
  resourceSlug: string,
): Promise<boolean> {
  const matrix = await getAvailability();
  const offered = matrix.subjects[subjectSlug];
  if (!offered || !offered.includes(resourceSlug)) return false;
  const classes = matrix.resourceClasses[resourceSlug] ?? ALL_CLASSES;
  return classes.includes(classSlug);
}
