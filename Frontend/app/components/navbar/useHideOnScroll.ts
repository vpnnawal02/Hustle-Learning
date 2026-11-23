"use client";

import { useEffect, useState } from "react";

/**
 * Hides the navbar while scrolling down, shows it again on scroll up.
 * Always visible near the top of the page. When `disabled`, always
 * returns false. State only flips on direction/threshold crossings,
 * and scroll handling is rAF-throttled with a passive listener.
 */
export function useHideOnScroll(disabled: boolean): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (disabled) {
      // Defer: no synchronous setState in the effect body.
      const raf = requestAnimationFrame(() => setHidden(false));
      return () => cancelAnimationFrame(raf);
    }
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const scrollingDown = y > lastY;
      lastY = y;
      if (y <= 96) {
        setHidden(false);
        return;
      }
      const next = scrollingDown && y > 200;
      setHidden((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disabled]);

  return hidden;
}
