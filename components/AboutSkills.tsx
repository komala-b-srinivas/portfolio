"use client";

import { motion } from "framer-motion";

// ── Skills with icons ─────────────────────────────────────────────────────────
const skills = [
  { name: "Python",      icon: "Py",  color: "#3b82f6" },
  { name: "PyTorch",     icon: "PT",  color: "#ee4c2c" },
  { name: "TensorFlow",  icon: "TF",  color: "#ff6f00" },
  { name: "Scikit",      icon: "SK",  color: "#f89820" },
  { name: "NumPy",       icon: "NP",  color: "#4dabf7" },
  { name: "Pandas",      icon: "PD",  color: "#130754" },
  { name: "SHAP",        icon: "SH",  color: "#00f2ff" },
  { name: "Streamlit",   icon: "ST",  color: "#ff4b4b" },
  { name: "SQL",         icon: "SQ",  color: "#336791" },
  { name: "Git",         icon: "Gt",  color: "#f05033" },
  { name: "Power BI",    icon: "BI",  color: "#f2c811" },
  { name: "Jupyter",     icon: "Jp",  color: "#f37626" },
];

function HexSkill({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        cursor: "default",
      }}
    >
      {/* Hex icon */}
      <div style={{ position: "relative", width: "72px", height: "72px" }}>
        {/* Hex shape via clip-path */}
        <div style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}10)`,
          border: `1px solid ${skill.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}>
          <span style={{
            fontSize: "15px",
            fontWeight: 900,
            color: skill.color,
            letterSpacing: "-0.02em",
            textShadow: `0 0 10px ${skill.color}60`,
          }}>
            {skill.icon}
          </span>
        </div>

        {/* Hex border glow overlay */}
        <div style={{
          position: "absolute",
          inset: "-2px",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(135deg, ${skill.color}30, transparent 60%)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }} />
      </div>

      {/* Label */}
      <span style={{
        fontSize: "11px",
        color: "rgba(255,255,255,0.5)",
        fontWeight: 600,
        letterSpacing: "0.05em",
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── Open to work badge ────────────────────────────────────────────────────────
function OpenToWorkBadge() {
  return (
    <motion.div
      animate={{ boxShadow: ["0 0 0px rgba(0,242,255,0)", "0 0 20px rgba(0,242,255,0.3)", "0 0 0px rgba(0,242,255,0)"] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        background: "rgba(0,242,255,0.06)",
        border: "1px solid rgba(0,242,255,0.25)",
        borderRadius: "100px",
        fontSize: "13px",
        color: "#00f2ff",
        fontWeight: 700,
        letterSpacing: "0.05em",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#00f2ff",
          boxShadow: "0 0 8px #00f2ff",
        }}
      />
      Open to Work
    </motion.div>
  );
}

// ── Profile visual ────────────────────────────────────────────────────────────
function ProfileVisual() {
  return (
    <div style={{
      position: "relative",
      width: "220px",
      height: "240px",
      flexShrink: 0,
    }}>
      {/* Animated corner brackets */}
      {[
        { top: 0, left: 0, borderTop: "2px solid #00f2ff", borderLeft: "2px solid #00f2ff" },
        { top: 0, right: 0, borderTop: "2px solid #bc13fe", borderRight: "2px solid #bc13fe" },
        { bottom: 0, left: 0, borderBottom: "2px solid #bc13fe", borderLeft: "2px solid #bc13fe" },
        { bottom: 0, right: 0, borderBottom: "2px solid #00f2ff", borderRight: "2px solid #00f2ff" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "28px", height: "28px",
            ...style,
          }}
        />
      ))}

      {/* Inner content */}
      <div style={{
        position: "absolute",
        inset: "14px",
        background: "rgba(10,10,24,0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        overflow: "hidden",
      }}>
        {/* Animated neural bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(0,242,255,0.06) 0%, transparent 70%)",
        }} />

        {/* Initials */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(0,242,255,0.15), rgba(188,19,254,0.15))",
            border: "1px solid rgba(0,242,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 900,
            color: "#00f2ff",
            boxShadow: "0 0 24px rgba(0,242,255,0.15)",
            position: "relative",
            zIndex: 1,
          }}
        >
          KBS
        </motion.div>

        {/* Name */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "white", letterSpacing: "0.05em" }}>
            Komala B.S.
          </div>
          <div style={{ fontSize: "10px", color: "#00f2ff", letterSpacing: "0.1em", marginTop: "3px" }}>
            AI/ML Engineer
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutSkills() {
  return (
    <section
      id="about"
      style={{ padding: "120px 0 100px", position: "relative" }}
    >
      {/* Divider top */}
      <div style={{
        position: "absolute",
        top: 0, left: "5%", right: "5%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5%" }}>
        <div style={{
          display: "flex",
          gap: "80px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
          {/* ── LEFT: About ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ flex: "0 0 400px", minWidth: 0 }}
          >
            {/* Section label */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "14px", marginBottom: "28px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#00f2ff", boxShadow: "0 0 8px #00f2ff",
              }} />
              <span style={{
                fontSize: "11px", color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700,
              }}>
                About Me
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 900, color: "white",
              letterSpacing: "-0.035em",
              lineHeight: 1.15, marginBottom: "28px",
            }}>
              Passionate about
              <br />
              building the{" "}
              <span style={{ color: "#00f2ff", textShadow: "0 0 24px rgba(0,242,255,0.4)" }}>
                future
              </span>
            </h2>

            <p style={{
              fontSize: "15.5px",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}>
              I&apos;m an AI/ML Engineer and Data Scientist (M.S. CS, Hofstra
              University) who loves turning cutting-edge research into production
              AI systems that solve real clinical and operational problems.
            </p>

            <p style={{
              fontSize: "15.5px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
              marginBottom: "36px",
            }}>
              Currently building healthcare AI at Rimon Health — automating
              neuropsychological report writing with multimodal LLM pipelines.
              Open to AI/ML Engineer roles in NYC and beyond.
            </p>

            <OpenToWorkBadge />

            {/* Profile visual */}
            <div style={{ marginTop: "48px" }}>
              <ProfileVisual />
            </div>
          </motion.div>

          {/* ── RIGHT: Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ flex: 1, minWidth: 0 }}
          >
            <div style={{
              display: "flex", alignItems: "center",
              gap: "14px", marginBottom: "28px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#bc13fe", boxShadow: "0 0 8px #bc13fe",
              }} />
              <span style={{
                fontSize: "11px", color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700,
              }}>
                Skills
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 900, color: "white",
              letterSpacing: "-0.035em",
              lineHeight: 1.15, marginBottom: "48px",
            }}>
              Technologies I{" "}
              <span style={{ color: "#00f2ff", textShadow: "0 0 24px rgba(0,242,255,0.4)" }}>
                Work With
              </span>
            </h2>

            {/* Hex skills grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px 24px",
              maxWidth: "420px",
            }}>
              {skills.map((skill, i) => (
                <HexSkill key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* Extra skill tags */}
            <div style={{
              marginTop: "48px",
              padding: "24px",
              background: "rgba(10,10,24,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}>
              <p style={{
                fontSize: "10px", color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 700, marginBottom: "16px",
              }}>
                + Also proficient in
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "LLM Integration", "Prompt Engineering", "HIPAA Compliance",
                  "Clinical NLP", "SHAP / XAI", "Walk-Forward Validation",
                  "Multimodal Pipelines", "Feature Engineering", "CNN-LSTM",
                  "Cross-Validation", "Power BI", "REST APIs",
                ].map(tag => (
                  <span key={tag} style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider bottom */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "5%", right: "5%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />
    </section>
  );
}
