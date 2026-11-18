import type { StaticImageData } from "next/image";
import class6AllSubjects from "../assets/images/course-cards/class 6/Class 6 All Subjects Full Year.png";
import class6English from "../assets/images/course-cards/class 6/Class 6 English.png";
import class6Mathematics from "../assets/images/course-cards/class 6/Class 6 Mathematics.png";
import class7English from "../assets/images/course-cards/class 7/class 7 English.png";
import class7FullSyllabus from "../assets/images/course-cards/class 7/class 7 full syllabus.png";
import class7Maths from "../assets/images/course-cards/class 7/class 7 Maths.png";
import class8Language from "../assets/images/course-cards/class 8/class 8 Language.png";
import class8MathsScience from "../assets/images/course-cards/class 8/class 8 maths and science.png";
import class8SocialScience from "../assets/images/course-cards/class 8/class 8 social science.png";

export interface ClassCourse {
  id: string;
  classSlug: string;
  classLabel: string;
  subject: string;
  /** e.g. "Hustle Learning Class 6 - Mathematics" */
  title: string;
  image: StaticImageData;
  imageAlt: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface ClassCourseGroup {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  courses: ClassCourse[];
}

function course(
  id: string,
  classSlug: string,
  classLabel: string,
  subject: string,
  image: StaticImageData,
  imageAlt: string,
): ClassCourse {
  return {
    id,
    classSlug,
    classLabel,
    subject,
    title: `Hustle Learning ${classLabel} - ${subject}`,
    image,
    imageAlt,
    monthlyPrice: 499,
    yearlyPrice: 5000,
  };
}

export const CLASS_COURSE_GROUPS: ClassCourseGroup[] = [
  {
    slug: "class-6",
    label: "Class 6",
    tagline: "Strong foundations for middle school",
    description:
      "Live online batches for Class 6 — concept-first teaching, regular practice and doubt-solving.",
    courses: [
      course(
        "class-6-all-subjects",
        "class-6",
        "Class 6",
        "All Subjects",
        class6AllSubjects,
        "Hustle Learning Class 6 All Subjects course artwork",
      ),
      course(
        "class-6-english",
        "class-6",
        "Class 6",
        "English",
        class6English,
        "Hustle Learning Class 6 English course artwork",
      ),
      course(
        "class-6-mathematics",
        "class-6",
        "Class 6",
        "Mathematics",
        class6Mathematics,
        "Hustle Learning Class 6 Mathematics course artwork",
      ),
    ],
  },
  {
    slug: "class-7",
    label: "Class 7",
    tagline: "Build speed and accuracy",
    description:
      "Live online batches for Class 7 — deeper concepts, chapter tests and revision support.",
    courses: [
      course(
        "class-7-full-syllabus",
        "class-7",
        "Class 7",
        "Full Syllabus",
        class7FullSyllabus,
        "Hustle Learning Class 7 Full Syllabus course artwork",
      ),
      course(
        "class-7-maths",
        "class-7",
        "Class 7",
        "Mathematics",
        class7Maths,
        "Hustle Learning Class 7 Mathematics course artwork",
      ),
      course(
        "class-7-english",
        "class-7",
        "Class 7",
        "English",
        class7English,
        "Hustle Learning Class 7 English course artwork",
      ),
    ],
  },
  {
    slug: "class-8",
    label: "Class 8",
    tagline: "Get board-ready early",
    description:
      "Live online batches for Class 8 — Maths, Science, Language and Social Science with exam practice.",
    courses: [
      course(
        "class-8-maths-science",
        "class-8",
        "Class 8",
        "Maths and Science",
        class8MathsScience,
        "Hustle Learning Class 8 Maths and Science course artwork",
      ),
      course(
        "class-8-language",
        "class-8",
        "Class 8",
        "Language",
        class8Language,
        "Hustle Learning Class 8 Language course artwork",
      ),
      course(
        "class-8-social-science",
        "class-8",
        "Class 8",
        "Social Science",
        class8SocialScience,
        "Hustle Learning Class 8 Social Science course artwork",
      ),
    ],
  },
];

export interface ClassHubInfo {
  slug: string;
  label: string;
  /** e.g. "Class 9 Courses". */
  heading: string;
  subtitle: string;
  subjects: string[];
  highlights: string[];
  status: "live" | "soon";
  /** Card background + border (theme-aware CSS vars). */
  tint: string;
}

/**
 * Main class cards for /courses. Image artwork is used only on the
 * subject-course cards inside each class page — never here.
 */
export const CLASS_HUB: ClassHubInfo[] = [
  {
    slug: "class-6",
    label: "Class 6",
    heading: "Class 6 Courses",
    subtitle:
      "Strong CBSE foundations in core subjects for confident middle-school learning.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
    highlights: [
      "Complete CBSE Syllabus",
      "Concept-Based Learning",
      "Live Online Batches",
    ],
    status: "live",
    tint: "border-[var(--c6-border)] bg-[var(--c6-surface)]",
  },
  {
    slug: "class-7",
    label: "Class 7",
    heading: "Class 7 Courses",
    subtitle:
      "Deeper concepts, chapter tests and revision support for steady academic growth.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
    highlights: [
      "Complete CBSE Syllabus",
      "Concept-Based Learning",
      "Live Online Batches",
    ],
    status: "live",
    tint: "border-[var(--c7-border)] bg-[var(--c7-surface)]",
  },
  {
    slug: "class-8",
    label: "Class 8",
    heading: "Class 8 Courses",
    subtitle:
      "Board-oriented preparation with strong focus on Maths, Science and Social Science.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
    highlights: [
      "Complete CBSE Syllabus",
      "Concept-Based Learning",
      "Live Online Batches",
    ],
    status: "live",
    tint: "border-[var(--c8-border)] bg-[var(--c8-surface)]",
  },
  {
    slug: "class-9",
    label: "Class 9",
    heading: "Class 9 Courses",
    subtitle:
      "Complete CBSE preparation for a strong foundation in secondary education.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
    highlights: [
      "Complete CBSE Syllabus",
      "Concept-Based Learning",
      "Live Online Batches",
    ],
    status: "soon",
    tint: "border-[var(--c9-border)] bg-[var(--c9-surface)]",
  },
  {
    slug: "class-10",
    label: "Class 10",
    heading: "Class 10 Courses",
    subtitle:
      "Complete board-year preparation with revision, sample papers and exam practice.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
    highlights: [
      "Complete CBSE Syllabus",
      "Concept-Based Learning",
      "Live Online Batches",
    ],
    status: "soon",
    tint: "border-[var(--c10-border)] bg-[var(--c10-surface)]",
  },
];

export function getClassCourseGroup(slug: string): ClassCourseGroup | undefined {
  return CLASS_COURSE_GROUPS.find((g) => g.slug === slug);
}

export function getAllClassCourses(): ClassCourse[] {
  return CLASS_COURSE_GROUPS.flatMap((g) => g.courses);
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}/-`;
}
