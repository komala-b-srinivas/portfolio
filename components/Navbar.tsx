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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "24px 8%",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(3, 3, 5, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <motion.div
          style={{
            fontSize: "20px",
            fontWeight: 900,
            color: "white",
            letterSpacing: "0.2em",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ width: "8px", height: "8px", background: "var(--accent-teal)", borderRadius: "50%", boxShadow: "0 0 10px var(--accent-teal)" }} />
          KOMALA
        </motion.div>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {["Skills", "Projects", "Experience", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-muted)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                transition: "color 0.3s ease",
              }}
              whileHover={{ color: "white" }}
            >
              {item}
            </motion.a>
          ))}
          <a
            href="#contact"
            style={{
              padding: "10px 24px",
              border: "1px solid var(--accent-teal)",
              borderRadius: "4px",
              color: "var(--accent-teal)",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--accent-teal)";
              e.currentTarget.style.color = "black";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--accent-teal)";
            }}
          >
            Terminal_Access
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
