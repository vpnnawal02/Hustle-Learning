import navigation from "@/data/navigation.json";

/**
 * Navbar data layer.
 * The Study Material mega menu is driven by `data/navigation.json`
 * (single source of truth shared by desktop + mobile navigation).
 * All hrefs below resolve to real routes — no dead links.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuClass {
  slug: string;
  label: string;
  href: string;
}

export interface MegaMenuResource {
  slug: string;
  label: string;
  href: string;
  icon: string;
}

export interface MegaMenuExamSubject {
  slug: string;
  label: string;
  href: string;
}

export interface MegaMenuExam {
  slug: string;
  label: string;
  href: string;
  description: string;
  subjects: MegaMenuExamSubject[];
}

export interface MegaMenu {
  school: {
    heading: string;
    subtitle: string;
    hubHref: string;
    classes: MegaMenuClass[];
  };
  resources: {
    heading: string;
    subtitle: string;
    hubHref: string;
    links: MegaMenuResource[];
  };
  exams: {
    heading: string;
    subtitle: string;
    cards: MegaMenuExam[];
  };
}

export const MEGA_MENU = navigation as MegaMenu;

export const PRIMARY_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Drill Mode", href: "/drill-mode" },
  { label: "Pricing", href: "/pricing" },
];

export interface MoreMenuGroup {
  heading: string;
  links: NavLink[];
}

/**
 * "More" dropdown — every top-level page that is not a primary nav link,
 * grouped by purpose. All hrefs resolve to real routes — no dead links.
 */
export const MORE_MENU: MoreMenuGroup[] = [
  {
    heading: "Courses & Practice",
    links: [
      { label: "One-on-One Classes", href: "/classes" },
      { label: "Enroll Now", href: "/enroll" },
    ],
  },
  {
    heading: "Tutoring",
    links: [
      { label: "Home Tuitions", href: "/home-tuitions" },
      { label: "Hire a Tutor", href: "/hire-a-tutor" },
      { label: "Join as a Tutor", href: "/join-as-tutor" },
    ],
  },
  {
    heading: "Plans & Account",
    links: [
      { label: "Subscribe", href: "/subscribe" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "News & Updates", href: "/news" },
      { label: "Search", href: "/search" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export const CONTACT = {
  label: "Talk to Our Experts",
  phoneDisplay: "+91 88519 48143",
  telHref: "tel:+918851948143",
  whatsappHref: "https://wa.me/918851948143",
  email: "hustlelearning.info@gmail.com",
  pageHref: "/#hero-enquiry",
} as const;

export const LOGIN_HREF = "/login";
export const SIGNUP_HREF = "/login?tab=register";
