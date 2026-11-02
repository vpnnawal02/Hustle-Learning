/** Canonical site identity. Override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_NAME = "Hustle Learning";
export const SITE_TAGLINE = "Learn Smart. Hustle Hard.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hustlelearning.in";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
