import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import Faq from "@/app/components/resources/Faq";
import { LinkList } from "@/app/components/resources/LinkLists";
import {
  getClasses,
  getResourceCategories,
  getResourceCategory,
  getResourceFile,
} from "@/lib/data/school";
import { publishedItems } from "@/lib/data/helpers";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const cats = await getResourceCategories();
  return cats.map((c) => ({ resource: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ resource: string }>;
}): Promise<Metadata> {
  const { resource } = await params;
  const cat = await getResourceCategory(resource);
  if (!cat) return {};
  const path = urls.resourceHub(resource);
  let hasPublished = false;
  for (const cls of await getClasses()) {
    for (const subject of cls.subjects) {
      const file = await getResourceFile(cls.slug, subject.slug, resource);
      if (publishedItems(file).length > 0) {
        hasPublished = true;
        break;
      }
    }
    if (hasPublished) break;
  }
  return buildMetadata({
    title: `${cat.title} for Classes 6–10 | Hustle Learning`,
    description: `${cat.description} Browse class-wise ${cat.title.toLowerCase()} for CBSE Classes 6–10, organised by subject and chapter.`,
    canonical: canonical(path),
    noindex: !hasPublished,
  });
}

export default async function ResourceHubPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const cat = await getResourceCategory(resource);
  if (!cat) notFound();

  const classes = await getClasses();
  const categories = await getResourceCategories();
  const sections: {
    classLabel: string;
    classSlug: string;
    links: { title: string; href: string; meta: string }[];
  }[] = [];
  let totalPublished = 0;

  for (const cls of classes) {
    const links: { title: string; href: string; meta: string }[] = [];
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      const file = await getResourceFile(cls.slug, subject.slug, resource);
      const items = publishedItems(file);
      totalPublished += items.length;
      for (const item of items) {
        const chapter = subject.chapters.find(
          (c) => c.slug === item.chapterSlug,
        );
        links.push({
          title: `${subject.name} — ${chapter?.title ?? item.chapterSlug}`,
          href: urls.chapterPage(cls.slug, subject.slug, resource, item.chapterSlug),
          meta: `Updated ${item.updatedAt}`,
        });
      }
      if (items.length === 0) {
        links.push({
          title: `${subject.name} — overview`,
          href: urls.resourcePage(cls.slug, subject.slug, resource),
          meta: "Coming soon",
        });
      }
    }
    sections.push({ classLabel: cls.label, classSlug: cls.slug, links });
  }

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Study Material", href: "/resources" },
          { label: cat.title },
        ]}
      />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        Study Resources
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {cat.title} for Classes 6–10
      </h1>
      {(cat.intro ?? []).map((para, i) => (
        <p
          key={i}
          className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg"
        >
          {para}
        </p>
      ))}

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
        Browse {cat.shortTitle.toLowerCase()} by class
      </h2>
      <div className="mt-4 grid max-w-[1100px] gap-x-10 gap-y-8 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.classSlug} aria-label={section.classLabel}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-extrabold tracking-tight text-text-primary">
                <Link
                  href={urls.classPage(section.classSlug)}
                  className="hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
                >
                  {section.classLabel}
                </Link>
              </h3>
            </div>
            <div className="mt-1">
              <LinkList items={section.links} />
            </div>
          </section>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        How to use {cat.shortTitle.toLowerCase()}
      </h2>
      <ul className="mt-3 flex max-w-[68ch] list-disc flex-col gap-2 pl-6 text-[15px] leading-[1.6] text-text-secondary">
        {(cat.howTo ?? []).map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Explore other resources
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={categories
            .filter((c) => c.slug !== resource)
            .map((c) => ({
              title: c.title,
              href: urls.resourceHub(c.slug),
              meta: c.description,
            }))}
        />
      </div>

      <div className="max-w-[860px]">
        <Faq
          faqs={cat.faqs ?? []}
          structured={totalPublished > 0}
          heading={`${cat.title}: FAQs`}
        />
      </div>
    </div>
  );
}
