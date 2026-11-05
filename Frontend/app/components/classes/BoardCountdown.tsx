"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";

/** Days until the next 15 February (typical CBSE board-exam start). */
function boardCountdownDays(now: Date): number {
  const year = now.getFullYear();
  let target = new Date(year, 1, 15);
  if (now > target) target = new Date(year + 1, 1, 15);
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
}

function subscribe() {
  return () => {};
}

/** Client-rendered so the static page stays prerenderable. */
export default function BoardCountdown() {
  const days = useSyncExternalStore(
    subscribe,
    () => boardCountdownDays(new Date()),
    () => 0,
  );
  return (
    <section
      aria-labelledby="countdown-heading"
      className="rounded-md bg-brand-navy p-5 text-brand-white"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-white/80">
        <Clock size={16} aria-hidden="true" />
        CBSE Boards
      </p>
      <p
        id="countdown-heading"
        className="mt-2 text-3xl font-extrabold tracking-tight"
      >
        {days} days{" "}
        <span className="text-base font-semibold text-brand-white/80">
          to go
        </span>
      </p>
      <p className="mt-2 text-sm leading-[1.55] text-brand-white/80">
        Boards usually begin mid-February. Finish the syllabus once, then
        switch to timed papers.
      </p>
    </section>
  );
}
