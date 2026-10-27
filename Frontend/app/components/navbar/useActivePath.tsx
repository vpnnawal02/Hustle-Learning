"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * Route-aware active-path matcher.
 * - "/" matches exactly (otherwise every route would highlight Home).
 * - All other hrefs match exactly or as a path prefix
 *   (e.g. "/study-material" is active for "/study-material/cbse/notes").
 */
export function useIsActivePath() {
  const pathname = usePathname() ?? "/";
  return useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );
}

/** Amber underline bar used to mark the active top-level nav item. */
export function ActiveBar({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent ${className}`}
    />
  );
}
