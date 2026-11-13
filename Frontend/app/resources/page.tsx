import Link from "next/link";
import type { Metadata } from "next";
import { Atom, Dna } from "lucide-react";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import ResourceCards from "@/app/components/resources/ResourceCards";
import { ClassSelector } from "@/app/components/resources/Selectors";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
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
  const [classes, categories] = await Promise.all([
    getClasses(),
    getResourceCategories(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Study Material" }]}
      />
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] text-balance sm:text-4xl">
        Everything you need to prepare smarter.
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-md">
        Find everything you need to excel in your school exams with free and structured CBSE study material for Classes 6 to 10. Access NCERT solutions, chapter-wise notes, important questions, sample papers, previous year questions and practice worksheets — all organised by class, subject and chapter.
      </p>

      <h2 className="mt-10 text-2xl text-text-primary">
        School Study Material · Classes 6–10
      </h2>
      <div className="mt-4">
        <ClassSelector classes={classes} />
      </div>

      <h2 className="mt-12 text-2xl text-text-primary">
        CBSE Study Resources
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Seven resource types cover the full preparation cycle — learn a
        chapter, practise it, test it under time, then revise it.
      </p>
      <ResourceCards
        items={categories.map((cat) => {
          const tint = resourceTint(cat.slug);
          return {
            title: cat.title,
            blurb: cat.description,
            href: urls.resourceHub(cat.slug),
            icon: <ResourceIcon name={cat.icon} size={22} />,
            tintText: tint.text,
            colorVar: tint.colorVar,
          };
        })}
      />

      <h2 className="mt-12 text-2xl text-text-primary">
        Competitive Exams
      </h2>
      <ResourceCards
        items={[
          {
            title: "JEE Preparation",
            blurb: "Physics · Chemistry · Mathematics",
            href: urls.examPage("jee"),
            icon: <Atom size={22} strokeWidth={1.5} aria-hidden="true" />,
            tintText: "text-text-secondary",
            colorVar: "var(--text-secondary)",
          },
          {
            title: "NEET Preparation",
            blurb: "Physics · Chemistry · Biology",
            href: urls.examPage("neet"),
            icon: <Dna size={22} strokeWidth={1.5} aria-hidden="true" />,
            tintText: "text-text-secondary",
            colorVar: "var(--text-secondary)",
          },
        ]}
      />

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
