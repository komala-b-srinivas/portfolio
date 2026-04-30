"use client";

import { motion } from "framer-motion";
import HlsVideo from "./HlsVideo";

const SKILLS_HLS = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

const skills = [
  { name: "Python",     icon: "Py",  color: "#60a5fa" },
  { name: "PyTorch",    icon: "PT",  color: "#fb923c" },
  { name: "Scikit",     icon: "SK",  color: "#fbbf24" },
  { name: "Groq API",   icon: "GQ",  color: "#a78bfa" },
  { name: "Streamlit",  icon: "ST",  color: "#f87171" },
  { name: "Whisper",    icon: "WH",  color: "#c084fc" },
  { name: "LLMs",       icon: "LM",  color: "#34d399" },
  { name: "SHAP / XAI", icon: "SH",  color: "#2dd4bf" },
  { name: "SQL",        icon: "SQ",  color: "#60a5fa" },
  { name: "Git",        icon: "Gt",  color: "#f87171" },
  { name: "NumPy",      icon: "NP",  color: "#818cf8" },
  { name: "Pandas",     icon: "PD",  color: "#a78bfa" },
];

const EXTRA_TAGS = [
  "Prompt Engineering", "HIPAA Compliance", "PHI De-identification",
  "Clinical NLP", "Multimodal Pipelines", "LLaMA / OpenAI APIs",
  "Rule-Based NLP", "Walk-Forward Validation", "CNN-LSTM",
  "Feature Engineering", "OCR / Vision AI", "REST APIs",
  "fpdf2 / python-docx", "Power BI",
];

/* ── Section 1: About Me ─────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: "120px 0 100px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "5%", right: "5%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: "680px" }}
        >
          <div className="section-badge" style={{ marginBottom: "28px" }}>
            <span className="dot" />
            About Me
          </div>

          <h2 className="text-glass" style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "32px",
            margin: "0 0 32px",
          }}>
            I&apos;m Komala,<br />
            <span style={{ fontStyle: "italic" }}>AI engineer</span>
            {" "}based in NYC
          </h2>

          <p style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "17px",
            color: "oklch(1 0 0 / 80%)",
            lineHeight: 1.8,
            marginBottom: "20px",
            fontWeight: 400,
          }}>
            I build machine learning systems, and I&apos;m someone who genuinely loves
            organizing chaos into something useful. Give me a messy clinical workflow
            and a deadline, and I&apos;ll give you a production AI pipeline.
          </p>

          <p style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "16px",
            color: "oklch(1 0 0 / 65%)",
            lineHeight: 1.8,
            marginBottom: "20px",
          }}>
            I specialize in{" "}
            <span style={{ color: "oklch(0.78 0.28 280)", fontWeight: 600 }}>AI automation</span>
            {" "}and{" "}
            <span style={{ color: "oklch(0.78 0.28 280)", fontWeight: 600 }}>clinical AI</span>
            , building LLM-powered pipelines that automate high-stakes clinical tasks
            with HIPAA compliance, PHI de-identification, and human-in-the-loop safety baked in from day one.
          </p>

          <p style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "15px",
            color: "oklch(1 0 0 / 55%)",
            lineHeight: 1.8,
            marginBottom: "40px",
          }}>
            Currently at Rimon Health, cutting neuropsychological report writing from 3 hours to
            30 minutes using multimodal LLMs.
          </p>

          {/* Open to Work */}
          <motion.div
            animate={{ boxShadow: ["0 0 0px oklch(1 0 0 / 0%)", "0 0 24px oklch(1 0 0 / 8%)", "0 0 0px oklch(1 0 0 / 0%)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "9999px",
              background: "oklch(1 0 0 / 5%)",
              border: "1px solid oklch(1 0 0 / 18%)",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "13px",
              color: "oklch(1 0 0 / 65%)",
              fontWeight: 500,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade8088" }}
            />
            Open to Work &middot; NYC &amp; Remote
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2: Tech Stack with HLS video ────────────────────────────────── */
function SkillsSection() {
  return (
    <section id="skills" style={{ position: "relative", overflow: "hidden" }}>
      {/* HLS video background */}
      <HlsVideo
        src={SKILLS_HLS}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1,
        height: "200px",
        background: "linear-gradient(to bottom, oklch(0 0 0), transparent)",
        pointerEvents: "none",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1,
        height: "200px",
        background: "linear-gradient(to top, oklch(0 0 0), transparent)",
        pointerEvents: "none",
      }} />

      {/* Overlay for readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "oklch(0 0 0 / 55%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "120px 0 140px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <div className="section-badge" style={{ marginBottom: "20px" }}>
              <span className="dot" style={{ background: "oklch(0.75 0.15 290)" }} />
              Tech Stack
            </div>
            <h2 className="text-glass" style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}>
              My{" "}
              <span style={{ fontStyle: "italic" }}>Tech Stack</span>
            </h2>
          </motion.div>

          {/* Skill icons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "28px 20px",
            maxWidth: "640px",
            margin: "0 auto 48px",
          }}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.18 } }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "default" }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: `${skill.color}30`,
                    border: `1px solid ${skill.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${skill.color}45`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}90`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${skill.color}30`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}60`;
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: skill.color,
                    letterSpacing: "-0.02em",
                  }}>
                    {skill.icon}
                  </span>
                </div>
                <span style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "10px",
                  color: "oklch(1 0 0 / 72%)",
                  fontWeight: 500,
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}>
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Extra tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              padding: "24px 28px",
              borderRadius: "20px",
              background: "oklch(1 0 0 / 6%)",
              border: "1px solid oklch(1 0 0 / 14%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              textAlign: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "10px",
              color: "oklch(1 0 0 / 28%)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "16px",
              margin: "0 0 16px",
            }}>
              + Also proficient in
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {EXTRA_TAGS.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "11px",
                  color: "oklch(1 0 0 / 72%)",
                  background: "oklch(1 0 0 / 10%)",
                  border: "1px solid oklch(1 0 0 / 22%)",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  fontWeight: 400,
                  backdropFilter: "blur(8px)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Default export — both sections stacked ──────────────────────────────── */
export default function AboutSkills() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
    </>
  );
}
