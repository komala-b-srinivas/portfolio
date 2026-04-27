"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Rimon Health AI Report Writer",
    subtitle: "Clinical Document Automation System",
    status: "CURRENT",
    statusColor: "#00d4ff",
    period: "Apr 2026 – Present",
    patent: null,
    description:
      "End-to-end AI system that automates neuropsychological evaluation report writing for OPWDD assessments , reducing clinician report time from 2–3 hours to ~30 minutes. Built for Rimon Health's exact 4-test battery: WPPSI-IV, BASC-3, Vineland-3, and ADOS-2.",
    tags: ["Python", "Streamlit", "Groq API", "Whisper", "LLaMA 3.3-70B", "LLaMA Vision", "OCR", "NLP", "HIPAA", "fpdf2", "python-docx"],
    highlights: [
      "Multimodal input pipeline: session audio → Whisper transcription → LLM extracts structured background fields; score sheet photo → Vision OCR → auto-fills all test score inputs; handwritten notes photo → clinical language conversion",
      "Rule-based narrative engines for BASC-3 PRS (14 subscales, 4 composites) and Vineland-3 (ABC + 3 domains) matching Q-Global clinical output language exactly; ADOS-2 auto-classifier maps SA + RRB totals to Autism/Spectrum/Non-Spectrum per module thresholds with DSM-5 Criteria A/B/C walkthrough",
      "HIPAA-compliant architecture: PHI de-identification layer before all LLM inference, PHI re-injection at final render only; full report assembled and exported as PDF and Word with evaluator signature block",
    ],
  },
  {
    id: "02",
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
      "Implemented human and gas detection via Doppler radar, ultrasonic, and camera sensors (83% accuracy)",
      "Awarded German utility patent No. 20 2025 106 621 by DPMA, Munich (registered 12.03.2026)",
    ],
  },
  {
    id: "03",
    title: "EmPath",
    subtitle: "Multimodal Pain Detection System",
    status: "ONGOING",
    statusColor: "#00d4ff",
    period: null,
    patent: null,
    description:
      "Stacked ensemble multimodal system detecting pain intensity in non-verbal patients using biosignal and facial landmark fusion. Achieved 65.3% accuracy, AUC-ROC 0.719, F1 0.653 on BioVid dataset , outperforming Werner et al. (2014) multimodal baseline of 60.5% on a harder task.",
    tags: ["PyTorch", "Random Forest", "XGBoost", "MediaPipe", "SHAP", "MAML", "Streamlit", "Healthcare AI"],
    highlights: [
      "Stacked ensemble fusion of Random Forest on 35 biosignal features (HRV, entropy, GSR) + 22 facial landmarks via MediaPipe FaceMesh; 65.3% accuracy, AUC-ROC 0.719, F1 0.653 (LOSO, 67 subjects)",
      "Evaluated 20+ model configs across 6 classifiers and 4 fusion strategies; benchmarked against PainFormer (10.9M samples) and BIOT (NeurIPS 2023) , where RF outperformed foundation models on limited medical data",
      "Implemented MAML meta-learning, CORAL ordinal regression, and cross-modal attention fusion in PyTorch",
      "Deployed live Streamlit app with real-time prediction, SHAP plots, ROC curve, and per-subject accuracy heatmap; pre-generated 2,680 biosignal visualizations for cloud deployment",
    ],
  },
  {
    id: "04",
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
      "Built and compared Logistic Regression, Decision Tree, and XGBoost models (up to 64% accuracy) and near 100% recall for critical cases",
      "Engineered clinical features (Shock Index, Hypoxia, Fever flags) and safety-rule overrides (SBP < 90, SpO₂ < 90) to prevent under-triage",
      "Integrated SHAP explainability for clinician-interpretable predictions; built Streamlit interface with nurse override workflow",
      "Applied adversarial testing, bias monitoring, and drift detection under a clinical safety engineering framework",
    ],
  },
  {
    id: "05",
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
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
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
            SELECTED ARCHITECTURES
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
            Projects & Patents
          </h2>
        </motion.div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: "40px",
                  borderRadius: "24px",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Number accent */}
                <span
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "40px",
                    fontSize: "72px",
                    fontWeight: 700,
                    color: project.patent ? "rgba(245, 158, 11, 0.03)" : "rgba(0, 242, 255, 0.03)",
                    lineHeight: 1,
                    userSelect: "none",
                    fontFamily: "var(--font-outfit)",
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
                      gap: "16px",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "white",
                        margin: 0,
                        letterSpacing: "-0.01em",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: project.statusColor,
                        border: `1px solid ${project.statusColor}`,
                        padding: "4px 10px",
                        borderRadius: "100px",
                        whiteSpace: "nowrap",
                        fontWeight: 600,
                      }}
                    >
                      {project.status}
                    </span>
                    {project.period && (
                      <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", fontFamily: "var(--font-outfit)" }}>
                        {project.period}
                      </span>
                    )}
                  </div>

                  <p
                    className="text-glow"
                    style={{
                      fontSize: "14px",
                      color: project.patent ? "#f59e0b" : "var(--accent-cyan)",
                      marginBottom: "20px",
                      letterSpacing: "0.1em",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.6,
                      marginBottom: "24px",
                      maxWidth: "750px",
                      fontWeight: 300,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Patent details block */}
                  {project.patent && (
                    <div
                      style={{
                        marginBottom: "24px",
                        padding: "20px",
                        border: "1px solid rgba(245, 158, 11, 0.1)",
                        borderRadius: "16px",
                        background: "rgba(245, 158, 11, 0.03)",
                        display: "inline-flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                        maxWidth: "500px",
                      }}
                    >
                      <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#f59e0b", fontWeight: 600 }}>
                        DEUTSCHES PATENT- UND MARKENAMT
                      </span>
                      <span style={{ fontSize: "15px", color: "white", fontWeight: 500, fontFamily: "var(--font-outfit)" }}>
                        {project.patent.number}
                      </span>
                      <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.5)" }}>
                        Registered {project.patent.registered} · Munich, Germany
                      </span>
                      <a
                        href={project.patent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "#f59e0b",
                          textDecoration: "none",
                          fontWeight: 500,
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        View Legal Register ↗
                      </a>
                    </div>
                  )}

                  {/* Highlights */}
                  <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none" }}>
                    {project.highlights.map((h, idx) => (
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
                            color: project.patent ? "#f59e0b" : "var(--accent-cyan)",
                            opacity: 0.6,
                          }}
                        >
                          ●
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "12px",
                          color: "rgba(255, 255, 255, 0.5)",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontFamily: "var(--font-outfit)",
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
