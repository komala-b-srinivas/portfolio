"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ── Mini canvas cube visual per card ──────────────────────────────────────────
function MiniCubeCanvas({ color1, color2 }: { color1: string; color2: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Isometric cube helpers
    const cx = W / 2;
    const cy = H * 0.48;
    const s = Math.min(W, H) * 0.22;

    // ISO projection: converts grid (col, row, z) to screen (x, y)
    function iso(col: number, row: number, z: number): [number, number] {
      return [
        cx + (col - row) * s,
        cy + (col + row) * s * 0.5 - z * s * 0.85,
      ];
    }

    // Draw one iso cube face
    function drawFace(
      pts: [number, number][],
      fill: string,
      stroke: string,
      opacity = 1
    ) {
      ctx!.save();
      ctx!.globalAlpha = opacity;
      ctx!.beginPath();
      ctx!.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i][0], pts[i][1]);
      ctx!.closePath();
      ctx!.fillStyle = fill;
      ctx!.fill();
      ctx!.strokeStyle = stroke;
      ctx!.lineWidth = 0.8;
      ctx!.stroke();
      ctx!.restore();
    }

    // Neural nodes
    const nodes: { x: number; y: number; r: number; phase: number }[] = [];
    for (let i = 0; i < 22; i++) {
      nodes.push({
        x: W * 0.1 + Math.random() * W * 0.8,
        y: H * 0.1 + Math.random() * H * 0.8,
        r: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frame: number;
    let t = 0;

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Dark bg gradient
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, H * 0.8);
      bg.addColorStop(0, "rgba(10,10,28,0.95)");
      bg.addColorStop(1, "rgba(4,4,12,0.98)");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      // Grid of iso cubes (3×2 cluster)
      const cubes: [number, number, number][] = [
        [0, 0, 0], [1, 0, 0], [-1, 0, 0],
        [0, 1, 0], [0, 0, 1],
      ];

      for (const [col, row, z] of cubes) {
        const a = iso(col, row, z + 1);
        const b = iso(col + 1, row, z + 1);
        const c = iso(col + 1, row + 1, z + 1);
        const d = iso(col, row + 1, z + 1);
        const e = iso(col, row, z);
        const f = iso(col + 1, row, z);
        const g = iso(col + 1, row + 1, z);
        const h = iso(col, row + 1, z);

        // Top
        drawFace([a, b, c, d], "rgba(15,15,40,0.8)", color1, 0.75);
        // Right
        drawFace([b, c, g, f], "rgba(8,8,22,0.7)", color2, 0.5);
        // Left
        drawFace([d, c, g, h], "rgba(5,5,16,0.7)", color1, 0.35);
      }

      // Glow base
      const baseGlow = ctx!.createRadialGradient(cx, H * 0.82, 0, cx, H * 0.82, W * 0.45);
      baseGlow.addColorStop(0, `${color1}22`);
      baseGlow.addColorStop(1, "transparent");
      ctx!.fillStyle = baseGlow;
      ctx!.fillRect(0, 0, W, H);

      // Neural network edges
      ctx!.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < W * 0.38) {
            const alpha = (1 - dist / (W * 0.38)) * 0.25;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = color1;
            ctx!.lineWidth = 0.6;
            ctx!.globalAlpha = alpha;
            ctx!.stroke();
          }
        }
      }
      ctx!.restore();

      // Neural nodes
      ctx!.save();
      for (const node of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + node.phase);
        ctx!.globalAlpha = 0.4 + pulse * 0.6;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx!.fillStyle = color1;
        ctx!.shadowColor = color1;
        ctx!.shadowBlur = 6 * pulse;
        ctx!.fill();
      }
      ctx!.restore();

      t += 0.016;
      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, [color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── Project data ──────────────────────────────────────────────────────────────
const featured = [
  {
    id: "01",
    title: "Rimon Health AI",
    subtitle: "AI Report Writer",
    description: "End-to-end clinical AI system automating neuropsych evaluation reports — reducing 3-hour work to 30 min.",
    tags: ["LLaMA 3.3-70B", "Whisper", "HIPAA", "Streamlit"],
    color1: "#00f2ff",
    color2: "#0090a0",
    status: "CURRENT",
    link: "#experience",
    patent: null,
  },
  {
    id: "02",
    title: "Rescue Robot",
    subtitle: "Patented Detection System",
    description: "Autonomous rescue robot with multi-sensor fusion for detecting living humans in disaster zones. German utility patent DPMA.",
    tags: ["Raspberry Pi", "Doppler Radar", "Computer Vision"],
    color1: "#f59e0b",
    color2: "#92400e",
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
    color1: "#bc13fe",
    color2: "#5b0f80",
    status: "RESEARCH",
    link: "#projects",
    patent: null,
  },
  {
    id: "04",
    title: "ER Triage AI",
    subtitle: "Clinical Decision Support",
    description: "Hybrid AI + rule-based triage system with near-100% recall for critical cases and human-in-the-loop design.",
    tags: ["XGBoost", "SHAP", "Clinical ML", "Safety AI"],
    color1: "#00f2ff",
    color2: "#004455",
    status: "AUG 2025",
    link: "#projects",
    patent: null,
  },
];

// ── Card component ────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof featured)[0];
  index: number;
}) {
  const isPatent = project.patent !== null;
  const accentColor = isPatent ? "#f59e0b" : project.color1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{ flex: "1 1 0", minWidth: 0, cursor: "pointer" }}
    >
      <a
        href={project.link}
        target={project.link.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        <div
          style={{
            height: "100%",
            background: "rgba(10,10,24,0.7)",
            backdropFilter: "blur(20px)",
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: "16px",
            overflow: "hidden",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${accentColor}55`;
            e.currentTarget.style.boxShadow = `0 0 32px ${accentColor}18, 0 20px 60px rgba(0,0,0,0.5)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Top accent bar */}
          <div style={{
            height: "2px",
            background: `linear-gradient(90deg, ${project.color1}, ${project.color2})`,
          }} />

          {/* Cube visual */}
          <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
            <MiniCubeCanvas color1={project.color1} color2={project.color2} />

            {/* Status badge */}
            <div style={{
              position: "absolute", top: "14px", left: "14px",
              fontSize: "9px", letterSpacing: "0.18em",
              color: accentColor,
              border: `1px solid ${accentColor}60`,
              padding: "3px 10px", borderRadius: "4px",
              fontWeight: 800, background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
            }}>
              {project.status}
            </div>

            {/* Patent badge */}
            {project.patent && (
              <div style={{
                position: "absolute", bottom: "14px", right: "14px",
                fontSize: "9px", color: "#f59e0b",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                padding: "3px 10px", borderRadius: "4px",
                fontWeight: 700, backdropFilter: "blur(6px)",
              }}>
                {project.patent}
              </div>
            )}
          </div>

          {/* Card content */}
          <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{
              fontSize: "11px", color: accentColor,
              textTransform: "uppercase", letterSpacing: "0.15em",
              fontWeight: 700, marginBottom: "8px",
            }}>
              {project.subtitle}
            </div>
            <h3 style={{
              fontSize: "20px", fontWeight: 800, color: "white",
              marginBottom: "12px", letterSpacing: "-0.02em",
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: "13.5px", color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65, marginBottom: "20px", flex: 1,
            }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: "10px", color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "3px 9px", borderRadius: "4px",
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div style={{
              display: "flex", justifyContent: "flex-end",
              color: accentColor, fontSize: "18px",
            }}>
              ↗
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "120px 0 100px", position: "relative" }}>
      {/* Section bg glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(0,242,255,0.025) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5%" }}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "24px",
          }}
        >
          <div>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "14px", marginBottom: "12px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#bc13fe", boxShadow: "0 0 8px #bc13fe",
              }} />
              <span style={{
                fontSize: "11px", color: "#bc13fe",
                letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700,
              }}>
                Featured Projects
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 900, color: "white",
              letterSpacing: "-0.04em", margin: 0,
              lineHeight: 1.1,
            }}>
              Some Things I&apos;ve{" "}
              <span style={{ color: "#00f2ff", textShadow: "0 0 30px rgba(0,242,255,0.3)" }}>
                Built
              </span>
            </h2>
          </div>

          <motion.a
            href="#experience"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontSize: "13px", color: "rgba(255,255,255,0.6)",
              fontWeight: 600, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "10px 22px", borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            whileHover={{
              color: "#00f2ff",
              borderColor: "rgba(0,242,255,0.3)",
            }}
          >
            View All Projects →
          </motion.a>
        </motion.div>

        {/* 4-column card grid */}
        <div style={{
          display: "flex",
          gap: "20px",
          alignItems: "stretch",
        }}>
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
