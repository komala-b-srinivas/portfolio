"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Alive Human Detection During Disasters",
    subtitle: "Autonomous Rescue Robot System",
    status: "PATENTED",
    statusColor: "#f59e0b",
    period: "May 2022 – June 2023",
    patent: {
      number: "DE 20 2025 106 621",
      office: "Deutsches Patent- und Markenamt (DPMA), Munich",
      registered: "12 March 2026",
      link: "https://register.dpma.de/DPMAregister/pat/register?AKZ=2020251066211&CURSOR=0",
    },
    description:
      "Autonomous rescue robot system for detecting living humans in disaster zones using multi-sensor fusion. Granted as a German utility patent (Gebrauchsmuster) by the Deutsches Patent- und Markenamt in March 2026.",
    tags: ["Raspberry Pi 4", "Arduino Uno", "Doppler Radar", "Ultrasonic Sensors", "Computer Vision", "Robotics"],
    highlights: [
      "Built autonomous rescue robot using Raspberry Pi 4 and Arduino Uno with multi-sensor integration",
      "Implemented human and gas detection via Doppler radar, ultrasonic, and camera sensors — 83% accuracy",
      "Awarded German utility patent No. 20 2025 106 621 by DPMA, Munich (registered 12.03.2026)",
    ],
  },
  {
    id: "02",
    title: "EmPath",
    subtitle: "Multimodal Pain Detection System",
    status: "ONGOING",
    statusColor: "#00d4ff",
    period: null,
    patent: null,
    description:
      "Stacked ensemble multimodal system detecting pain intensity in non-verbal patients using biosignal and facial landmark fusion. Achieved 65.3% accuracy, AUC-ROC 0.719, F1 0.653 on BioVid dataset — outperforming Werner et al. (2014) multimodal baseline of 60.5% on a harder task.",
    tags: ["PyTorch", "Random Forest", "XGBoost", "MediaPipe", "SHAP", "MAML", "Streamlit", "Healthcare AI"],
    highlights: [
      "Stacked ensemble fusion of Random Forest on 35 biosignal features (HRV, entropy, GSR) + 22 facial landmarks via MediaPipe FaceMesh — 65.3% accuracy, AUC-ROC 0.719, F1 0.653 (LOSO, 67 subjects)",
      "Evaluated 20+ model configs across 6 classifiers and 4 fusion strategies; benchmarked against PainFormer (10.9M samples) and BIOT (NeurIPS 2023) — RF outperformed foundation models on limited medical data",
      "Implemented MAML meta-learning, CORAL ordinal regression, and cross-modal attention fusion in PyTorch",
      "Deployed live Streamlit app with real-time prediction, SHAP plots, ROC curve, and per-subject accuracy heatmap; pre-generated 2,680 biosignal visualizations for cloud deployment",
    ],
  },
  {
    id: "03",
    title: "ER Triage AI",
    subtitle: "AI-Assisted Touchless Triage System",
    status: "AUG 2025",
    statusColor: "rgba(0, 212, 255, 0.45)",
    period: null,
    patent: null,
    description:
      "Hybrid AI + rule-based clinical decision support system for emergency department triage. Achieved up to 64% accuracy and near 100% recall for critical cases using a human-in-the-loop design with mandatory nurse validation.",
    tags: ["XGBoost", "SHAP", "Streamlit", "Clinical ML", "Rule-Based AI", "Human-in-the-Loop"],
    highlights: [
      "Built and compared Logistic Regression, Decision Tree, and XGBoost models — up to 64% accuracy and near 100% recall for critical cases",
      "Engineered clinical features (Shock Index, Hypoxia, Fever flags) and safety-rule overrides (SBP < 90, SpO₂ < 90) to prevent under-triage",
      "Integrated SHAP explainability for clinician-interpretable predictions; built Streamlit interface with nurse override workflow",
      "Applied adversarial testing, bias monitoring, and drift detection under a clinical safety engineering framework",
    ],
  },
  {
    id: "04",
    title: "TradingML",
    subtitle: "Production ML System for Systematic Trading",
    status: "OCT 2025",
    statusColor: "rgba(0, 212, 255, 0.45)",
    period: null,
    patent: null,
    description:
      "End-to-end ML pipeline trained on 26 years of multi-factor financial data to predict forward stock returns, with rigorous data-leakage prevention and strategy evaluation.",
    tags: ["Walk-Forward Validation", "SHAP", "Sharpe Ratio", "Factor Models", "Python"],
    highlights: [
      "Prevented data leakage through walk-forward validation and robust preprocessing",
      "Evaluated using IC, Sharpe ratio, and maximum drawdown metrics",
      "Interpreted model behavior via cumulative P&L and SHAP analysis",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
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
            SELECTED WORK
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
            Projects &amp; Patents
          </h2>
        </motion.div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <div
                style={{
                  padding: "36px 40px",
                  border: `1px solid ${project.patent ? "rgba(245, 158, 11, 0.15)" : "var(--border)"}`,
                  background: "var(--bg-card)",
                  cursor: "default",
                  transition: "border-color 0.25s, background 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = project.patent
                    ? "rgba(245, 158, 11, 0.35)"
                    : "rgba(0, 212, 255, 0.2)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(13, 13, 31, 0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = project.patent
                    ? "rgba(245, 158, 11, 0.15)"
                    : "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card)";
                }}
              >
                {/* Patent top accent bar */}
                {project.patent && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                    }}
                  />
                )}

                {/* Number accent */}
                <span
                  className="font-heading"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "32px",
                    fontSize: "64px",
                    fontWeight: 700,
                    color: project.patent ? "rgba(245, 158, 11, 0.05)" : "rgba(0, 212, 255, 0.04)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {project.id}
                </span>

                <div>
                  {/* Title row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        color: project.statusColor,
                        border: `1px solid ${project.statusColor}`,
                        padding: "3px 8px",
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.status}
                    </span>
                    {project.period && (
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {project.period}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "13px",
                      color: project.patent ? "#f59e0b" : "var(--accent-cyan)",
                      marginBottom: "14px",
                      letterSpacing: "0.04em",
                      opacity: project.patent ? 0.85 : 1,
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                      maxWidth: "680px",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Patent details block */}
                  {project.patent && (
                    <div
                      style={{
                        marginBottom: "20px",
                        padding: "14px 18px",
                        border: "1px solid rgba(245, 158, 11, 0.2)",
                        borderRadius: "2px",
                        background: "rgba(245, 158, 11, 0.04)",
                        display: "inline-flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#f59e0b" }}>
                        GERMAN UTILITY PATENT
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 500 }}>
                        {project.patent.number}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                        {project.patent.office} · Registered {project.patent.registered}
                      </span>
                      <a
                        href={project.patent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "11px",
                          color: "#f59e0b",
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          marginTop: "2px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View DPMA Register →
                      </a>
                    </div>
                  )}

                  {/* Highlights */}
                  <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none" }}>
                    {project.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "13px",
                          color: "var(--text-secondary)",
                          paddingLeft: "16px",
                          position: "relative",
                          marginBottom: "6px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: project.patent ? "#f59e0b" : "var(--accent-cyan)",
                          }}
                        >
                          ›
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.06em",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                          padding: "4px 10px",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
