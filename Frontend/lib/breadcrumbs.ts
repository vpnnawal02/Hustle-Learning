import type { BreadcrumbItem } from "@/types/content";
import { urls } from "./urls";

/** Breadcrumb builders — one per page type. Never hardcode trails in templates. */
export function homeCrumb(): BreadcrumbItem[] {
  return [{ label: "Home", href: "/" }];
}

export function classCrumbs(classLabel: string) {
  return [
    ...homeCrumb(),
    { label: "Study Material", href: "/resources" },
    { label: classLabel },
  ];
}

export function subjectCrumbs(
  classLabel: string,
  classSlug: string,
  subjectName: string,
) {
  return [
    ...classCrumbs(classLabel),
    { label: subjectName },
  ].map((c, i, arr) =>
    i === arr.length - 2 ? { ...c, href: urls.classPage(classSlug) } : c,
  );
}

export function resourceCrumbs(
  classLabel: string,
  classSlug: string,
  subjectName: string,
  subjectSlug: string,
  resourceTitle: string,
) {
  const trail = subjectCrumbs(classLabel, classSlug, subjectName);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.subjectPage(classSlug, subjectSlug) }
        : c,
    ),
    { label: resourceTitle },
  ];
}

export function chapterCrumbs(
  classLabel: string,
  classSlug: string,
  subjectName: string,
  subjectSlug: string,
  resourceTitle: string,
  resourceSlug: string,
  chapterTitle: string,
) {
  const trail = resourceCrumbs(
    classLabel,
    classSlug,
    subjectName,
    subjectSlug,
    resourceTitle,
  );
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? {
            ...c,
            href: urls.resourcePage(classSlug, subjectSlug, resourceSlug),
          }
        : c,
    ),
    { label: chapterTitle },
  ];
}

export function examCrumbs(examName: string) {
  return [...homeCrumb(), { label: examName }];
}

export function examSubjectCrumbs(
  examName: string,
  examSlug: string,
  subjectName: string,
) {
  return [
    ...homeCrumb(),
    { label: examName, href: urls.examPage(examSlug) },
    { label: subjectName },
  ];
}

export function examResourceCrumbs(
  examName: string,
  examSlug: string,
  subjectName: string,
  subjectSlug: string,
  resourceTitle: string,
) {
  return [
    ...homeCrumb(),
    { label: examName, href: urls.examPage(examSlug) },
    {
      label: subjectName,
      href: urls.examSubjectPage(examSlug, subjectSlug),
    },
    { label: resourceTitle },
  ];
}

/* ---------- Discovery workflows: trails mirror the entry path ---------- */

export function materialsCrumbs() {
  return [
    ...homeCrumb(),
    { label: "Study Material", href: "/resources" },
    { label: "Materials" },
  ];
}

export function materialCrumbs(materialTitle: string) {
  return [
    ...materialsCrumbs().map((c, i, arr) =>
      i === arr.length - 1
        ? { ...c, href: urls.materialsHub() }
        : c,
    ),
    { label: materialTitle },
  ];
}

export function materialClassCrumbs(
  materialTitle: string,
  materialSlug: string,
  classLabel: string,
) {
  const trail = materialCrumbs(materialTitle);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.materialHub(materialSlug) }
        : c,
    ),
    { label: classLabel },
  ];
}

export function materialClassSubjectCrumbs(
  materialTitle: string,
  materialSlug: string,
  classLabel: string,
  classSlug: string,
  subjectName: string,
) {
  const trail = materialClassCrumbs(materialTitle, materialSlug, classLabel);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.materialClass(materialSlug, classSlug) }
        : c,
    ),
    { label: subjectName },
  ];
}

export function subjectsCrumbs() {
  return [
    ...homeCrumb(),
    { label: "Study Material", href: "/resources" },
    { label: "Subjects" },
  ];
}

export function subjectHubCrumbs(subjectName: string) {
  return [
    ...subjectsCrumbs().map((c, i, arr) =>
      i === arr.length - 1 ? { ...c, href: urls.subjectsHub() } : c,
    ),
    { label: subjectName },
  ];
}

export function subjectClassCrumbs(
  subjectName: string,
  subjectSlug: string,
  classLabel: string,
) {
  const trail = subjectHubCrumbs(subjectName);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.subjectHub(subjectSlug) }
        : c,
    ),
    { label: classLabel },
  ];
}

export function subjectClassMaterialCrumbs(
  subjectName: string,
  subjectSlug: string,
  classLabel: string,
  classSlug: string,
  materialTitle: string,
) {
  const trail = subjectClassCrumbs(subjectName, subjectSlug, classLabel);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.subjectClass(subjectSlug, classSlug) }
        : c,
    ),
    { label: materialTitle },
  ];
}

/** Class-first workflow reuses canonical class trails with material steps. */
export function classMaterialCrumbs(
  classLabel: string,
  classSlug: string,
  materialTitle: string,
) {
  return [
    ...classCrumbs(classLabel).map((c, i, arr) =>
      i === arr.length - 1 ? { ...c, href: urls.classPage(classSlug) } : c,
    ),
    { label: materialTitle },
  ];
}

export function classMaterialSubjectCrumbs(
  classLabel: string,
  classSlug: string,
  materialTitle: string,
  materialSlug: string,
  subjectName: string,
) {
  const trail = classMaterialCrumbs(classLabel, classSlug, materialTitle);
  return [
    ...trail.map((c, i) =>
      i === trail.length - 1
        ? { ...c, href: urls.classMaterial(classSlug, materialSlug) }
        : c,
    ),
    { label: subjectName },
  ];
}
