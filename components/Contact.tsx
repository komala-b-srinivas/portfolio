"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 0 80px",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "600px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--accent-cyan)",
              marginBottom: "10px",
            }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(28px, 5vw, 60px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            Let&apos;s build
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(0, 212, 255, 0.5)",
                color: "transparent",
              }}
            >
              something smart.
            </span>
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            I&apos;m actively looking for data science, ML engineering, and AI
            research roles. If you&apos;re working on something that involves
            turning data into real-world impact, I&apos;d love to connect.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="mailto:komalsrinivas20@gmail.com"
              style={{
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: "var(--bg)",
                backgroundColor: "var(--accent-cyan)",
                padding: "14px 32px",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              komalsrinivas20@gmail.com
            </a>
            <a
              href="tel:2038684627"
              style={{
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: "var(--accent-cyan)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                padding: "14px 32px",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 212, 255, 0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 212, 255, 0.3)")
              }
            >
              (203) 868-4627
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "20px", marginTop: "28px", alignItems: "center" }}>
            <a
              href="https://github.com/komala-b-srinivas"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/komala-b-srinivas
            </a>

            <span style={{ color: "var(--border)", userSelect: "none" }}>·</span>

            <a
              href="https://www.linkedin.com/in/komal-b-srinivas/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              linkedin.com/in/komal-b-srinivas
            </a>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginTop: "16px",
            }}
          >
            Based in New York, NY · Open to remote, hybrid &amp; relocation
          </p>
        </motion.div>

        {/* Footer */}
        <div
          style={{
            marginTop: "100px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            className="font-heading"
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            Komala Belur Srinivas © 2025
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            AI/ML ENGINEER · NEW YORK, NY
          </span>
        </div>
      </div>
    </section>
  );
}
