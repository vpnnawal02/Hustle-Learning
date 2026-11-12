"use client";

import { useSyncExternalStore } from "react";
import { CalendarDays } from "lucide-react";

/** Days until the next 15 February (typical CBSE board-exam start). */
function daysUntilBoards(now: Date): number {
  const year = now.getFullYear();
  let target = new Date(year, 1, 15);
  if (now > target) target = new Date(year + 1, 1, 15);
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
}

function subscribe() {
  return () => {};
}

/**
 * Slim exam-timeline banner (light surface): guidance first, countdown as
 * small secondary text. Client-rendered so the page stays prerenderable.
 */
export default function ExamTimeline() {
  const days = useSyncExternalStore(
    subscribe,
    () => daysUntilBoards(new Date()),
    () => 0,
  );
  return (
    <section
      aria-label="Board exam timeline"
      className="rounded-sm border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <CalendarDays
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-text-secondary"
        />
        <div className="min-w-0">
          <p className="text-base leading-[1.6] text-text-primary">
            <span className="font-semibold">
              CBSE boards usually begin mid-February.
            </span>{" "}
            Finish the syllabus by December, then switch to timed papers.
          </p>
          <p className="mt-1 text-[13px] text-text-secondary">
            {days} days to go
          </p>
        </div>
      </div>
    </section>
  );
}
