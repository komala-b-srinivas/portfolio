"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";
import HeroPipeline from "./HeroPipeline";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "3+", label: "Years Exp" },
  { value: "10+", label: "Technologies" },
];

export default function HeroSection() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? "80px" : "80px",
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: "absolute", right: "5%", top: "15%",
        width: isMobile ? "300px" : "700px",
        height: isMobile ? "300px" : "700px",
        background: "radial-gradient(circle, rgba(0,242,255,0.055) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", left: "5%", bottom: "10%",
        width: isMobile ? "200px" : "500px",
        height: isMobile ? "200px" : "500px",
        background: "radial-gradient(circle, rgba(188,19,254,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Main layout */}
      <div style={{
        maxWidth: "1700px", margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 5%",
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: "0px", position: "relative", zIndex: 2,
        paddingBottom: isMobile ? "60px" : "0",
      }}>
        {/* ── LEFT: Text content ── */}
        <div style={{
          flex: isMobile ? "none" : "0 0 44%",
          paddingRight: isMobile ? "0" : "40px",
          width: isMobile ? "100%" : undefined,
        }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
          >
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#00f2ff",
              boxShadow: "0 0 12px #00f2ff, 0 0 24px rgba(0,242,255,0.4)",
            }} />
            <span style={{
              fontSize: isMobile ? "10px" : "12px",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
            }}>
              Komala Belur Srinivas &nbsp;·&nbsp; AI Engineer &amp; MS CS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontSize: isMobile ? "clamp(38px, 11vw, 56px)" : "clamp(44px, 5.5vw, 78px)",
              fontWeight: 900, lineHeight: 1.02,
              marginBottom: "20px", letterSpacing: "-0.035em",
              color: "white",
            }}
          >
            Hi, I&apos;m<br />
            <span style={{
              color: "#00f2ff",
              textShadow: "0 0 50px rgba(0,242,255,0.45), 0 0 100px rgba(0,242,255,0.2)",
            }}>
              Komala.
            </span>
            <br />
            <span style={{ fontSize: isMobile ? "clamp(22px, 6vw, 36px)" : "clamp(26px, 3.2vw, 48px)", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.02em" }}>
              I build intelligent systems.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{
              fontSize: isMobile ? "15px" : "17px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75, marginBottom: "36px",
              maxWidth: isMobile ? "100%" : "460px", fontWeight: 400,
            }}
          >
            AI Automation Engineer based in New York. I ship production ML systems
            for healthcare, clinical AI, and real-world automation — currently
            at Rimon Health, holder of a German utility patent.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            style={{ display: "flex", gap: "12px", marginBottom: "48px", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              style={{
                padding: isMobile ? "13px 24px" : "15px 30px",
                background: "linear-gradient(135deg, #00f2ff 0%, #bc13fe 100%)",
                color: "white", borderRadius: "8px", fontWeight: 700,
                fontSize: "14px", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "10px",
                boxShadow: "0 6px 24px rgba(0,242,255,0.25)",
                transition: "all 0.3s ease", letterSpacing: "0.02em",
              }}
            >
              View My Work <span style={{ fontSize: "16px" }}>→</span>
            </a>
            <a
              href="https://github.com/komala-b-srinivas"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: isMobile ? "13px 24px" : "15px 30px",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "8px", fontWeight: 600,
                fontSize: "14px", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "10px",
                transition: "all 0.3s ease", letterSpacing: "0.02em",
              }}
            >
              GitHub ↗
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: "flex", gap: isMobile ? "32px" : "44px" }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: isMobile ? "24px" : "30px", fontWeight: 900,
                  color: "#00f2ff", letterSpacing: "-0.03em",
                  textShadow: "0 0 20px rgba(0,242,255,0.4)",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "10px", color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT / BOTTOM: 3D neural cube ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          style={{
            flex: 1,
            height: isMobile ? "280px" : isTablet ? "400px" : "500px",
            width: isMobile ? "100%" : undefined,
            position: "relative",
            minWidth: 0,
            marginTop: isMobile ? "32px" : "0",
          }}
        >
          <HeroPipeline />

        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "absolute", left: "40px", bottom: "48px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
            zIndex: 10,
          }}
        >
          <span style={{
            fontSize: "9px", letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
            writingMode: "vertical-lr",
          }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#00f2ff", boxShadow: "0 0 12px #00f2ff",
            }}
          />
        </motion.div>
      )}

      {/* Social icons — hidden on mobile (cramped on small screens) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{
            position: "absolute", right: "36px", top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "18px", zIndex: 10,
          }}
        >
          <a
            href="https://github.com/komala-b-srinivas"
            target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.3s, filter 0.3s" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#00f2ff";
              e.currentTarget.style.filter = "drop-shadow(0 0 6px #00f2ff)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.12)" }} />
          <a
            href="https://www.linkedin.com/in/komal-b-srinivas/"
            target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.3s, filter 0.3s" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#00f2ff";
              e.currentTarget.style.filter = "drop-shadow(0 0 6px #00f2ff)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.12)" }} />
          <a
            href="mailto:komalsrinivas20@gmail.com"
            style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.3s, filter 0.3s" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#00f2ff";
              e.currentTarget.style.filter = "drop-shadow(0 0 6px #00f2ff)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </motion.div>
      )}
    </section>
  );
}
