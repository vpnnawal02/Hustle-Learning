"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Locks every page navigation to exactly scroll-top.
 *
 * The site uses `scroll-behavior: smooth` for in-page anchors, but that
 * also turns the router's scroll-to-top into an animation — and concurrent
 * layout shifts (font swaps, entrance motion, images) can leave it landing
 * a few pixels short. This forces an instant top scroll on pathname
 * changes while leaving hash/anchor navigation untouched.
 */
export default function RouteScrollTop() {
  const pathname = usePathname() ?? "/";
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    el.style.scrollBehavior = prev;
  }, [pathname]);

  return null;
}
