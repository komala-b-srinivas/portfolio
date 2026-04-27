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
    <section
      id="experience"
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
            CHRONOLOGICAL EVOLUTION
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
            Experience
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, var(--accent-cyan) 0%, rgba(124, 58, 237, 0.2) 100%)",
              opacity: 0.3,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel"
                style={{ 
                  padding: "32px", 
                  position: "relative",
                  borderRadius: "20px",
                  marginLeft: "48px",
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-42px",
                    top: "38px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: job.current ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.1)",
                    border: `4px solid var(--bg)`,
                    boxShadow: job.current ? "0 0 15px var(--accent-cyan)" : "none",
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "white",
                        margin: "0 0 6px",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {job.role}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-cyan)",
                        margin: 0,
                        fontWeight: 500,
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {job.company} <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 8px" }}>|</span> {job.location}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {job.current && (
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          color: "var(--accent-cyan)",
                          border: "1px solid var(--accent-cyan)",
                          padding: "4px 10px",
                          borderRadius: "100px",
                          fontWeight: 600,
                        }}
                      >
                        LIVE
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.4)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-outfit)",
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
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.6)",
                        paddingLeft: "20px",
                        position: "relative",
                        marginBottom: "10px",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--accent-cyan)",
                          opacity: 0.4,
                        }}
                      >
                        ▹
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
