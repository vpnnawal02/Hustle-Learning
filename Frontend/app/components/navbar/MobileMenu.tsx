"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import {
  CLASSES_LINKS,
  CONTACT,
  MEGA_MENU,
  PRIMARY_LINKS,
  SIGNUP_HREF,
} from "./navbar-data";
import { useIsActivePath } from "./useActivePath";
import { ChevronDown, PhoneIcon } from "./icons";

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
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-1 py-5 text-base font-semibold text-text-primary"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div id={id} className="pb-6">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  onNavigate,
  children,
  accent = false,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
  accent?: boolean;
}) {
  const isActivePath = useIsActivePath();
  const active = isActivePath(href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`block rounded px-3.5 py-3.5 text-[15px] font-medium transition-colors hover:bg-surface active:bg-surface ${
        active
          ? "text-text-primary underline decoration-accent decoration-2 underline-offset-4"
          : accent
            ? "font-semibold text-accent"
            : "text-text-secondary"
      }`}
    >
      {children}
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

  return (
    <div
      id="mobile-menu"
      className="mobile-menu-drop absolute inset-x-0 top-full z-40 border-b border-border bg-surface min-[1200px]:hidden"
      style={{ boxShadow: "0 24px 48px rgba(20,33,61,0.16)" }}
    >
      <nav
        aria-label="Mobile"
        className="mx-auto max-h-[calc(100dvh-81px)] w-full max-w-[1380px] overflow-y-auto px-6 py-8 md:px-6"
      >
        {/* Home */}
        <Link
          href="/"
          onClick={onNavigate}
          aria-current={isActivePath("/") ? "page" : undefined}
          className="flex min-h-16 items-center border-b border-border px-1 py-5 text-base font-semibold text-text-primary transition-colors hover:bg-surface-muted active:bg-surface-muted"
        >
          <span
            className={
              isActivePath("/")
                ? "underline decoration-accent decoration-2 underline-offset-8"
                : undefined
            }
          >
            Home
          </span>
        </Link>

        {/* Study Material accordion: school, resources, exams */}
        <Section
          id="mobile-study"
          title="Study Material"
          expanded={expanded === "study"}
          onToggle={() => toggle("study")}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="px-1 text-sm font-bold text-text-primary">
                {school.heading} · Classes 6–10
              </p>
              <ul className="mt-1.5">
                {school.classes.map((c) => (
                  <li key={c.slug}>
                    <MenuLink href={c.href} onNavigate={onNavigate}>
                      {c.label}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="px-1 text-sm font-bold text-text-primary">
                {resources.heading}
              </p>
              <ul className="mt-1.5">
                {resources.links.map((link) => (
                  <li key={link.slug}>
                    <MenuLink href={link.href} onNavigate={onNavigate}>
                      {link.label}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="px-1 text-sm font-bold text-text-primary">
                {exams.heading}
              </p>
              <ul className="mt-1.5 flex flex-col gap-2.5">
                {exams.cards.map((exam) => (
                  <li
                    key={exam.slug}
                    className="rounded-lg bg-surface-muted/60 px-3.5 py-3"
                  >
                    <MenuLink
                      href={exam.href}
                      onNavigate={onNavigate}
                      accent
                    >
                      {exam.label}
                    </MenuLink>
                    <ul className="flex flex-wrap gap-1.5 px-3.5 pt-1 pb-1.5">
                      {exam.subjects.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={s.href}
                            onClick={onNavigate}
                            className="inline-flex h-10 items-center rounded border border-border bg-surface px-4 text-sm font-medium text-text-secondary"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Classes accordion */}
        <Section
          id="mobile-classes"
          title="Classes"
          expanded={expanded === "classes"}
          onToggle={() => toggle("classes")}
        >
          <ul className="flex flex-col gap-2.5">
            {CLASSES_LINKS.map((link) => {
              const linkActive = isActivePath(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={linkActive ? "page" : undefined}
                    className={`block rounded-lg px-5 py-4 text-[15px] font-medium transition-colors hover:bg-surface-muted/60 active:bg-surface ${linkActive
                      ? "bg-surface-muted/60 text-text-primary underline decoration-accent decoration-2 underline-offset-4"
                      : "bg-surface-muted/60 text-text-secondary"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        {PRIMARY_LINKS.filter((l) => l.label !== "Home").map((link) => {
          const linkActive = isActivePath(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              aria-current={linkActive ? "page" : undefined}
              className="flex min-h-16 items-center border-b border-border px-1 py-5 text-base font-semibold text-text-primary transition-colors hover:bg-surface-muted active:bg-surface-muted"
            >
              <span
                className={
                  linkActive
                    ? "underline decoration-accent decoration-2 underline-offset-8"
                    : undefined
                }
              >
                {link.label}
              </span>
            </Link>
          );
        })}

        {/* Contact + signup inside mobile menu */}
        <div className="flex flex-col gap-5 py-8">
          <a
            href={CONTACT.telHref}
            className="flex items-center gap-5 rounded-lg border border-border bg-surface-muted/60 px-6 py-5"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-surface-subtle text-text-primary">
              <PhoneIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-base font-semibold text-text-primary">
                {CONTACT.label}
              </span>
              <span className="mt-1 block text-[15px] font-medium text-text-secondary">
                {CONTACT.phoneDisplay}
              </span>
            </span>
          </a>
          <Link
            href={SIGNUP_HREF}
            onClick={onNavigate}
            className="inline-flex h-[52px] items-center justify-center rounded-lg bg-accent px-5 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Sign Up
          </Link>
          <div className="flex items-center justify-between px-1 pt-2">
            <span className="text-sm font-medium text-text-secondary">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
