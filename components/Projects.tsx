"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "EmPath",
    subtitle: "Multimodal Emotion & Pain Detection",
    status: "ONGOING",
    statusColor: "#00d4ff",
    description:
      "Attention-based deep learning system detecting pain and emotional distress in non-verbal patients using facial video and physiological signals (heart rate, skin conductance).",
    tags: ["CNN-LSTM", "Cross-Modal Attention", "SHAP", "Healthcare AI", "Multimodal"],
    highlights: [
      "CNN-LSTM architectures fusing facial expressions with temporal physiological patterns",
      "Subject-independent cross-validation for generalization across patient populations",
      "Attention visualizations + SHAP-based interpretability for trustworthy clinical AI",
    ],
  },
  {
    id: "02",
    title: "TradingML",
    subtitle: "Production ML System for Systematic Trading",
    status: "OCT 2025",
    statusColor: "rgba(0, 212, 255, 0.45)",
    description:
      "End-to-end ML pipeline trained on 26 years of multi-factor financial data to predict forward stock returns, with rigorous data-leakage prevention and strategy evaluation.",
    tags: ["Walk-Forward Validation", "SHAP", "Sharpe Ratio", "Factor Models", "Python"],
    highlights: [
      "Prevented data leakage through walk-forward validation and robust preprocessing",
      "Evaluated using IC, Sharpe ratio, and maximum drawdown metrics",
      "Interpreted model behavior via cumulative P&L and SHAP analysis",
    ],
  },
  {
    id: "03",
    title: "ER Triage AI",
    subtitle: "AI-Assisted Emergency Room Chatbot",
    status: "AUG 2025",
    statusColor: "rgba(0, 212, 255, 0.45)",
    description:
      "Voice-enabled conversational AI collecting patient symptoms and vital signs with HIPAA-compliant data handling, deployed as an interactive Streamlit clinical dashboard.",
    tags: ["NLP", "Streamlit", "HIPAA", "Risk Classification", "Voice AI"],
    highlights: [
      "Voice-enabled symptom and vital signs collection with HIPAA compliance",
      "ML models predicting patient risk levels and triage urgency classification",
      "Real-time Streamlit dashboard for patient flow and model prediction tracking",
    ],
  },
  {
    id: "04",
    title: "SpamShield",
    subtitle: "Spam Detection Using Machine Learning",
    status: "DEC 2024",
    statusColor: "rgba(0, 212, 255, 0.45)",
    description:
      "Binary classification model using TF-IDF and n-gram feature extraction to identify spam with high precision, with careful trade-off analysis between false positives and negatives.",
    tags: ["TF-IDF", "n-grams", "Precision/Recall", "F1-Score", "Scikit-learn"],
    highlights: [
      "TF-IDF + n-gram feature engineering for text classification",
      "Full evaluation: confusion matrix, precision, recall, F1-score",
      "Business trade-off analysis for false positive/negative balance",
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
            Projects
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
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  cursor: "default",
                  transition: "border-color 0.25s, background 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(0, 212, 255, 0.2)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(13, 13, 31, 0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "var(--bg-card)";
                }}
              >
                {/* Number accent */}
                <span
                  className="font-heading"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "32px",
                    fontSize: "64px",
                    fontWeight: 700,
                    color: "rgba(0, 212, 255, 0.04)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {project.id}
                </span>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "32px",
                    alignItems: "start",
                  }}
                >
                  <div>
                    {/* Title row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "6px",
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
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--accent-cyan)",
                        marginBottom: "14px",
                        letterSpacing: "0.04em",
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
                        maxWidth: "620px",
                      }}
                    >
                      {project.description}
                    </p>

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
                              color: "var(--accent-cyan)",
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
