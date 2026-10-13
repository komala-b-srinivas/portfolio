"use client";

import { motion } from "framer-motion";

const jobs = [
  {
    role: "AI Systems & Legal Technology Development Intern",
    company: "Law Office of Steven A. Feldman & Associates, PLLC",
    location: "New York, NY",
    period: "Jul 2026 – Present",
    current: true,
    bullets: [
      "Led discovery with the attorney, IT, and paralegals to map intake and case tracking and define AI requirements",
      "Delivered \"Intelligent Intake,\" an AI workflow with attorney approval built in, cutting intake from 15–20 minutes to under 1 minute per client; leading rollout to 2 attorneys and 4 paralegals",
      "Piloted a deadline tracker that validates 5–10 court orders a week against NYSCEF before they reach the calendar",
      "Audited data-access controls across all database schemas, identifying and fixing permission gaps to protect client data",
    ],
  },
  {
    role: "AI Automation Engineer",
    company: "Rimon Health",
    location: "New York, NY",
    period: "Apr 2026 – Present",
    current: true,
    bullets: [
      "Automated end-to-end neuropsychological report generation for OPWDD evaluations, cutting clinician report time from 2–3 hours to 30 minutes across 38 reports/week (80%+ reduction)",
      "Integrated three separate third-party APIs (Groq Whisper for transcription, LLaMA Vision for OCR, LLaMA 3.3-70B for narrative generation) into a single automated pipeline, handling each API's distinct authentication, request formatting, and response parsing",
      "Built rule-based narrative generation engines for BASC-3 (14 subscales) and Vineland-3 assessments, plus an ADOS-2 classifier mapping raw scores to DSM-5 thresholds",
      "Implemented PHI de-identification as a pre-processing layer before all LLM API calls, ensuring HIPAA-compliant handling of sensitive clinical data",
    ],
  },
  {
    role: "Marketing & Program Support Intern",
    company: "Institute of Innovation & Entrepreneurship",
    location: "Hempstead, NY",
    period: "Jul 2025 – May 2026",
    current: false,
    bullets: [
      "Managed the Empire State Development (ESD) CRM for the Entrepreneurship Assistance Center, tracking 500+ entrepreneurs and building outreach dashboards that improved data accuracy by 25%",
      "Coordinated 3 programs a month (100–150 attendees each) across stakeholders and analyzed feedback surveys in Excel to report results",
    ],
  },
  {
    role: "Data Science Intern",
    company: "ExcelR",
    location: "Bengaluru, India",
    period: "Dec 2023 – Jun 2024",
    current: false,
    bullets: [
      "Built and evaluated supervised and unsupervised ML models (Logistic Regression, Random Forest, K-Means, Decision Trees) on 10,000+ samples, improving performance 15% via feature engineering and PCA",
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
    <section id="experience" style={{ padding: "72px 0 60px", position: "relative" }}>
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
