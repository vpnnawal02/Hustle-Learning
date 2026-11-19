import type { Metadata } from "next";
import HomeTuitionsPage, {
  HOME_TUITION_FAQS,
  TUITION_REGIONS,
} from "../pages/HomeTuitionsPage";
import JsonLd from "../components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home Tuitions in Delhi | Verified Home Tutors in Delhi – Hustle Learning",
  description:
    "Looking for home tuitions in Delhi? Hustle Learning offers verified home tutors in Delhi for Classes 1–12 in Maths, Science, English & more. One-to-one attention at your home across Rohini, Dwarka, Saket, Laxmi Nagar, Karol Bagh & 70+ localities. Book a free demo.",
  keywords: [
    "Home Tuitions in Delhi",
    "Home Tutors in Delhi",
    "home tuition in Delhi",
    "home tutor in Delhi",
    "private tutor Delhi",
    "home tuition Rohini",
    "home tuition Dwarka",
    "home tuition Saket",
    "home tuition Laxmi Nagar",
    "home tuition Karol Bagh",
  ],
  alternates: { canonical: absoluteUrl("/home-tuitions") },
  openGraph: {
    title: "Home Tuitions in Delhi | Verified Home Tutors in Delhi",
    description:
      "One-to-one home tuitions in Delhi for Classes 1–12. Verified home tutors, flexible timings, parent updates. Serving 9 regions & 70+ localities. Book a free demo at home.",
    url: absoluteUrl("/home-tuitions"),
    siteName: "Hustle Learning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Tuitions in Delhi | Verified Home Tutors in Delhi",
    description:
      "Personalised one-to-one home tuitions in Delhi for Classes 1–12. Verified tutors across Rohini, Dwarka, Saket & more. Book a free demo.",
  },
  robots: { index: true, follow: true },
};

export default function HomeTuitionsRoute() {
  const areaServed = TUITION_REGIONS.flatMap((r) => r.localities).slice(0, 40);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Tuitions in Delhi",
    provider: {
      "@type": "EducationalOrganization",
      name: "Hustle Learning",
      url: absoluteUrl("/"),
    },
    serviceType: "Home Tuition",
    areaServed: [
      {
        "@type": "City",
        name: "Delhi",
        containsPlace: areaServed.map((locality) => ({
          "@type": "Place",
          name: `${locality}, Delhi`,
        })),
      },
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "4999",
      description: "Personal home tuitions in Delhi starting at ₹4,999 per month.",
      url: absoluteUrl("/home-tuitions#pricing"),
    },
    url: absoluteUrl("/home-tuitions"),
    description:
      "Verified home tutors in Delhi for Classes 1–12. One-to-one home tuitions in Maths, Science, English and all major subjects across 9 Delhi regions.",
  };

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_TUITION_FAQS)} />
      <JsonLd data={serviceJsonLd} />
      <HomeTuitionsPage />
    </>
  );
}
