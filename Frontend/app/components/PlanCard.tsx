import Link from "next/link";
import { Check } from "lucide-react";
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
      <ul className="mt-3 flex flex-col gap-4">
        {plan.features.map((f) => (
          <li key={f.title} className="flex gap-3">
            <Check
              aria-hidden="true"
              size={18}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-brand-navy"
            />
            <span className="min-w-0">
              <span className="block text-sm font-bold text-text-primary">
                {f.title}
              </span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-text-secondary">
                {f.description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
