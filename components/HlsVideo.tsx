"use client";

import { useRef, useEffect } from "react";

interface HlsVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
}

export default function HlsVideo({
  src,
  className = "",
  style,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cleanup: (() => void) | undefined;

    if (src.includes(".m3u8")) {
      // Dynamic import to avoid SSR issues with hls.js
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) video.play().catch(() => {});
          });
          cleanup = () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari native HLS
          video.src = src;
          if (autoPlay) video.play().catch(() => {});
        }
      });
    } else {
      video.src = src;
      if (autoPlay) video.play().catch(() => {});
    }

    return () => { cleanup?.(); };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoPlay}
    />
  );
}
