"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "AI Automation & LLMs",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "Groq API",
      "Whisper (Speech-to-Text)",
      "Vision / OCR",
      "NLP",
      "Clinical NLP",
      "Automated Report Generation",
      "Rule-Based Narrative Engines",
      "Multimodal Pipelines",
    ],
  },
  {
    category: "Healthcare AI & Compliance",
    skills: [
      "HIPAA Compliance",
      "PHI De-identification",
      "Clinical Document Automation",
      "EHR Workflow Integration",
      "Neuropsychological AI",
      "Human-in-the-Loop AI",
      "Clinical Decision Support",
    ],
  },
  {
    category: "Programming & Tools",
    skills: ["Python", "SQL", "Git", "REST APIs", "Streamlit", "fpdf2", "python-docx", "Jupyter Notebook"],
  },
  {
    category: "ML / Deep Learning",
    skills: [
      "Supervised Learning",
      "Unsupervised Learning",
      "CNN-LSTM",
      "Attention Mechanisms",
      "Multimodal Learning",
      "Time Series",
      "Neural Networks",
      "Feature Engineering",
      "PCA",
    ],
  },
  {
    category: "Evaluation & Interpretability",
    skills: [
      "SHAP",
      "ROC-AUC",
      "Precision / Recall / F1",
      "Cross-Validation",
      "Hyperparameter Tuning",
      "Confusion Matrix",
      "Walk-Forward Validation",
    ],
  },
  {
    category: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Power BI"],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "160px 0", position: "relative" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px", textAlign: "left" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "var(--accent-teal)" }} />
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.4em",
                color: "var(--accent-teal)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              System Core
            </p>
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
            Technologies I <span className="text-gradient">Work With</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="system-block"
            >
              <div
                className="glass-card"
                style={{
                  padding: "40px",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: i % 2 === 0 ? "var(--accent-teal)" : "var(--accent-purple)",
                    marginBottom: "32px",
                    textTransform: "uppercase",
                    fontWeight: 800,
                  }}
                  className={i % 2 === 0 ? "glow-teal" : "glow-purple"}
                >
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        fontSize: "14px",
                        color: "white",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        cursor: "default",
                        fontWeight: 400,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: i % 2 === 0 ? "var(--accent-teal)" : "var(--accent-purple)" }} />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
