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
