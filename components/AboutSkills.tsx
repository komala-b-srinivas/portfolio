"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const skills = [
  { name: "Python",     icon: "Py",  color: "#3b82f6" },
  { name: "PyTorch",    icon: "PT",  color: "#ee4c2c" },
  { name: "Scikit",     icon: "SK",  color: "#f89820" },
  { name: "Groq API",   icon: "GQ",  color: "#00f2ff" },
  { name: "Streamlit",  icon: "ST",  color: "#ff4b4b" },
  { name: "Whisper",    icon: "WH",  color: "#bc13fe" },
  { name: "LLMs",       icon: "LM",  color: "#22d3ee" },
  { name: "SHAP / XAI", icon: "SH",  color: "#34d399" },
  { name: "SQL",        icon: "SQ",  color: "#336791" },
  { name: "Git",        icon: "Gt",  color: "#f05033" },
  { name: "NumPy",      icon: "NP",  color: "#4dabf7" },
  { name: "Pandas",     icon: "PD",  color: "#8b5cf6" },
];

function HexSkill({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: index * 0.055 }}
      whileHover={{ scale: 1.13, transition: { duration: 0.2 } }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "default" }}
    >
      <div style={{ position: "relative", width: "64px", height: "64px" }}>
        <div
          style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: `linear-gradient(135deg, ${skill.color}28, ${skill.color}0e)`,
            border: `1px solid ${skill.color}45`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.background = `linear-gradient(135deg, ${skill.color}45, ${skill.color}20)`;
            (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 8px ${skill.color}60)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.background = `linear-gradient(135deg, ${skill.color}28, ${skill.color}0e)`;
            (e.currentTarget as HTMLDivElement).style.filter = "none";
          }}
        >
          <span style={{
            fontSize: "12px", fontWeight: 900,
            color: skill.color, letterSpacing: "-0.02em",
            textShadow: `0 0 12px ${skill.color}70`,
          }}>
            {skill.icon}
          </span>
        </div>
      </div>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.04em", textAlign: "center" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function OpenToWorkBadge() {
  return (
    <motion.div
      animate={{ boxShadow: ["0 0 0px rgba(0,242,255,0)", "0 0 22px rgba(0,242,255,0.3)", "0 0 0px rgba(0,242,255,0)"] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        padding: "10px 22px",
        background: "rgba(0,242,255,0.06)",
        border: "1px solid rgba(0,242,255,0.28)",
        borderRadius: "100px",
        fontSize: "13px", color: "#00f2ff", fontWeight: 700, letterSpacing: "0.06em",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00f2ff", boxShadow: "0 0 8px #00f2ff" }}
      />
      Open to Work · NYC &amp; Remote
    </motion.div>
  );
}

export default function AboutSkills() {
  const { isMobile, isTablet } = useBreakpoint();
  const stacked = isMobile || isTablet;

  return (
    <section id="about" style={{ padding: isMobile ? "80px 0 60px" : "120px 0 100px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "5%", right: "5%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 5%" }}>
        <div style={{
          display: "flex",
          flexDirection: stacked ? "column" : "row",
          gap: stacked ? "60px" : "80px",
          alignItems: "flex-start",
        }}>

          {/* ── About ── */}
          <motion.div
            initial={{ opacity: 0, x: stacked ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ flex: stacked ? "none" : "0 0 420px", width: stacked ? "100%" : undefined, minWidth: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00f2ff", boxShadow: "0 0 8px #00f2ff" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700 }}>
                About Me
              </span>
            </div>

            <h2 style={{
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(28px, 3.5vw, 44px)",
              fontWeight: 900, color: "white", letterSpacing: "-0.035em",
              lineHeight: 1.15, marginBottom: "28px",
            }}>
              I&apos;m Komala —<br />
              <span style={{ color: "#00f2ff", textShadow: "0 0 24px rgba(0,242,255,0.4)" }}>AI engineer</span>
              {" "}based in NYC
            </h2>

            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "20px" }}>
              I build machine learning systems, and I&apos;m someone who genuinely loves
              organizing chaos into something useful. Give me a messy clinical workflow
              and a deadline, and I&apos;ll give you a production AI pipeline.
            </p>

            <p style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "20px" }}>
              I specialize in <span style={{ color: "#00f2ff", fontWeight: 600 }}>AI automation</span> and{" "}
              <span style={{ color: "#bc13fe", fontWeight: 600 }}>healthcare AI</span>, building
              LLM-powered pipelines that automate high-stakes clinical tasks with HIPAA compliance,
              PHI de-identification, and human-in-the-loop safety baked in from day one.
            </p>

            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "40px" }}>
              Currently at Rimon Health, cutting neuropsychological report writing from 3 hours to
              30 minutes using multimodal LLMs.
            </p>

            <OpenToWorkBadge />
          </motion.div>

          {/* ── Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: stacked ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ flex: 1, minWidth: 0, width: stacked ? "100%" : undefined }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#bc13fe", boxShadow: "0 0 8px #bc13fe" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700 }}>
                Skills
              </span>
            </div>

            <h2 style={{
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(28px, 3.5vw, 44px)",
              fontWeight: 900, color: "white", letterSpacing: "-0.035em",
              lineHeight: 1.15, marginBottom: "40px",
            }}>
              My{" "}
              <span style={{ color: "#00f2ff", textShadow: "0 0 24px rgba(0,242,255,0.4)" }}>Tech Stack</span>
            </h2>

            {/* Hex grid — 4 cols desktop, 4 cols tablet, 3 cols mobile */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "20px 16px" : "28px 24px",
              maxWidth: isMobile ? "100%" : "420px",
            }}>
              {skills.map((skill, i) => (
                <HexSkill key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* Extra tags */}
            <div style={{
              marginTop: "40px", padding: isMobile ? "16px" : "24px",
              background: "rgba(10,10,24,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px", backdropFilter: "blur(10px)",
            }}>
              <p style={{
                fontSize: "10px", color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 700, marginBottom: "14px",
              }}>
                + Also proficient in
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "Prompt Engineering", "HIPAA Compliance", "PHI De-identification",
                  "Clinical NLP", "Multimodal Pipelines", "LLaMA / OpenAI APIs",
                  "Rule-Based NLP", "Walk-Forward Validation", "SHAP / XAI",
                  "CNN-LSTM", "Feature Engineering", "OCR / Vision AI",
                  "REST APIs", "fpdf2 / python-docx", "Power BI",
                ].map(tag => (
                  <span key={tag} style={{
                    fontSize: "11px", color: "rgba(255,255,255,0.45)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "5px 10px", borderRadius: "6px", fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: "5%", right: "5%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />
    </section>
  );
}
