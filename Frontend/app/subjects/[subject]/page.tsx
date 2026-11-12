import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import ClassPills from "@/app/components/classes/ClassPills";
import { ComingSoon } from "@/app/components/resources/Navigation";
import { getClassesForSubject, getSubjectUniverse } from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { subjectHubCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const universe = await getSubjectUniverse();
  return universe.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const resolved = await getClassesForSubject(subject);
  if (!resolved) return {};
  return buildMetadata({
    title: `${resolved.name} by Class — Chapter-wise ${resolved.name} Resources | Hustle Learning`,
    description: `Browse ${resolved.name} study material class-wise for Classes 6–10. Pick your class to reach notes, solutions, questions and more.`,
    canonical: canonical(urls.subjectHub(subject)),
    noindex: resolved.classes.length === 0,
  });
}

export default async function SubjectClassesPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const resolved = await getClassesForSubject(subject);
  if (!resolved) notFound();
  const { name, classes } = resolved;

  return (
    <DiscoveryShell
      crumbs={subjectHubCrumbs(name)}
      context={`Study Material · ${name}`}
      title={`Select Your Class for ${name}`}
      description={`Choose your academic level to explore ${name} resources. Only classes with published ${name} chapters are listed.`}
    >
      {classes.length > 0 ? (
        <div className="mt-6 max-w-[520px]">
          <ClassPills
            currentSlug=""
            classes={classes.map(({ cls, count }) => ({
              slug: cls.slug,
              label: cls.label,
              shortLabel: cls.shortLabel,
              meta: `${count} chapter${count === 1 ? "" : "s"}`,
              href: urls.subjectClass(subject, cls.slug),
            }))}
          />
        </div>
      ) : (
        <div className="mt-8">
          <ComingSoon
            title={`${name} resources are on their way`}
            description={`Our academic team has not published ${name} chapters for any class yet. Published chapters will appear here automatically.`}
            backHref={urls.subjectsHub()}
            backLabel="Back to all subjects"
          />
        </div>
      )}
    </DiscoveryShell>
  );
}
