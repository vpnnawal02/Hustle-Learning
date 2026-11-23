import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./navbar/Logo";
import { CONTACT } from "./navbar/navbar-data";

const CLASS_LINKS = [
  { href: "/class-6", label: "Class 6" },
  { href: "/class-7", label: "Class 7" },
  { href: "/class-8", label: "Class 8" },
  { href: "/class-9", label: "Class 9" },
  { href: "/class-10", label: "Class 10" },
  { href: "/jee", label: "JEE Preparation" },
  { href: "/neet", label: "NEET Preparation" },
];

const TUTORING_LINKS = [
  { href: "/home-tuitions", label: "Home Tuitions in Delhi" },
  { href: "/hire-a-tutor", label: "Hire a Tutor" },
  { href: "/join-as-tutor", label: "Join as a Tutor" },
  { href: "/pricing", label: "Pricing & Services" },
];

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "All Courses" },
  { href: "/resources", label: "Study Material" },
  { href: "/drill-mode", label: "Drill Mode" },
  { href: "/news", label: "News & Updates" },
  { href: "/search", label: "Search Resources" },
  { href: "/enroll", label: "Enroll Now" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/login", label: "Student Login" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/tutor-terms-and-conditions", label: "Tutor Terms" },
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
          <li key={`${link.href}__${link.label}`}>
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

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-10 px-4 py-10 sm:grid-cols-2 md:px-6 md:py-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div>
          <Logo />
          <p className="mt-1 text-sm font-medium text-text-secondary">
            Learn Smart. Hustle Hard.
          </p>
          <p className="mt-3 max-w-[38ch] text-sm leading-[1.6] text-text-secondary">
            Free study material, online batch classes, personal home tutors
            and books — structured learning from Class 6 to Class 12, JEE
            and NEET.
          </p>
          <ul aria-label="Contact Hustle Learning" className="mt-5 flex flex-col gap-2.5 text-sm">
            <li>
              <a
                href={CONTACT.telHref}
                className="inline-flex items-center gap-2.5 font-medium text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text-primary"
                >
                  <Phone size={15} />
                </span>
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-medium text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text-primary"
                >
                  <MessageCircle size={15} />
                </span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 font-medium break-all text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text-primary"
                >
                  <Mail size={15} />
                </span>
                {CONTACT.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 font-medium text-text-secondary">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text-primary"
              >
                <MapPin size={15} />
              </span>
              Home tuitions across Delhi
            </li>
          </ul>
        </div>
        <LinkColumn heading="Classes" links={CLASS_LINKS} />
        <LinkColumn heading="Tutoring" links={TUTORING_LINKS} />
        <LinkColumn heading="Explore" links={EXPLORE_LINKS} />
        <LinkColumn heading="Legal" links={LEGAL_LINKS} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-1 px-4 py-4 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>© 2026 Hustle Learning. All rights reserved.</p>
          <p>Learn Smart. Hustle Hard.</p>
        </div>
      </div>
    </footer>
  );
}
