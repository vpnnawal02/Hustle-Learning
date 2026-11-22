import type { Metadata } from "next";
import DrillModePage from "../pages/DrillModePage";

export const metadata: Metadata = {
  title: "Drill Mode — Practice Smarter. Perform Better.",
  description:
    "Practise chapter-wise MCQs with timer-based Drill Mode sessions for Classes 6–12, JEE and NEET. Get instant feedback, track accuracy and improve with Hustle Learning.",
  alternates: { canonical: "/drill-mode" },
  openGraph: {
    title: "Drill Mode — Practice Smarter. Perform Better.",
    description:
      "Timer-based MCQ practice for Classes 6–12, JEE and NEET. Choose your class, subject and chapters, set a timer and track your accuracy.",
    type: "website",
  },
};

export default function DrillModeRoute() {
  return <DrillModePage />;
}
