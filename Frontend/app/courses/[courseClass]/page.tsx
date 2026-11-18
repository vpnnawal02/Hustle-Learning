import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/app/components/Footer";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { PageTitle } from "@/app/components/typography";
import SubjectCourseCard from "@/app/components/SubjectCourseCard";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  CLASS_COURSE_GROUPS,
  formatINR,
  getClassCourseGroup,
} from "@/app/components/class-courses";
import {
  getClassCourseContent,
  type ClassCourseContent,
} from "@/app/components/class-course-content";
import { faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return CLASS_COURSE_GROUPS.map((g) => ({ courseClass: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseClass: string }>;
}): Promise<Metadata> {
  const { courseClass } = await params;
  const group = getClassCourseGroup(courseClass);
  if (!group) return {};
  const content = getClassCourseContent(courseClass);
  if (content) {
    return {
      title: `${content.h1} | Hustle Learning`,
      description: content.intro[0],
    };
  }
  return {
    title: `${group.label} Courses — Live Online Batches | Hustle Learning`,
    description: `${group.description} Subjects: ${group.courses.map((c) => c.subject).join(", ")}. ₹499/month, ₹5000/year.`,
  };
}

function RichClassPage({
  group,
  content,
}: {
  group: NonNullable<ReturnType<typeof getClassCourseGroup>>;
  content: ClassCourseContent;
}) {
  const faqSchema = faqJsonLd(
    content.faqs.map((f) => ({ question: f.q, answer: f.a })),
  );
  const toc = [
    { href: "#explore", label: `Explore ${group.label} courses` },
    { href: "#subjects", label: `${group.label} subjects` },
    { href: "#why", label: `Why Hustle Learning` },
    { href: "#who", label: "Who can join" },
    { href: "#how", label: "How to enrol" },
    { href: "#faqs", label: "FAQs" },
  ];
  const enrollHref =
    content.featuredCourses.length === 1
      ? `/enroll?class=${group.slug}&course=${content.featuredCourses[0].courseId}&plan=monthly`
      : `/enroll?class=${group.slug}`;

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <PageTitle className="max-w-[28ch]">{content.h1}</PageTitle>
          {content.intro.slice(0, 1).map((para) => (
            <p
              key={para.slice(0, 24)}
              className="mt-3 text-base leading-[1.7] text-text-secondary"
            >
              {para}
            </p>
          ))}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {group.courses.map((c) => (
                <SubjectCourseCard key={c.id} course={c} />
              ))}
            </div>

          {content.intro.slice(1).map((para) => (
            <p
              key={para.slice(0, 24)}
              className="mt-4 text-base leading-[1.7] text-text-secondary"
            >
              {para}
            </p>
          ))}

          <div className="mt-8">
            <section aria-labelledby="explore" className="scroll-mt-24">
              <h2
                id="explore"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                {content.exploreHeading}
              </h2>
              {content.exploreBody.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-3 text-[15px] leading-[1.7] text-text-secondary"
                >
                  {para}
                </p>
              ))}

              {content.featuredCourses.map((featured) => {
                const course = group.courses.find(
                  (c) => c.id === featured.courseId,
                );
                const featuredEnrollHref = `/enroll?class=${group.slug}&course=${featured.courseId}&plan=monthly`;
                return (
                  <div
                    key={featured.name}
                    className="mt-6 rounded-md border border-border bg-surface p-6"
                  >
                    <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                      {featured.name}
                    </h3>
                    {featured.body.map((para) => (
                      <p
                        key={para.slice(0, 24)}
                        className="mt-2 text-[15px] leading-[1.7] text-text-secondary"
                      >
                        {para}
                      </p>
                    ))}
                    <p className="mt-4 text-sm font-bold text-text-primary">
                      Subjects Covered
                    </p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {featured.subjects.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-text-secondary"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                    {featured.medium && (
                      <p className="mt-3 text-[15px] text-text-secondary">
                        <strong className="text-text-primary">Medium:</strong>{" "}
                        {featured.medium}
                      </p>
                    )}
                    <p className="mt-4 text-sm font-bold text-text-primary">
                      Learning Focus
                    </p>
                    <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-[15px] leading-[1.7] text-text-secondary marker:text-text-muted">
                      {featured.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    {course && (
                      <p className="mt-4 text-xl font-extrabold tracking-tight text-text-primary">
                        {formatINR(course.monthlyPrice)}{" "}
                        <span className="text-sm font-medium text-text-muted">
                          per month
                        </span>{" "}
                        <span className="text-sm font-semibold text-text-secondary">
                          · {formatINR(course.yearlyPrice)}{" "}
                          <span className="font-medium text-text-muted">
                            per year
                          </span>
                        </span>
                      </p>
                    )}
                    <Link
                      href={featuredEnrollHref}
                      aria-label={`Enrol in ${featured.name}`}
                      className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                    >
                      Enrol Now
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                );
              })}
            </section>

            <section aria-labelledby="subjects" className="mt-12 scroll-mt-24">
              <h2
                id="subjects"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                {group.label} Subjects
              </h2>
              {content.subjects.map((s) => (
                <section key={s.name} className="mt-8">
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                    {s.name}
                  </h3>
                  {s.body.map((para) => (
                    <p
                      key={para.slice(0, 24)}
                      className="mt-2 text-[15px] leading-[1.7] text-text-secondary"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </section>

            <section aria-labelledby="why" className="mt-12 scroll-mt-24">
              <h2
                id="why"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                Why Choose Hustle Learning for {group.label}?
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.whyPoints.map((w) => (
                  <div
                    key={w.title}
                    className="rounded-md border border-border bg-surface p-4"
                  >
                    <p className="text-[15px] font-bold text-text-primary">
                      {w.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {w.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="who" className="mt-12 scroll-mt-24">
              <h2
                id="who"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                Who Can Join These Courses?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-text-secondary">
                Our {group.label} courses are suitable for:
              </p>
              <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.7] text-text-secondary marker:text-text-muted">
                {content.whoCanJoin.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="how" className="mt-12 scroll-mt-24">
              <h2
                id="how"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                How to Enrol in {group.label} Courses?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-text-secondary">
                Getting started with Hustle Learning is simple.
              </p>
              <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-[1.7] text-text-secondary marker:font-bold marker:text-text-primary">
                {content.enrolSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="faqs" className="mt-12 scroll-mt-24">
              <h2
                id="faqs"
                className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
              >
                Frequently Asked Questions – {group.label} Online Courses
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {content.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="rounded-md border border-border bg-surface px-4 py-3"
                  >
                    <summary className="cursor-pointer text-[15px] font-semibold text-text-primary">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section aria-label="Closing" className="mt-12 scroll-mt-24">
              {content.closingHeading && (
                <h2 className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]">
                  {content.closingHeading}
                </h2>
              )}
              {content.closing.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-3 text-[15px] leading-[1.7] text-text-secondary"
                >
                  {para}
                </p>
              ))}
              <p className="mt-4 text-base font-bold text-text-primary">
                Hustle Learning – Learn Smart. Hustle Hard.
              </p>
            </section>
          </div>
        </div>

        <aside aria-label="Page sections" className="min-w-0">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <nav
              aria-label="On this page"
              className="rounded-md border border-border bg-surface p-5"
            >
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                On this page
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {toc.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav
              aria-label="Explore"
              className="rounded-md border border-border bg-surface p-5"
            >
              <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                Explore
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {CLASS_COURSE_GROUPS.filter((g) => g.slug !== group.slug).map(
                  (g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/courses/${g.slug}`}
                        className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                      >
                        {g.label} courses
                      </Link>
                    </li>
                  ),
                )}
                <li>
                  <Link
                    href="/courses"
                    className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    All courses
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${group.slug}`}
                    className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    {group.label} study material
                  </Link>
                </li>
                <li>
                  <Link
                    href={enrollHref}
                    className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    Enrol now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}

export default async function ClassCoursesRoute({
  params,
}: {
  params: Promise<{ courseClass: string }>;
}) {
  const { courseClass } = await params;
  const group = getClassCourseGroup(courseClass);
  if (!group) notFound();
  const content = getClassCourseContent(courseClass);

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Courses", href: "/courses" },
            { label: `${group.label} Courses` },
          ]}
        />
        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All classes
        </Link>

        {content ? (
          <div className="mt-3">
            <RichClassPage group={group} content={content} />
          </div>
        ) : (
          <>
            <PageTitle className="mt-3 max-w-[24ch]">
              {group.label} Courses
            </PageTitle>
            <p className="mt-3 text-xl leading-snug font-bold text-text-secondary">
              {group.tagline}
            </p>
            <p className="mt-3 text-base leading-[1.6] text-text-secondary sm:text-lg">
              {group.description} Every batch is live, with small groups,
              doubt-solving and regular tests. ₹499/- per month or ₹5000/- per
              year.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.courses.map((course) => (
                <SubjectCourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
