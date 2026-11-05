/** Single source of truth for public URL shapes. Registry files never hardcode URLs. */
export const urls = {
  home: () => "/",
  resourcesHub: () => "/resources",
  resourceHub: (resource: string) => `/resources/${resource}`,
  classPage: (classSlug: string) => `/${classSlug}`,
  subjectPage: (classSlug: string, subject: string) =>
    `/${classSlug}/${subject}`,
  resourcePage: (classSlug: string, subject: string, resource: string) =>
    `/${classSlug}/${subject}/${resource}`,
  chapterPage: (
    classSlug: string,
    subject: string,
    resource: string,
    chapter: string,
  ) => `/${classSlug}/${subject}/${resource}/${chapter}`,
  examPage: (exam: string) => `/${exam}`,
  examSubjectPage: (exam: string, subject: string) => `/${exam}/${subject}`,
  examResourcePage: (exam: string, subject: string, resource: string) =>
    `/${exam}/${subject}/${resource}`,
  search: (q?: string) => (q ? `/search?q=${encodeURIComponent(q)}` : "/search"),
  // ---- Discovery workflows (selection state lives in the URL) ----
  // Workflow A (material-first) and C (subject-first) have dedicated
  // routes. Workflow B (class-first) reuses the canonical class shapes:
  // /:class/:material and /:class/:material/:subject resolve through
  // slug disambiguation in the existing [subject]/[resource] pages.
  // Final listing pages in every workflow canonicalise to resourcePage().
  materialsHub: () => "/materials",
  materialHub: (material: string) => `/materials/${material}`,
  materialClass: (material: string, classSlug: string) =>
    `/materials/${material}/${classSlug}`,
  materialClassSubject: (
    material: string,
    classSlug: string,
    subject: string,
  ) => `/materials/${material}/${classSlug}/${subject}`,
  subjectsHub: () => "/subjects",
  subjectHub: (subject: string) => `/subjects/${subject}`,
  subjectClass: (subject: string, classSlug: string) =>
    `/subjects/${subject}/${classSlug}`,
  subjectClassMaterial: (
    subject: string,
    classSlug: string,
    material: string,
  ) => `/subjects/${subject}/${classSlug}/${material}`,
  classMaterial: (classSlug: string, material: string) =>
    `/${classSlug}/${material}`,
  classMaterialSubject: (
    classSlug: string,
    material: string,
    subject: string,
  ) => `/${classSlug}/${material}/${subject}`,
};

export function classNumber(slug: string): string {
  return slug.replace("class-", "");
}
