"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#about" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: isMobile ? "16px 20px" : "20px 5%",
          transition: "all 0.4s ease",
          background: scrolled || menuOpen ? "rgba(3,3,10,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
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
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => setMenuOpen(false)}
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

          {/* Desktop nav */}
          {!isMobile && (
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
                  style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00f2ff" }}
                />
              </a>
            </div>
          )}

          {/* Hamburger button — mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", display: "flex", flexDirection: "column",
                gap: "5px", alignItems: "center", justifyContent: "center",
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#00f2ff", borderRadius: "2px" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#00f2ff", borderRadius: "2px" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#00f2ff", borderRadius: "2px" }}
              />
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "68px", left: 0, right: 0, bottom: 0,
              zIndex: 999,
              background: "rgba(3,3,10,0.97)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontSize: "28px", fontWeight: 700,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: "14px 36px",
                border: "1px solid rgba(0,242,255,0.5)",
                borderRadius: "8px",
                color: "#00f2ff",
                fontSize: "14px", fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.08em",
                marginTop: "16px",
              }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
