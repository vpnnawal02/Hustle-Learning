import Link from "next/link";
import type { BreadcrumbItem } from "@/types/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "../seo/JsonLd";

/** Server-rendered breadcrumb trail with BreadcrumbList structured data. */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-text-muted">
                    /
                  </span>
                )}
                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className="font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={
                      last
                        ? "font-semibold text-text-primary"
                        : "text-text-secondary"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
