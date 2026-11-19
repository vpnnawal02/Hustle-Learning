import type { Metadata } from "next";
import JoinAsTutorPage, { JOIN_TUTOR_FAQS } from "../pages/JoinAsTutorPage";
import JsonLd from "../components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join as a Tutor in Delhi | Free Registration, First Placement Commission-Free – Hustle Learning",
  description:
    "Turn your teaching skills into opportunities. Join Hustle Learning as a tutor in Delhi — free registration, first student placement commission-free, home and online tuition opportunities for Classes 1–12.",
  keywords: [
    "Join as a Tutor",
    "tutor jobs Delhi",
    "home tuition jobs Delhi",
    "online tutoring jobs",
    "tutor registration Delhi",
    "teach with Hustle Learning",
  ],
  alternates: { canonical: absoluteUrl("/join-as-tutor") },
  openGraph: {
    title: "Join as a Tutor in Delhi | Free Registration",
    description:
      "Register for free. Get your first student without paying any commission. Home and online tuition opportunities across Delhi.",
    url: absoluteUrl("/join-as-tutor"),
    siteName: "Hustle Learning",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Join as a Tutor in Delhi | Free Registration",
    description:
      "Register for free. Get your first student without paying any commission. Start earning through teaching.",
  },
  robots: { index: true, follow: true },
};

export default function JoinAsTutorRoute() {
  return (
    <>
      <JsonLd data={faqJsonLd(JOIN_TUTOR_FAQS)} />
      <JoinAsTutorPage />
    </>
  );
}
