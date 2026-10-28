"use client";

import { HERO_SLIDES } from "./hero-slides";

interface Props {
  active: number;
  total: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

/** Dots on the left, arrows on the right — theme-aware, no decoration. */
export default function CarouselControls({
  active,
  total,
  onSelect,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div
        role="tablist"
        aria-label="Hero slides"
        className="flex items-center gap-1.5"
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
              className={`h-2 rounded-full transition-all ${selected
                ? "w-7 bg-accent"
                : "w-2 bg-text-muted/40 hover:bg-text-muted"
                }`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={`Previous slide (currently: ${HERO_SLIDES[active].badge})`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-base font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
