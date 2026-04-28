"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ThreeCanvas from "./ThreeCanvas";
import HeroHUD from "./HeroHUD";

export default function NeuralScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: "120vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "var(--bg)",
        }}
      >
        {/* Atmospheric Neural Background */}
        <div style={{ position: "absolute", inset: 0, background: "var(--bg)", zIndex: 0 }} />

        {/* HUD overlay */}
        <HeroHUD scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
