import Link from "next/link";
import Footer from "../components/Footer";
import { PageTitle } from "../components/typography";

export default function SubscribePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-narrow)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <PageTitle>
          Subscription
        </PageTitle>
        <p className="mt-3 text-xl leading-snug font-bold text-text-secondary sm:text-2xl">
          Subscribe to Hustle Learning
        </p>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Subscriptions unlock extended question banks, exam-focused chapter
          explanations, Drill Mode practice, daily practice problems, and
          weekly tests. Share your details through the enquiry form and our
          counsellor will call you back on WhatsApp with the plan that fits
          your class and subjects.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#hero-enquiry"
            className="inline-flex h-12 items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Request a callback
          </Link>
          <Link
            href="/drill-mode"
            className="inline-flex h-12 items-center justify-center rounded border border-border px-6 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:bg-surface-muted"
          >
            Explore Drill Mode
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
