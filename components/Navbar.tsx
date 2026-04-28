"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#about" },   // skills live inside AboutSkills
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: "20px 5%",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(3,3,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div style={{
        maxWidth: "1700px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {/* Logo — hex mark only */}
        <motion.a
          href="#home"
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          whileHover={{ opacity: 0.8 }}
        >
          <div style={{
            width: "36px", height: "36px",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, #00f2ff, #bc13fe)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "13px", fontWeight: 900, color: "black" }}>K</span>
          </div>
        </motion.a>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {NAV_LINKS.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              style={{
                fontSize: "12px", fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.3s ease",
              }}
              whileHover={{ color: "white" }}
            >
              {item.label}
            </motion.a>
          ))}

          {/* Contact Me button */}
          <a
            href="#contact"
            style={{
              padding: "10px 22px",
              background: "transparent",
              border: "1px solid rgba(0,242,255,0.5)",
              borderRadius: "6px",
              color: "#00f2ff",
              fontSize: "12px", fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.08em",
              display: "inline-flex", alignItems: "center", gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(0,242,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,242,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Contact Me
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#00f2ff",
              }}
            />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
