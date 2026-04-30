"use client";

import { motion } from "framer-motion";

const jobs = [
  {
    role: "AI Automation Engineer",
    company: "Rimon Health",
    location: "New York, NY",
    period: "Apr 2026 – Present",
    current: true,
    bullets: [
      "Building an end-to-end AI-powered report writing system for neuropsychological evaluations (OPWDD), reducing clinician report time from 2–3 hours to ~30 minutes per report across 38 reports/week",
      "Designed a multimodal data pipeline integrating Groq Whisper (audio transcription), LLaMA Vision (OCR from score sheet photos), and LLaMA 3.3-70B (clinical narrative generation) to auto-populate all report sections",
      "Implemented rule-based narrative engines for BASC-3 and Vineland-3 assessments matching Q-Global clinical output language exactly; built ADOS-2 auto-classifier with DSM-5 Criteria A/B/C walkthrough",
      "Applied HIPAA-compliant PHI de-identification layer before all LLM inference; exported final reports as PDF and Word with signature blocks",
    ],
  },
  {
    role: "Marketing & Program Support Intern",
    company: "Institute of Innovation & Entrepreneurship",
    location: "Hempstead, NY",
    period: "Jul 2025 – Present",
    current: true,
    bullets: [
      "Extracted, cleaned, and analyzed program data, improving data accuracy by 25%",
      "Built Excel and Power BI dashboards tracking outreach and engagement metrics for 100+ entrepreneurs",
      "Used data insights to refine marketing strategies, increasing engagement by 18%",
    ],
  },
  {
    role: "Data Science Intern",
    company: "ExcelR",
    location: "Bengaluru, India",
    period: "Dec 2023 – Jun 2024",
    current: false,
    bullets: [
      "Developed supervised and unsupervised ML models using Python on 10,000+ real-world samples",
      "Implemented feature engineering and PCA, improving model performance by 15% and reducing complexity by 30%",
      "Designed visualizations (Matplotlib, Seaborn) to communicate insights to stakeholders",
      "Applied cross-validation and hyperparameter tuning for robust generalization",
    ],
  },
  {
    role: "Powertrain Engineer",
    company: "Team Horus (Solar EV)",
    location: "Bengaluru, India",
    period: "Jul 2021 – Apr 2023",
    current: false,
    bullets: [
      "Led powertrain system optimization, improving energy efficiency by 30%",
      "Conducted data collection and performance analysis to validate system designs",
    ],
  },
  {
    role: "R&D Intern",
    company: "ITI Limited",
    location: "Bengaluru, India",
    period: "Jul 2022 – Nov 2022",
    current: false,
    bullets: [
      "Supported R&D projects in 5G, IoT, and AI-assisted manufacturing workflows",
      "Assisted in PCB design optimization, reducing manufacturing time by 12%",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 0 100px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <div className="section-badge" style={{ marginBottom: "20px" }}>
            <span className="dot" style={{ background: "oklch(0.75 0.15 85)" }} />
            Experience
          </div>
          <h2 className="text-glass" style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            Professional{" "}
            <span style={{ fontStyle: "italic" }}>Evolution</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "0",
            top: "24px",
            bottom: 0,
            width: "1px",
            background: "linear-gradient(180deg, oklch(0.65 0.32 280) 0%, oklch(0.65 0.32 280 / 30%) 60%, transparent 100%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{ paddingLeft: "32px", position: "relative" }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "-4px",
                  top: "28px",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: job.current ? "oklch(0.78 0.28 280)" : "oklch(1 0 0 / 20%)",
                  border: job.current ? "1px solid oklch(0.65 0.32 280 / 60%)" : "1px solid oklch(1 0 0 / 30%)",
                  boxShadow: job.current ? "0 0 10px oklch(0.65 0.32 280 / 60%)" : "none",
                }} />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{ padding: "28px 32px" }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginBottom: "20px",
                  }}>
                    <div>
                      <h3 className={job.current ? "text-violet-pulse" : "text-violet-pulse-soft"} style={{
                        fontFamily: "var(--font-serif), Georgia, serif",
                        fontSize: "20px",
                        fontWeight: 400,
                        margin: "0 0 6px",
                        letterSpacing: "-0.01em",
                      }}>
                        {job.role}
                      </h3>
                      <p style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "13px",
                        color: "oklch(1 0 0 / 45%)",
                        margin: 0,
                        fontWeight: 400,
                      }}>
                        {job.company}
                        <span style={{ margin: "0 8px", color: "oklch(1 0 0 / 15%)" }}>/</span>
                        {job.location}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {job.current && (
                        <span style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#4ade80",
                          border: "1px solid #4ade8044",
                          padding: "3px 10px",
                          borderRadius: "9999px",
                          fontWeight: 600,
                          background: "#4ade8010",
                        }}>
                          Active
                        </span>
                      )}
                      <span style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "12px",
                        color: job.current ? "oklch(1 0 0 / 55%)" : "oklch(1 0 0 / 30%)",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                      }}>
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {job.bullets.map((b, idx) => (
                      <li key={idx} style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "14px",
                        color: job.current ? "oklch(1 0 0 / 75%)" : "oklch(1 0 0 / 55%)",
                        paddingLeft: "18px",
                        position: "relative",
                        lineHeight: 1.7,
                        fontWeight: 400,
                      }}>
                        <span style={{
                          position: "absolute",
                          left: 0,
                          top: "10px",
                          width: "6px",
                          height: "1px",
                          background: job.current ? "oklch(0.65 0.32 280 / 70%)" : "oklch(1 0 0 / 20%)",
                          display: "block",
                        }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
