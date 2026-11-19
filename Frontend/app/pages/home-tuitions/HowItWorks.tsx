"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const STEPS = [
  {
    title: "Share your requirement",
    text: "Tell us your class, subjects, locality in Delhi and preferred timings through the enquiry form or a callback.",
  },
  {
    title: "Tutor matching",
    text: "We shortlist verified home tutors near you — matched by subject expertise, class experience and language preference.",
  },
  {
    title: "Free demo at home",
    text: "Meet the tutor at your home. Check teaching style, comfort and clarity before you commit to anything.",
  },
  {
    title: "Start & track progress",
    text: "Begin regular home tuitions with a study plan, weekly practice and progress updates shared with parents.",
  },
];

/**
 * Numbered booking timeline: amber number circles joined by a line
 * (horizontal on desktop, vertical on mobile). Headings are always
 * visible; descriptions expand on tap. No icons.
 */
export default function HowItWorks() {
  const [open, setOpen] = useState(0);

  return (
    <ol className="mt-8 flex list-none flex-col gap-6 p-0 lg:grid lg:grid-cols-4 lg:gap-5">
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
                aria-controls={`how-panel-${i}`}
                id={`how-button-${i}`}
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
                id={`how-panel-${i}`}
                role="region"
                aria-labelledby={`how-button-${i}`}
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
