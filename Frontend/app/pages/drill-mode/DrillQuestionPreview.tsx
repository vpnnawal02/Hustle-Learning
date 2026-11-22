"use client";

import { useState } from "react";
import { CircleCheck, CircleX, RotateCcw, Timer } from "lucide-react";

const OPTIONS = ["4", "6", "7", "11"];
const CORRECT_INDEX = 1;

/**
 * Small, self-contained preview of the Drill Mode question interface.
 * It is a marketing demo only: one sample question, instant feedback and
 * a reset action. No session data is stored or submitted.
 */
export default function DrillQuestionPreview() {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === CORRECT_INDEX;

  return (
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold tracking-[0.1em] text-text-primary uppercase">
          Sample question
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-text-secondary tabular-nums">
          <Timer size={16} aria-hidden="true" className="text-accent" />
          04:32
        </span>
      </div>

      <p className="mt-3 text-base font-semibold text-text-primary">
        If 2x + 5 = 17, what is the value of x?
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Answer options">
        {OPTIONS.map((option, index) => {
          const isSelected = selected === index;
          const isCorrectOption = index === CORRECT_INDEX;
          const showCorrect = answered && isCorrectOption;
          const showWrong = isSelected && !isCorrectOption;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelected(index)}
              className={`flex min-h-[44px] w-full items-center gap-2.5 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                showCorrect
                  ? "border-emerald-500 bg-emerald-500/10 text-text-primary"
                  : showWrong
                    ? "border-rose-500 bg-rose-500/10 text-text-primary"
                    : "border-border bg-surface text-text-primary hover:border-accent hover:bg-surface-muted"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                  showCorrect
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : showWrong
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "border-border text-text-secondary"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="min-w-0 flex-1">{option}</span>
              {showCorrect && (
                <CircleCheck
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-emerald-600"
                />
              )}
              {showWrong && (
                <CircleX
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-rose-600"
                />
              )}
            </button>
          );
        })}
      </div>

      <div role="status" aria-live="polite" className="mt-3 min-h-[40px]">
        {answered ? (
          <p className="text-sm leading-[1.6] font-medium text-text-primary">
            {isCorrect ? "Correct! " : "Not quite. "}
            The correct answer is B — 6. Subtract 5 from both sides to get 2x =
            12, then divide by 2.
          </p>
        ) : (
          <p className="text-sm leading-[1.6] text-text-muted">
            Select an answer to see instant feedback.
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-[12.5px] font-semibold text-text-muted">
          Class 10 · Mathematics · Sample preview
        </span>
        <button
          type="button"
          onClick={() => setSelected(null)}
          disabled={!answered}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-sm px-2 py-1 text-[12.5px] font-bold text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}
