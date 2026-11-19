"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const STEPS = [
  {
    title: "Register for Free",
    text: "Complete your tutor registration form with your personal details, educational qualifications, teaching experience, subjects and preferred locations.",
  },
  {
    title: "Complete Verification",
    text: "Submit the required identity and educational documents. Our team will review your information before activating your tutor profile for tuition opportunities.",
  },
  {
    title: "Receive Relevant Opportunities",
    text: "When a suitable tuition requirement becomes available, our team may contact you with the student's class, subjects, location, preferred schedule and proposed fee.",
  },
  {
    title: "Review and Accept",
    text: "Review the assignment details. You can accept or decline an opportunity. If you decline, we ask you to provide a reason to help us improve future matching.",
  },
  {
    title: "Connect with the Family",
    text: "Once an assignment is mutually accepted, Hustle Learning facilitates the introduction between you and the parent or guardian.",
  },
  {
    title: "Start Teaching",
    text: "Finalise the schedule and teaching arrangements with the family and begin your tuition sessions.",
  },
];

/**
 * Numbered tutor-onboarding timeline: amber number circles joined by a
 * line (horizontal on desktop, vertical on mobile). Headings are always
 * visible; descriptions expand on tap. No icons.
 */
export default function JoinSteps() {
  const [open, setOpen] = useState(0);

  return (
    <ol className="mt-8 flex list-none flex-col gap-6 p-0 lg:grid lg:grid-cols-3 lg:gap-5">
      {STEPS.map((step, i) => {
        const expanded = open === i;
        return (
          <li key={step.title} className="flex gap-4 lg:block">
            <span
              aria-hidden="true"
              className="flex flex-col items-center lg:mb-5 lg:flex-row lg:items-center"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                  expanded
                    ? "border-accent bg-accent text-on-accent"
                    : "border-accent/60 text-accent"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < STEPS.length - 1 && (
                <span className="w-px flex-1 bg-white/20 lg:h-px lg:w-auto lg:flex-1" />
              )}
            </span>
            <div className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 p-5">
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : i)}
                aria-expanded={expanded}
                aria-controls={`join-step-panel-${i}`}
                id={`join-step-button-${i}`}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="text-[16px] font-bold text-brand-white">
                  {step.title}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={`join-step-panel-${i}`}
                role="region"
                aria-labelledby={`join-step-button-${i}`}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="pt-2 text-sm leading-[1.65] text-brand-white/75">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
