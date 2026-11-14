"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Crown,
  FileDown,
  Library,
  Radio,
  type LucideIcon,
} from "lucide-react";
import booksImg from "../../../assets/images/hero-section-images/books.png";
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
  ctaLabel: string;
  action: HeroCardAction;
  image: StaticImageData;
  imageAlt: string;
  ghostIcon: LucideIcon;
  cardClass: string;
  buttonClass: string;
}

export const HERO_CARDS: HeroCard[] = [
  {
    id: "free-resources",
    title: "Free Resources",
    description:
      "Download free notes, worksheets, sample papers and practice materials.",
    ctaLabel: "Explore",
    action: { type: "link", href: "/resources" },
    image: freeResourcesImg,
    imageAlt: "Folder with downloadable PDF notes and practice worksheets",
    ghostIcon: FileDown,
    cardClass: "bg-[#EAE6FB]",
    buttonClass: "bg-[#6C5CE7] hover:bg-[#5B4BD6]",
  },
  {
    id: "live-classes",
    title: "Live Online Classes",
    description:
      "Attend interactive classes, clear your doubts and learn from expert teachers.",
    ctaLabel: "Join Live",
    action: { type: "link", href: "/courses" },
    image: liveClassesImg,
    imageAlt: "Teacher taking a live online class on a laptop",
    ghostIcon: Radio,
    cardClass: "bg-[#E6F0FD]",
    buttonClass: "bg-[#1F6FEB] hover:bg-[#1A5FD0]",
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
      "Unlock study resources, live classes, chapter-wise practice and mock tests.",
    ctaLabel: "Subscribe",
    action: { type: "link", href: "/subscribe" },
    image: onlineLearningImg,
    imageAlt: "Tablet with recorded lessons stacked on study books",
    ghostIcon: Crown,
    cardClass: "bg-[#FBF3E1]",
    buttonClass: "bg-[#22304F] hover:bg-[#18233B]",
  },
  {
    id: "books",
    title: "Hustle Books",
    description:
      "Explore NCERT-aligned books with chapter-wise exercises, practice questions and PYQs.",
    ctaLabel: "Explore",
    action: { type: "enquiry" },
    image: booksImg,
    imageAlt: "Hustle Learning Class 10 Science, Mathematics and Social Science books",
    ghostIcon: Library,
    cardClass: "bg-[#EFEAFB]",
    buttonClass: "bg-[#3B2A63] hover:bg-[#2E214E]",
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
  const Ghost = card.ghostIcon;
  const ctaClass = `mt-auto inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-[11px] font-bold text-white transition-colors xl:px-5 xl:py-2.5 xl:text-xs ${card.buttonClass}`;
  return (
    <div
      className={`group relative h-full w-full shrink-0 overflow-hidden rounded-md border border-black/5 p-4 text-left shadow-[0_18px_40px_-24px_rgba(20,33,61,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-20px_rgba(20,33,61,0.4)] sm:p-5 ${card.cardClass} ${className}`}
    >
      {/* Decorative graphics: soft glow blob, ghost icon */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/50 blur-2xl transition-transform duration-500 group-hover:scale-125"
      />
      <Ghost
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -left-3 h-24 w-24 -rotate-12 text-white/40 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110"
        strokeWidth={1.25}
      />
      <span className="relative flex h-full items-center gap-3">
        <span className="flex h-full min-w-0 flex-1 flex-col items-start">
          <span className="block text-lg leading-tight font-extrabold tracking-tight text-[#141B2D] xl:text-xl">
            {card.title}
          </span>
          <span className="mt-1.5 line-clamp-3 block text-xs leading-snug text-[#4A5568] xl:text-[13px]">
            {card.description}
          </span>
          {card.action.type === "link" ? (
            <Link href={card.action.href} className={ctaClass}>
              {card.ctaLabel}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onEnquire}
              aria-haspopup="dialog"
              className={ctaClass}
            >
              {card.ctaLabel}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          )}
        </span>
        <span className="relative block h-28 w-[42%] shrink-0 sm:h-32 sm:w-[44%] md:w-[50%] xl:h-full">
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
    </div>
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
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 lg:hidden"
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
