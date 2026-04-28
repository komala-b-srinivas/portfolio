"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const imgY = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

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
      {/* Background Visual Centerpiece */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "min(600px, 90vw)",
          height: "min(600px, 90vw)",
          opacity: useTransform(scrollYProgress, [0, 0.6], [0.7, 0]),
          scale,
          translateY: imgY,
          filter: "drop-shadow(0 0 50px rgba(0, 212, 255, 0.15))",
        }}
      >
        <Image
          src="/hero-vision.png"
          alt="Abstract Organic AI Vision"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{
          opacity,
          y,
          textAlign: "center",
          maxWidth: "1000px",
          zIndex: 20,
          position: "relative",
          padding: "0 24px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "13px",
            letterSpacing: "0.5em",
            color: "var(--accent-cyan)",
            marginBottom: "32px",
            fontFamily: "var(--font-outfit)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          AI Automation Engineer
        </motion.p>
        <h1
          style={{
            fontSize: "clamp(56px, 10vw, 120px)",
            fontWeight: 800,
            lineHeight: 0.85,
            color: "#fff",
            letterSpacing: "-0.05em",
            margin: "0 0 40px",
            fontFamily: "var(--font-outfit)",
          }}
        >
          KOMALA
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
            }}
          >
            BELUR SRINIVAS
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2.2vw, 24px)",
            color: "rgba(255, 255, 255, 0.6)",
            maxWidth: "700px",
            margin: "0 auto 64px",
            lineHeight: 1.5,
            fontWeight: 300,
            fontFamily: "var(--font-outfit)",
          }}
        >
          Architecting 
          <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}> intelligent systems </span> 
          and production-grade AI automation workflows.
        </p>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", pointerEvents: "auto" }}>
          <a
            href="#projects"
            style={{
              padding: "18px 48px",
              background: "white",
              color: "black",
              borderRadius: "100px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              padding: "18px 48px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
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
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--accent-cyan)", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>SYSTEM.ACTIVE</span>
      </motion.div>
    </div>
  );
}

