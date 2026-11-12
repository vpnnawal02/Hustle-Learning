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
  openFirst = false,
}: {
  faqs?: { question: string; answer: string }[];
  structured?: boolean;
  heading?: string;
  openFirst?: boolean;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      {structured && <JsonLd data={faqJsonLd(faqs)} />}
      <h2
        id="faq-heading"
        className="text-2xl text-text-primary"
      >
        {heading}
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            open={openFirst && i === 0}
            className="group rounded-md border border-border bg-surface px-5 py-4 transition-colors duration-200 open:bg-surface-muted"
          >
            <summary className="cursor-pointer list-none font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex min-h-[28px] items-center justify-between gap-4">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="pt-2 text-[15px] leading-[1.6] text-text-secondary">
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
