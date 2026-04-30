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
    <section style={{ padding: "120px 0 100px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <div className="section-badge" style={{ marginBottom: "20px" }}>
            <span className="dot" style={{ background: "oklch(0.75 0.12 200)" }} />
            Education
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            color: "oklch(1 0 0)",
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            Academic{" "}
            <span style={{ fontStyle: "italic", color: "oklch(1 0 0 / 50%)" }}>Foundations</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="glass-card" style={{ padding: "32px", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
                  <span style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: edu.current ? "#4ade80" : "oklch(1 0 0 / 25%)",
                    border: `1px solid ${edu.current ? "#4ade8040" : "oklch(1 0 0 / 12%)"}`,
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    background: edu.current ? "#4ade8010" : "transparent",
                  }}>
                    {edu.current ? "Active" : "Completed"}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "12px",
                    color: "oklch(1 0 0 / 30%)",
                    fontWeight: 400,
                  }}>
                    {edu.period}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "oklch(1 0 0)",
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}>
                  {edu.degree}
                </h3>

                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "11px",
                  color: "oklch(1 0 0 / 40%)",
                  margin: "0 0 20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {edu.focus}
                </p>

                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "14px",
                  color: "oklch(1 0 0 / 40%)",
                  margin: 0,
                  fontWeight: 400,
                }}>
                  {edu.school}
                  <span style={{ margin: "0 8px", color: "oklch(1 0 0 / 12%)" }}>/</span>
                  {edu.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
