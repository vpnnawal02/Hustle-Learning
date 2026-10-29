"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import CarouselControls from "./CarouselControls";
import EnquiryForm from "./EnquiryForm";
import { HERO_SLIDES } from "./hero-slides";
import type { EnquiryValues } from "./validation";

const AUTOPLAY_MS = 8000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayOn, setAutoplayOn] = useState(true);
  const [formBusy, setFormBusy] = useState(false);
  const [values, setValues] = useState<EnquiryValues>({
    name: "",
    whatsapp: "",
    email: "",
    classLevel: "",
  });
  const touchX = useRef<number | null>(null);
  const autoplayBlocked = paused || formBusy || !autoplayOn;

  const goTo = useCallback((i: number) => {
    setActive(
      ((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

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

  // Banners and tiles act as CTAs: activating them focuses the form.
  function focusForm() {
    document
      .querySelector<HTMLElement>('#hero-enquiry input[name="hero-enquiry-name"]')
      ?.focus();
  }

  const slide = HERO_SLIDES[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Hustle Learning offerings"
      className="mx-auto w-full max-w-[1380px] px-4 pt-8 pb-8 md:px-6 md:pt-10"
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
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0">
          {/* Centered copy */}
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${HERO_SLIDES.length}: ${slide.badge} — ${slide.badgeBatch}`}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-navy px-3 py-1 text-[11px] font-bold tracking-wide text-brand-white uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-md bg-accent"
                />
                {slide.badge}
              </span>
              <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-[11px] font-bold tracking-wide text-on-accent uppercase">
                {slide.badgeBatch}
              </span>
            </div>

            {active === 0 ? (
              <h1 className="mx-auto mt-3 max-w-[20ch] text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-text-primary sm:text-5xl">
                {slide.heading}
              </h1>
            ) : (
              <h2 className="mx-auto mt-3 max-w-[20ch] text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-text-primary sm:text-5xl">
                {slide.heading}
              </h2>
            )}

            <p className="mx-auto mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
              {slide.description}
            </p>

            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
              {slide.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-1.5 text-sm font-medium text-text-secondary"
                >
                  <span aria-hidden="true" className="font-bold text-accent">
                    ✦
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <button
                type="button"
                onClick={focusForm}
                className="inline-flex h-12 items-center justify-center rounded bg-accent px-8 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Get a Free Callback
              </button>
            </div>
          </div>

          {/* Bento collage track */}
          <div className="mt-8 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {HERO_SLIDES.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={s.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${HERO_SLIDES.length}: ${s.badge}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className="w-full shrink-0"
                  >
                    <div className="grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-4">
                      {/* Hero tile */}
                      <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-surface-muted">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 90vw, 560px"
                          priority={s.eager}
                          loading={s.eager ? undefined : "lazy"}
                          className="object-cover object-center"
                        />
                      </div>
                      {/* Brand tile */}
                      <div className="flex flex-col justify-between rounded-lg bg-brand-navy p-4 text-brand-white">
                        <p className="text-[13px] leading-snug font-bold">
                          Learn Smart.
                          <br />
                          Hustle Hard.
                        </p>
                        <button
                          type="button"
                          tabIndex={isActive ? 0 : -1}
                          onClick={focusForm}
                          aria-label="Get a free callback"
                          className="inline-flex h-9 w-9 items-center justify-center self-end rounded bg-accent text-base font-bold text-on-accent transition-colors hover:bg-accent-hover"
                        >
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                      {/* Small tiles: per-slide plan — images stay clickable,
                          text tiles carry highlight copy (no numerals) */}
                      {s.tiles.map((tile, ti) => {
                        if (tile.kind === "offer") {
                          return (
                            <div
                              key={ti}
                              className="flex items-center justify-center rounded-lg bg-accent p-3 text-center"
                            >
                              <span className="text-[13px] leading-snug font-bold text-on-accent sm:text-sm">
                                {s.offerText}
                              </span>
                            </div>
                          );
                        }
                        if (tile.kind === "text") {
                          return (
                            <div
                              key={ti}
                              className="flex items-center justify-center rounded-lg bg-surface-muted p-3 text-center"
                            >
                              <span className="text-[13px] leading-snug font-semibold text-text-secondary sm:text-sm">
                                {tile.text}
                              </span>
                            </div>
                          );
                        }
                        const target =
                          tile.kind === "image" ? tile.ref : tile.target;
                        const src =
                          tile.kind === "image"
                            ? HERO_SLIDES[tile.ref].image
                            : tile.src;
                        const alt =
                          tile.kind === "image"
                            ? ""
                            : tile.alt;
                        return (
                          <button
                            key={ti}
                            type="button"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => goTo(target)}
                            aria-label={`Show: ${HERO_SLIDES[target].badge}`}
                            className="relative overflow-hidden rounded-lg bg-surface-muted transition-transform duration-300 hover:scale-[1.02]"
                          >
                            <Image
                              src={src}
                              alt={alt}
                              fill
                              sizes="(max-width: 1024px) 40vw, 220px"
                              loading="lazy"
                              className="object-cover object-center transition-transform duration-300 hover:scale-[1.04]"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots left, arrows right */}
          <div className="mt-5">
            <CarouselControls
              active={active}
              total={HERO_SLIDES.length}
              onSelect={goTo}
              onPrev={prev}
              onNext={next}
              autoplayOn={autoplayOn}
              onToggleAutoplay={() => setAutoplayOn((v) => !v)}
            />
          </div>
        </div>

        {/* Form card — stretches to match */}
        <div
          id="hero-enquiry"
          className="min-w-0 self-stretch rounded-lg border border-border bg-surface lg:sticky lg:top-24"
        >
          <EnquiryForm
            slide={slide}
            values={values}
            onChange={setValues}
            onBusyChange={setFormBusy}
            formIdPrefix="hero-enquiry"
          />
        </div>
      </div>

      {/* SEO: every slide's copy is in the DOM */}
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
