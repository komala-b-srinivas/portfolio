"use client";

import { MotionValue, motion, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HeroHUD({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const cubeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8%",
        maxWidth: "1800px",
        margin: "0 auto",
      }}
    >
      <motion.div
        style={{
          opacity,
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {/* LEFT SIDE: MINIMAL TEXT */}
        <motion.div
          style={{ x: textX, flex: 1, textAlign: "left" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            style={{
              fontSize: "14px",
              letterSpacing: "0.5em",
              color: "var(--accent-teal)",
              marginBottom: "24px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
            className="glow-teal"
          >
            AI SYSTEM ARCHITECT
          </motion.p>
          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 110px)",
              fontWeight: 900,
              lineHeight: 0.9,
              color: "#fff",
              letterSpacing: "-0.04em",
              margin: "0 0 32px",
            }}
          >
            Building
            <br />
            <span className="text-gradient">Intelligent</span>
            <br />
            Systems.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.2vw, 19px)",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              margin: "0 0 48px",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            I architect AI-powered solutions and scalable systems
            that solve real-world problems.
          </p>

          <div style={{ display: "flex", gap: "24px", pointerEvents: "auto" }}>
            <a href="#projects" className="btn-neon">
              View My Work
              <span style={{ fontSize: "18px" }}>→</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: "14px 32px",
                border: "1px solid var(--border)",
                color: "white",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--accent-teal)")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: 3D MASTER CUBE */}
        <motion.div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotateZ: [-2, 2, -2]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              width: "min(600px, 45vw)",
              height: "min(600px, 45vw)",
              position: "relative",
              filter: "drop-shadow(0 0 30px rgba(0, 242, 255, 0.2))",
            }}
          >
            <Image
              src="/hero-neural.png"
              alt="Neural Architecture Hub"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
            {/* Core Glow Pulse */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: "20%",
                background: "radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)",
                zIndex: -1,
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SYSTEM STATUS */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: 0.4,
        }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-teal)", boxShadow: "0 0 10px var(--accent-teal)" }} />
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", fontWeight: 700, color: "var(--accent-teal)" }}>
          SYSTEM CORE ACTIVE
        </span>
      </motion.div>
    </div>
  );
}

