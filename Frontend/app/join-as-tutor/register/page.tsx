import type { Metadata } from "next";
import TutorRegisterPage from "../../pages/TutorRegisterPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tutor Registration | Join Hustle Learning as a Tutor",
  description:
    "Register as a tutor with Hustle Learning in three quick steps — personal details, educational qualifications and verification. Free registration, first placement commission-free.",
  alternates: { canonical: absoluteUrl("/join-as-tutor/register") },
  openGraph: {
    title: "Tutor Registration | Hustle Learning",
    description:
      "Three-step tutor registration: personal details, qualifications and verification. Free to join.",
    url: absoluteUrl("/join-as-tutor/register"),
    siteName: "Hustle Learning",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function TutorRegisterRoute() {
  return <TutorRegisterPage />;
}
