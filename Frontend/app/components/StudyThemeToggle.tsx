"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Theme control that exists ONLY on study routes (resources, materials,
 * subjects, search, class study pages, JEE/NEET tracks). Everywhere else
 * the site is forced to the light theme.
 *
 * Mounted once in the root layout: besides rendering the floating toggle
 * on study pages, it resets the theme to light whenever the user
 * navigates away from a study route.
 */
export function isStudyRoute(pathname: string): boolean {
  return /^\/(resources|materials|subjects|search|jee|neet)(\/|$)/.test(
    pathname,
  ) || /^\/class-\d+(\/|$)/.test(pathname);
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("hustle-theme", theme);
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
}

export default function StudyThemeToggle() {
  const pathname = usePathname() ?? "/";
  const studying = isStudyRoute(pathname);
  const [theme, setTheme] = useState<Theme>("light");

  // Enforce theme scope on every navigation.
  useEffect(() => {
    if (!isStudyRoute(pathname)) {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
      return;
    }
    let saved: Theme = "light";
    try {
      saved = localStorage.getItem("hustle-theme") === "dark" ? "dark" : "light";
    } catch {
      // Ignore storage errors.
    }
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }, [pathname]);

  if (!studying) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = readTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="fixed bottom-24 left-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-lg transition-colors hover:border-accent md:bottom-8 md:left-8"
    >
      {isDark ? (
        <Moon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
