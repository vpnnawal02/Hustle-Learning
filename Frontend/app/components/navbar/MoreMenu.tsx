"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { MORE_MENU } from "./navbar-data";
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
 * "More" dropdown — every top-level page that is not a primary nav link,
 * grouped by purpose. Opens on hover (desktop) and on click, closes on
 * Escape / outside click (handled by Navbar). Mirrors StudyMaterialMenu.
 */
export default function MoreMenu({
  open,
  onOpen,
  onClose,
  triggerRef,
  routeActive = false,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isActivePath = useIsActivePath();

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

  const closeTimer = useRef<number | null>(null);

  // Close shortly after the cursor leaves, so moving away dismisses the
  // menu — but traversing the gap between trigger and panel doesn't.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => onClose(false), 150);
  }, [onClose]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <div
      className="relative"
      data-dropdown="more"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          cancelClose();
          onClose(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="more-panel"
        onClick={() => (open ? onClose(false) : onOpen())}
        onKeyDown={onTriggerKeyDown}
        className={`relative flex h-10 items-center gap-1.5 rounded px-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${open
          ? "bg-surface-muted text-text-primary"
          : routeActive
            ? "text-text-primary"
            : "text-text-secondary"
          }`}
      >
        More
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {routeActive && !open && <ActiveBar />}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="more-panel"
          role="menu"
          aria-label="More pages"
          onKeyDown={onPanelKeyDown}
          className="absolute top-[calc(100%+24px)] left-1/2 z-50 max-h-[calc(100dvh-7rem)] w-[560px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto rounded-xl border border-border bg-surface"
          style={{ boxShadow: "0 12px 32px rgba(20,33,61,0.12)" }}
        >
          <div className="grid grid-cols-2 gap-0">
            {MORE_MENU.map((group, i) => (
              <div
                key={group.heading}
                className={`p-4 ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border" : ""}`}
              >
                <p className="text-sm font-bold text-text-primary">
                  {group.heading}
                </p>
                <ul className="mt-2 flex flex-col gap-0.5">
                  {group.links.map((link) => {
                    const active = isActivePath(link.href);
                    if (link.variant === "accent") {
                      return (
                        <li
                          key={link.href}
                          className="mt-1.5 border-t border-border pt-2.5"
                        >
                          <Link
                            href={link.href}
                            role="menuitem"
                            aria-current={active ? "page" : undefined}
                            onClick={() => onClose(false)}
                            className="flex items-center justify-center rounded-md bg-accent px-3 py-2 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                          onClick={() => onClose(false)}
                          className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${active
                            ? "bg-accent/15 text-text-primary"
                            : "text-text-secondary hover:bg-surface-muted/60 hover:text-text-primary"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
