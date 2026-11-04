import Link from "next/link";
import { ClassSelector } from "../../components/resources/Selectors";
import { getExams } from "@/lib/data/exams";
import { getAllPublishedSchoolItems, getClasses, getResourceCategories } from "@/lib/data/school";
import { urls } from "@/lib/urls";
import type { SchoolResourceSlug } from "@/types/content";
import DiscoverySearch, { type Suggestion } from "./DiscoverySearch";

const GROUPS: {
  title: string;
  text: string;
  bar: string;
  slugs: SchoolResourceSlug[];
}[] = [
  {
    title: "Learn",
    text: "Understand the chapter first.",
    bar: "navy-900",
    slugs: ["notes", "ncert-solutions"],
  },
  {
    title: "Practice",
    text: "Drill questions until they feel easy.",
    bar: "accent-500",
    slugs: ["important-questions", "worksheets", "pyqs"],
  },
  {
    title: "Revise",
    text: "Simulate exams, then compress to formulas.",
    bar: "tint-science",
    slugs: ["sample-papers", "formulas"],
  },
];

const SUBJECT_TINTS: Record<string, string> = {
  mathematics: "var(--tint-maths)",
  science: "var(--tint-science)",
  "social-science": "var(--tint-sst)",
  english: "var(--tint-english)",
};

const GROUP_BARS: Record<string, string> = {
  "navy-900": "var(--navy-900)",
  "accent-500": "var(--accent-500)",
  "tint-science": "var(--tint-science)",
};

/**
 * Homepage discovery — header + search, class cards, grouped resources,
 * popular chapters, exam tracks. Static render with hover-only
 * micro-transitions (≤150ms); no carousels, no auto-scroll, no icons.
 */
export default async function StudyDiscovery() {
  const [classes, categories, exams, published] = await Promise.all([
    getClasses(),
    getResourceCategories(),
    getExams(),
    getAllPublishedSchoolItems(),
  ]);
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const subjectName = new Map<string, string>();
  for (const cls of classes) {
    for (const s of cls.subjects) subjectName.set(`${cls.slug}/${s.slug}`, s.name);
  }

  // Suggestion index: every registry chapter (→ subject page), upgraded to
  // the chapter page where published. Chapters only — no invented entries.
  const seen = new Set<string>();
  const index: Suggestion[] = [];
  for (const p of published) {
    const href = urls.chapterPage(
      p.classSlug,
      p.subjectSlug,
      p.resourceSlug,
      p.item.chapterSlug,
    );
    if (seen.has(href)) continue;
    seen.add(href);
    const chapter = p.item.title;
    index.push({
      title: chapter,
      meta: `${p.classSlug.replace("class-", "Class ")} / ${subjectName.get(`${p.classSlug}/${p.subjectSlug}`) ?? p.subjectSlug}`,
      href,
      group: p.classSlug.replace("class-", "Class "),
    });
  }
  for (const cls of classes) {
    for (const s of cls.subjects) {
      if (s.status === "archived") continue;
      for (const ch of s.chapters) {
        const href = urls.subjectPage(cls.slug, s.slug);
        index.push({
          title: ch.title,
          meta: `${cls.label} / ${s.name}`,
          href: `${href}#${ch.slug}`,
          group: cls.label,
        });
      }
    }
  }

  const publishedByResource = new Map<string, number>();
  for (const p of published) {
    publishedByResource.set(
      p.resourceSlug,
      (publishedByResource.get(p.resourceSlug) ?? 0) + 1,
    );
  }

  const popular = published.slice(0, 6);

  return (
    <section
      aria-labelledby="study-discovery-heading"
      className="scope-discovery border-b border-rule bg-canvas"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
        <h2
          id="study-discovery-heading"
          className="max-w-[24ch] text-[30px] leading-[1.15] font-bold tracking-tight text-balance text-navy-900 lg:text-[44px]"
        >
          Find your material
        </h2>
        <p className="mt-3 max-w-[60ch] text-base leading-[1.55] font-normal text-navy-700">
          Notes, solutions and practice papers for CBSE Classes 6 to 10.
        </p>
        <DiscoverySearch index={index} />
        <p className="mt-3 text-[13px] font-medium text-navy-500">
          NCERT-aligned. CBSE pattern. Updated for the 2026-27 session.
          {/* TODO: confirm 2026-27 session currency with the academic team */}
        </p>

        <div className="mt-8">
          <ClassSelector classes={classes} />
        </div>

        <section aria-labelledby="discovery-resources-heading" className="mt-12">
          <h3
            id="discovery-resources-heading"
            className="text-2xl font-semibold tracking-tight text-navy-900"
          >
            Study resources
          </h3>
          <p className="mt-1.5 text-[15px] leading-[1.55] text-navy-700">
            Pick a type of material, then choose your class.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <section key={group.title} aria-label={`${group.title} resources`}>
                <div className="flex items-center gap-3">
                  <h4 className="text-xs font-medium tracking-[0.04em] text-navy-500 uppercase">
                    {group.title}
                  </h4>
                  <span aria-hidden="true" className="h-px flex-1 bg-rule" />
                </div>
                <p className="mt-2 text-sm leading-[1.55] text-navy-700">
                  {group.text}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.slugs.map((slug) => {
                    const cat = bySlug.get(slug);
                    if (!cat) return null;
                    const live = (publishedByResource.get(slug) ?? 0) > 0;
                    if (!live) {
                      return (
                        <li
                          key={slug}
                          style={{
                            borderLeft: `3px solid ${GROUP_BARS[group.bar]}`,
                          }}
                          className="rounded-md border border-rule bg-surface p-5"
                        >
                          <span className="block text-base font-semibold text-navy-900">
                            {cat.title}
                          </span>
                          <span className="mt-0.5 block truncate text-sm leading-[1.55] text-navy-700">
                            {cat.blurb}
                          </span>
                          <span className="mt-2 inline-block rounded bg-badge-grey px-2 py-1 text-xs font-medium text-navy-500">
                            Coming soon
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={slug}>
                        <Link
                          href={urls.resourceHub(cat.slug)}
                          style={{
                            borderLeft: `3px solid ${GROUP_BARS[group.bar]}`,
                          }}
                          className="group block rounded-md border border-rule bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(15,27,51,0.08)]"
                        >
                          <span className="block text-base font-semibold text-navy-900 group-hover:underline group-hover:underline-offset-4">
                            {cat.title}
                          </span>
                          <span className="mt-0.5 block truncate text-sm leading-[1.55] text-navy-700">
                            {cat.blurb}
                          </span>
                          <span className="mt-2 block text-sm font-semibold text-accent-700">
                            Browse
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {popular.length > 0 && (
          <section aria-labelledby="discovery-popular-heading" className="mt-12">
            <h3
              id="discovery-popular-heading"
              className="text-2xl font-semibold tracking-tight text-navy-900"
            >
              Popular chapters
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((p) => {
                const href = urls.chapterPage(
                  p.classSlug,
                  p.subjectSlug,
                  p.resourceSlug,
                  p.item.chapterSlug,
                );
                const tint =
                  SUBJECT_TINTS[p.subjectSlug] ?? "var(--navy-900)";
                const shortTitle =
                  bySlug.get(p.resourceSlug as SchoolResourceSlug)
                    ?.shortTitle ?? p.resourceSlug;
                return (
                  <li key={href} className="min-w-0">
                    <Link
                      href={href}
                      style={{
                        borderLeft: `3px solid ${tint}`,
                        background: `color-mix(in srgb, ${tint} 6%, transparent)`,
                      }}
                      className="group block h-full rounded-md border border-rule bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(15,27,51,0.08)]"
                    >
                      <span className="block text-lg font-semibold tracking-tight text-navy-900 group-hover:underline">
                        {p.item.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] font-medium text-navy-500">
                        {p.classSlug.replace("class-", "Class ")} /{" "}
                        {subjectName.get(
                          `${p.classSlug}/${p.subjectSlug}`,
                        ) ?? p.subjectSlug}{" "}
                        / {shortTitle}
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-accent-700">
                        Open
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section aria-labelledby="discovery-exams-heading" className="mt-12">
          <h3
            id="discovery-exams-heading"
            className="text-2xl font-semibold tracking-tight text-navy-900"
          >
            Competitive exams
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {exams.map((exam) => {
              const label =
                exam.slug === "jee"
                  ? "Joint Entrance Examination"
                  : "National Eligibility cum Entrance Test";
              const subjects = exam.subjects
                .filter((s) => s.status !== "archived")
                .map((s) => s.name)
                .join(" · ");
              return (
                <Link
                  key={exam.slug}
                  href={urls.examPage(exam.slug)}
                  className="group flex h-full flex-col rounded-md border border-rule border-t-4 border-t-navy-900 bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(15,27,51,0.08)]"
                >
                  <span className="text-[13px] font-semibold text-accent-700">
                    {label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold tracking-tight text-navy-900 group-hover:underline group-hover:underline-offset-4">
                    {exam.name} Preparation
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-[1.55] text-navy-700">
                    {subjects}
                  </span>
                  <span className="mt-1 block text-sm leading-[1.55] text-navy-500">
                    Chapter-wise notes, PYQs and mock tests
                  </span>
                  <span className="mt-auto block pt-3 text-sm font-semibold text-accent-700">
                    Explore {exam.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
