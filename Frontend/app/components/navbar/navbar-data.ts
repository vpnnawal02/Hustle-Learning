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

export const CLASSES_LINKS: NavLink[] = [
  { label: "Explore All Classes", href: "/classes" },
  { label: "Browse Courses", href: "/courses" },
];

export const PRIMARY_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "News", href: "/news" },
];

export const CONTACT = {
  label: "Talk to Our Experts",
  phoneDisplay: "+91 XXXXX XXXXX",
  telHref: "tel:+910000000000",
  pageHref: "/#hero-enquiry",
} as const;

export const SIGNUP_HREF = "/subscribe";
