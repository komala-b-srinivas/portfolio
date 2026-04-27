"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  // Phase 1: 0% – 35%: Identity
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.38], [0, 1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.05], [20, 0]);

  // Phase 2: 35% – 70%: Skills readout
  const phase2Opacity = useTransform(scrollYProgress, [0.33, 0.42, 0.62, 0.72], [0, 1, 1, 0]);

  // Phase 3: 70% – 100%: Call to action
  const phase3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.95, 1], [0, 1, 1, 1]);

  // Frame counter
  const frameNum = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const progressLabel = useMotionTemplate`PROGRESS: ${frameNum}%`;

  const skills = [
    { label: "LLM Integration · Prompt Engineering · NLP", value: 94 },
    { label: "AI Automation · Workflow Design", value: 92 },
    { label: "Python · Streamlit · REST APIs", value: 90 },
    { label: "Deep Learning · Multimodal AI", value: 86 },
    { label: "HIPAA · Healthcare AI · Clinical NLP", value: 83 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Corner HUD elements */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 32,
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "rgba(0, 212, 255, 0.4)",
          fontFamily: "var(--font-space-grotesk), monospace",
        }}
      >
        NEURAL_NET.INIT
      </div>
      <motion.div
        style={{
          position: "absolute",
          top: 80,
          right: 32,
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "rgba(0, 212, 255, 0.4)",
          fontFamily: "var(--font-space-grotesk), monospace",
          opacity: phase1Opacity,
        }}
      >
        <motion.span>{progressLabel}</motion.span>
      </motion.div>

      {/* ────── PHASE 1: Identity ────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "8%",
          right: "8%",
          opacity: phase1Opacity,
          y: phase1Y,
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "var(--accent-cyan)",
            marginBottom: "12px",
            fontFamily: "var(--font-space-grotesk), monospace",
          }}
        >
          AI AUTOMATION ENGINEER · NEW YORK, NY
        </p>
        <h1
          className="font-heading"
          style={{
            fontSize: "clamp(36px, 7vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "#e2e8f0",
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          Komala
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(0, 212, 255, 0.6)",
              color: "transparent",
            }}
          >
            Belur Srinivas
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(14px, 1.8vw, 18px)",
            color: "var(--text-secondary)",
            maxWidth: "480px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Building intelligent systems that transform raw data into
          trustworthy, deployable AI.
        </p>

        {/* Bottom tag row */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          {["M.S. CS · Hofstra University", "AI Automation", "Healthcare AI"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "rgba(0, 212, 255, 0.55)",
                borderLeft: "2px solid rgba(0, 212, 255, 0.3)",
                paddingLeft: "10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ────── PHASE 2: Skills readout ────── */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: "6%",
          transform: "translateY(-50%)",
          opacity: phase2Opacity,
          width: "min(320px, 38vw)",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(0, 212, 255, 0.5)",
            marginBottom: "20px",
          }}
        >
          CAPABILITY MATRIX
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {skills.map((skill) => (
            <div key={skill.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {skill.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--accent-cyan)",
                    fontFamily: "monospace",
                  }}
                >
                  {skill.value}
                </span>
              </div>
              <div
                style={{
                  height: "2px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "1px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: false }}
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))`,
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Status line */}
        <div
          style={{
            marginTop: "24px",
            padding: "10px 14px",
            border: "1px solid rgba(0, 212, 255, 0.15)",
            borderRadius: "2px",
          }}
        >
          <p style={{ fontSize: "10px", color: "rgba(0, 212, 255, 0.6)", letterSpacing: "0.12em" }}>
            SYSTEM STATUS
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-primary)", marginTop: "4px" }}>
            OPEN TO: AI AUTOMATION · SOLUTIONS · PM ROLES
          </p>
        </div>
      </motion.div>

      {/* ────── PHASE 3: Final CTA ────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: phase3Opacity,
          pointerEvents: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(0, 212, 255, 0.6)",
            marginBottom: "12px",
          }}
        >
          NETWORK FULLY ACTIVATED
        </p>
        <p
          className="font-heading"
          style={{
            fontSize: "clamp(18px, 3vw, 32px)",
            fontWeight: 600,
            color: "#e2e8f0",
            marginBottom: "28px",
            letterSpacing: "-0.01em",
          }}
        >
          Ready to build what&apos;s next.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "var(--bg)",
              backgroundColor: "var(--accent-cyan)",
              padding: "12px 28px",
              borderRadius: "2px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            VIEW PROJECTS
          </a>
          <a
            href="mailto:komalsrinivas20@gmail.com"
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "var(--accent-cyan)",
              border: "1px solid rgba(0, 212, 255, 0.35)",
              padding: "12px 28px",
              borderRadius: "2px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            GET IN TOUCH
          </a>
          <a
            href="https://github.com/komala-b-srinivas"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-cyan)",
              border: "1px solid rgba(0, 212, 255, 0.35)",
              padding: "12px 16px",
              borderRadius: "2px",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/komal-b-srinivas/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-cyan)",
              border: "1px solid rgba(0, 212, 255, 0.35)",
              padding: "12px 16px",
              borderRadius: "2px",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Scan line effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 212, 255, 0.01) 3px, rgba(0, 212, 255, 0.01) 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
