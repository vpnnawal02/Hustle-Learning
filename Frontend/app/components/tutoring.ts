import type { LucideIcon } from "lucide-react";
import { BookOpen, Palette, Target } from "lucide-react";

export interface TutoringOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TUTORING_OPTIONS: TutoringOption[] = [
  {
    id: "cbse-icse",
    title: "CBSE / ICSE",
    description:
      "Personalised tutoring aligned with your school syllabus, focused on concept clarity, exam preparation, and better academic performance.",
    icon: BookOpen,
  },
  {
    id: "jee-neet",
    title: "JEE / NEET",
    description:
      "Strengthen your fundamentals, practise challenging questions, and prepare for competitive exams with individual guidance.",
    icon: Target,
  },
  {
    id: "hobby",
    title: "Hobby Classes",
    description:
      "Explore your interests, discover new skills, and learn from experienced instructors through personalised sessions.",
    icon: Palette,
  },
];
