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
};

export function classNumber(slug: string): string {
  return slug.replace("class-", "");
}
