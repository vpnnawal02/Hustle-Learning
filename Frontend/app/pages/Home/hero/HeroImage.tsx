import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  eager: boolean;
}

/**
 * Large cutout image that fills the free space beside the copy.
 * Transparency preserved, natural proportions, no added background.
 */
export default function HeroImage({ src, alt, eager }: Props) {
  return (
    <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px] lg:h-[440px] xl:h-[480px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 90vw, 560px"
        priority={eager}
        loading={eager ? undefined : "lazy"}
        className="object-contain object-center"
      />
    </div>
  );
}
