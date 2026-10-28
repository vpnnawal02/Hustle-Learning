export interface Course {
  id: string;
  title: string;
  description: string;
  audience: string;
  image: string;
  imageAlt: string;
}

export const COURSES: Course[] = [
  {
    id: "classes-6-8",
    title: "Classes 6–8",
    description:
      "Build strong foundations in Maths, Science, and other school subjects.",
    audience: "Middle-school students",
    image: "/courses/classes-6-8.png",
    imageAlt: "Middle-school student learning with Hustle Learning",
  },
  {
    id: "class-9",
    title: "Class 9",
    description:
      "Strengthen concepts and prepare for the Class 9 examinations.",
    audience: "Class 9 students",
    image: "/courses/class-9.png",
    imageAlt: "Class 9 student studying with Hustle Learning",
  },
  {
    id: "class-10",
    title: "Class 10",
    description:
      "Focus on CBSE syllabus coverage, revision, and board examination preparation.",
    audience: "Class 10 students",
    image: "/courses/class-10.png",
    imageAlt: "Class 10 student preparing for board exams with Hustle Learning",
  },
  {
    id: "classes-11-12",
    title: "Classes 11–12",
    description:
      "Explore subject-specific learning and examination preparation.",
    audience: "Senior-secondary students",
    image: "/courses/classes-11-12.png",
    imageAlt: "Senior-secondary student learning with Hustle Learning",
  },
];
