"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 40px" : "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(10, 10, 15, 0.7)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.05)"
          : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "white",
          fontFamily: "var(--font-outfit)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span className="text-glow" style={{ color: "var(--accent-cyan)" }}>NEURAL</span>
        <span style={{ opacity: 0.5 }}>SYNTHESIS</span>
      </div>

      {/* Nav links */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {["Skills", "Projects", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: "14px",
              letterSpacing: "0.05em",
              color: "rgba(255, 255, 255, 0.5)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.2s",
              fontFamily: "var(--font-outfit)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "white";
              (e.target as HTMLElement).style.textShadow = "0 0 10px rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255, 255, 255, 0.5)";
              (e.target as HTMLElement).style.textShadow = "none";
            }}
          >
            {item}
          </a>
        ))}

        <div style={{ width: "1px", height: "16px", background: "rgba(255, 255, 255, 0.1)", margin: "0 8px" }} />

        <a
          href="mailto:komalsrinivas20@gmail.com"
          style={{
            fontSize: "13px",
            letterSpacing: "0.05em",
            color: "black",
            backgroundColor: "white",
            padding: "10px 24px",
            borderRadius: "100px",
            textDecoration: "none",
            fontWeight: 600,
            transition: "transform 0.2s",
            fontFamily: "var(--font-outfit)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          CONNECT
        </a>
      </div>
    </motion.nav>
  );
}
