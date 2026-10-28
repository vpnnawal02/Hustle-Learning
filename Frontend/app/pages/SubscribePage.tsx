import Link from "next/link";
import Footer from "../components/Footer";

export default function SubscribePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[860px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
          Subscription
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Subscribe to Hustle Learning
        </h1>
        <p className="mt-4 max-w-[60ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Subscriptions unlock extended question banks, exam-focused chapter
          explanations, Drill Mode practice, daily practice problems, and
          weekly tests. Share your details through the enquiry form and our
          counsellor will call you back on WhatsApp with the plan that fits
          your class and subjects.
        </p>
        <Link
          href="/#hero-enquiry"
          className="mt-6 inline-flex h-12 items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Request a callback
        </Link>
      </main>
      <Footer />
    </div>
  );
}
