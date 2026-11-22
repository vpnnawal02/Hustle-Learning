"use client";

import { useEffect, useRef } from "react";

/**
 * Hero video that always autoplays muted and restarts when it ends.
 * `muted` is set imperatively because React does not reliably apply the
 * muted property (which browsers require before allowing autoplay), and
 * the `ended` handler guarantees a replay even where `loop` stalls.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    const replay = () => {
      video.currentTime = 0;
      tryPlay();
    };
    video.addEventListener("ended", replay);
    return () => video.removeEventListener("ended", replay);
  }, []);

  return (
    <video
      ref={ref}
      className="block aspect-video w-full rounded-md object-cover shadow-lg"
      src="/videos/drill_mode_hero.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Preview of a Drill Mode timed practice session"
    >
      Your browser does not support the video tag.
    </video>
  );
}
