"use client";

import { motion } from "framer-motion";

const jobs = [
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
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-card) 100%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--accent-cyan)",
              marginBottom: "10px",
            }}
          >
            PROFESSIONAL HISTORY
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
            Experience
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(180deg, var(--accent-cyan) 0%, rgba(0, 212, 255, 0.1) 100%)",
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
                style={{ paddingLeft: "40px", position: "relative" }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "4px",
                    top: "6px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    border: `2px solid ${job.current ? "var(--accent-cyan)" : "rgba(0, 212, 255, 0.35)"}`,
                    background: job.current ? "var(--accent-cyan)" : "var(--bg)",
                    boxShadow: job.current ? "0 0 12px rgba(0, 212, 255, 0.6)" : "none",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        margin: "0 0 4px",
                      }}
                    >
                      {job.role}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--accent-cyan)",
                        margin: 0,
                        opacity: 0.8,
                      }}
                    >
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {job.current && (
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "var(--accent-cyan)",
                          border: "1px solid var(--accent-cyan)",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        CURRENT
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
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
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        paddingLeft: "16px",
                        position: "relative",
                        marginBottom: "6px",
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "rgba(0, 212, 255, 0.5)",
                        }}
                      >
                        ›
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
