import { Check, Phone } from "lucide-react";
import SplitShell from "./forms/SplitShell";
import HomeTuitionEnquiryForm from "./home-tuitions/HomeTuitionEnquiryForm";
import hireImg from "../assets/images/forms/hire-tutor-form.png";
import { CONTACT } from "../components/navbar/navbar-data";

const NEXT_STEPS = [
  "Our counsellor calls you back on WhatsApp and confirms your requirement.",
  "We match a verified home tutor near you and schedule a free demo at your home.",
  "Start regular classes only after you are satisfied with the tutor.",
];

export default function HireATutorPage() {
  return (
    <SplitShell
      headline="The Right Tutor, Without the Search."
      copy="Tell us your class, subjects and locality — get a free demo at home with a verified tutor. No advance payment."
      image={hireImg}
      imageAlt="Parent and student choosing a verified home tutor on a laptop"
      below={<WhatHappensNext />}
    >
      <h1 className="text-2xl leading-tight text-balance text-text-primary">
        Book your free home tuition demo
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        1-minute form · Free demo at home · Delhi
      </p>
      <div className="mt-5">
        <HomeTuitionEnquiryForm />
      </div>
    </SplitShell>
  );
}

function WhatHappensNext() {
  return (
    <div className="w-full">
      <h2 className="text-left text-3xl leading-tight text-balance text-text-primary sm:text-4xl">
        What happens next?
      </h2>
      <p className="mt-2 max-w-[52ch] text-left text-sm leading-relaxed text-text-secondary">
        From enquiry to your first class in three simple steps.
      </p>
      <ol className="mt-6 grid gap-4 text-left sm:grid-cols-3">
        {NEXT_STEPS.map((step, i) => (
          <li
            key={step}
            className="flex flex-col items-start rounded-md border border-border bg-surface p-5 text-left"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-white"
            >
              {i + 1}
            </span>
            <span className="mt-3 text-sm leading-[1.65] text-text-secondary">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a
          href={CONTACT.telHref}
          className="inline-flex items-center gap-1.5 font-semibold text-text-primary underline underline-offset-2"
        >
          <Phone size={15} aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-text-primary underline underline-offset-2"
        >
          WhatsApp us
        </a>
      </p>
      <p className="mt-3 inline-flex items-start gap-1.5 text-[13px] leading-snug text-text-muted">
        <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-green-700" />
        No advance payment — pay only after your demo.
      </p>
    </div>
  );
}
