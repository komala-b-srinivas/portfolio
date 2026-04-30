"use client";

import { motion } from "framer-motion";
import HlsVideo from "./HlsVideo";

const HLS_SRC = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── HLS video background ── */}
      <HlsVideo
        src={HLS_SRC}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Top fade from black */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1,
        height: "220px",
        background: "linear-gradient(to bottom, oklch(0 0 0), transparent)",
        pointerEvents: "none",
      }} />

      {/* Bottom fade to black */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1,
        height: "220px",
        background: "linear-gradient(to top, oklch(0 0 0), transparent)",
        pointerEvents: "none",
      }} />

      {/* Slight darkening overlay for readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "oklch(0 0 0 / 45%)",
        pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "160px",
          paddingBottom: "80px",
          minHeight: "600px",
          justifyContent: "center",
        }}>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: "720px", width: "100%" }}
          >
            <div className="section-badge" style={{ marginBottom: "28px" }}>
              <span className="dot" style={{ background: "oklch(0.8 0.1 200)" }} />
              Contact
            </div>

            <h2 className="text-glass" style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
              lineHeight: 1.05,
            }}>
              Let&apos;s architect
              <br />
              <span style={{ fontStyle: "italic" }}>
                the next level.
              </span>
            </h2>

            <p style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "16px",
              color: "oklch(1 0 0 / 55%)",
              lineHeight: 1.7,
              marginBottom: "48px",
              fontWeight: 300,
              maxWidth: "520px",
              margin: "0 auto 48px",
            }}>
              I&apos;m actively looking for full-time roles in AI Automation, AI Solutions,
              or ML Engineering in New York. Feel free to reach out and let&apos;s connect.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}>
              <a
                href="mailto:komalsrinivas20@gmail.com"
                style={{
                  padding: "14px 32px",
                  borderRadius: "9999px",
                  background: "oklch(1 0 0)",
                  color: "oklch(0 0 0)",
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(0.88 0 0)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0)"}
              >
                komalsrinivas20@gmail.com
              </a>

              <a
                href="tel:2038684627"
                style={{
                  padding: "14px 32px",
                  borderRadius: "9999px",
                  background: "oklch(1 0 0 / 10%)",
                  color: "oklch(1 0 0 / 80%)",
                  border: "1px solid oklch(1 0 0 / 25%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 16%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 10%)";
                }}
              >
                +1 (203) 868-4627
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "28px", justifyContent: "center", alignItems: "center" }}>
              <a
                href="https://github.com/komala-b-srinivas"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(1 0 0 / 40%)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 40%)"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <div style={{ width: "1px", height: "20px", background: "oklch(1 0 0 / 20%)" }} />

              <a
                href="https://www.linkedin.com/in/komal-b-srinivas/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(1 0 0 / 40%)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 40%)"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 60px",
        }}>
          <div style={{
            paddingTop: "32px",
            borderTop: "1px solid oklch(1 0 0 / 8%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <span style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "12px",
              color: "oklch(1 0 0 / 25%)",
              letterSpacing: "0.08em",
              fontWeight: 400,
            }}>
              Komala Belur Srinivas &copy; 2026
            </span>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Privacy", "Terms", "Contact"].map((label) => (
                <a key={label} href="#" style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "11px",
                  color: "oklch(1 0 0 / 20%)",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 45%)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 20%)"}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
