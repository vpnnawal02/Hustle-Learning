import type { StaticImageData } from "next/image";
import class10 from "../assets/images/courses/10.png";
import class1112 from "../assets/images/courses/11-12.png";
import class68 from "../assets/images/courses/6-8.png";
import class9 from "../assets/images/courses/9.png";

export interface Course {
  id: string;
  title: string;
  description: string;
  audience: string;
  image: StaticImageData;
  imageAlt: string;
}

export const COURSES: Course[] = [
  {
    id: "classes-6-8",
    title: "Classes 6–8",
    description:
      "Build strong foundations in Maths, Science, and other school subjects.",
    audience: "Middle-school students",
    image: class68,
    imageAlt:
      "Hustle Learning Class 6 to 8 banner with Mathematics, Science and English books",
  },
  {
    id: "class-9",
    title: "Class 9",
    description:
      "Strengthen concepts and prepare for the Class 9 examinations.",
    audience: "Class 9 students",
    image: class9,
    imageAlt:
      "Hustle Learning Class 9 banner with Mathematics, Science and English books",
  },
  {
    id: "class-10",
    title: "Class 10",
    description:
      "Focus on CBSE syllabus coverage, revision, and board examination preparation.",
    audience: "Class 10 students",
    image: class10,
    imageAlt:
      "Hustle Learning Class 10 banner with Mathematics, Science and English books",
  },
  {
    id: "classes-11-12",
    title: "Classes 11–12",
    description:
      "Explore subject-specific learning and examination preparation.",
    audience: "Senior-secondary students",
    image: class1112,
    imageAlt:
      "Hustle Learning Class 11 and 12 banner with Physics, Chemistry and Mathematics books",
  },
];
