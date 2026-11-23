"use client";

import Link from "next/link";
import { useState } from "react";
import { LOGIN_HREF, MEGA_MENU, MORE_MENU, SIGNUP_HREF } from "./navbar-data";
import { useIsActivePath } from "./useActivePath";
import { ChevronDown, CloseIcon } from "./icons";
import Logo from "./Logo";

interface Props {
  open: boolean;
  onNavigate: () => void;
}

/** Plain primary row, e.g. Home / Drill Mode / Pricing */
function PrimaryRow({
  href,
  label,
  onNavigate,
  delay = 0,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  delay?: number;
}) {
  const isActivePath = useIsActivePath();
  const active = isActivePath(href);
  return (
    <div className="menu-item-in" style={{ animationDelay: `${delay}ms` }}>
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={`flex w-full items-center justify-between px-2 py-3 text-[15px] transition-colors ${
          active
            ? "font-semibold text-text-primary"
            : "font-medium text-text-primary"
        }`}
      >
        {label}
      </Link>
    </div>
  );
}

/** Expandable primary row, e.g. Courses / Study Material */
function ExpandableRow({
  id,
  title,
  expanded,
  onToggle,
  delay = 0,
  children,
}: {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="menu-item-in" style={{ animationDelay: `${delay}ms` }}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between px-2 py-3 text-[15px] font-medium text-text-primary"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div id={id} className="flex flex-col gap-0.5 pr-2 pb-3 pl-2">
          {children}
        </div>
      )}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pt-3 text-[11px] font-bold tracking-wider text-text-muted uppercase">
      {children}
    </p>
  );
}

function SubLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block rounded-lg px-2 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="block py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        {children}
      </Link>
    </li>
  );
}

export default function MobileMenu({ open, onNavigate }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { school, resources, exams } = MEGA_MENU;

  if (!open) return null;

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const coursesLinks =
    MORE_MENU.find((group) => group.heading === "Courses & Practice")
      ?.links ?? [];
  const exploreLinks =
    MORE_MENU.find((group) => group.heading === "Explore")?.links ?? [];
  const tutoringLinks =
    MORE_MENU.find((group) => group.heading === "Tutoring")?.links ?? [];

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="mobile-menu-drop fixed inset-0 z-[60] flex min-h-dvh flex-col bg-surface min-[1200px]:hidden"
      style={{
        boxShadow: "0 24px 48px rgba(20,33,61,0.16)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* Top bar — mirrors the navbar height with logo + close */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 md:px-6">
        <Logo />
        <button
          type="button"
          onClick={onNavigate}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-border bg-surface text-text-primary transition-colors hover:bg-surface-muted"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Scrollable middle: main links stay at the top, secondary
          links are pushed to the bottom of the screen. */}
      <nav
        aria-label="Mobile"
        className="flex w-full flex-1 flex-col overflow-y-auto px-4 pb-4 md:px-6"
      >
        {/* Main links */}
        <div>
        <PrimaryRow href="/" label="Home" onNavigate={onNavigate} delay={40} />

        <ExpandableRow
          id="mobile-courses"
          title="Courses"
          expanded={expanded === "courses"}
          onToggle={() => toggle("courses")}
          delay={80}
        >
          <SubLink href="/courses" onNavigate={onNavigate}>
            All Courses
          </SubLink>
          {coursesLinks.map((link) => (
            <SubLink
              key={link.href}
              href={link.href}
              onNavigate={onNavigate}
            >
              {link.label}
            </SubLink>
          ))}
        </ExpandableRow>

        <ExpandableRow
          id="mobile-study"
          title="Study Material"
          expanded={expanded === "study"}
          onToggle={() => toggle("study")}
          delay={120}
        >
          <SubLink href={school.hubHref} onNavigate={onNavigate}>
            All Study Material
          </SubLink>
          <SubHeading>{school.heading} · Classes 6–10</SubHeading>
          {school.classes.map((c) => (
            <SubLink key={c.slug} href={c.href} onNavigate={onNavigate}>
              {c.label}
            </SubLink>
          ))}
          <SubHeading>{resources.heading}</SubHeading>
          {resources.links.map((link) => (
            <SubLink key={link.slug} href={link.href} onNavigate={onNavigate}>
              {link.label}
            </SubLink>
          ))}
          <SubHeading>{exams.heading}</SubHeading>
          {exams.cards.map((exam) => (
            <SubLink key={exam.slug} href={exam.href} onNavigate={onNavigate}>
              {exam.label}
            </SubLink>
          ))}
        </ExpandableRow>

        <PrimaryRow
          href="/drill-mode"
          label="Drill Mode"
          onNavigate={onNavigate}
          delay={160}
        />
        <PrimaryRow
          href="/pricing"
          label="Pricing"
          onNavigate={onNavigate}
          delay={200}
        />
        </div>

        {/* Secondary two-column links — pinned to the bottom */}
        <div
          className="menu-item-in mt-auto px-2 pt-3"
          style={{ animationDelay: "240ms" }}
        >
          <div className="border-t border-border">
            <div className="grid grid-cols-2 gap-x-6 py-3">
            <ul className="flex min-w-0 flex-col">
              {exploreLinks.map((link) => (
                <SecondaryLink
                  key={link.href}
                  href={link.href}
                  onNavigate={onNavigate}
                >
                  {link.label}
                </SecondaryLink>
              ))}
            </ul>
            <ul className="flex min-w-0 flex-col">
              {tutoringLinks.map((link) => (
                <SecondaryLink
                  key={link.href}
                  href={link.href}
                  onNavigate={onNavigate}
                >
                  {link.label}
                </SecondaryLink>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Pinned actions */}
      <div
        className="menu-item-in flex shrink-0 flex-col gap-2 px-6 pt-2 md:px-8"
        style={{
          animationDelay: "280ms",
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        }}
      >
        <Link
          href={LOGIN_HREF}
          onClick={onNavigate}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-navy px-4 text-[15px] font-semibold text-brand-white transition-transform active:scale-[0.99]"
        >
          Login
        </Link>
        <Link
          href={SIGNUP_HREF}
          onClick={onNavigate}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-4 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
