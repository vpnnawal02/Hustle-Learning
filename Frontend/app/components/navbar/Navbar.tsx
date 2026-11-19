"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import StudyMaterialMenu from "./StudyMaterialMenu";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { CONTACT, LOGIN_HREF, SIGNUP_HREF } from "./navbar-data";
import { ActiveBar, useIsActivePath } from "./useActivePath";

type OpenMenu = "study" | null;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const studyTriggerRef = useRef<HTMLButtonElement>(null);

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
  const pathname = usePathname() ?? "/";
  const isHome = isActivePath("/");
  const isCourses = isActivePath("/courses");
  const isHomeTutor = isActivePath("/home-tuitions");
  const isNews = isActivePath("/news");
  const isPricing = isActivePath("/pricing");
  // Study section covers the whole resource platform: hub, class pages,
  // subject/resource/chapter pages, and the JEE/NEET tracks.
  const isStudy =
    isActivePath("/resources") ||
    isActivePath("/jee") ||
    isActivePath("/neet") ||
    pathname.startsWith("/class-");

  // Frosted at the very top, solid once content scrolls underneath.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const prevBody = document.body.style.overflow;
    const prevRoot = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevRoot;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-xl backdrop-saturate-150 transition-colors ${scrolled
          ? "bg-surface/85 shadow-[0_8px_24px_rgba(20,33,61,0.08)]"
          : "bg-surface/70"
          }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[var(--container-wide)] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5 md:px-6 min-[1280px]:gap-10">
          <Logo />

          {/* Desktop nav — single row, no wrap */}
          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 min-[1200px]:flex min-[1280px]:gap-2"
          >
            <Link
              href="/"
              aria-current={isHome ? "page" : undefined}
              className={`relative flex h-10 shrink-0 items-center rounded px-2.5 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isHome ? "text-text-primary" : "text-text-secondary"
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
            <Link
              href="/courses"
              aria-current={isCourses ? "page" : undefined}
              className={`relative flex h-10 shrink-0 items-center rounded px-2.5 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isCourses ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              Courses
              {isCourses && <ActiveBar />}
            </Link>
            <Link
              href="/home-tuitions"
              aria-current={isHomeTutor ? "page" : undefined}
              className={`relative flex h-10 shrink-0 items-center rounded px-2.5 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isHomeTutor ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              Home Tutor
              {isHomeTutor && <ActiveBar />}
            </Link>
            <Link
              href="/news"
              aria-current={isNews ? "page" : undefined}
              className={`relative flex h-10 shrink-0 items-center rounded px-2.5 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isNews ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              News
              {isNews && <ActiveBar />}
            </Link>
            <Link
              href="/pricing"
              aria-current={isPricing ? "page" : undefined}
              className={`relative flex h-10 shrink-0 items-center rounded px-2.5 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${isPricing ? "text-text-primary" : "text-text-secondary"
                }`}
            >
              Pricing
              {isPricing && <ActiveBar />}
            </Link>
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden shrink-0 items-center gap-4 min-[1200px]:flex min-[1280px]:gap-5">
            <a
              href={CONTACT.telHref}
              title={`${CONTACT.label} — ${CONTACT.phoneDisplay}`}
              className="flex items-center gap-2 rounded px-2 py-1 text-left transition-colors hover:bg-surface-muted"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded bg-surface-muted text-text-primary"
              >
                <PhoneIcon className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[13px] font-semibold text-text-primary">
                  {CONTACT.label}
                </span>
                <span className="block whitespace-nowrap text-xs font-medium text-text-secondary">
                  {CONTACT.phoneDisplay}
                </span>
              </span>
            </a>
            <span aria-hidden="true" className="h-8 w-px bg-border" />
            <span className="flex items-center gap-2">
              <Link
                href={LOGIN_HREF}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-brand-navy px-5 text-sm font-bold text-brand-white transition-colors hover:bg-navy-700 active:bg-[#0e1828]"
              >
                Login
              </Link>
              <Link
                href={SIGNUP_HREF}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Sign Up
              </Link>
            </span>
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
      {/* Spacer: the fixed header is out of flow — this reserves its exact
          h-20 height so page content never slides underneath it. */}
      <div aria-hidden="true" className="h-20 shrink-0" />
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
