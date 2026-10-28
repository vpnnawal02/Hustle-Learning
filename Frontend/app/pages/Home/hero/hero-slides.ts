export type ServiceCategory =
  | "general"
  | "study-material"
  | "online-classes"
  | "home-tuition"
  | "books";

export interface HeroSlide {
  id: string;
  service: ServiceCategory;
  /** Small white pill, e.g. "LIVE Online Classes" */
  badge: string;
  /** Amber pill next to it, e.g. "English Batch for Class 12 & Droppers" */
  badgeBatch: string;
  heading: string;
  /** Outlined sub-pill under the heading, e.g. "November Batch" */
  batchLabel: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Short offer line next to the CTA, e.g. "Courses from ₹999" */
  offerText: string;
  image: string;
  imageAlt: string;
  eager: boolean;
  formNote: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "main",
    service: "general",
    badge: "Admissions Open",
    badgeBatch: "Classes 1–12 · All Subjects",
    heading: "Complete learning support for school students",
    batchLabel: "New session batches",
    description:
      "Hustle Learning brings notes, affordable online classes, personal home tutors, and books together in one place, so students can study with a clear plan.",
    bullets: [
      "Chapter-wise notes and revision material",
      "Live online classes at affordable fees",
      "Personal home tutors for one-to-one help",
    ],
    ctaLabel: "Enquire Now",
    ctaHref: "#enquiry-form",
    offerText: "Plans for every budget",
    image: "/hero/main-slide.png",
    imageAlt:
      "Indian student studying on a laptop with Hustle Learning study material",
    eager: true,
    formNote:
      "Tell us your details and our counsellor will help you choose the right mix of notes, classes, tutors, or books.",
  },
  {
    id: "study-material",
    service: "study-material",
    badge: "Study Material",
    badgeBatch: "Notes for Classes 6–12",
    heading: "Clear notes and practice for every chapter",
    batchLabel: "Mapped to your syllabus",
    description:
      "Chapter-wise notes, solved examples, practice questions, and quick revision sheets that help students prepare confidently for school and board exams.",
    bullets: [
      "Simple explanations matched to the school syllabus",
      "Practice questions with step-by-step solutions",
      "Short revision sheets before every exam",
    ],
    ctaLabel: "Get Material",
    ctaHref: "#enquiry-form",
    offerText: "Free sample chapters",
    image: "/hero/notes-slide.png",
    imageAlt:
      "Hustle Learning study notes, textbooks, and revision resources",
    eager: false,
    formNote:
      "Share your class details and we will recommend the right study material and revision notes for your syllabus.",
  },
  {
    id: "online-classes",
    service: "online-classes",
    badge: "LIVE Online Classes",
    badgeBatch: "Small batches · All subjects",
    heading: "Expert online classes at prices families can afford",
    batchLabel: "New batches starting soon",
    description:
      "Structured live classes with regular tests, doubt sessions, and personal feedback — full guidance without the cost and travel of traditional coaching.",
    bullets: [
      "Live interactive classes with small batches",
      "Regular tests and personal feedback",
      "Recordings and notes for revision",
    ],
    ctaLabel: "Book Free Demo",
    ctaHref: "#enquiry-form",
    offerText: "Courses from ₹999",
    image: "/hero/online-class-slide.png",
    imageAlt:
      "Indian student attending a Hustle Learning online class with a teacher on a laptop",
    eager: false,
    formNote:
      "Enquire about online batches and we will share batch timings, fees, and a free counselling call on WhatsApp.",
  },
  {
    id: "home-tutors",
    service: "home-tuition",
    badge: "Home Tuition",
    badgeBatch: "Verified personal tutors",
    heading: "A personal tutor who teaches at your pace",
    batchLabel: "Tutors near you",
    description:
      "Verified home tutors for one-to-one attention, daily doubt clearing, and a study plan built around your child's school syllabus and exam goals.",
    bullets: [
      "One-to-one attention at your home",
      "Study plan based on school syllabus",
      "Regular progress updates for parents",
    ],
    ctaLabel: "Find a Tutor",
    ctaHref: "#enquiry-form",
    offerText: "Free trial session",
    image: "/hero/personal-tutor-slide.png",
    imageAlt: "Indian student learning with a personal home tutor",
    eager: false,
    formNote:
      "Share your class and location needs and we will match a suitable home tutor and confirm availability on WhatsApp.",
  },
  {
    id: "books",
    service: "books",
    badge: "Hustle Books",
    badgeBatch: "Classes 6–12 · Exam-ready",
    heading: "Books that make concepts stick",
    batchLabel: "New editions available",
    description:
      "Hustle Learning books combine clear theory, solved examples, chapter practice, and revision checklists in a single trusted set.",
    bullets: [
      "Concept-first explanations with examples",
      "Chapter practice with answer keys",
      "Revision checklists for exam weeks",
    ],
    ctaLabel: "Order Books",
    ctaHref: "#enquiry-form",
    offerText: "Discounts on sets",
    image: "/hero/books-slide.png",
    imageAlt: "Collection of Hustle Learning educational books",
    eager: false,
    formNote:
      "Tell us your class and we will recommend the right Hustle Learning books and share ordering details.",
  },
];

export const CLASS_OPTIONS = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "JEE Aspirant",
  "NEET Aspirant",
  "Other",
] as const;
