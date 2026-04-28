"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

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
        padding: "0 40px",
      }}
    >
      {/* Subtle Spotlight Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.03) 0%, transparent 50%)",
          opacity: 0.8,
        }}
      />

      <motion.div
        style={{
          opacity,
          y,
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "14px",
            letterSpacing: "0.4em",
            color: "var(--accent-cyan)",
            marginBottom: "24px",
            fontFamily: "var(--font-outfit)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          AI Automation Engineer
        </motion.p>
        <h1
          style={{
            fontSize: "clamp(48px, 9vw, 110px)",
            fontWeight: 800,
            lineHeight: 0.9,
            color: "#fff",
            letterSpacing: "-0.04em",
            margin: "0 0 32px",
            fontFamily: "var(--font-outfit)",
          }}
        >
          KOMALA
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
            }}
          >
            BELUR SRINIVAS
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            color: "rgba(255, 255, 255, 0.6)",
            maxWidth: "700px",
            margin: "0 auto 48px",
            lineHeight: 1.6,
            fontWeight: 300,
            fontFamily: "var(--font-outfit)",
          }}
        >
          Optimizing human potential through 
          <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}> intelligent systems </span> 
          and production-ready AI automation.
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", pointerEvents: "auto" }}>
          <a
            href="#projects"
            style={{
              padding: "16px 40px",
              background: "white",
              color: "black",
              borderRadius: "100px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              padding: "16px 40px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }} />
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--accent-cyan)", fontFamily: "var(--font-outfit)" }}>SCROLL</span>
      </motion.div>
    </div>
  );
}

