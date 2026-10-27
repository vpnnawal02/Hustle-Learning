"use client";

import Link from "next/link";
import { CLASSES_LINKS } from "./navbar-data";
import { ActiveBar, useIsActivePath } from "./useActivePath";
import { ChevronDown } from "./icons";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  routeActive?: boolean;
}

export default function ClassesMenu({
  open,
  onOpen,
  onClose,
  triggerRef,
  routeActive = false,
}: Props) {
  const isActivePath = useIsActivePath();
  return (
    <div className="relative" data-dropdown="classes">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="classes-panel"
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            onOpen();
          }
        }}
        className={`relative flex h-12 items-center gap-1.5 whitespace-nowrap rounded px-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${
          open
            ? "bg-surface-muted text-text-primary"
            : routeActive
              ? "text-text-primary"
              : "text-text-secondary"
        }`}
      >
        Classes
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {routeActive && !open && <ActiveBar />}
      </button>

      {open && (
        <div
          id="classes-panel"
          role="menu"
          aria-label="Classes"
          className="absolute left-0 top-[calc(100%+14px)] z-50 w-72 overflow-hidden rounded-xl border border-border bg-surface p-2.5"
          style={{ boxShadow: "0 12px 32px rgba(20,33,61,0.12)" }}
        >
          <ul>
            {CLASSES_LINKS.map((link) => {
              const linkActive = isActivePath(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    role="menuitem"
                    aria-current={linkActive ? "page" : undefined}
                    onClick={onClose}
                    className={`block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors hover:bg-surface-muted hover:text-text-primary active:bg-surface-subtle ${
                      linkActive
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
      )}
    </div>
  );
}
