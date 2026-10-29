import Link from "next/link";
import type { ToolkitResource } from "./toolkit";

export default function ToolkitCard({
  resource,
  featured = false,
}: {
  resource: ToolkitResource;
  featured?: boolean;
}) {
  const Icon = resource.icon;
  if (featured) {
    return (
      <article className="flex h-full min-w-0 flex-col rounded-lg bg-accent p-5 transition-transform duration-300 hover:-translate-y-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-navy text-white">
          <Icon size={20} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-3 text-base font-bold text-brand-navy">
          {resource.title}
        </h3>
        <p className="mt-1 text-sm leading-[1.55] text-brand-navy/75">
          {resource.description}
        </p>
        <div className="mt-auto pt-4">
          <Link
            href="/subscribe"
            aria-label={`Get access to ${resource.title}`}
            className="inline-flex h-11 w-full items-center justify-center rounded bg-brand-navy px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            Get Access
          </Link>
        </div>
      </article>
    );
  }
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.35)]">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-navy text-brand-white transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
        <Icon size={20} strokeWidth={2} aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-base font-bold text-text-primary">
        {resource.title}
      </h3>
      <p className="mt-1 text-sm leading-[1.55] text-text-secondary">
        {resource.description}
      </p>
      <div className="mt-auto pt-4">
        <Link
          href="/subscribe"
          aria-label={`Get access to ${resource.title}`}
          className="inline-flex h-11 w-full items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Get Access
        </Link>
      </div>
    </article>
  );
}
