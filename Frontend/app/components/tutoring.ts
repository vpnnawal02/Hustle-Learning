export interface TutoringOption {
  id: string;
  title: string;
  description: string;
}

export const TUTORING_OPTIONS: TutoringOption[] = [
  {
    id: "cbse-icse",
    title: "CBSE / ICSE",
    description:
      "Personalised tutoring aligned with your school syllabus, focused on concept clarity, exam preparation, and better academic performance.",
  },
  {
    id: "jee-neet",
    title: "JEE / NEET",
    description:
      "Strengthen your fundamentals, practise challenging questions, and prepare for competitive exams with individual guidance.",
  },
  {
    id: "hobby",
    title: "Hobby Classes",
    description:
      "Explore your interests, discover new skills, and learn from experienced instructors through personalised sessions.",
  },
];
