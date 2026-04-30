"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NEURAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030385168/MC3Zr7iXaECD86HNQzfZgw/feature2-4FgghEdoj6YcAZAY4f7pAg.webp";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "3+",  label: "Years Exp" },
  { value: "10+", label: "Technologies" },
];

const HEADLINE = ["Hi There,", "I build", "intelligent", "systems."];

/* ── Word-by-word blur-in ── */
function BlurText({ words, delay = 0 }: { words: string[]; delay?: number }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span
            className="blur-word"
            style={{ animationDelay: go ? `${i * 0.1}s` : "9999s", animationPlayState: go ? "running" : "paused" }}
          >
            {w}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "90px",
        paddingBottom: "60px",
      }}
    >
      {/* Subtle ambient glow */}
      <div style={{
        position: "absolute", top: "-10%", right: "5%",
        width: "600px", height: "600px",
        background: "radial-gradient(ellipse, oklch(0.65 0.1 270 / 8%) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Two-column layout ── */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 48px",
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? "48px" : "64px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── LEFT: Text ── */}
        <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : "480px", maxWidth: "100%" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid oklch(1 0 0 / 15%)",
              background: "oklch(1 0 0 / 5%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              marginBottom: "28px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade8088" }} />
            <span style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "oklch(1 0 0 / 50%)",
            }}>
              Komala Belur Srinivas &nbsp;·&nbsp; AI Automation Engineer
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: isMobile ? "clamp(42px, 11vw, 60px)" : "clamp(52px, 5.5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
          }}>
            <BlurText words={["Hi There,"]} delay={0.1} />
            <br />
            <BlurText words={["I", "build"]} delay={0.3} />
            {" "}
            <span style={{ fontStyle: "italic" }}>
              <BlurText words={["intelligent"]} delay={0.5} />
            </span>
            <br />
            <BlurText words={["systems."]} delay={0.65} />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "oklch(1 0 0 / 72%)",
              lineHeight: 1.75,
              marginBottom: "36px",
              fontWeight: 400,
              maxWidth: "420px",
            }}
          >
            AI Automation Engineer based in New York, building end-to-end AI
            solutions for healthcare and clinical automation. Currently at Rimon Health.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "52px" }}
          >
            <a
              href="#projects"
              style={{
                padding: "13px 28px",
                borderRadius: "9999px",
                background: "oklch(1 0 0)",
                color: "oklch(0 0 0)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(0.88 0 0)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0)"}
            >
              View My Work →
            </a>

            <a
              href="https://github.com/komala-b-srinivas"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "13px 24px",
                borderRadius: "9999px",
                background: "oklch(1 0 0 / 7%)",
                color: "oklch(1 0 0 / 75%)",
                border: "1px solid oklch(1 0 0 / 18%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 12%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 32%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 7%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 18%)";
              }}
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/komal-b-srinivas/"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "13px 24px",
                borderRadius: "9999px",
                background: "oklch(1 0 0 / 7%)",
                color: "oklch(1 0 0 / 75%)",
                border: "1px solid oklch(1 0 0 / 18%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 12%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 32%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 7%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 18%)";
              }}
            >
              LinkedIn ↗
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: "flex", gap: "44px" }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: isMobile ? "28px" : "34px",
                  color: "oklch(0.78 0.28 280)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "5px",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "10px",
                  color: "oklch(1 0 0 / 58%)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Neural network image — borderless, floating ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NEURAL_IMG}
            alt="Neural network — glowing nodes connected by flowing lines"
            style={{
              width: "100%",
              height: isMobile ? "340px" : "520px",
              objectFit: "cover",
              animation: "neuralFloat 7s ease-in-out infinite",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "140px",
        background: "linear-gradient(to bottom, transparent, oklch(0 0 0))",
        pointerEvents: "none", zIndex: 0,
      }} />
    </section>
  );
}
