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
    <section id="experience" style={{ padding: "160px 0", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px", textAlign: "right" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px", justifyContent: "flex-end" }}>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.4em",
                color: "var(--accent-teal)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Operational Logs
            </p>
            <div style={{ width: "40px", height: "1px", background: "var(--accent-teal)" }} />
          </div>
          <h2
            style={{
              fontSize: "clamp(40px, 4vw, 64px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            Professional <span className="text-gradient">Evolution</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "4px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, var(--accent-teal) 0%, transparent 100%)",
              opacity: 0.2,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="system-block"
              >
                <div
                  className="glass-card"
                  style={{ 
                    padding: "48px", 
                    position: "relative",
                    marginLeft: "40px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-36px",
                      top: "54px",
                      width: "36px",
                      height: "1px",
                      background: job.current ? "var(--accent-teal)" : "rgba(255,255,255,0.1)",
                      opacity: 0.4,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "24px",
                      marginBottom: "32px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "white",
                          margin: "0 0 8px",
                          textTransform: "uppercase",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {job.role}
                      </h3>
                      <p
                        className="glow-teal"
                        style={{
                          fontSize: "14px",
                          color: "var(--accent-teal)",
                          margin: 0,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {job.company} <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 12px" }}>/</span> {job.location}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {job.current && (
                        <span
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            color: "var(--accent-teal)",
                            border: "1px solid var(--accent-teal)",
                            padding: "4px 12px",
                            borderRadius: "2px",
                            fontWeight: 800,
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          whiteSpace: "nowrap",
                          fontWeight: 500,
                        }}
                      >
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {job.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "15px",
                          color: "var(--text-secondary)",
                          paddingLeft: "24px",
                          position: "relative",
                          marginBottom: "12px",
                          lineHeight: 1.7,
                          fontWeight: 400,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "12px",
                            width: "8px",
                            height: "1px",
                            background: "var(--accent-teal)",
                            opacity: 0.3,
                          }}
                        />
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
