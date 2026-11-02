import JsonLd from "../seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

/**
 * FAQ accordion built on native <details> — no client JS needed.
 * Emits FAQPage structured data only when `structured` is true
 * (chapter pages with genuine FAQs; never indiscriminately).
 */
export default function Faq({
  faqs,
  structured = false,
  heading = "Frequently asked questions",
}: {
  faqs?: { question: string; answer: string }[];
  structured?: boolean;
  heading?: string;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      {structured && <JsonLd data={faqJsonLd(faqs)} />}
      <h2
        id="faq-heading"
        className="text-2xl font-extrabold tracking-tight text-text-primary"
      >
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-2.5">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-surface px-5 py-4"
          >
            <summary className="cursor-pointer list-none font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
