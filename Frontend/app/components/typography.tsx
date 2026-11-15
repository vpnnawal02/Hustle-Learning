import type { ReactNode } from "react";

/**
 * Central typography system for Hustle Learning.
 *
 * Every value below is extracted verbatim from the two design references —
 * the Hero (HeroCarousel headline + lead paragraph) and the About section
 * (WhoWeAre h2 + subtitle + description). Do not invent sizes, weights,
 * line-heights or letter-spacing here: add a variant only when a
 * reference section already uses it.
 *
 * Rules:
 * - Section-level headers across the site use <SectionHeading />.
 * - Content-page h1s use <PageTitle /> (type is fixed; callers pass
 *   layout only — margins and measure — via className).
 * - Article body type (ContentRenderer), dark-band type (CtaBand) and
 *   one-off components keep their own contextual scales.
 */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.1em] text-text-muted uppercase ${className}`}
    >
      {children}
    </p>
  );
}

type SubTone = "primary" | "secondary";

/**
 * Major section header in the About rhythm: title, optional subtitle,
 * optional description. `size="xl"` preserves the About 56px desktop
 * display size; everything else uses the standard scale.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  sub,
  subTone = "primary",
  description,
  size = "md",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
  sub?: ReactNode;
  subTone?: SubTone;
  description?: ReactNode;
  size?: "md" | "xl";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2
        id={titleId}
        className={`max-w-[24ch] text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl ${
          size === "xl" ? "lg:text-[56px]" : ""
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-3 text-xl leading-snug font-bold sm:text-2xl ${
            subTone === "primary" ? "text-text-primary" : "text-text-secondary"
          }`}
        >
          {sub}
        </p>
      )}
      {description && (
        <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Content-page h1 scale. The type is fixed; `className` is for layout
 * only (top margin, measure) — never for font-size overrides.
 */
export function PageTitle({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      id={id}
      className={`text-3xl leading-[1.1] text-balance text-text-primary sm:text-4xl ${className}`}
    >
      {children}
    </h1>
  );
}
