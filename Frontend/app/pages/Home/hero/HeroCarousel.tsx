"use client";

import { BookOpen, ShieldCheck, Users, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import EnquiryForm from "./EnquiryForm";
import EnquiryModal from "./EnquiryModal";
import QuickEnquiryForm from "./QuickEnquiryForm";
import { HERO_CARDS, HeroCardItem, MobileCardRail } from "./hero-cards";
import { HERO_SLIDES } from "./hero-slides";
import type { EnquiryValues } from "./validation";

/** Hashes that historically pointed at the inline hero form. */
const ENQUIRY_HASHES = new Set(["#hero-enquiry", "#enquiry-form"]);

/** Single overview slide drives the headline; all slides feed the marquee. */
const LEAD_SLIDE = HERO_SLIDES[0];

const TRUST_ITEMS = [
  { icon: BookOpen, label: "Free resources" },
  { icon: Users, label: "Interactive Drill Mode" },
  { icon: ShieldCheck, label: "Worksheet and Question Bank" },
  { icon: Wallet, label: "Affordable Pricing" },
  { icon: Wallet, label: "Personal Online and Home Tuitions" },
  { icon: Wallet, label: "Much more with Subscription" },
];



export default function HeroCarousel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formBusy, setFormBusy] = useState(false);
  const [values, setValues] = useState<EnquiryValues>({
    name: "",
    whatsapp: "",
    email: "",
    classLevel: "",
  });

  const openEnquiry = useCallback(() => setModalOpen(true), []);
  const closeEnquiry = useCallback(() => {
    setModalOpen(false);
    if (
      typeof window !== "undefined" &&
      ENQUIRY_HASHES.has(window.location.hash)
    ) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  // Backwards compatibility: every `/#hero-enquiry` link across the site
  // (CtaBand, CourseCard, Classes, Subscribe, WhoWeAre) now opens the dialog.
  useEffect(() => {
    function checkHash() {
      if (ENQUIRY_HASHES.has(window.location.hash)) setModalOpen(true);
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const marqueePaused = formBusy || modalOpen;

  return (
    <section
      id="hero-enquiry"
      aria-label="Hustle Learning offerings"
      className="relative mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 border-b border-border px-4 py-5 md:flex md:flex-col md:px-6 md:py-10 xl:min-h-[80svh] xl:justify-center"
    >

      {/* ---- Top row: headline left, vertical enquiry form right.
           Mobile order: header → slider → form → trust. ---- */}
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-stretch md:gap-x-6 md:gap-y-0">
        <div className="hero-enter hero-enter-copy max-md:order-1 md:col-span-7 md:flex md:flex-col md:justify-between">
          <h1 className="mt-4 max-w-[20ch] text-4xl leading-[1.15] font-bold text-balance text-text-primary sm:text-5xl md:mt-3 md:text-4xl lg:text-5xl">
            Everything Students Need to{" "}
            <span className="hero-keyword">Learn</span>, Grow & Succeed.
          </h1>

          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-text-secondary sm:text-lg md:mt-3 md:text-[15px] lg:text-base">
            {LEAD_SLIDE.description}
          </p>
          <p className="mt-3 max-w-[52ch] text-xl leading-snug font-bold text-text-primary sm:text-2xl md:pb-5">
            Better learning. Personalised guidance. Affordable education.
          </p>
        </div>

        {/* Enquiry form column */}
        <div className="hero-enter hero-enter-form md:col-span-5 max-md:order-3 max-md:mt-8">
          <div className="hidden md:block">
            <QuickEnquiryForm layout="vertical" onBusyChange={setFormBusy} />
          </div>
          <button
            type="button"
            onClick={openEnquiry}
            aria-haspopup="dialog"
            className="mt-6 w-full rounded-lg bg-accent px-5 py-3.5 text-center text-base font-bold text-on-accent shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 md:hidden"
          >
            {LEAD_SLIDE.ctaLabel}
          </button>
        </div>

        {/* ---- Offering cards: static 4-up grid on large screens, stepped auto-rail on smaller screens ---- */}
        <div className="hero-enter-media mt-8 md:col-span-12 md:mt-6 max-md:order-2">
          <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
            {HERO_CARDS.map((c, i) => (
              <HeroCardItem
                key={c.id}
                card={c}
                onEnquire={openEnquiry}
                priority={i === 0}
              />
            ))}
          </div>
          <div className="md:hidden">
            <MobileCardRail onEnquire={openEnquiry} paused={marqueePaused} />
          </div>

        </div>

        {/* ---- Trust strip (reference brand row, restyled) ---- */}
        <div className="mt-6 border-t border-border pt-5 md:col-span-12 md:mt-4 md:pt-4 max-md:order-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

            <ul className="flex flex-1 flex-wrap items-center gap-x-1 gap-y-3 sm:justify-between">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-semibold text-text-muted md:text-md border border-border rounded-md px-2 py-1 bg-surface-muted"
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-text-muted"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enquiry dialog */}
      <EnquiryModal
        open={modalOpen}
        onClose={closeEnquiry}
        labelledBy="hero-enquiry-form-title"
      >
        <div className="p-5 sm:p-6">
          <EnquiryForm
            slide={LEAD_SLIDE}
            values={values}
            onChange={setValues}
            onBusyChange={setFormBusy}
            formIdPrefix="hero-enquiry-form"
          />
        </div>
      </EnquiryModal>

      {/* SEO: every offering stays in the DOM */}
      <div className="sr-only">
        {HERO_SLIDES.map((s) => (
          <div key={s.id}>
            <h2>{s.heading}</h2>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
