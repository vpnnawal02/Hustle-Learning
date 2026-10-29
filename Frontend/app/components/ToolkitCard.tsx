import Link from "next/link";
import type { ToolkitResource } from "./toolkit";

export default function ToolkitCard({ resource }: { resource: ToolkitResource }) {
  const Icon = resource.icon;
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.35)]">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
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
