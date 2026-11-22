"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import homeTuitionsImg from "../../../assets/images/home-tuitions.png";
import freeResourcesImg from "../../../assets/images/hero-section-images/free-resources.png";
import liveClassesImg from "../../../assets/images/hero-section-images/live-classes.png";
import onlineLearningImg from "../../../assets/images/hero-section-images/online-learning.png";

export type HeroCardAction =
  | { type: "link"; href: string }
  | { type: "enquiry" };

export interface HeroCard {
  id: string;
  title: ReactNode;
  description: string;
  /** Accessible name for the whole-card link shown on desktop. */
  ariaLabel: string;
  action: HeroCardAction;
  image: StaticImageData;
  imageAlt: string;
  cardClass: string;
  /** Optional short feature list; `highlight` marks the lead feature. */
  features?: { label: string; highlight?: boolean }[];
}

export const HERO_CARDS: HeroCard[] = [
  {
    id: "free-resources",
    title: "Free Resources",
    description:
      "Download free notes, worksheets, sample papers and practice materials.",
    ariaLabel: "Explore free resources",
    action: { type: "link", href: "/resources" },
    image: freeResourcesImg,
    imageAlt: "Folder with downloadable PDF notes and practice worksheets",
    cardClass: "bg-[#EAE6FB]",
  },
  {
    id: "live-classes",
    title: "Live Online Classes",
    description:
      "Attend interactive classes, clear your doubts and learn from expert teachers.",
    ariaLabel: "Join live online classes",
    action: { type: "link", href: "/courses" },
    image: liveClassesImg,
    imageAlt: "Teacher taking a live online class on a laptop",
    cardClass: "bg-[#E6F0FD]",
  },
  {
    id: "subscription",
    title: (
      <>
        Subscription{" "}
        <span className="inline-block rounded-md bg-amber-400 px-1.5 py-px align-middle">
          ₹99
        </span>
      </>
    ),
    description:
      "Study resources, Weekly tests and everything you need to study.",
    ariaLabel: "Subscribe to Hustle Learning",
    action: { type: "link", href: "/subscribe" },
    image: onlineLearningImg,
    imageAlt: "Tablet with recorded lessons stacked on study books",
    cardClass: "bg-[#FBF3E1]",
    features: [{ label: "Drill Mode", highlight: true }],
  },
  {
    id: "home-tuitions",
    title: "Home Tuitions",
    description:
      "Find verified home tutors in Delhi for one-on-one learning at your pace.",
    ariaLabel: "Explore home tuitions in Delhi",
    action: { type: "link", href: "/home-tuitions" },
    image: homeTuitionsImg,
    imageAlt: "Home tutor teaching a student one-to-one",
    cardClass: "bg-[#E7F4EC]",
  },
];

interface HeroCardItemProps {
  card: HeroCard;
  onEnquire: () => void;
  priority?: boolean;
  className?: string;
}

export function HeroCardItem({
  card,
  onEnquire,
  priority = false,
  className = "",
}: HeroCardItemProps) {
  // The whole card is the control on every breakpoint. The text-style cue
  // below (label + arrow) is a visual affordance only — never a nested link.
  const cardClass = `group relative block h-full w-full shrink-0 cursor-pointer overflow-hidden rounded-md border border-black/5 p-4 text-left shadow-[0_18px_40px_-24px_rgba(20,33,61,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-20px_rgba(20,33,61,0.4)] active:scale-[0.99] sm:p-5 ${card.cardClass} ${className}`;
  const content = (
    <>
      {/* Decorative graphic: soft glow blob */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/50 blur-2xl transition-transform duration-500 group-hover:scale-125"
      />
      <span className="relative flex h-full items-center gap-3">
        <span className="flex h-full min-w-0 flex-1 flex-col items-start">
          <span className="block text-xl leading-tight font-extrabold tracking-tight text-[#141B2D] xl:text-[22px]">
            {card.title}
          </span>
          {card.features && (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {card.features.map((feature) =>
                feature.highlight ? (
                  <li
                    key={feature.label}
                    className="inline-flex items-center gap-1 rounded-md bg-brand-navy px-2.5 py-1 text-[11px] leading-tight font-extrabold text-brand-white"
                  >
                    <Sparkles size={12} aria-hidden="true" className="shrink-0" />
                    {feature.label}
                  </li>
                ) : (
                  <li
                    key={feature.label}
                    className="hidden items-center rounded-full border border-black/5 bg-white/70 px-2 py-0.5 text-[11px] leading-tight font-semibold text-[#4A5568] sm:inline-flex"
                  >
                    {feature.label}
                  </li>
                ),
              )}
            </ul>
          )}
          <span className="mt-1.5 block text-sm leading-snug text-[#4A5568] xl:text-[15px]">
            {card.description}
          </span>
        </span>
        <span className="relative block h-28 w-[38%] shrink-0 sm:h-32 sm:w-[40%] md:w-[42%] xl:h-full">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 1024px) 160px, 240px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.07] group-hover:-rotate-1"
          />
        </span>
      </span>
    </>
  );

  if (card.action.type === "link") {
    return (
      <Link href={card.action.href} aria-label={card.ariaLabel} className={cardClass}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onEnquire}
      aria-haspopup="dialog"
      aria-label={card.ariaLabel}
      className={cardClass}
    >
      {content}
    </button>
  );
}

/**
 * Mobile rail: one card visible, auto-advances one card every ~3s,
 * pausing while hovered/touched or when the enquiry popup is open.
 */
export function MobileCardRail({
  onEnquire,
  paused,
}: {
  onEnquire: () => void;
  paused: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const hoveringRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    const id = window.setInterval(() => {
      if (document.hidden || pausedRef.current || hoveringRef.current) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-rail-card]");
      if (cards.length === 0) return;
      index += 1;
      if (index >= cards.length) {
        index = 0;
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const step =
          cards[0].offsetWidth +
          parseFloat(getComputedStyle(el).columnGap || "16");
        el.scrollTo({
          left: Math.min(index * step, el.scrollWidth - el.clientWidth),
          behavior: "smooth",
        });
      }
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
      onTouchStart={() => (hoveringRef.current = true)}
      onTouchEnd={() => {
        window.setTimeout(() => (hoveringRef.current = false), 4000);
      }}
      className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-1 lg:hidden"
    >
      {HERO_CARDS.map((c, i) => (
        <span
          key={c.id}
          data-rail-card
          className="block w-[270px] shrink-0 snap-start sm:w-[320px]"
        >
          <HeroCardItem
            card={c}
            onEnquire={onEnquire}
            priority={i === 0}
          />
        </span>
      ))}
    </div>
  );
}
