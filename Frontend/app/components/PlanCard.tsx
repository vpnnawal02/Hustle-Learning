"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Sparkles } from "lucide-react";
import type { PlanFeature, SubscriptionPlan } from "./subscription";

/**
 * Shared subscription plan card — used identically on the home section,
 * the pricing page and the Drill Mode page. Every tier includes the same
 * features; only the price varies by class group.
 */
export function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-surface p-5 transition-colors duration-200 hover:border-text-muted sm:p-6">
      <h3 className="text-xl leading-tight font-extrabold tracking-tight text-text-primary">
        {plan.name}{" "}
        <span className="text-sm leading-snug font-bold text-text-secondary">
          ({plan.audience})
        </span>
      </h3>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-text-primary">
          ₹{plan.price}
        </span>
        <span className="text-sm font-semibold text-text-secondary">/ month</span>
      </p>
      <p className="mt-1.5 text-[13px] font-medium text-text-secondary">
        {plan.billingLabel} · Cancel anytime
      </p>
      <p className="mt-6 text-xs font-bold tracking-[0.1em] text-text-muted uppercase">
        Included features
      </p>
      <ul className="mt-3 flex flex-col gap-1">
        {plan.features.map((f) =>
          f.href ? (
            <DrillModeRow key={f.title} feature={f} />
          ) : (
            <FeatureItem
              key={f.title}
              title={f.title}
              description={f.description}
            />
          ),
        )}
      </ul>
      <Link
        href="/subscribe"
        aria-label={`Subscribe to ${plan.name} at ₹${plan.price} per month`}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        {plan.ctaLabel}
      </Link>
    </article>
  );
}

/**
 * Drill Mode row — pastel amber highlight that navigates to the
 * Drill Mode page instead of expanding a dropdown.
 */
function DrillModeRow({ feature }: { feature: PlanFeature }) {
  return (
    <li>
      <Link
        href={feature.href!}
        aria-label={`${feature.title} — open the Drill Mode page`}
        className="flex min-h-[44px] w-full items-center gap-3 rounded-md bg-brand-navy/10 px-2 py-2 text-left transition-colors hover:bg-brand-navy/15 focus-visible:bg-brand-navy/15 focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transition-none"
      >
        <Sparkles
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="shrink-0 text-amber-500"
        />
        <span className="min-w-0 flex-1 text-sm font-bold text-text-primary">
          {feature.title}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          size={14}
          className="shrink-0 text-text-muted"
        />
      </Link>
    </li>
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
