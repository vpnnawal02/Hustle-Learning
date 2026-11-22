import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import NewsCard, { CategoryPill } from "@/app/components/NewsCard";
import JsonLd from "@/app/components/seo/JsonLd";
import { PageTitle } from "@/app/components/typography";
import {
  DATE_SHEETS,
  NEWS_ARTICLES,
  articleFaqs,
  articleSections,
  getNewsArticle,
} from "@/app/components/news-articles";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  canonical,
  faqJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | Hustle Learning News`,
    description: article.summary,
    canonical: canonical(`/news/${article.slug}`),
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const sections = articleSections(article);
  const faqs = articleFaqs(article);
  const dateSheet = DATE_SHEETS[article.id];
  const related = NEWS_ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  )
    .concat(NEWS_ARTICLES.filter((a) => a.slug !== article.slug && a.category !== article.category))
    .slice(0, 3);
  const faqSchema = faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <JsonLd data={breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "News", href: "/news" },
        { label: article.title },
      ])} />
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.summary,
          url: `/news/${article.slug}`,
          updatedAt: article.dateISO,
        })}
      />
      {faqSchema && <JsonLd data={faqSchema} />}
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "News", href: "/news" },
            { label: article.category },
          ]}
        />
        <Link
          href="/news"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All news
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryPill category={article.category} />
            </div>
            <PageTitle className="mt-3 max-w-[28ch]">{article.title}</PageTitle>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-text-muted">
              <time dateTime={article.dateISO}>{article.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>Hustle Learning editorial</span>
            </p>
            <p className="mt-4 border-l-2 border-accent pl-4 text-base leading-[1.7] font-medium text-text-primary sm:text-lg">
              {article.summary}
            </p>

            <figure className="mt-6 overflow-hidden rounded-lg border border-border">
              <span className="relative block aspect-[16/9] w-full bg-surface-muted">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  className="object-cover object-center"
                />
              </span>
            </figure>

            {dateSheet && (
              <section
                aria-label="Key exam dates 2027"
                className="mt-8 overflow-hidden rounded-lg border border-accent/60 bg-accent/10"
              >
                <div className="p-5 sm:p-6">
                  <h2 className="text-xl leading-tight font-bold text-text-primary sm:text-2xl">
                    Key Exam Dates 2027
                  </h2>
                  <dl className="mt-4 divide-y divide-border overflow-hidden rounded-md border border-border bg-surface">
                    {dateSheet.keyDates.map((d) => (
                      <div
                        key={d.label}
                        className="grid gap-0.5 px-4 py-3 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="text-sm font-bold text-text-primary">
                          {d.label}
                        </dt>
                        <dd className="text-sm leading-relaxed text-text-secondary">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {dateSheet.timetable.length > 0 && (
                    <>
                      <h3 className="mt-6 text-lg font-bold text-text-primary">
                        {dateSheet.timetableTitle}
                      </h3>
                      <div className="mt-3 overflow-x-auto rounded-md border border-border bg-surface">
                        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th
                                scope="col"
                                className="px-4 py-2.5 font-bold whitespace-nowrap text-text-primary"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2.5 font-bold text-text-primary"
                              >
                                Subject
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {dateSheet.timetable.map((row) => (
                              <tr key={`${row.date}-${row.subject}`}>
                                <td className="px-4 py-2.5 font-semibold whitespace-nowrap text-text-primary">
                                  {row.date}
                                </td>
                                <td className="px-4 py-2.5 text-text-secondary">
                                  {row.subject}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
                    {dateSheet.note}
                  </p>

                  {dateSheet.links.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {dateSheet.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                        >
                          {l.label}
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {sections.map((s) => (
              <section key={s.heading} className="mt-10 scroll-mt-24">
                <h2 className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]">
                  {s.heading}
                </h2>
                {s.paras.map((para) => (
                  <p
                    key={para.slice(0, 32)}
                    className="mt-3 text-[15px] leading-[1.75] text-text-secondary sm:text-base"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <section
              aria-label="Official sources"
              className="mt-10 rounded-md border border-border bg-surface p-5"
            >
              <p className="text-sm font-bold text-text-primary">
                Verify with official sources
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                Time-sensitive claims should always be checked against the
                original CBSE publication. Last reviewed {article.dateLabel}.
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm font-semibold">
                <li>
                  <a
                    href="https://www.cbse.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-primary underline underline-offset-4 hover:text-accent-700"
                  >
                    CBSE official website
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cbseacademic.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-primary underline underline-offset-4 hover:text-accent-700"
                  >
                    CBSE Academic — sample papers & curriculum
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </section>

            <section
              aria-label="Keep learning"
              className="mt-6 rounded-md border border-accent/50 bg-accent/10 p-5 sm:p-6"
            >
              <p className="text-base font-bold text-text-primary">
                Continue your preparation with Hustle Learning
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={article.courseHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  {article.courseLabel}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
                >
                  Free study material
                </Link>
                <Link
                  href="/enroll"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
                >
                  Enrol now
                </Link>
              </div>
            </section>

            <section aria-label="Frequently asked questions" className="mt-10">
              <h2 className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {faqs.map((f) => (
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
          </article>

          <aside aria-label="Related stories" className="min-w-0">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div>
                <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                  Related stories
                </p>
                <div className="mt-3 flex flex-col gap-6">
                  {related.map((a) => (
                    <NewsCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
              <Link
                href="/news"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted"
              >
                Browse all news
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
