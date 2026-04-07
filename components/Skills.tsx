"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Programming",
    skills: ["Python", "SQL", "Git", "Jupyter Notebook"],
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
      "Backtesting",
    ],
  },
  {
    category: "Data Tools & Visualization",
    skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Streamlit", "Power BI"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "100px 0",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "56px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--accent-cyan)",
              marginBottom: "10px",
            }}
          >
            TECHNICAL STACK
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
            Skills
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: "28px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                borderRadius: "2px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "var(--accent-cyan)",
                  marginBottom: "18px",
                  textTransform: "uppercase",
                }}
              >
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      padding: "5px 10px",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(0, 212, 255, 0.3)";
                      el.style.color = "var(--accent-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--border)";
                      el.style.color = "var(--text-secondary)";
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
