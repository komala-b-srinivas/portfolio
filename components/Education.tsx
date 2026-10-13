"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "M.S. Computer Science (AI)",
    focus: "Artificial Intelligence",
    school: "Hofstra University",
    location: "Hempstead, NY",
    period: "Aug 2024 – May 2026",
    current: false,
  },
  {
    degree: "B.E. Electronics & Communication Engineering",
    focus: "Electronics & Communication",
    school: "Nitte Meenakshi Institute of Technology",
    location: "Bengaluru, India",
    period: "Aug 2019 – Nov 2023",
    current: false,
  },
];

const certifications = [
  { title: "Foundations of GMP", issuer: "USP", year: "2026" },
  { title: "Cyber Security Consulting", issuer: "PwC via Forage", year: "2026" },
  { title: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { title: "GenAI Powered Data Analytics", issuer: "Tata via Forage", year: "2025" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte Australia via Forage", year: "2025" },
  { title: "Data Science Job Simulation", issuer: "British Airways via Forage", year: "2025" },
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
                    color: "oklch(1 0 0 / 25%)",
                    border: "1px solid oklch(1 0 0 / 12%)",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    background: "transparent",
                  }}>
                    Completed
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

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: "60px" }}
        >
          <div className="section-badge" style={{ marginBottom: "24px" }}>
            <span className="dot" style={{ background: "oklch(0.75 0.15 60)" }} />
            Certifications
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card"
                style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "13px",
                  color: "oklch(1 0 0 / 85%)",
                  fontWeight: 500,
                }}>
                  {cert.title}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "11px",
                    color: "oklch(1 0 0 / 40%)",
                    fontWeight: 400,
                  }}>
                    {cert.issuer}
                  </span>
                  <span style={{ color: "oklch(1 0 0 / 15%)", fontSize: "10px" }}>·</span>
                  <span style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "11px",
                    color: "oklch(0.78 0.15 60)",
                    fontWeight: 600,
                  }}>
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
