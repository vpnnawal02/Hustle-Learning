import type { StaticImageData } from "next/image";
import class10 from "../assets/images/courses/10.png";
import class9 from "../assets/images/courses/9.png";

export interface Course {
  id: string;
  title: string;
  description: string;
  audience: string;
  ctaLabel: string;
  image: StaticImageData;
  imageAlt: string;
}

export const COURSES: Course[] = [
  {
    id: "class-8",
    title: "Class 8",
    description:
      "Build strong foundations in Maths, Science, and other school subjects.",
    audience: "Class 8",
    ctaLabel: "Explore Class 8",
    image: class9,
    imageAlt:
      "Hustle Learning Class 8 banner with Mathematics, Science and English books",
  },
  {
    id: "class-9",
    title: "Class 9",
    description:
      "Strengthen concepts and prepare for the Class 9 examinations.",
    audience: "Class 9",
    ctaLabel: "Explore Class 9",
    image: class9,
    imageAlt:
      "Hustle Learning Class 9 banner with Mathematics, Science and English books",
  },
  {
    id: "class-10",
    title: "Class 10",
    description:
      "Focus on CBSE syllabus coverage, revision, and board examination preparation.",
    audience: "Class 10 • Board year",
    ctaLabel: "Explore Class 10",
    image: class10,
    imageAlt:
      "Hustle Learning Class 10 banner with Mathematics, Science and English books",
  },
];
