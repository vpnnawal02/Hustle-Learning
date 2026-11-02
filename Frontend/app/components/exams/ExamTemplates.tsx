import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../layout/Breadcrumbs";
import ContentRenderer from "../resources/ContentRenderer";
import Faq from "../resources/Faq";
import { LinkGroup } from "../resources/LinkLists";
import { ComingSoon } from "../resources/Navigation";
import JsonLd from "../seo/JsonLd";
import { getExam, getExamResourceFile } from "@/lib/data/exams";
import { publishedExamItems } from "@/lib/data/helpers";
import {
  examCrumbs,
  examResourceCrumbs,
  examSubjectCrumbs,
} from "@/lib/breadcrumbs";
import { articleJsonLd } from "@/lib/seo";
import { urls } from "@/lib/urls";

/** Reusable exam landing template — used by /jee and /neet. */
export async function ExamLanding({ examSlug }: { examSlug: string }) {
  const exam = await getExam(examSlug);
  if (!exam || exam.status !== "published") notFound();

  const subjects = exam.subjects.filter((s) => s.status !== "archived");

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={examCrumbs(exam.name)} />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {exam.fullName} · {exam.tagline}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {exam.name} Preparation
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {exam.description}
      </p>

      {(exam.sections ?? []).map((section) => (
        <section key={section.heading} className="mt-8 max-w-[72ch]">
          <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
            {section.heading}
          </h2>
          {section.body.map((para, i) => (
            <p
              key={i}
              className="mt-3 text-[15px] leading-[1.65] text-text-secondary sm:text-base"
            >
              {para}
            </p>
          ))}
        </section>
      ))}

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        {exam.name} Subjects & Resources
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Open a subject for its chapters, or jump straight to notes, PYQs,
        practice sets, mocks and revision for any subject.
      </p>
      <div className="mt-4 max-w-[860px]">
        {subjects.map((subject) => (
          <LinkGroup
            key={subject.slug}
            label={subject.name}
            href={urls.examSubjectPage(exam.slug, subject.slug)}
            hint={`${subject.tagline} · ${subject.chapters.length} chapters`}
            items={exam.resources.map((res) => ({
              title: res.title,
              href: urls.examResourcePage(exam.slug, subject.slug, res.slug),
              meta: res.description,
            }))}
          />
        ))}
      </div>

      <div className="max-w-[860px]">
        <Faq faqs={exam.faqs ?? []} heading={`${exam.name}: FAQs`} />
      </div>
    </div>
  );
}

/** Reusable exam subject template — /jee/physics, /neet/biology, … */
export async function ExamSubjectPage({
  examSlug,
  subjectSlug,
}: {
  examSlug: string;
  subjectSlug: string;
}) {
  const exam = await getExam(examSlug);
  const subject = exam?.subjects.find(
    (s) => s.slug === subjectSlug && s.status !== "archived",
  );
  if (!exam || !subject || subject.status !== "published") notFound();

  const resourceCounts = new Map<string, number>();
  for (const res of exam.resources) {
    const file = await getExamResourceFile(exam.slug, subject.slug, res.slug);
    resourceCounts.set(res.slug, publishedExamItems(file).length);
  }
  const siblingSubjects = exam.subjects.filter(
    (s) => s.slug !== subject.slug && s.status !== "archived",
  );

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={examSubjectCrumbs(exam.name, exam.slug, subject.name)} />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {exam.name} · {subject.tagline}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {exam.name} {subject.name}
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {subject.description}
      </p>
      <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        {subject.name} covers {subject.chapters.length} chapters
        {subject.chapters.length > 0 && (
          <>
            , from {subject.chapters[0].title} to{" "}
            {subject.chapters[subject.chapters.length - 1].title}
          </>
        )}
        . Choose a resource type below — published material opens
        immediately, the rest is marked coming soon.
      </p>

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
        {subject.name} Resources
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkGroup
          label={`${subject.name} preparation material`}
          href={urls.examSubjectPage(exam.slug, subject.slug)}
          items={exam.resources.map((res) => {
            const n = resourceCounts.get(res.slug) ?? 0;
            return {
              title: res.title,
              href: urls.examResourcePage(exam.slug, subject.slug, res.slug),
              meta: res.description,
              badge: n > 0 ? `${n} published` : "Coming soon",
            };
          })}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        {subject.name} Chapters
      </h2>
      <ol className="mt-4 max-w-[860px] border-t border-border">
        {subject.chapters.map((chapter, i) => (
          <li
            key={chapter.slug}
            className="flex min-h-[56px] items-center gap-3 border-b border-border py-3"
          >
            <span
              aria-hidden="true"
              className="w-12 shrink-0 text-sm font-bold text-text-muted"
            >
              {i + 1}
            </span>
            <span className="flex-1 font-semibold text-text-primary">
              {chapter.title}
            </span>
            {chapter.status !== "published" && (
              <span className="shrink-0 rounded bg-surface-muted px-3 py-1 text-[13px] font-semibold text-text-muted">
                Coming soon
              </span>
            )}
          </li>
        ))}
      </ol>

      {siblingSubjects.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
            More {exam.name} Subjects
          </h2>
          <ul className="mt-4 max-w-[860px] border-t border-border">
            {siblingSubjects.map((s) => (
              <li key={s.slug}>
                <Link
                  href={urls.examSubjectPage(exam.slug, s.slug)}
                  className="group flex min-h-[52px] items-center justify-between gap-3 border-b border-border py-3"
                >
                  <span>
                    <span className="block font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                      {exam.name} {s.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-text-muted">
                      {s.tagline}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-bold text-text-muted group-hover:text-accent"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/**
 * Reusable exam resource template — /jee/physics/notes, …
 * Items render inline (exam URLs stop at the resource level).
 */
export async function ExamResourcePage({
  examSlug,
  subjectSlug,
  resourceSlug,
}: {
  examSlug: string;
  subjectSlug: string;
  resourceSlug: string;
}) {
  const exam = await getExam(examSlug);
  const subject = exam?.subjects.find(
    (s) => s.slug === subjectSlug && s.status !== "archived",
  );
  const resource = exam?.resources.find((r) => r.slug === resourceSlug);
  if (!exam || !subject || !resource) notFound();

  const file = await getExamResourceFile(examSlug, subjectSlug, resourceSlug);
  const items = publishedExamItems(file);
  const path = urls.examResourcePage(examSlug, subjectSlug, resourceSlug);

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={examResourceCrumbs(
            exam.name,
            exam.slug,
            subject.name,
            subject.slug,
            resource.title,
          )}
        />
        <div className="mt-8">
          <ComingSoon
            title={`${exam.name} ${subject.name} ${resource.title} — coming soon`}
            description="Our academic team is verifying this material. Published resources will appear here automatically."
            backHref={urls.examSubjectPage(examSlug, subjectSlug)}
            backLabel={`Back to ${subject.name}`}
          />
        </div>
      </div>
    );
  }

  const siblingResources = exam.resources.filter(
    (r) => r.slug !== resourceSlug,
  );

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={examResourceCrumbs(
          exam.name,
          exam.slug,
          subject.name,
          subject.slug,
          resource.title,
        )}
      />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {exam.name} · {subject.name}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {exam.name} {subject.name} {resource.title}
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {resource.description} {items.length} published{" "}
        {items.length === 1 ? "section" : "sections"} below
        {items[0]?.chapterSlug
          ? `, starting with ${
              subject.chapters.find((c) => c.slug === items[0].chapterSlug)
                ?.title ?? items[0].chapterSlug
            }`
          : ""}
        .
      </p>

      <div className="mt-8 flex max-w-[860px] flex-col gap-10">
        {items.map((item) => (
          <article
            key={item.id}
            aria-labelledby={`${item.id}-title`}
            className="border-t border-border pt-8 first:border-t-0 first:pt-0"
          >
            <JsonLd
              data={articleJsonLd({
                headline: item.title,
                description: item.description,
                url: path,
                updatedAt: item.updatedAt,
              })}
            />
            <h2
              id={`${item.id}-title`}
              className="text-2xl font-extrabold tracking-tight text-text-primary"
            >
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Last updated {item.updatedAt}
            </p>
            <div className="mt-4">
              <ContentRenderer blocks={item.blocks} />
            </div>
            <Faq faqs={item.faqs ?? []} structured={(item.faqs ?? []).length > 0} />
          </article>
        ))}
      </div>

      {siblingResources.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
            More {subject.name} preparation
          </h2>
          <ul className="mt-4 max-w-[860px] border-t border-border">
            {siblingResources.map((r) => (
              <li key={r.slug}>
                <Link
                  href={urls.examResourcePage(exam.slug, subject.slug, r.slug)}
                  className="group flex min-h-[52px] items-center justify-between gap-3 border-b border-border py-3"
                >
                  <span>
                    <span className="block font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                      {subject.name} {r.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-text-muted">
                      {r.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-bold text-text-muted group-hover:text-accent"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
