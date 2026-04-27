"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "M.S. Computer Science",
    focus: "AI Specialization",
    school: "Hofstra University",
    location: "New York, USA",
    period: "Expected May 2026",
    current: true,
  },
  {
    degree: "B.Tech Electronics & Communication",
    focus: "Electronics and Communication Engineering",
    school: "Nitte Meenakshi Institute of Technology",
    location: "Bengaluru, India",
    period: "August 2023",
    current: false,
  },
];

export default function Education() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px", textAlign: "center" }}
        >
          <p
            className="text-glow"
            style={{
              fontSize: "12px",
              letterSpacing: "0.4em",
              color: "var(--accent-cyan)",
              marginBottom: "16px",
              fontFamily: "var(--font-outfit)",
              fontWeight: 500,
            }}
          >
            FOUNDATIONAL INTELLIGENCE
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              margin: 0,
              fontFamily: "var(--font-outfit)",
            }}
          >
            Education
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel"
              style={{
                padding: "40px",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {edu.current && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))",
                    boxShadow: "0 0 15px var(--accent-cyan)",
                  }}
                />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: edu.current ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.4)",
                    border: `1px solid ${edu.current ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.1)"}`,
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontWeight: 600,
                  }}
                >
                  {edu.current ? "SYNTHESIZING" : "ARCHIVED"}
                </span>
                <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)", fontFamily: "var(--font-outfit)" }}>{edu.period}</span>
              </div>

              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "white",
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {edu.degree}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--accent-cyan)", margin: "0 0 16px", fontWeight: 500, fontFamily: "var(--font-outfit)" }}>
                {edu.focus}
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", margin: 0, fontWeight: 300 }}>
                {edu.school} <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 4px" }}>•</span> {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
