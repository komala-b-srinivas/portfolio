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
            TECHNICAL CAPABILITIES
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
            Technical Stack
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel"
              style={{
                padding: "32px",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle accent corner */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", background: "linear-gradient(225deg, var(--accent-cyan), transparent)", opacity: 0.1 }} />
              
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "var(--accent-cyan)",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                }}
              >
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.6)",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      fontFamily: "var(--font-outfit)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--accent-cyan)";
                      el.style.color = "var(--accent-cyan)";
                      el.style.background = "rgba(0, 242, 255, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255, 255, 255, 0.05)";
                      el.style.color = "rgba(255, 255, 255, 0.6)";
                      el.style.background = "rgba(255, 255, 255, 0.03)";
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
