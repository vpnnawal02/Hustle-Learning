import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { LinkGroup, LinkList } from "@/app/components/resources/LinkLists";
import { ClassSelector } from "@/app/components/resources/Selectors";
import { getExams } from "@/lib/data/exams";
import { getClasses, getResourceCategories } from "@/lib/data/school";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

export const metadata: Metadata = buildMetadata({
  title: "Study Material for Classes 6–10, JEE & NEET | Hustle Learning",
  description:
    "Browse NCERT solutions, notes, important questions, sample papers, PYQs, worksheets and formula sheets for Classes 6–10, plus JEE and NEET preparation tracks.",
  canonical: canonical("/resources"),
});

export default async function ResourcesHubPage() {
  const [classes, categories, exams] = await Promise.all([
    getClasses(),
    getResourceCategories(),
    getExams(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Study Material" }]}
      />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        Study Material
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        Everything you need to prepare smarter.
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        Pick your class to find NCERT solutions, notes, important questions,
        sample papers and more — or jump straight into a JEE or NEET track.
        Every resource is organised the same way: class, then subject, then
        chapter, so students always know exactly where they are.
      </p>

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
        School Education · Classes 6–10
      </h2>
      <div className="mt-4">
        <ClassSelector classes={classes} />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Study Resources
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Seven resource types cover the full preparation cycle — learn a
        chapter, practise it, test it under time, then revise it. Open any
        type to browse it class-wise.
      </p>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={categories.map((cat) => ({
            title: cat.title,
            href: urls.resourceHub(cat.slug),
            meta: cat.description,
          }))}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Three ways to explore
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Start wherever feels natural — by material, by class, or by
        subject. All three paths lead to the same chapter-wise resources.
      </p>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={[
            {
              title: "Browse by material",
              href: urls.materialsHub(),
              meta: "Notes, solutions, questions, papers and more — then class, then subject.",
            },
            {
              title: "Browse by subject",
              href: urls.subjectsHub(),
              meta: "Science, Mathematics, English, Social Science — then class, then material.",
            },
          ]}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Competitive Exams
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkGroup
          label="JEE Preparation"
          href={urls.examPage("jee")}
          hint="Physics · Chemistry · Mathematics"
          items={(
            exams.find((e) => e.slug === "jee")?.subjects ?? []
          ).map((s) => ({
            title: s.name,
            href: urls.examSubjectPage("jee", s.slug),
            meta: s.tagline,
          }))}
        />
        <div className="mt-8">
          <LinkGroup
            label="NEET Preparation"
            href={urls.examPage("neet")}
            hint="Physics · Chemistry · Biology"
            items={(
              exams.find((e) => e.slug === "neet")?.subjects ?? []
            ).map((s) => ({
              title: s.name,
              href: urls.examSubjectPage("neet", s.slug),
              meta: s.tagline,
            }))}
          />
        </div>
      </div>

      <p className="mt-10 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Not sure where to begin?{" "}
        <Link
          href="/search"
          className="font-semibold text-text-primary underline underline-offset-4"
        >
          Search every chapter and resource
        </Link>{" "}
        or{" "}
        <Link
          href="/#hero-enquiry"
          className="font-semibold text-text-primary underline underline-offset-4"
        >
          request a free callback
        </Link>{" "}
        and our counsellor will point you to the right material.
      </p>
    </div>
  );
}
