import Link from "next/link";

const CLASS_LINKS = [
  { href: "/class-6", label: "Class 6" },
  { href: "/class-7", label: "Class 7" },
  { href: "/class-8", label: "Class 8" },
  { href: "/class-9", label: "Class 9" },
  { href: "/class-10", label: "Class 10" },
];

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Study Material" },
  { href: "/courses", label: "All Courses" },
  { href: "/classes", label: "One-on-One Classes" },
  { href: "/subscribe", label: "Subscribe" },
];

const TRACK_LINKS = [
  { href: "/jee", label: "JEE Preparation" },
  { href: "/neet", label: "NEET Preparation" },
  { href: "/search", label: "Search Resources" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
];

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <p className="text-sm font-semibold text-text-primary">{heading}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={hrefKey(link)}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function hrefKey(link: { href: string; label: string }) {
  return `${link.href}__${link.label}`;
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-8 px-4 py-10 sm:grid-cols-2 md:px-6 md:py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-lg font-semibold tracking-tight text-text-primary">
            Hustle <span className="text-brand-amber">Learning</span>
          </p>
          <p className="mt-1 text-sm font-medium text-text-secondary">
            Learn Smart. Hustle Hard.
          </p>
          <p className="mt-3 max-w-[38ch] text-sm leading-[1.6] text-text-secondary">
            Study material, online classes, home tutors, and books for school
            students — structured preparation from Class 6 to Class 12.
          </p>
        </div>
        <LinkColumn heading="Classes" links={CLASS_LINKS} />
        <LinkColumn heading="Explore" links={EXPLORE_LINKS} />
        <LinkColumn heading="Popular" links={TRACK_LINKS} />
        <LinkColumn heading="Legal" links={LEGAL_LINKS} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 py-4 text-[13px] text-text-muted md:px-6">
          © 2026 Hustle Learning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
