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
    <section style={{ padding: "160px 0", position: "relative" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <p
            className="glow-teal"
            style={{
              fontSize: "12px",
              letterSpacing: "0.4em",
              color: "var(--accent-teal)",
              marginBottom: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Knowledge Base
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            Academic <span className="text-gradient">Foundations</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="system-block"
            >
              <div
                className="glass-card"
                style={{
                  padding: "48px",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      color: edu.current ? "var(--accent-teal)" : "var(--text-muted)",
                      border: `1px solid ${edu.current ? "var(--accent-teal)" : "var(--border)"}`,
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontWeight: 800,
                    }}
                  >
                    {edu.current ? "ACTIVE MODULE" : "COMPLETED"}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>{edu.period}</span>
                </div>

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "white",
                    margin: "0 0 12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {edu.degree}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--accent-teal)", margin: "0 0 24px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {edu.focus}
                </p>
                <p style={{ fontSize: "16px", color: "var(--text-secondary)", margin: 0, fontWeight: 400 }}>
                  {edu.school} <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 8px" }}>/</span> {edu.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
