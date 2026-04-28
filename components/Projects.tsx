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
        padding: "160px 0",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "var(--accent-cyan)",
              marginBottom: "16px",
              fontFamily: "var(--font-outfit)",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            System Architectures
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 6vw, 64px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.04em",
              margin: 0,
              fontFamily: "var(--font-outfit)",
              textTransform: "uppercase",
            }}
          >
            Projects & Patents
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className="block-3d"
                style={{
                  padding: "64px",
                  borderRadius: "4px",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  borderLeft: project.patent ? "4px solid var(--accent-purple)" : "4px solid var(--accent-cyan)",
                }}
              >
                {/* Number accent */}
                <span
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "48px",
                    fontSize: "120px",
                    fontWeight: 900,
                    color: project.patent ? "rgba(188, 19, 254, 0.03)" : "rgba(0, 242, 255, 0.03)",
                    lineHeight: 1,
                    userSelect: "none",
                    fontFamily: "var(--font-outfit)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {project.id}
                </span>

                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      marginBottom: "24px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "36px",
                        fontWeight: 700,
                        color: "white",
                        margin: 0,
                        letterSpacing: "-0.02em",
                        fontFamily: "var(--font-outfit)",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: project.patent ? "var(--accent-purple)" : "var(--accent-cyan)",
                        border: `1px solid ${project.patent ? "var(--accent-purple)" : "var(--accent-cyan)"}`,
                        padding: "6px 16px",
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p
                    className={project.patent ? "text-glow-purple" : "text-glow"}
                    style={{
                      fontSize: "13px",
                      color: project.patent ? "var(--accent-purple)" : "var(--accent-cyan)",
                      marginBottom: "32px",
                      letterSpacing: "0.2em",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: "18px",
                      color: "rgba(255, 255, 255, 0.5)",
                      lineHeight: 1.7,
                      marginBottom: "48px",
                      maxWidth: "800px",
                      fontWeight: 300,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.description}
                  </p>

                  {project.patent && (
                    <div
                      className="block-3d"
                      style={{
                        marginBottom: "48px",
                        padding: "32px",
                        background: "rgba(188, 19, 254, 0.02)",
                        border: "1px solid rgba(188, 19, 254, 0.1)",
                        borderRadius: "2px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        maxWidth: "600px",
                      }}
                    >
                      <span style={{ fontSize: "10px", letterSpacing: "0.4em", color: "var(--accent-purple)", fontWeight: 800 }}>
                        DPMA · MUNICH, GERMANY
                      </span>
                      <span style={{ fontSize: "18px", color: "white", fontWeight: 700, fontFamily: "var(--font-outfit)" }}>
                        {project.patent.number}
                      </span>
                      <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.4)", fontWeight: 300 }}>
                        Registered {project.patent.registered} · Utility Patent
                      </span>
                      <a
                        href={project.patent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "var(--accent-purple)",
                          textDecoration: "none",
                          fontWeight: 700,
                          marginTop: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Legal Repository ↗
                      </a>
                    </div>
                  )}

                  <ul style={{ margin: "0 0 48px", padding: 0, listStyle: "none" }}>
                    {project.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "15px",
                          color: "rgba(255, 255, 255, 0.4)",
                          paddingLeft: "32px",
                          position: "relative",
                          marginBottom: "16px",
                          lineHeight: 1.8,
                          fontWeight: 300,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "12px",
                            width: "12px",
                            height: "1px",
                            background: project.patent ? "var(--accent-purple)" : "var(--accent-cyan)",
                            opacity: 0.6,
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "12px",
                          color: "rgba(255, 255, 255, 0.3)",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          padding: "8px 16px",
                          borderRadius: "2px",
                          fontFamily: "var(--font-outfit)",
                          fontWeight: 400,
                          letterSpacing: "0.05em",
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
