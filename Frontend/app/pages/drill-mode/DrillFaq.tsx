"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import JsonLd from "../../components/seo/JsonLd";
import { SectionHeading } from "../../components/typography";
import { faqJsonLd } from "@/lib/seo";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is Drill Mode in Hustle Learning?",
    answer:
      "Drill Mode is a timer-based question practice feature that allows students to select their class, subject and chapters to practise multiple-choice questions. It helps students test their understanding and monitor their accuracy.",
  },
  {
    question: "Which classes are supported in Drill Mode?",
    answer:
      "Drill Mode is available for Classes 6, 7, 8, 9, 10, 11 and 12. Separate preparation categories are also available for JEE and NEET aspirants.",
  },
  {
    question: "What subjects are available for Class 10?",
    answer:
      "Class 10 students can select Mathematics, Science, Social Science, English and Hindi.",
  },
  {
    question: "Can I select multiple chapters for one drill?",
    answer:
      "Yes. You can select one or more chapters from your chosen subject and practise questions from the selected chapters in a single session.",
  },
  {
    question: "How long can I practise in one drill?",
    answer:
      "You can select from five available durations: 5, 10, 15, 20 and 30 minutes.",
  },
  {
    question: "How many questions can I attempt in one session?",
    answer:
      "The number of questions you can attempt depends on your selected timer duration and answering speed. Questions are presented continuously until the timer expires.",
  },
  {
    question: "How many options does each question have?",
    answer:
      "Each multiple-choice question includes at least four answer options.",
  },
  {
    question: "Will I know whether my answer is correct?",
    answer:
      "Yes. Drill Mode provides feedback indicating whether your selected answer is correct or incorrect.",
  },
  {
    question: "What happens when the timer expires?",
    answer:
      "Your practice session ends and you can view your performance summary, including questions attempted, correct answers, incorrect answers, time taken and accuracy.",
  },
  {
    question: "Is Drill Mode included in the subscription?",
    answer:
      "Yes. Drill Mode is included in all three subscription tiers: Foundation (Classes 6–10), Advanced (Classes 11–12), and Aspirant (JEE & NEET).",
  },
  {
    question: "What is the monthly subscription price?",
    answer:
      "The monthly subscription prices are ₹99 for Foundation (Classes 6–10), ₹129 for Advanced (Classes 11–12), and ₹149 for Aspirant (JEE & NEET).",
  },
  {
    question: "Are all subscription features the same across plans?",
    answer:
      "Yes. All three subscription plans include the same listed features. Only the monthly subscription price varies.",
  },
  {
    question: "Can I track my previous performance?",
    answer:
      "Yes. Hustle Learning's subscription includes Performance History, allowing you to monitor your previous performance and progress.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel your subscription at any time. However, subscription payments are non-refundable.",
  },
];

/**
 * Drill Mode FAQ section — same style as the home FAQ: SectionHeading
 * and a native <details> accordion showing all questions together.
 * Emits FAQPage structured data.
 */
export default function DrillFaq() {
  return (
    <section
      aria-labelledby="drill-faqs-heading"
      id="faqs"
      className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
    >
      <JsonLd data={faqJsonLd(FAQS)} />
      <SectionHeading
        titleId="drill-faqs-heading"
        title="Frequently asked questions"
        description={
          <>
            Answers about sessions, chapters, timers and subscriptions. Still
            unsure?{" "}
            <Link
              href="/pricing"
              className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4"
            >
              Compare plans
            </Link>
            .
          </>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group h-fit rounded-md border border-border bg-surface px-4 py-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="pt-2 text-sm leading-[1.65] text-text-secondary">
                  {faq.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
