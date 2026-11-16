import Reveal from "../../components/Reveal";
import { PlanCard } from "../../components/PlanCard";
import { SectionHeading } from "../../components/typography";
import { PLANS } from "../../components/subscription";

export default function SubscriptionPlans() {
  const [plus, complete] = PLANS;
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
            description="Help your child stay consistent, understand mistakes and feel confident before every exam. Pick a monthly plan and cancel anytime."
          />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[880px] gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <PlanCard plan={plus} variant="plus" />
          </Reveal>
          <Reveal delay={100} className="h-full">
            <PlanCard plan={complete} variant="complete" plusName={plus.name} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
