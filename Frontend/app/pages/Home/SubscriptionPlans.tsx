import Reveal from "../../components/Reveal";
import { PlanCard } from "../../components/PlanCard";
import { SectionHeading } from "../../components/typography";
import { PLANS } from "../../components/subscription";

export default function SubscriptionPlans() {
  return (
    <section
      aria-labelledby="subscription-heading"
      className="border-b border-border bg-accent/10"
    >
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-10 pb-12 md:px-6 md:pb-16">
        <Reveal>
          <SectionHeading
            titleId="subscription-heading"
            title="Hustle Learning Membership"
            sub="Daily practice, weekly tests and clear solutions in one place."
            subTone="secondary"
            description="Pick the tier that matches the student's level. Every tier includes the same six features — only the price varies. Monthly billing, cancel anytime."
          />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[1120px] gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
