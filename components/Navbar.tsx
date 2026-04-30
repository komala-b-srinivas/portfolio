"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("Home");
  const [isMobile,  setIsMobile]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleNav = (label: string) => {
    setActive(label);
    setMenuOpen(false);
  };

  /* ─── Desktop ─────────────────────────────────────────────────────────── */
  if (!isMobile) return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "6px 6px 6px 8px",
        borderRadius: "9999px",
        background: scrolled ? "oklch(1 0 0 / 10%)" : "oklch(1 0 0 / 6%)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid oklch(1 0 0 / 18%)",
        transition: "background 0.3s ease",
        whiteSpace: "nowrap",
      }}
    >

      {/* Links */}
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={() => handleNav(link.label)}
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "13px",
            fontWeight: active === link.label ? 600 : 400,
            color: active === link.label ? "oklch(1 0 0)" : "oklch(1 0 0 / 50%)",
            textDecoration: "none",
            padding: "6px 13px",
            borderRadius: "9999px",
            background: active === link.label ? "oklch(1 0 0 / 12%)" : "transparent",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (active !== link.label)
              (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 85%)";
          }}
          onMouseLeave={(e) => {
            if (active !== link.label)
              (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 50%)";
          }}
        >
          {link.label}
        </a>
      ))}

      {/* CTA */}
      <a
        href="mailto:kbelursrinivas1@pride.hofstra.edu"
        style={{
          marginLeft: "6px",
          padding: "8px 20px",
          borderRadius: "9999px",
          background: "oklch(1 0 0)",
          color: "oklch(0 0 0)",
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          textDecoration: "none",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(0.88 0 0)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0)"}
      >
        Get In Touch
      </a>
    </motion.nav>
  );

  /* ─── Mobile ──────────────────────────────────────────────────────────── */
  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          right: "16px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderRadius: "16px",
          background: "oklch(0.05 0 0 / 90%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid oklch(1 0 0 / 15%)",
        }}
      >
        <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "15px", color: "oklch(1 0 0)" }}>
          Komala
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{ display: "block", width: "22px", height: "1.5px", background: "oklch(1 0 0)", borderRadius: "2px" }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            style={{ display: "block", width: "22px", height: "1.5px", background: "oklch(1 0 0)", borderRadius: "2px" }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ display: "block", width: "22px", height: "1.5px", background: "oklch(1 0 0)", borderRadius: "2px" }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "80px",
              left: "16px",
              right: "16px",
              zIndex: 999,
              borderRadius: "16px",
              background: "oklch(0.06 0 0 / 97%)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid oklch(1 0 0 / 14%)",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.label)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "oklch(1 0 0 / 75%)",
                  textDecoration: "none",
                  padding: "12px 16px",
                  borderRadius: "10px",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="mailto:kbelursrinivas1@pride.hofstra.edu"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "6px",
                padding: "12px",
                borderRadius: "10px",
                background: "oklch(1 0 0)",
                color: "oklch(0 0 0)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
