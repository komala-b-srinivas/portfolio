"use client";
import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width < 1024,
  };
}
