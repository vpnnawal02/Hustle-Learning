"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Site-wide scroll chrome: a slim reading-progress bar pinned just below
 * the fixed navbar, plus a back-to-top button in the bottom-right corner.
 * Progress updates via rAF with direct DOM writes (no re-renders per tick).
 */
export default function ScrollChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      const shouldShow = doc.scrollTop > 600;
      if (shouldShow !== shownRef.current) {
        shownRef.current = shouldShow;
        setShowTop(shouldShow);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Reading progress — sits flush under the h-20 fixed navbar. */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-20 z-50 h-[3px] bg-black/[0.06] dark:bg-white/10"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Back to top — clears the mobile study shortcut bar. */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-4 bottom-24 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg transition-all duration-300 hover:bg-accent-hover active:bg-accent-pressed md:right-8 md:bottom-8 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </>
  );
}
