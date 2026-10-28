import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-text-secondary md:px-6">
        <p>
          Hustle Learning — Learn Smart, Hustle Hard. Study material, online
          classes, home tutors, and books for school students.
        </p>
        <nav aria-label="Legal" className="flex items-center gap-4">
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-text-primary"
          >
            Terms of Use
          </Link>
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-text-primary"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
