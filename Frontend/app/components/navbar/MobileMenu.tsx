"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CONTACT,
  LOGIN_HREF,
  MEGA_MENU,
  MORE_MENU,
  PRIMARY_LINKS,
  SIGNUP_HREF,
} from "./navbar-data";
import { useIsActivePath } from "./useActivePath";
import { ChevronDown, ChevronRight, PhoneIcon } from "./icons";

interface Props {
  open: boolean;
  onNavigate: () => void;
}

/** Mobile accordion section wrapper */
function Section({
  id,
  title,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-4 px-4 py-3.5 text-[15px] font-bold transition-colors ${
          expanded ? "text-text-primary" : "text-text-primary"
        }`}
      >
        {title}
        <span
          aria-hidden="true"
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            expanded ? "bg-brand-navy text-brand-white" : "bg-surface-muted text-text-muted"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {expanded && (
        <div id={id} className="border-t border-border px-3 pt-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuRow({
  href,
  onNavigate,
  children,
  delay = 0,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
  delay?: number;
}) {
  const isActivePath = useIsActivePath();
  const active = isActivePath(href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      style={{ animationDelay: `${delay}ms` }}
      className={`menu-item-in flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors active:bg-surface-muted ${
        active
          ? "bg-accent/15 text-text-primary"
          : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-border-strong"}`}
        />
        {children}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
    </Link>
  );
}

export default function MobileMenu({ open, onNavigate }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const isActivePath = useIsActivePath();
  const { school, resources, exams } = MEGA_MENU;

  if (!open) return null;

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const links = PRIMARY_LINKS.filter((l) => l.label !== "Home");

  return (
    <div
      id="mobile-menu"
      className="mobile-menu-drop absolute inset-x-3 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-border bg-surface min-[1200px]:hidden"
      style={{ boxShadow: "0 24px 48px rgba(20,33,61,0.16)" }}
    >
      <nav
        aria-label="Mobile"
        className="max-h-[calc(100dvh-120px)] w-full overflow-y-auto px-3 py-3"
      >
        {/* Auth actions */}
        <div
          className="menu-item-in grid grid-cols-2 gap-2 px-1 pt-1"
          style={{ animationDelay: "0ms" }}
        >
          <Link
            href={LOGIN_HREF}
            onClick={onNavigate}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-bold text-text-primary transition-colors hover:border-text-muted"
          >
            Login
          </Link>
          <Link
            href={SIGNUP_HREF}
            onClick={onNavigate}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          {/* Home */}
          <div className="menu-item-in" style={{ animationDelay: "40ms" }}>
            <Link
              href="/"
              onClick={onNavigate}
              aria-current={isActivePath("/") ? "page" : undefined}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors active:bg-surface-muted ${
                isActivePath("/")
                  ? "bg-accent/15 text-text-primary"
                  : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${isActivePath("/") ? "bg-accent" : "bg-border-strong"}`}
                />
                Home
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
            </Link>
          </div>

          {/* Study Material accordion */}
          <div className="menu-item-in" style={{ animationDelay: "80ms" }}>
            <Section
              id="mobile-study"
              title="Study Material"
              expanded={expanded === "study"}
              onToggle={() => toggle("study")}
            >
              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-surface-muted/60 p-3.5">
                  <p className="text-[13px] font-bold text-text-primary">
                    {school.heading} · Classes 6–10
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-1.5">
                    {school.classes.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={c.href}
                          onClick={onNavigate}
                          className="flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-2 text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-surface-muted/60 p-3.5">
                  <p className="text-[13px] font-bold text-text-primary">
                    {resources.heading}
                  </p>
                  <ul className="mt-2 flex flex-col">
                    {resources.links.map((link) => (
                      <li key={link.slug}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  {exams.cards.map((exam) => (
                    <Link
                      key={exam.slug}
                      href={exam.href}
                      onClick={onNavigate}
                      className="rounded-xl bg-brand-navy px-4 py-3.5 transition-transform active:scale-[0.99]"
                    >
                      <span className="block text-sm font-bold text-brand-white">
                        {exam.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-brand-white/70">
                        {exam.subjects.map((s) => s.label).join(" · ")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {links.map((link, i) => (
            <MenuRow
              key={link.href}
              href={link.href}
              onNavigate={onNavigate}
              delay={120 + i * 40}
            >
              {link.label}
            </MenuRow>
          ))}

          {/* More accordion — every other top-level page, grouped */}
          <div
            className="menu-item-in"
            style={{ animationDelay: `${120 + links.length * 40}ms` }}
          >
            <Section
              id="mobile-more"
              title="More"
              expanded={expanded === "more"}
              onToggle={() => toggle("more")}
            >
              <div className="flex flex-col gap-3">
                {MORE_MENU.map((group) => (
                  <div
                    key={group.heading}
                    className="rounded-xl bg-surface-muted/60 p-3.5"
                  >
                    <p className="text-[13px] font-bold text-text-primary">
                      {group.heading}
                    </p>
                    <ul className="mt-1 flex flex-col">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* Contact */}
        <div className="menu-item-in px-1 pt-2 pb-1" style={{ animationDelay: `${120 + links.length * 40}ms` }}>
          <a
            href={CONTACT.telHref}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface-muted/60 px-4 py-3.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-white">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-text-primary">
                {CONTACT.label}
              </span>
              <span className="mt-0.5 block text-sm font-medium text-text-secondary">
                {CONTACT.phoneDisplay}
              </span>
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}
