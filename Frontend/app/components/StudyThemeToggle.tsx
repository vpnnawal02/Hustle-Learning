"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_EVENT = "hustle-theme-change";

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

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function setDomTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

function applyTheme(theme: Theme) {
  setDomTheme(theme);
  try {
    localStorage.setItem("hustle-theme", theme);
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
}

function readSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem("hustle-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function StudyThemeToggle() {
  const pathname = usePathname() ?? "/";
  const studying = isStudyRoute(pathname);
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  // Enforce theme scope on every navigation.
  useEffect(() => {
    setDomTheme(studying ? readSavedTheme() : "light");
  }, [pathname, studying]);

  if (!studying) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
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
