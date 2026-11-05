import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Compact hub hero on a subtle lavender wash: title, short description,
 * one dynamic availability line and a CTA into the discovery section.
 * No badge clutter. Context above the h1 stays plain body text —
 * never an eyebrow (design.md rule 11).
 */
export default function HubHero({
  title,
  description,
  availability,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  availability: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section
      aria-labelledby="hub-hero-heading"
      className="hero-wash rounded-md px-5 py-6 sm:px-7 sm:py-8"
    >
      <h1
        id="hub-hero-heading"
        className="max-w-[26ch] text-3xl leading-[1.15] font-extrabold tracking-tight text-balance md:text-[34px]"
      >
        {title}
      </h1>
      <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary sm:text-base">
        {description}
      </p>
      <p className="mt-3 text-sm font-bold text-text-primary">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-2 w-2 rounded-sm bg-accent"
        />
        {availability}
      </p>
      <Link
        href={ctaHref}
        className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        {ctaLabel}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </section>
  );
}
