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
import class6Courses from "../assets/images/course-cards/Class 6 Courses.png";
import class7Courses from "../assets/images/course-cards/Class 7 Courses.png";
import class8Courses from "../assets/images/course-cards/Class 8 Courses.png";
import class9Courses from "../assets/images/course-cards/Class 9 Courses.png";
import class10Courses from "../assets/images/course-cards/Class 10 Courses.png";
import class9Mathematics from "../assets/images/course-cards/Class 9/Class 9 Mathematics.png";
import class9Science from "../assets/images/course-cards/Class 9/Class 9 Science.png";
import class9Language from "../assets/images/course-cards/Class 9/Class 9 Language.png";
import class9SocialScience from "../assets/images/course-cards/Class 9/Class 9 Social Science.png";
import class10Mathematics from "../assets/images/course-cards/Class 10/Class 10 Mathematics.png";
import class10Science from "../assets/images/course-cards/Class 10/Class 10 Science.png";
import class10Language from "../assets/images/course-cards/Class 10/Class 10 Language.png";
import class10SocialScience from "../assets/images/course-cards/Class 10/Class 10 Social Science.png";

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
  {
    slug: "class-9",
    label: "Class 9",
    tagline: "Stronger concepts for secondary school",
    description:
      "Live online batches for Class 9 — Mathematics, Science, Language and Social Science with exam practice.",
    courses: [
      course(
        "class-9-mathematics",
        "class-9",
        "Class 9",
        "Mathematics",
        class9Mathematics,
        "Hustle Learning Class 9 Mathematics course artwork",
      ),
      course(
        "class-9-science",
        "class-9",
        "Class 9",
        "Science",
        class9Science,
        "Hustle Learning Class 9 Science course artwork",
      ),
      course(
        "class-9-language",
        "class-9",
        "Class 9",
        "Language",
        class9Language,
        "Hustle Learning Class 9 Language course artwork",
      ),
      course(
        "class-9-social-science",
        "class-9",
        "Class 9",
        "Social Science",
        class9SocialScience,
        "Hustle Learning Class 9 Social Science course artwork",
      ),
    ],
  },
  {
    slug: "class-10",
    label: "Class 10",
    tagline: "Board-year preparation, done right",
    description:
      "Live online batches for Class 10 — Mathematics, Science, Language and Social Science with board exam practice.",
    courses: [
      course(
        "class-10-mathematics",
        "class-10",
        "Class 10",
        "Mathematics",
        class10Mathematics,
        "Hustle Learning Class 10 Mathematics course artwork",
      ),
      course(
        "class-10-science",
        "class-10",
        "Class 10",
        "Science",
        class10Science,
        "Hustle Learning Class 10 Science course artwork",
      ),
      course(
        "class-10-language",
        "class-10",
        "Class 10",
        "Language",
        class10Language,
        "Hustle Learning Class 10 Language course artwork",
      ),
      course(
        "class-10-social-science",
        "class-10",
        "Class 10",
        "Social Science",
        class10SocialScience,
        "Hustle Learning Class 10 Social Science course artwork",
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
  /** Card artwork — title, subtitle and subjects are baked in. */
  image: StaticImageData;
  /** Alt text mirroring the copy baked into the artwork. */
  imageAlt: string;
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
    image: class6Courses,
    imageAlt:
      "Class 6 Courses: strong CBSE foundations in core subjects for confident middle-school learning. Subjects: English, Hindi, Mathematics, Science, Social Science.",
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
    image: class7Courses,
    imageAlt:
      "Class 7 Courses: deeper concepts, chapter tests and revision support for steady academic growth. Subjects: English, Hindi, Mathematics, Science, Social Science.",
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
    image: class8Courses,
    imageAlt:
      "Class 8 Courses: board-oriented preparation with strong focus on Maths, Science and Social Science. Subjects: English, Hindi, Mathematics, Science, Social Science.",
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
    status: "live",
    image: class9Courses,
    imageAlt:
      "Class 9 Courses: complete CBSE preparation for a strong foundation in secondary education. Subjects: English, Hindi, Mathematics, Science, Social Science.",
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
    status: "live",
    image: class10Courses,
    imageAlt:
      "Class 10 Courses: complete board-year preparation with revision, sample papers and exam practice. Subjects: English, Hindi, Mathematics, Science, Social Science.",
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
