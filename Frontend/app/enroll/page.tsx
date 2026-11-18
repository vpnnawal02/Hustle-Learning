import type { Metadata } from "next";
import { Suspense } from "react";
import EnrollPage from "../pages/EnrollPage";

export const metadata: Metadata = {
  title: "Enroll Now — Live Batches | Hustle Learning",
  description:
    "Enroll in Hustle Learning live online batches for Classes 6 to 10. ₹499 per month or ₹5000 per academic year. Share your details and we will confirm your batch on WhatsApp.",
};

export default function EnrollRoute() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-14 text-text-secondary">Loading enrolment form…</div>}>
      <EnrollPage />
    </Suspense>
  );
}
