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
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "School supplies laid out for study",
  },
  {
    id: "class-9",
    title: "Class 9",
    description:
      "Strengthen concepts and prepare for the Class 9 examinations.",
    audience: "Class 9 students",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Student focused on writing at a study desk",
  },
  {
    id: "class-10",
    title: "Class 10",
    description:
      "Focus on CBSE syllabus coverage, revision, and board examination preparation.",
    audience: "Class 10 students",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Graduation caps thrown in celebration",
  },
  {
    id: "classes-11-12",
    title: "Classes 11–12",
    description:
      "Explore subject-specific learning and examination preparation.",
    audience: "Senior-secondary students",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Senior students walking together on campus",
  },
];
