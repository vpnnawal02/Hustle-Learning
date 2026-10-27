"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import ClassesMenu from "./ClassesMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import StudyMaterialMenu from "./StudyMaterialMenu";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { CONTACT, SIGNUP_HREF } from "./navbar-data";
import { ActiveBar, useIsActivePath } from "./useActivePath";

type OpenMenu = "study" | "classes" | null;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const studyTriggerRef = useRef<HTMLButtonElement>(null);
  const classesTriggerRef = useRef<HTMLButtonElement>(null);

  const closeDesktop = useCallback((restoreFocus = false) => {
    setOpenMenu(null);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    }
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const isActivePath = useIsActivePath();
  const isHome = isActivePath("/");
  const isNews = isActivePath("/news");
  const isStore = isActivePath("/store");
  const isStudy = isActivePath("/study-material");
  const isClasses = isActivePath("/classes");

  // Outside-click dismissal + Escape for desktop dropdowns
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        if (openMenu === "study") studyTriggerRef.current?.focus();
        if (openMenu === "classes") classesTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Escape closes mobile menu; lock scroll while open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-50 border-b border-border bg-surface"
      >
        <div className="mx-auto flex h-20 w-full max-w-[1380px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5 md:px-6 min-[1280px]:gap-10">
          <Logo />

          {/* Desktop nav — single row, no wrap */}
          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 min-[1200px]:flex min-[1280px]:gap-2"
          >
            <Link
              href="/"
              aria-current={isHome ? "page" : undefined}
              className={`relative flex h-12 shrink-0 items-center rounded px-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isHome ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              Home
              {isHome && <ActiveBar />}
            </Link>
            <StudyMaterialMenu
              open={openMenu === "study"}
              onOpen={() => setOpenMenu("study")}
              onClose={() => closeDesktop()}
              triggerRef={studyTriggerRef}
              routeActive={isStudy}
            />
            <ClassesMenu
              open={openMenu === "classes"}
              onOpen={() => setOpenMenu("classes")}
              onClose={() => closeDesktop()}
              triggerRef={classesTriggerRef}
              routeActive={isClasses}
            />
            <Link
              href="/news"
              aria-current={isNews ? "page" : undefined}
              className={`relative flex h-12 shrink-0 items-center rounded px-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isNews ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              News
              {isNews && <ActiveBar />}
            </Link>
            <Link
              href="/store"
              aria-current={isStore ? "page" : undefined}
              className={`relative flex h-12 shrink-0 items-center rounded px-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isStore ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              Store
              {isStore && <ActiveBar />}
            </Link>
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden shrink-0 items-center gap-4 min-[1200px]:flex min-[1280px]:gap-6">
            <a
              href={CONTACT.telHref}
              title={`${CONTACT.label} — ${CONTACT.phoneDisplay}`}
              className="flex items-center gap-2.5 rounded px-3 py-1.5 text-left transition-colors hover:bg-surface-muted"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-text-primary"
              >
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-sm font-semibold text-text-primary">
                  {CONTACT.label}
                </span>
                <span className="block whitespace-nowrap text-[13px] font-medium text-text-secondary">
                  {CONTACT.phoneDisplay}
                </span>
              </span>
            </a>
            <Link
              href={SIGNUP_HREF}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded bg-accent px-6 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Sign Up
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile / tablet hamburger */}
        <div className="flex shrink-0 items-center gap-2 min-[1200px]:hidden">
          <Link
            href={SIGNUP_HREF}
            className="hidden h-10 items-center justify-center whitespace-nowrap rounded bg-accent px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover min-[420px]:inline-flex min-[1200px]:hidden"
            >
              Sign Up
            </Link>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-border bg-surface text-text-primary transition-colors hover:bg-surface-muted"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <MobileMenu open={mobileOpen} onNavigate={closeMobile} />
      </header>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMobile}
          className="fixed inset-0 top-20 z-40 bg-black/30 min-[1200px]:hidden"
        />
      )}
    </>
  );
}
