"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Contact() {
  const { isMobile } = useBreakpoint();
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "80px 0 60px" : "140px 0 100px",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "800px" }}
          >
            <p
              className="text-glow"
              style={{
                fontSize: "12px",
                letterSpacing: "0.5em",
                color: "var(--accent-cyan)",
                marginBottom: "24px",
                fontFamily: "var(--font-outfit)",
                fontWeight: 600,
              }}
            >
              INITIATE CONNECTION
            </p>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 88px)",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.03em",
                margin: "0 0 32px",
                lineHeight: 1.0,
                fontFamily: "var(--font-outfit)",
              }}
            >
              Let&apos;s architect
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0, 242, 255, 0.4)",
                  textShadow: "0 0 30px rgba(0, 242, 255, 0.1)",
                }}
              >
                the next level.
              </span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.6,
                marginBottom: "48px",
                maxWidth: "640px",
                margin: "0 auto 48px",
                fontWeight: 300,
              }}
            >
              I&apos;m actively looking for full-time roles in AI Automation, AI Solutions,
              or ML Engineering in New York. If your team ships real AI, I&apos;d love to talk.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
              <a
                href="mailto:komalsrinivas20@gmail.com"
                style={{
                  fontSize: isMobile ? "13px" : "15px",
                  color: "black",
                  backgroundColor: "white",
                  padding: isMobile ? "14px 24px" : "18px 48px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  wordBreak: "break-all",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                komalsrinivas20@gmail.com
              </a>
              <a
                href="tel:2038684627"
                style={{
                  fontSize: isMobile ? "13px" : "15px",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: isMobile ? "14px 24px" : "18px 48px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-block",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                +1 (203) 868-4627
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "32px", marginTop: "56px", justifyContent: "center", alignItems: "center" }}>
              <a
                href="https://github.com/komala-b-srinivas"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255, 255, 255, 0.4)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/komal-b-srinivas/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255, 255, 255, 0.4)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "120px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.3)",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-outfit)",
            }}
          >
            KOMALA BELUR SRINIVAS &copy; 2026
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.2)",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-outfit)",
              }}
            >
              DESIGNED FOR THE FUTURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
