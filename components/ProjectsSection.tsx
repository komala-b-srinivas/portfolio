"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ── Mini canvas visual per card ───────────────────────────────────────────────
function CardCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = "oklch(0.06 0 0)";
    ctx.fillRect(0, 0, W, H);

    // Glow blob
    const grd = ctx.createRadialGradient(W * 0.5, H * 0.6, 0, W * 0.5, H * 0.5, W * 0.7);
    grd.addColorStop(0, color + "22");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Nodes
    const seed = color.charCodeAt(1);
    const count = 14;
    const nodes: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const h = (seed * 37 + i * 73 + i * i * 13) % 10000;
      nodes.push([W * 0.1 + (h % 80) / 100 * W * 0.8, H * 0.1 + ((h * 17) % 80) / 100 * H * 0.8]);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]);
        if (d < W * 0.5) {
          ctx.globalAlpha = (1 - d / (W * 0.5)) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i][0], nodes[i][1]);
          ctx.lineTo(nodes[j][0], nodes[j][1]);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const r = i < 4 ? 2.5 : 1.4;
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(nodes[i][0], nodes[i][1], r * 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = i < 4 ? 0.9 : 0.55;
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(nodes[i][0], nodes[i][1], r, 0, Math.PI * 2); ctx.fill();
    }
  }, [color]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

const featured = [
  {
    id: "01",
    title: "Rimon Health AI",
    subtitle: "AI Report Writer",
    description: "End-to-end clinical AI system automating neuropsych evaluation reports, reducing 3-hour work to 30 min.",
    tags: ["LLaMA 3.3-70B", "Whisper", "HIPAA", "Streamlit"],
    color: "#a78bfa",
    status: "CURRENT",
    link: "https://github.com/komala-b-srinivas?tab=repositories",
    patent: null,
  },
  {
    id: "02",
    title: "Rescue Robot",
    subtitle: "Patented Detection System",
    description: "Autonomous rescue robot with multi-sensor fusion for detecting living humans in disaster zones. German utility patent DPMA.",
    tags: ["Raspberry Pi", "Doppler Radar", "Computer Vision"],
    color: "#fbbf24",
    status: "PATENTED",
    link: "https://register.dpma.de/DPMAregister/pat/register?AKZ=2020251066211&CURSOR=0",
    patent: "DE 20 2025 106 621",
  },
  {
    id: "03",
    title: "EmPath",
    subtitle: "Pain Detection System",
    description: "Stacked ensemble multimodal system detecting pain intensity in non-verbal patients. 65.3% acc, AUC-ROC 0.719.",
    tags: ["PyTorch", "MAML", "SHAP", "MediaPipe"],
    color: "#60a5fa",
    status: "RESEARCH",
    link: "https://github.com/komala-b-srinivas?tab=repositories",
    patent: null,
  },
  {
    id: "04",
    title: "ER Triage AI",
    subtitle: "Clinical Decision Support",
    description: "Hybrid AI + rule-based triage system with near-100% recall for critical cases and human-in-the-loop design.",
    tags: ["XGBoost", "SHAP", "Clinical ML", "Safety AI"],
    color: "#34d399",
    status: "AUG 2025",
    link: "https://github.com/komala-b-srinivas?tab=repositories",
    patent: null,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "120px 0 100px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <div className="section-badge" style={{ marginBottom: "20px" }}>
            <span className="dot" />
            Featured Projects
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
            <h2 className="text-glass" style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}>
              Some Things<br />
              <span style={{ fontStyle: "italic" }}>I&apos;ve Built</span>
            </h2>
            <a
              href="https://github.com/komala-b-srinivas?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "oklch(1 0 0 / 55%)",
                textDecoration: "none",
                border: "1px solid oklch(1 0 0 / 14%)",
                padding: "10px 20px",
                borderRadius: "9999px",
                transition: "all 0.2s ease",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 30%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 55%)";
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 14%)";
              }}
            >
              View All →
            </a>
          </div>
        </motion.div>

        {/* Card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}>
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div
                  className="glass-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 28%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 14%)";
                  }}
                >
                  {/* Top accent line */}
                  <div style={{ height: "2px", background: project.color, opacity: 0.6 }} />

                  {/* Canvas visual */}
                  <div style={{ height: "160px", position: "relative", overflow: "hidden" }}>
                    <CardCanvas color={project.color} />

                    {/* Status badge */}
                    <div style={{
                      position: "absolute", top: "12px", left: "12px",
                      fontSize: "9px", letterSpacing: "0.15em",
                      fontFamily: "var(--font-sans), sans-serif",
                      fontWeight: 700,
                      color: project.color,
                      border: `1px solid ${project.color}55`,
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      background: "oklch(0 0 0 / 60%)",
                      backdropFilter: "blur(8px)",
                    }}>
                      {project.status}
                    </div>

                    {project.patent && (
                      <div style={{
                        position: "absolute", bottom: "12px", right: "12px",
                        fontSize: "9px",
                        fontFamily: "var(--font-sans), sans-serif",
                        fontWeight: 600,
                        color: "#fbbf24",
                        background: "oklch(0 0 0 / 70%)",
                        border: "1px solid #fbbf2444",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        backdropFilter: "blur(8px)",
                      }}>
                        {project.patent}
                      </div>
                    )}
                  </div>

                  {/* Text content */}
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: project.color,
                      marginBottom: "6px",
                      opacity: 0.85,
                    }}>
                      {project.subtitle}
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "oklch(1 0 0)",
                      margin: "0 0 10px",
                      letterSpacing: "-0.02em",
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "13px",
                      color: "oklch(1 0 0 / 50%)",
                      lineHeight: 1.65,
                      marginBottom: "16px",
                      flex: 1,
                      fontWeight: 400,
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: "10px",
                          color: "oklch(1 0 0 / 40%)",
                          background: "oklch(1 0 0 / 4%)",
                          border: "1px solid oklch(1 0 0 / 8%)",
                          padding: "3px 9px",
                          borderRadius: "9999px",
                          fontWeight: 500,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "oklch(1 0 0 / 25%)",
                      fontSize: "16px",
                    }}>
                      ↗
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
