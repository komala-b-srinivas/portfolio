"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  // Phase 1: 0% – 35%: Identity & Visual Synthesis
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.32, 0.42], [0, 1, 1, 0]);
  const phase1Scale = useTransform(scrollYProgress, [0, 0.1], [1.1, 1]);
  const phase1Blur = useTransform(scrollYProgress, [0, 0.1], ["10px", "0px"]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.4], [0, -50]); // Parallax

  // Phase 2: 35% – 70%: Skills readout
  const phase2Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.65, 0.75], [0, 1, 1, 0]);
  const phase2Scale = useTransform(scrollYProgress, [0.38, 0.48], [0.95, 1]);

  // Phase 3: 70% – 100%: Call to action
  const phase3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const phase3Y = useTransform(scrollYProgress, [0.7, 0.8], [20, 0]);

  // Frame counter
  const frameNum = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const progressLabel = useMotionTemplate`SYNC: ${frameNum}%`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ────── BACKGROUND VISUAL SYNTHESIS ────── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase1Opacity,
          scale: phase1Scale,
          y: phase1Y,
          filter: `blur(${phase1Blur})`,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/hero-synthesis.png"
            alt="AI Human Synthesis"
            fill
            style={{ objectFit: "cover", opacity: 0.7 }}
            priority
          />
          {/* Energy Pulse Overlay */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.1, 1],
              filter: ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(0deg)"]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.2) 0%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Header Info */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--accent-cyan)", opacity: 0.6, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
          SYSTEM.CORE: NEURAL_BRIDGE
        </span>
        <span style={{ fontSize: "12px", letterSpacing: "0.1em", color: "white", fontWeight: 300, fontFamily: "var(--font-outfit)" }}>
          STATUS: OPTIMIZED
        </span>
      </div>

      <motion.div
        style={{
          position: "absolute",
          top: 80,
          right: 40,
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: "var(--accent-cyan)",
          fontFamily: "var(--font-outfit)",
          opacity: phase1Opacity,
          fontWeight: 600,
        }}
      >
        <motion.span>{progressLabel}</motion.span>
      </motion.div>

      {/* ────── PHASE 1: Identity ────── */}
      <motion.div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%",
          padding: "0 20px",
          opacity: phase1Opacity,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-glow"
          style={{
            fontSize: "13px",
            letterSpacing: "0.5em",
            color: "var(--accent-cyan)",
            marginBottom: "24px",
            fontFamily: "var(--font-outfit)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Neural Synthesis Engineering
        </motion.p>
        <h1
          style={{
            fontSize: "clamp(48px, 11vw, 130px)",
            fontWeight: 800,
            lineHeight: 0.85,
            color: "#fff",
            letterSpacing: "-0.05em",
            margin: "0 0 32px",
            fontFamily: "var(--font-outfit)",
            textShadow: "0 0 60px rgba(0, 242, 255, 0.4)",
          }}
        >
          KOMALA
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.3)",
            }}
          >
            BELUR SRINIVAS
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 300,
            fontFamily: "var(--font-outfit)",
          }}
        >
          Bridging the divide between organic intuition and machine precision 
          through <span className="text-glow" style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>visionary AI automation.</span>
        </p>
      </motion.div>

      {/* ────── PHASE 2: Capability Matrix ────── */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase2Opacity,
          scale: phase2Scale,
          width: "min(600px, 90vw)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
        }}
      >
        <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "12px", fontFamily: "var(--font-outfit)" }}>
            Capability Matrix
          </h2>
          <div style={{ width: "60px", height: "2px", background: "var(--accent-cyan)", margin: "0 auto 40px" }} />
        </div>

        {[
          { label: "Clinical NLP & Healthcare AI", value: "85%", desc: "HIPAA Compliant systems" },
          { label: "Multimodal Systems", value: "92%", desc: "Audio, Vision, and Text" },
          { label: "AI Production Pipelines", value: "88%", desc: "Scalable automation" },
          { label: "LLM Orchestration", value: "95%", desc: "Llama 3, GPT-4, Groq" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-panel"
            style={{ padding: "32px", borderRadius: "20px", textAlign: "left", position: "relative", overflow: "hidden" }}
          >
            <div style={{ fontSize: "11px", color: "var(--accent-cyan)", marginBottom: "12px", letterSpacing: "0.2em", fontWeight: 600 }}>
              MODULE_{i + 1}
            </div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "6px", fontFamily: "var(--font-outfit)" }}>
              {item.label}
            </div>
            <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.4)", marginBottom: "20px" }}>
              {item.desc}
            </div>
            <div style={{ height: "2px", background: "rgba(255, 255, 255, 0.05)", width: "100%", borderRadius: "100px", overflow: "hidden" }}>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: item.value }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ────── PHASE 3: Final CTA ────── */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: phase3Opacity,
          y: phase3Y,
          pointerEvents: "auto",
        }}
      >
        <p className="text-glow" style={{ fontSize: "14px", letterSpacing: "0.6em", color: "var(--accent-cyan)", marginBottom: "24px", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
          MISSION_READY
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 6vw, 72px)",
            fontWeight: 800,
            color: "white",
            marginBottom: "48px",
            fontFamily: "var(--font-outfit)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          Let&apos;s engineer the
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(0, 242, 255, 0.5)", textShadow: "0 0 30px rgba(0, 242, 255, 0.2)" }}>future of intelligence.</span>
        </h2>
        
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              padding: "18px 48px",
              background: "white",
              color: "black",
              borderRadius: "100px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explore Systems
          </a>
          <a
            href="mailto:komalsrinivas20@gmail.com"
            style={{
              padding: "18px 48px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            Initiate Contact
          </a>
        </div>
      </motion.div>

      {/* Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.9) 100%)",
          opacity: 0.9,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

