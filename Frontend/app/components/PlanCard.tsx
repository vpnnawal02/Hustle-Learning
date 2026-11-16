"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { SubscriptionPlan } from "./subscription";

/**
 * Shared subscription plan card — used identically on the home section
 * and the pricing page. Visual weight is intentionally equal for both
 * plans; differentiation comes from the feature lists, not the chrome.
 */
export function PlanCard({
  plan,
  variant,
  plusName,
}: {
  plan: SubscriptionPlan;
  variant: "plus" | "complete";
  plusName?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-colors duration-200 hover:border-text-muted sm:p-8">
      <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
      <p className="mt-1 min-h-[40px] text-sm leading-snug text-text-secondary">
        {plan.description}
      </p>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          ₹{plan.price}
        </span>
        <span className="text-sm font-medium text-text-muted">/ month</span>
      </p>
      <p className="mt-1 text-[13px] font-medium text-text-secondary">
        Cancel anytime
      </p>
      <Link
        href="/#hero-enquiry"
        aria-label={`${plan.ctaLabel} at ₹${plan.price} per month`}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        {plan.ctaLabel}
      </Link>
      {variant === "plus" ? (
        <p className="mt-6 min-h-[20px] text-xs font-bold tracking-[0.1em] whitespace-nowrap text-text-muted uppercase">
          Included features
        </p>
      ) : (
        <p className="mt-6 min-h-[20px] border-t border-border pt-4 text-[13px] leading-snug whitespace-nowrap text-text-secondary">
          <span className="font-bold text-text-primary">
            Everything in {plusName},
          </span>{" "}
          plus:
        </p>
      )}
      <ul className="mt-3 flex flex-col gap-1">
        {plan.features.map((f) => (
          <FeatureItem key={f.title} title={f.title} description={f.description} />
        ))}
      </ul>
    </article>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  return (
    <li
      className={`rounded-sm transition-colors duration-200 motion-reduce:transition-none ${open ? "bg-surface-muted/60" : ""}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors hover:bg-surface-muted/60 focus-visible:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transition-none"
      >
        <Check
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="shrink-0 text-brand-navy"
        />
        <span className="min-w-0 flex-1 text-sm font-bold text-text-primary">
          {title}
        </span>
        <ChevronDown
          aria-hidden="true"
          size={14}
          className={`shrink-0 text-text-muted transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={tipId}
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-2 pt-0.5 pb-2.5 pl-[38px] text-[13px] leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
}
