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
    <section
      id="skills"
      style={{
        padding: "160px 0",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{ position: "absolute", top: "20%", left: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(188, 19, 254, 0.05) 0%, transparent 70%)", zIndex: 0 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
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
            Technical Infrastructure
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
            Capabilities
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "40px",
          }}
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="block-3d"
              style={{
                padding: "48px",
                borderRadius: "4px",
                borderLeft: i % 2 === 0 ? "2px solid var(--accent-cyan)" : "2px solid var(--accent-purple)",
              }}
            >
              <p
                className={i % 2 === 0 ? "text-glow" : "text-glow-purple"}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)",
                  marginBottom: "32px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 800,
                }}
              >
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.4)",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      padding: "8px 18px",
                      borderRadius: "2px",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 300,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--accent-cyan)";
                      el.style.color = "white";
                      el.style.background = "rgba(0, 242, 255, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255, 255, 255, 0.05)";
                      el.style.color = "rgba(255, 255, 255, 0.4)";
                      el.style.background = "rgba(255, 255, 255, 0.02)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
