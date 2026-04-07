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
        padding: "100px 0",
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
          style={{ marginBottom: "56px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--accent-cyan)",
              marginBottom: "10px",
            }}
          >
            ACADEMIC BACKGROUND
          </p>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Education
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "36px",
                border: `1px solid ${edu.current ? "rgba(0, 212, 255, 0.2)" : "var(--border)"}`,
                background: "var(--bg-card)",
                borderRadius: "2px",
                position: "relative",
              }}
            >
              {edu.current && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))",
                  }}
                />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: edu.current ? "var(--accent-cyan)" : "var(--text-muted)",
                    border: `1px solid ${edu.current ? "var(--accent-cyan)" : "var(--border)"}`,
                    padding: "3px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {edu.current ? "IN PROGRESS" : "COMPLETED"}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{edu.period}</span>
              </div>

              <h3
                className="font-heading"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: "0 0 4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {edu.degree}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--accent-cyan)", margin: "0 0 12px", opacity: 0.8 }}>
                {edu.focus}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                {edu.school} · {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
