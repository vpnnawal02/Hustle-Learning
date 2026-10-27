export interface StudySubItem {
  label: string;
  href: string;
}

export interface StudyCategory {
  id: string;
  label: string;
  href: string;
  cta: string;
  children: StudySubItem[];
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const resourceChildren = (base: string): StudySubItem[] =>
  [
    "Important Questions",
    "Notes",
    "Sample Papers",
    "PYQs",
    "Formulas",
  ].map((label) => ({ label, href: `${base}/${slug(label)}` }));

const ncertClasses = ["Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

export const STUDY_MATERIAL: StudyCategory[] = [
  {
    id: "ncert-solutions",
    label: "NCERT Solutions",
    href: "/study-material/ncert-solutions",
    cta: "View all NCERT Solutions",
    children: ncertClasses.map((label) => ({
      label,
      href: `/study-material/ncert-solutions/${slug(label)}`,
    })),
  },
  {
    id: "cbse",
    label: "CBSE",
    href: "/study-material/cbse",
    cta: "View all CBSE Materials",
    children: resourceChildren("/study-material/cbse"),
  },
  {
    id: "jee-main",
    label: "JEE Main",
    href: "/study-material/jee-main",
    cta: "View all JEE Main Materials",
    children: resourceChildren("/study-material/jee-main"),
  },
  {
    id: "jee-advanced",
    label: "JEE Advanced",
    href: "/study-material/jee-advanced",
    cta: "View all JEE Advanced Materials",
    children: resourceChildren("/study-material/jee-advanced"),
  },
  {
    id: "neet",
    label: "NEET",
    href: "/study-material/neet",
    cta: "View all NEET Materials",
    children: resourceChildren("/study-material/neet"),
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const CLASSES_LINKS: NavLink[] = [
  { label: "Online Batch Classes", href: "/classes/online-batch" },
  { label: "Personal Home Tutor", href: "/classes/home-tutor" },
];

export const PRIMARY_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Store", href: "/store" },
];

export const CONTACT = {
  label: "Talk to Our Experts",
  phoneDisplay: "+91 XXXXX XXXXX",
  telHref: "tel:+910000000000",
  pageHref: "/contact",
} as const;

export const SIGNUP_HREF = "/register";
