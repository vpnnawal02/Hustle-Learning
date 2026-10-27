"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { STUDY_MATERIAL } from "./navbar-data";
import { ActiveBar, useIsActivePath } from "./useActivePath";
import { ChevronDown, ChevronRight } from "./icons";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: (restoreFocus?: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  routeActive?: boolean;
}

export default function StudyMaterialMenu({
  open,
  onOpen,
  onClose,
  triggerRef,
  routeActive = false,
}: Props) {
  const [activeId, setActiveId] = useState(STUDY_MATERIAL[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = STUDY_MATERIAL.find((c) => c.id === activeId) ?? STUDY_MATERIAL[0];

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, [triggerRef]);
  const isActivePath = useIsActivePath();

  // Focus first category when opened via keyboard

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) onOpen();
      requestAnimationFrame(() => categoryRefs.current[0]?.focus());
    }
  };

  const onCategoryKeyDown = (
    e: React.KeyboardEvent,
    index: number,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      categoryRefs.current[(index + 1) % STUDY_MATERIAL.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      categoryRefs.current[
        (index - 1 + STUDY_MATERIAL.length) % STUDY_MATERIAL.length
      ]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      panelRef.current
        ?.querySelector<HTMLAnchorElement>('[data-submenu="true"] a')
        ?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose(false);
      focusTrigger();
    }
  };

  return (
    <div className="relative" data-dropdown="study-material">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="study-material-panel"
        onClick={() => (open ? onClose(false) : onOpen())}
        onKeyDown={onTriggerKeyDown}
        className={`relative flex h-12 items-center gap-1.5 whitespace-nowrap rounded px-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${
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
          className="absolute left-1/2 top-[calc(100%+14px)] z-50 max-h-[calc(100dvh-7rem)] w-[640px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto rounded-xl border border-border bg-surface"
          style={{ boxShadow: "0 12px 32px rgba(20,33,61,0.12)" }}
        >
          <div className="grid grid-cols-[240px_1fr]">
            {/* Left: categories */}
            <ul
              aria-label="Categories"
              className="border-r border-border bg-surface-muted/60 p-2.5"
            >
              {STUDY_MATERIAL.map((cat, i) => {
                const isActive = cat.id === activeId;
                const catRouteActive = isActivePath(cat.href);
                return (
                  <li key={cat.id}>
                    <button
                      ref={(el) => {
                        categoryRefs.current[i] = el;
                      }}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onMouseEnter={() => setActiveId(cat.id)}
                      onFocus={() => setActiveId(cat.id)}
                      onClick={() => setActiveId(cat.id)}
                      onKeyDown={(e) => onCategoryKeyDown(e, i)}
                      className={`relative flex w-full items-center justify-between gap-2 rounded px-3 py-3 text-left text-[15px] font-semibold transition-colors duration-150 ${
                        isActive
                          ? "bg-surface-muted text-text-primary"
                          : "text-text-secondary hover:bg-surface hover:text-text-primary"
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-2 left-2.5 top-2 w-0.5 rounded-full bg-accent"
                        />
                      )}
                      <span
                        className={`pl-2 ${
                          catRouteActive
                            ? "underline decoration-accent decoration-2 underline-offset-4"
                            : ""
                        }`}
                      >
                        {cat.label}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-70" />
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* Right: submenu */}
            <div data-submenu="true" className="bg-surface p-2.5">
              <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
                {active.label}
              </p>
              <ul aria-label={`${active.label} resources`} className="flex flex-col gap-1">
                {active.children.map((item) => {
                  const itemActive = isActivePath(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        role="menuitem"
                        aria-current={itemActive ? "page" : undefined}
                        onClick={() => onClose(false)}
                        className={`flex items-center justify-between rounded px-4 py-2 text-[15px] font-medium transition-colors duration-150 hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${
                          itemActive
                            ? "text-text-primary underline decoration-accent decoration-2 underline-offset-4"
                            : "text-text-secondary"
                        }`}
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-70" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="px-2 pb-2 pt-1">
                <Link
                  href={active.href}
                  onClick={() => onClose(false)}
                  aria-current={
                    isActivePath(active.href) ? "page" : undefined
                  }
                  className={`block rounded bg-surface-muted px-4 py-3 text-center text-sm font-semibold text-text-primary transition-colors duration-150 hover:bg-surface-subtle ${
                    isActivePath(active.href)
                      ? "underline decoration-accent decoration-2 underline-offset-4"
                      : undefined
                  }`}
                >
                  {active.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
