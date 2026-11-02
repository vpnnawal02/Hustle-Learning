import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Study Material" },
  { href: "/courses", label: "All Courses" },
  { href: "/classes", label: "One-on-One Classes" },
  { href: "/subscribe", label: "Subscribe" },
];

const TRACK_LINKS = [
  { href: "/class-10", label: "Class 10" },
  { href: "/class-9", label: "Class 9" },
  { href: "/jee", label: "JEE Preparation" },
  { href: "/neet", label: "NEET Preparation" },
  { href: "/search", label: "Search Resources" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[1380px] gap-8 px-4 py-10 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:px-6 md:py-12">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-text-primary">
            Hustle <span className="text-brand-amber">Learning</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-text-secondary">
            Learn Smart. Hustle Hard.
          </p>
          <p className="mt-3 max-w-[38ch] text-sm leading-[1.6] text-text-secondary">
            Study material, online classes, home tutors, and books for school
            students — structured preparation from Class 6 to Class 12.
          </p>
        </div>
        <nav aria-label="Explore">
          <p className="text-sm font-bold text-text-primary">
            Explore
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
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
        <nav aria-label="Legal">
          <p className="text-sm font-bold text-text-primary">
            Popular
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {TRACK_LINKS.map((link) => (
              <li key={link.href}>
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
        <nav aria-label="Legal">
          <p className="text-sm font-bold text-text-primary">
            Legal
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
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
      </div>
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-[1380px] px-4 py-4 text-[13px] text-text-muted md:px-6">
          © 2026 Hustle Learning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
