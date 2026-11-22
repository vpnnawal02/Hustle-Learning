"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Hero video that autoplays muted and loops. Browsers require the muted
 * property (set imperatively — React does not reliably apply it) before
 * allowing autoplay.
 *
 * Restarting is done in two stages: a fast in-place seek first, then a
 * verification pass — if the video is still parked at the end (the
 * static server can refuse seek requests), it falls back to a full
 * `load()`, which always restarts from the first frame. If everything
 * fails, a replay button appears for a manual restart.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;

    const stuckAtEnd = () =>
      Number.isFinite(video.duration) &&
      video.duration > 0 &&
      video.currentTime >= video.duration - 0.5;

    const fullReload = () => {
      try {
        video.load();
      } catch {
        /* ignore reloads that the browser rejects */
      }
      video.play().catch(() => setShowReplay(true));
    };

    const restart = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* fall through to verification below */
      }
      setShowReplay(false);
      const attempt = video.play();
      if (attempt) {
        attempt
          .then(() => {
            // The seek may have failed silently — verify and escalate.
            window.setTimeout(() => {
              if (stuckAtEnd()) fullReload();
            }, 500);
          })
          .catch(() => fullReload());
      }
    };

    const onEnded = () => restart();
    const onTimeUpdate = () => {
      if (
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime >= video.duration - 0.25
      ) {
        restart();
      }
    };
    const onPlay = () => setShowReplay(false);
    const onPause = () => {
      if (stuckAtEnd()) {
        window.setTimeout(() => {
          if (video.paused && stuckAtEnd()) setShowReplay(true);
        }, 400);
      }
    };

    video.play().catch(() => {});
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const handleReplay = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    try {
      video.currentTime = 0;
    } catch {
      /* fall through to verification below */
    }
    setShowReplay(false);
    const attempt = video.play();
    if (attempt) {
      attempt
        .then(() => {
          window.setTimeout(() => {
            if (
              video.paused &&
              Number.isFinite(video.duration) &&
              video.duration > 0 &&
              video.currentTime >= video.duration - 0.5
            ) {
              try {
                video.load();
              } catch {
                /* ignore reloads that the browser rejects */
              }
              video.play().catch(() => setShowReplay(true));
            }
          }, 500);
        })
        .catch(() => {
          try {
            video.load();
          } catch {
            /* ignore reloads that the browser rejects */
          }
          video.play().catch(() => setShowReplay(true));
        });
    }
  };

  return (
    <span className="relative block aspect-video w-full overflow-hidden rounded-md shadow-lg">
      <video
        ref={ref}
        className="block h-full w-full object-cover"
        src="/videos/drill_mode_hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Preview of a Drill Mode timed practice session"
      >
        Your browser does not support the video tag.
      </video>
      {showReplay && (
        <button
          type="button"
          onClick={handleReplay}
          aria-label="Replay video"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-brand-navy/40 transition-colors hover:bg-brand-navy/50"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg transition-transform hover:scale-105">
            <RotateCcw size={24} aria-hidden="true" />
          </span>
        </button>
      )}
    </span>
  );
}
