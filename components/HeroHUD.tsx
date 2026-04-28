"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [0, 5]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.05) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      
      {/* 3D NEURAL CENTERPIECE */}
      <motion.div
        style={{
          position: "absolute",
          width: "min(800px, 120vw)",
          height: "min(800px, 120vw)",
          opacity: 0.6,
          scale,
          rotateX,
          zIndex: 2,
          filter: "brightness(0.8) contrast(1.2)",
        }}
      >
        <Image
          src="/hero-neural.png"
          alt="Isometric Neural Architecture"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </motion.div>

      {/* HERO CONTENT */}
      <motion.div
        style={{
          opacity,
          textAlign: "center",
          maxWidth: "1100px",
          zIndex: 10,
          position: "relative",
          padding: "0 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.6em",
              color: "var(--accent-cyan)",
              marginBottom: "40px",
              fontFamily: "var(--font-outfit)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            AI Automation Engineer
          </p>
          <h1
            style={{
              fontSize: "clamp(64px, 12vw, 160px)",
              fontWeight: 900,
              lineHeight: 0.8,
              color: "#fff",
              letterSpacing: "-0.06em",
              margin: "0 0 48px",
              fontFamily: "var(--font-outfit)",
              textTransform: "uppercase",
            }}
          >
            KOMALA
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
              }}
            >
              BELUR SRINIVAS
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255, 255, 255, 0.4)",
              maxWidth: "700px",
              margin: "0 auto 80px",
              lineHeight: 1.6,
              fontWeight: 400,
              fontFamily: "var(--font-outfit)",
              letterSpacing: "0.02em",
            }}
          >
            Architecting <span className="text-glow" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>intelligent systems</span> and production-grade
            <br />
            AI automation workflows.
          </p>

          <div style={{ display: "flex", gap: "32px", justifyContent: "center", pointerEvents: "auto" }}>
            <a
              href="#projects"
              className="block-3d"
              style={{
                padding: "20px 56px",
                background: "white",
                color: "black",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "var(--font-outfit)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="block-3d"
              style={{
                padding: "20px 56px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "var(--font-outfit)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </motion.div>
      
      {/* SYSTEM STATUS FOOTER */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          opacity: 0.3,
        }}
      >
        <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "var(--accent-cyan)", fontFamily: "var(--font-outfit)", fontWeight: 700 }}>
          SYSTEM.ACTIVE
        </span>
        <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }} />
      </motion.div>
    </div>
  );
}

