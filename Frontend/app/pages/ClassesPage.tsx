import Link from "next/link";
import Footer from "../components/Footer";
import TutoringCard from "../components/TutoringCard";
import { TUTORING_OPTIONS } from "../components/tutoring";

export default function ClassesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
          Personalised Learning
        </p>
        <h1 className="mt-2 max-w-[22ch] text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl">
          One Student. One Teacher. Undivided Attention.
        </h1>
        <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Get personalised academic support with one-on-one classes tailored
          to your learning needs. Choose online or offline classes, clear your
          doubts, strengthen concepts, and learn at your own pace.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TUTORING_OPTIONS.map((option) => (
            <TutoringCard
              key={option.id}
              option={option}
              ctaHref="/#hero-enquiry"
            />
          ))}
        </div>
        <p className="mt-8 text-base text-text-secondary">
          Not sure which option fits?{" "}
          <Link
            href="/#hero-enquiry"
            className="font-semibold text-text-primary underline underline-offset-2"
          >
            Request a callback
          </Link>{" "}
          and our counsellor will help you choose.
        </p>
      </main>
      <Footer />
    </div>
  );
}
