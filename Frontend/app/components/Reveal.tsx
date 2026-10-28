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

function shouldShowImmediately(): boolean {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll-triggered entrance: fades content in the first time it scrolls into view. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(shouldShowImmediately);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
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
  }, [visible]);

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
