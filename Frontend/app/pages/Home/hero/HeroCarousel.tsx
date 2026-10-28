"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CarouselControls from "./CarouselControls";
import EnquiryForm from "./EnquiryForm";
import HeroImage from "./HeroImage";
import { HERO_SLIDES } from "./hero-slides";
import type { EnquiryValues } from "./validation";

const AUTOPLAY_MS = 8000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [formBusy, setFormBusy] = useState(false);
  const [values, setValues] = useState<EnquiryValues>({
    name: "",
    whatsapp: "",
    email: "",
    classLevel: "",
  });
  const touchX = useRef<number | null>(null);
  const autoplayBlocked = paused || formBusy;

  const goTo = useCallback((i: number) => {
    setActive(
      ((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  const next = useCallback(
    () => goTo(active + 1),
    [active, goTo],
  );
  const prev = useCallback(
    () => goTo(active - 1),
    [active, goTo],
  );

  // Autoplay: never while the user is completing the form.
  useEffect(() => {
    if (autoplayBlocked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [autoplayBlocked, active]);

  // Keyboard navigation on the region (arrows), without hijacking form keys.
  function onRegionKeyDown(e: React.KeyboardEvent) {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  // The banner works as a CTA: activating it focuses the form.
  function focusForm() {
    document
      .querySelector<HTMLElement>('#hero-enquiry input[name="hero-enquiry-name"]')
      ?.focus();
  }

  function onCtaKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      focusForm();
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Hustle Learning offerings"
      className="band band-hero w-full"
      onKeyDown={onRegionKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) next();
        else prev();
      }}
    >
      <div className="relative mx-auto grid w-full max-w-[1380px] gap-6 px-4 pt-6 pb-8 md:px-6 lg:h-[70vh] lg:max-h-[680px] lg:min-h-[540px] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        {/* Stage — slides travel on a track, exiting left as the next enters */}
        <div className="flex min-w-0 flex-col overflow-hidden">
          <div className="min-h-0 flex-1">
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {HERO_SLIDES.map((slide, i) => {
                const isActive = i === active;
                return (
                  <article
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${HERO_SLIDES.length}: ${slide.badge} — ${slide.badgeBatch}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className="w-full shrink-0"
                  >
                    <div
                      role="button"
                      tabIndex={isActive ? 0 : -1}
                      onClick={focusForm}
                      onKeyDown={onCtaKeyDown}
                      aria-label={`${slide.heading} — activate to fill the enquiry form`}
                      className="grid h-full cursor-pointer content-center items-center gap-4 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-2"
                    >
                      <div
                        className={`min-w-0 ${i === 0 ? "hero-enter hero-enter-copy" : ""} ${isActive && i !== 0 ? "slide-copy-in" : ""}`}
                        key={isActive ? `copy-${slide.id}-on` : `copy-${slide.id}`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-navy px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                            <span
                              aria-hidden="true"
                              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                            />
                            {slide.badge}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-[11px] font-bold tracking-wide text-on-accent uppercase">
                            {slide.badgeBatch}
                          </span>
                        </div>

                        {i === 0 ? (
                          <h1 className="mt-3 max-w-[16ch] text-4xl leading-[1.05] font-extrabold tracking-tight text-text-primary uppercase sm:text-5xl lg:text-[54px]">
                            {slide.heading}
                          </h1>
                        ) : (
                          <h2 className="mt-3 max-w-[16ch] text-4xl leading-[1.05] font-extrabold tracking-tight text-text-primary uppercase sm:text-5xl lg:text-[54px]">
                            {slide.heading}
                          </h2>
                        )}

                        <ul className="mt-4 flex max-w-[54ch] flex-col gap-1.5">
                          {slide.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-[15px] leading-snug font-medium text-text-secondary"
                            >
                              <span
                                aria-hidden="true"
                                className="font-bold text-accent"
                              >
                                ✦
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-text-primary uppercase">
                          Get your free callback
                          <span aria-hidden="true" className="text-accent">
                            →
                          </span>
                        </span>

                        {/* SEO: every slide's copy is in the DOM */}
                        <div className="sr-only">
                          <p>{slide.description}</p>
                        </div>
                      </div>

                      <div
                        className={i === 0 ? "hero-enter-media" : undefined}
                      >
                        <HeroImage
                          src={slide.image}
                          alt={slide.imageAlt}
                          eager={slide.eager}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Dots left, arrows right */}
          <div className="mt-6">
            <CarouselControls
              active={active}
              total={HERO_SLIDES.length}
              onSelect={goTo}
              onPrev={prev}
              onNext={next}
            />
          </div>
        </div>

        {/* Form card — stretches to exactly the stage height; entrance never blocks interaction */}
        <div
          id="hero-enquiry"
          className="hero-enter hero-enter-form min-w-0 self-stretch rounded-sm border border-border bg-surface"
        >
          <EnquiryForm
            slide={HERO_SLIDES[active]}
            values={values}
            onChange={setValues}
            onBusyChange={setFormBusy}
            formIdPrefix="hero-enquiry"
          />
        </div>
      </div>
    </section>
  );
}
