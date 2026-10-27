import Image from "next/image";
import Link from "next/link";
import logoMarkDark from "../../assets/logo/logo-mark-dark.png";
import logoMarkLight from "../../assets/logo/logo-without-bg.png";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Hustle Learning — home"
      className="flex shrink-0 items-center gap-2.5 rounded"
    >
      <Image
        src={logoMarkDark}
        alt=""
        aria-hidden="true"
        height={52}
        priority
        className="logo-light h-12 w-auto sm:h-12"
      />
      <Image
        src={logoMarkLight}
        alt=""
        aria-hidden="true"
        height={52}
        priority
        className="logo-dark h-12 w-auto sm:h-12"
      />
      <span className="whitespace-nowrap text-2xl font-bold leading-none tracking-tight sm:text-2xl">
        <span className="text-text-primary">Hustle</span>{" "}
        <span className="text-brand-amber">Learning</span>
      </span>
    </Link>
  );
}
