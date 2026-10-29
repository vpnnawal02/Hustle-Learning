"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Reveal from "../../components/Reveal";
import ownerPhoto from "../../assets/images/owner.png";

const CARDS = [
  {
    index: "01",
    title: "Learn for Free",
    text: "Access study notes, test papers, worksheets, and other educational resources to strengthen your understanding and support your everyday preparation.",
    cta: { label: "Know more", href: "/subscribe" },
  },
  {
    index: "02",
    title: "Practise with Purpose",
    text: "Unlock extended question banks, exam-focused chapter explanations, and Drill Mode to practise questions based on your class, subject, and chapter while tracking your progress.",
    cta: { label: "Know more", href: "/subscribe" },
  },
  {
    index: "03",
    title: "Prepare at the Next Level",
    text: "Get access to daily practice problems, weekly tests, extensive question banks across different marks and question formats, and competitive-level questions with solutions to challenge your understanding.",
    cta: { label: "Know more", href: "/subscribe" },
  },
  {
    index: "04",
    title: "Our Approach",
    text: "We believe effective preparation requires more than reading notes or memorising answers. Students need to understand concepts, practise consistently, identify weaknesses, and learn from their mistakes — so we bring learning resources, structured practice, and progress tracking together in one platform.",
    cta: { label: "Talk to Us", href: "/#hero-enquiry" },
  },
];

export default function WhoWeAre() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 20 : 340;
    track.scrollBy({ left: direction * w, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="who-we-are-heading"
      id="who-we-are"
      className="whoweare-band scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 py-12 md:px-6 md:py-16">
        <Reveal>
          <h2
            id="who-we-are-heading"
            className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-[56px]"
          >
            Who we are
          </h2>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[30ch] text-xl leading-snug font-bold text-text-secondary sm:text-2xl">
              Smarter Preparation. Stronger Concepts. Better Practice.
            </p>
            <p className="max-w-[52ch] text-sm leading-[1.6] text-text-secondary lg:pb-1">
              Hustle Learning is a student-focused learning platform designed
              to make exam preparation more structured, effective, and
              accessible — combining study resources, exam-oriented
              explanations, question banks, and intelligent practice tools.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          {/* Static owner panel — never scrolls */}
          <Reveal className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-4 text-center lg:mx-0 lg:items-start lg:text-left">
            <div             className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg sm:max-w-[320px] lg:max-w-none">
              <Image
                src={ownerPhoto}
                alt="Vipin Nawal, Founder and Educator of Hustle Learning"
                fill
                sizes="(max-width: 1024px) 70vw, 280px"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-base font-bold text-text-primary">
                Vipin Nawal
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                Founder and Educator
              </p>
            </div>
          </Reveal>

          {/* Slider */}
          <Reveal delay={120} className="min-w-0">
            <div
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-1 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:px-0"
            >
              {CARDS.map((card) => (
                <article
                  key={card.index}
                  data-card
                  className="ww-card flex min-h-[380px] w-[82%] shrink-0 snap-start flex-col rounded-lg border border-border bg-surface p-6 sm:w-[320px]"
                >
                  <span
                    aria-hidden="true"
                    className="ww-index text-sm font-extrabold tracking-widest"
                  >
                    {card.index}
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-balance text-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
                    {card.text}
                  </p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={card.cta.href}
                      aria-label={`${card.cta.label} about ${card.title}`}
                      className="inline-flex h-11 w-full items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                    >
                      {card.cta.label}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll cards left"
                className="inline-flex h-10 w-10 items-center justify-center rounded border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll cards right"
                className="inline-flex h-10 w-10 items-center justify-center rounded border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
