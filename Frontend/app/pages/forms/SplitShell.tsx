import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import logoLight from "../../assets/logo/logo-without-bg.png";

/**
 * Shared two-box form shell (same principles as /login): navy brand
 * panel on the left (desktop only), light form column on the right.
 * Mobile shows only the form.
 */
export default function SplitShell({
  headline,
  copy,
  image,
  imageAlt,
  children,
  below,
}: {
  headline: string;
  copy: string;
  image: StaticImageData;
  imageAlt: string;
  children: React.ReactNode;
  below?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100svh_-_5rem)] flex-col overflow-hidden bg-background text-text-primary">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-accent/[0.08] blur-3xl" />
        <span className="absolute top-1/4 -right-28 h-96 w-96 rounded-full bg-[#2B3A8F]/[0.06] blur-3xl" />
        <span className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#E9EAFB] blur-3xl" />
      </div>
      <main className="relative flex w-full flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
        <div className="m-auto grid w-full overflow-hidden lg:h-[calc(100svh_-_5rem_-_6rem)] lg:w-[62%] lg:flex-none lg:grid-cols-[46%_54%] lg:rounded-sm lg:border lg:border-black/10 lg:shadow-[0_24px_64px_-24px_rgba(20,33,61,0.25)]">
          {/* Brand panel — desktop only */}
          <div className="hidden flex-col justify-between overflow-hidden bg-brand-navy p-8 lg:flex xl:px-10">
            <Link
              href="/"
              aria-label="Hustle Learning — home"
              className="flex items-center gap-2.5"
            >
              <Image
                src={logoLight}
                alt=""
                aria-hidden="true"
                height={44}
                priority
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight whitespace-nowrap">
                <span className="text-brand-white">Hustle</span>{" "}
                <span className="text-brand-amber">Learning</span>
              </span>
            </Link>
            <div className="mt-8">
              <p className="max-w-[16ch] text-3xl leading-[1.08] font-medium text-brand-white xl:text-4xl">
                {headline}
              </p>
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-brand-white/70">
                {copy}
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-md bg-white">
              <span className="relative block aspect-[16/10] w-full">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="480px"
                  loading="lazy"
                  className="object-cover object-center"
                />
              </span>
            </div>
            <p className="mt-8 text-xl leading-snug font-bold text-brand-white sm:text-2xl">
              Learn Smart. Hustle Hard.
            </p>
          </div>

          {/* Form column — the only thing on mobile */}
          <div className="flex flex-col bg-[#F5F4FA] px-4 py-8 sm:px-8 md:py-10 lg:min-h-0 lg:overflow-y-auto lg:py-6">
            <div className="m-auto w-full max-w-[480px]">{children}</div>
          </div>
        </div>
        {below && (
          <div className="relative mx-auto w-full px-4 pt-8 pb-10 sm:px-6 md:pb-14 lg:w-[62%] lg:px-0 lg:pt-10">
            {below}
          </div>
        )}
      </main>
    </div>
  );
}
