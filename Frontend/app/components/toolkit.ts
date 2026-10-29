import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarCheck,
  ClipboardList,
  FileText,
  Layers,
  ListChecks,
  NotebookText,
  Sparkles,
} from "lucide-react";

export interface ToolkitResource {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TOOLKIT_RESOURCES: ToolkitResource[] = [
  {
    id: "ncert-solutions",
    title: "NCERT Solutions",
    description: "Step-by-step answers to textbook questions.",
    icon: BookOpenCheck,
  },
  {
    id: "cbse-notes",
    title: "CBSE Detailed Notes",
    description: "Chapter-wise notes for clear understanding and revision.",
    icon: NotebookText,
  },
  {
    id: "question-banks",
    title: "Question Banks",
    description: "Extensive questions to strengthen your preparation.",
    icon: Layers,
  },
  {
    id: "questions-with-solutions",
    title: "Questions with Solutions",
    description: "Practise questions with detailed explanations.",
    icon: ListChecks,
  },
  {
    id: "worksheets",
    title: "Worksheets",
    description: "Topic-wise exercises to test your understanding.",
    icon: ClipboardList,
  },
  {
    id: "dpps",
    title: "DPPs",
    description: "Daily Practice Problems to build consistency.",
    icon: CalendarCheck,
  },
  {
    id: "test-papers",
    title: "Test Papers",
    description: "Prepare with exam-style questions and timed practice.",
    icon: FileText,
  },
  {
    id: "much-more",
    title: "And Much More",
    description: "Discover resources to learn, practise, and improve.",
    icon: Sparkles,
  },
];
