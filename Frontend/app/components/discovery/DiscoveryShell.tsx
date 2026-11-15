import type { ReactNode } from "react";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { PageTitle } from "@/app/components/typography";
import type { BreadcrumbItem } from "@/types/content";

/**
 * Shared shell for every discovery selection screen: centered 1100px
 * container, workflow-aware breadcrumbs, one h1, supporting copy.
 * The context line is plain body text — never an eyebrow (design.md).
 */
export default function DiscoveryShell({
  crumbs,
  context,
  title,
  description,
  children,
}: {
  crumbs: BreadcrumbItem[];
  context: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[var(--container-reading)] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={crumbs} />
      <p className="mt-6 text-[15px] leading-[1.6] text-text-secondary">
        {context}
      </p>
      <PageTitle className="mt-2 max-w-[26ch]">{title}</PageTitle>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
        {description}
      </p>
      {children}
    </div>
  );
}
