"use client";

import { Pause, Play } from "lucide-react";
import { HERO_SLIDES } from "./hero-slides";

interface Props {
  active: number;
  total: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  autoplayOn: boolean;
  onToggleAutoplay: () => void;
}

/** Dots (44px targets) on the left, pause + arrows on the right. */
export default function CarouselControls({
  active,
  total,
  onSelect,
  onPrev,
  onNext,
  autoplayOn,
  onToggleAutoplay,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div
        role="tablist"
        aria-label="Hero slides"
        className="flex items-center"
      >
        {HERO_SLIDES.slice(0, total).map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Go to slide ${i + 1}: ${s.badge}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              className="flex h-11 min-w-8 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 rounded-full transition-all ${
                  selected
                    ? "w-7 bg-accent"
                    : "w-2 bg-text-muted/40 hover:bg-text-muted"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAutoplay();
          }}
          aria-pressed={!autoplayOn}
          aria-label={
            autoplayOn
              ? "Pause automatic slide rotation"
              : "Resume automatic slide rotation"
          }
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-border bg-surface text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
        >
          {autoplayOn ? (
            <Pause size={18} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={18} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={`Previous slide (currently: ${HERO_SLIDES[active].badge})`}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={`Next slide (currently: ${HERO_SLIDES[active].badge})`}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
