"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { MEGA_MENU } from "./navbar-data";
import { ActiveBar, useIsActivePath } from "./useActivePath";
import { ChevronDown } from "./icons";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: (restoreFocus?: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  routeActive?: boolean;
}

/**
 * Premium three-column Study Material mega menu, data-driven from
 * `data/navigation.json`. Opens on hover (desktop) and on click,
 * closes on Escape / outside click (handled by Navbar).
 */
export default function StudyMaterialMenu({
  open,
  onOpen,
  onClose,
  triggerRef,
  routeActive = false,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isActivePath = useIsActivePath();
  const { school, resources, exams } = MEGA_MENU;

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, [triggerRef]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) onOpen();
      requestAnimationFrame(() =>
        panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
      );
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose(false);
      focusTrigger();
    }
  };

  return (
    <div
      className="relative"
      data-dropdown="study-material"
      onMouseEnter={onOpen}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="study-material-panel"
        onClick={() => (open ? onClose(false) : onOpen())}
        onKeyDown={onTriggerKeyDown}
        className={`relative flex h-12 items-center gap-1.5 rounded px-3 text-[15px] font-medium whitespace-nowrap transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${
          open
            ? "bg-surface-muted text-text-primary"
            : routeActive
              ? "text-text-primary"
              : "text-text-secondary"
        }`}
      >
        Study Material
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {routeActive && !open && <ActiveBar />}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="study-material-panel"
          role="menu"
          aria-label="Study Material"
          onKeyDown={onPanelKeyDown}
          className="absolute top-[calc(100%+14px)] left-1/2 z-50 max-h-[calc(100dvh-7rem)] w-[880px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto rounded-xl border border-border bg-surface"
          style={{ boxShadow: "0 12px 32px rgba(20,33,61,0.12)" }}
        >
          <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-0">
            {/* Column 1 — School Education */}
            <div className="border-r border-border p-5">
              <p className="text-sm font-bold text-text-primary">
                {school.heading}
              </p>
              <p className="mt-1 text-[13px] text-text-secondary">
                {school.subtitle}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {school.classes.map((c) => {
                  const active = isActivePath(c.href);
                  return (
                    <li key={c.slug}>
                      <Link
                        href={c.href}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        onClick={() => onClose(false)}
                        className={`flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface-muted ${
                          active
                            ? "border-accent text-text-primary"
                            : "text-text-primary"
                        }`}
                      >
                        {c.label}
                        <span aria-hidden="true" className="text-accent">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2 — Study Resources */}
            <div className="border-r border-border bg-surface-muted/50 p-5">
              <p className="text-sm font-bold text-text-primary">
                {resources.heading}
              </p>
              <p className="mt-1 text-[13px] text-text-secondary">
                {resources.subtitle}
              </p>
              <ul className="mt-3 flex flex-col">
                {resources.links.map((link) => {
                  const active = isActivePath(link.href);
                  return (
                    <li key={link.slug}>
                      <Link
                        href={link.href}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        onClick={() => onClose(false)}
                        className={`block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-surface hover:text-text-primary ${
                          active
                            ? "text-text-primary underline decoration-accent decoration-2 underline-offset-4"
                            : "text-text-secondary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3 — Competitive Exams */}
            <div className="p-5">
              <p className="text-sm font-bold text-text-primary">
                {exams.heading}
              </p>
              <p className="mt-1 text-[13px] text-text-secondary">
                {exams.subtitle}
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {exams.cards.map((exam) => {
                  const active = isActivePath(exam.href);
                  return (
                    <div
                      key={exam.slug}
                      className={`rounded-lg border p-4 transition-colors ${
                        active
                          ? "border-accent bg-surface-muted/60"
                          : "border-border bg-surface-muted/40 hover:border-accent/60"
                      }`}
                    >
                      <Link
                        href={exam.href}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        onClick={() => onClose(false)}
                        className="text-sm font-bold text-text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
                      >
                        {exam.label}
                      </Link>
                      <p className="mt-1 text-[13px] leading-snug text-text-secondary">
                        {exam.description}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {exam.subjects.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={s.href}
                              role="menuitem"
                              onClick={() => onClose(false)}
                              className="inline-flex h-8 items-center rounded border border-border bg-surface px-3 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-surface-muted/50 px-5 py-3">
            <Link
              href={school.hubHref}
              onClick={() => onClose(false)}
              className="block rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
            >
              Browse all study material →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
