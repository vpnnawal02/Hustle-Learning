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
  { label: "Home Tutor", href: "/home-tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "News", href: "/news" },
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
