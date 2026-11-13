"use client";

import Image from "next/image";
import { BookOpen, ShieldCheck, Users, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import EnquiryForm from "./EnquiryForm";
import EnquiryModal from "./EnquiryModal";
import QuickEnquiryForm from "./QuickEnquiryForm";
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

      {/* ---- Top row: headline left, proof right (reference layout).
          Mobile order: header → subtext → slider → proof → CTA → trust. ---- */}
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-end md:gap-x-6 md:gap-y-0">
        <div className="contents md:flex md:flex-col md:col-span-7">

          <div className="hero-enter hero-enter-copy max-md:order-1">
          <h1 className="mt-4 max-w-[20ch] text-4xl leading-[1.15] font-bold text-balance text-text-primary sm:text-5xl md:mt-3 md:text-4xl lg:text-5xl">
            Complete <span className="hero-keyword">Learning</span> Support
            for Every Student.
          </h1>

          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-text-secondary sm:text-lg md:mt-3 md:text-[15px] lg:text-base pb-5">
            {LEAD_SLIDE.description}
          </p>
          </div>

          <div className="max-md:order-4">
          <div className="hidden md:block">
          <QuickEnquiryForm onBusyChange={setFormBusy} />
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
        </div>

        {/* Proof column */}
        <div className="hero-enter hero-enter-form md:col-span-5 max-md:order-3 max-md:mt-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5" aria-hidden="true">
              {HERO_SLIDES.slice(0, 4).map((s) => (
                <span
                  key={s.id}
                  className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-background md:h-8 md:w-8"
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
              ))}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-[11px] font-bold text-brand-white ring-2 ring-background md:h-8 md:w-8"
              >
                +
              </span>
            </div>
            <p className="text-[15px] leading-snug font-medium text-text-secondary">
              <span aria-hidden="true" className="font-bold text-text-primary">
                ★★★★★{" "}
              </span>
              Loved by students
              <br />
              and parents across Classes 6–12
            </p>
          </div>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-text-secondary md:mt-2 md:text-[14ppx]">
            Notes, live online classes, personal home tutors, and books —
            expert guidance matched to your syllabus, at prices families can
            afford.
          </p>
        </div>

        {/* ---- Autoscrolling image strip: photo + caption per card ---- */}
        <div className="hero-enter-media mt-8 md:col-span-12 md:mt-6 max-md:order-2">
          <div className="group/marquee overflow-hidden">
            <div
              className={`animate-hero-marquee flex w-max gap-4 pr-4 ${marqueePaused ? "[animation-play-state:paused]" : ""} group-hover/marquee:[animation-play-state:paused]`}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex gap-4"
                >
                  {HERO_SLIDES.map((s) => (
                    <button
                      key={`${copy}-${s.id}`}
                      type="button"
                      tabIndex={copy === 1 ? -1 : 0}
                      onClick={openEnquiry}
                      aria-haspopup="dialog"
                      aria-label={`${s.badge}: ${s.offerText} — get a free callback`}
                      className="group relative w-[240px] shrink-0 cursor-pointer overflow-hidden rounded-lg bg-surface-muted text-left transition-transform duration-300 hover:-translate-y-0.5 sm:w-[300px] md:w-[220px] lg:w-[250px]"
                    >
                      <span className="relative block aspect-[5/4] w-full overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(max-width: 640px) 240px, (max-width: 1023px) 220px, 250px"
                          priority={copy === 0 && s.eager}
                          loading={
                            copy === 0 && s.eager ? undefined : "lazy"
                          }
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent"
                        />
                      </span>
                      <span className="absolute inset-x-3 bottom-3 flex flex-col gap-1">
                        <span className="w-fit rounded bg-brand-white/95 px-2 py-0.5 text-[11px] font-bold tracking-wide text-brand-navy uppercase">
                          {s.badge}
                        </span>
                        <span className="text-[13px] leading-snug font-semibold text-white md:text-xs">
                          {s.offerText}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
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
