import type { Metadata } from "next";
import HireATutorPage from "../pages/HireATutorPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire a Tutor in Delhi | Book a Free Home Tuition Demo – Hustle Learning",
  description:
    "Hire a verified home tutor in Delhi for Classes 1–12. Fill the 1-minute form with your class, subjects and locality — get a free demo at your home with no advance payment.",
  keywords: [
    "Hire a Tutor in Delhi",
    "hire home tutor Delhi",
    "book home tuition demo",
    "Home Tutors in Delhi",
    "Home Tuitions in Delhi",
  ],
  alternates: { canonical: absoluteUrl("/hire-a-tutor") },
  openGraph: {
    title: "Hire a Tutor in Delhi | Book a Free Demo",
    description:
      "Request a free home tuition demo in Delhi. Verified tutors for Classes 1–12, all subjects. No advance payment.",
    url: absoluteUrl("/hire-a-tutor"),
    siteName: "Hustle Learning",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hire a Tutor in Delhi | Book a Free Demo",
    description:
      "Request a free home tuition demo in Delhi. Verified tutors for Classes 1–12, all subjects.",
  },
  robots: { index: true, follow: true },
};

export default function HireATutorRoute() {
  return <HireATutorPage />;
}
