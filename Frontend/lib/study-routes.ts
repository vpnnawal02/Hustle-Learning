/**
 * Study routes — the resource platform where reading space matters:
 * study material hubs, class/subject/resource/chapter pages, discovery
 * pages, search, and the JEE/NEET tracks.
 */
export function isStudyRoute(pathname: string): boolean {
  return (
    /^\/(resources|materials|subjects|search|jee|neet)(\/|$)/.test(pathname) ||
    /^\/class-\d+(\/|$)/.test(pathname)
  );
}
