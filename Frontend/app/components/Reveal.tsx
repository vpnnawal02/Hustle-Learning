"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "none";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for cascading entrances. */
  delay?: number;
  /** Motion pattern: up (fade+rise), left/right (directional), scale (image depth), none (opacity only). */
  variant?: RevealVariant;
}

/** Scroll-triggered entrance: fades content in the first time it scrolls into view. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Always start hidden so the server HTML and the first client paint match
  // exactly. Visibility flips only after hydration, inside async callbacks.
  // (Reduced-motion users are covered by CSS, which forces .reveal visible.)
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const variantClass =
    variant === "none"
      ? "reveal-fade"
      : variant === "up"
        ? ""
        : variant === "left"
          ? "reveal-left"
          : variant === "right"
            ? "reveal-right"
            : "reveal-scale";

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${variantClass} ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
