import Link from "next/link";
import { FileText, LayoutGrid, Search } from "lucide-react";
import { urls } from "@/lib/urls";

/** Sticky bottom shortcut bar for phones — most students are on mobile. */
export default function MobileBar({ classSlug }: { classSlug?: string }) {
  const samplePapersHref =
    classSlug != null
      ? urls.classMaterial(classSlug, "sample-papers")
      : urls.resourceHub("sample-papers");
  const item =
    "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-text-secondary active:text-text-primary";
  return (
    <nav
      aria-label="Study shortcuts"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch">
        <li className="flex-1">
          <Link href="#subjects" className={item}>
            <LayoutGrid size={20} aria-hidden="true" />
            Subjects
          </Link>
        </li>
        <li className="flex-1">
          <Link href={samplePapersHref} className={item}>
            <FileText size={20} aria-hidden="true" />
            Sample Papers
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/search" className={item}>
            <Search size={20} aria-hidden="true" />
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}
