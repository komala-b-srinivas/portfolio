"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ── Static isometric cube canvas — drawn ONCE, no animation loop ─────────────
// Animated nodes handled via CSS (zero canvas overhead)
function MiniCubeCanvas({ color1, color2 }: { color1: string; color2: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H * 0.55;
    const TW = W * 0.14;
    const TH = TW * 0.5;
    const TZ = TW * 0.9;

    function g2s(gx: number, gy: number, gz: number): [number, number] {
      return [cx + (gx - gy) * TW, cy + (gx + gy) * TH - gz * TZ];
    }

    function face(pts: [number,number][], fill: string, stroke: string, sw: number, ga: number) {
      ctx.save();
      ctx.globalAlpha = ga;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (sw > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = sw;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawCube(gx: number, gy: number, gz: number, accent: string, bright: boolean) {
      const TLt = g2s(gx,   gy,   gz+1);
      const TRt = g2s(gx+1, gy,   gz+1);
      const BRt = g2s(gx+1, gy+1, gz+1);
      const BLt = g2s(gx,   gy+1, gz+1);
      const TRb = g2s(gx+1, gy,   gz);
      const BRb = g2s(gx+1, gy+1, gz);
      const BLb = g2s(gx,   gy+1, gz);
      const ew = bright ? 1.1 : 0.7;
      const ea = bright ? 0.9 : 0.5;
      face([TLt,TRt,BRt,BLt], "rgba(10,10,30,0.93)", accent, ew, ea);
      face([TRt,BRt,BRb,TRb], "rgba(6,6,18,0.95)",   accent, ew*0.7, ea*0.65);
      face([BRt,BLt,BLb,BRb], "rgba(4,4,14,0.97)",   accent, ew*0.4, ea*0.38);
    }

    // --- Background ---
    const bg = ctx.createRadialGradient(cx, cy*0.7, 0, cx, H*0.5, H);
    bg.addColorStop(0, "rgba(8,8,24,1)");
    bg.addColorStop(1, "rgba(3,3,10,1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // --- Base glow ---
    const pg = ctx.createRadialGradient(cx, H*0.85, 0, cx, H*0.85, W*0.5);
    pg.addColorStop(0, `${color1}28`);
    pg.addColorStop(1, "transparent");
    ctx.fillStyle = pg;
    ctx.fillRect(0, 0, W, H);

    // --- Cubes (painter's order) ---
    const cubes: [number,number,number,boolean][] = [
      [-1,2,0,false],[0,2,0,false],
      [-1,1,0,false],[0,1,0,false],[1,1,0,false],
      [-1,0,0,false],[0,0,0,false],[1,0,0,false],
      [-1,0,1,false],[0,0,1,false],
      [-1,1,1,true], [0,1,1,false],
      [-1,0,2,true],
      [-1,1,2,true],
      [-1,0,3,true],
    ];
    const sorted = [...cubes].sort((a,b) => (a[0]+a[1])-(b[0]+b[1]));
    for (const [gx,gy,gz,bright] of sorted) {
      drawCube(gx, gy, gz, bright ? color1 : color2, bright);
    }

    // --- Static neural edges (pre-seeded, no random in draw) ---
    const seed = color1.charCodeAt(1); // deterministic per card
    const nNodes = 18;
    const nodeData: [number,number][] = [];
    for (let i = 0; i < nNodes; i++) {
      // deterministic positions using simple hash
      const h = (seed * 37 + i * 73 + i * i * 13) % 10000;
      nodeData.push([W * 0.08 + (h % 84) / 100 * W * 0.84,
                     H * 0.08 + ((h * 17) % 84) / 100 * H * 0.84]);
    }

    // Edges
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.lineWidth = 0.7;
    for (let i = 0; i < nodeData.length; i++) {
      for (let j = i+1; j < nodeData.length; j++) {
        const dx = nodeData[i][0] - nodeData[j][0];
        const dy = nodeData[i][1] - nodeData[j][1];
        const d = Math.hypot(dx,dy);
        if (d < W * 0.4) {
          ctx.globalAlpha = (1 - d/(W*0.4)) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodeData[i][0], nodeData[i][1]);
          ctx.lineTo(nodeData[j][0], nodeData[j][1]);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Nodes — draw once (static), no shadowBlur (expensive)
    for (let i = 0; i < nodeData.length; i++) {
      const [nx, ny] = nodeData[i];
      const big = i < 5;
      const r = big ? 2.8 : 1.6;
      // Outer soft halo (no shadowBlur — use larger transparent arc instead)
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = color1;
      ctx.beginPath(); ctx.arc(nx, ny, r*4, 0, Math.PI*2); ctx.fill();
      // Core
      ctx.globalAlpha = big ? 0.95 : 0.7;
      ctx.fillStyle = big ? color1 : (i%3===0 ? color2 : color1);
      ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    }
    // Draw once — no animation loop needed
  }, [color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// Lightweight CSS-animated pulse dots overlay (replaces canvas animation loop)
function PulseDots({ color }: { color: string }) {
  const positions = [
    { left: "15%", top: "20%", delay: "0s" },
    { left: "72%", top: "35%", delay: "0.6s" },
    { left: "40%", top: "65%", delay: "1.1s" },
    { left: "80%", top: "70%", delay: "0.3s" },
    { left: "25%", top: "78%", delay: "1.5s" },
    { left: "60%", top: "15%", delay: "0.9s" },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: "5px", height: "5px",
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}60`,
            animation: `nodePulse 2.4s ease-in-out infinite`,
            animationDelay: p.delay,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

// ── Project data ──────────────────────────────────────────────────────────────
const featured = [
  {
    id: "01",
    title: "Rimon Health AI",
    subtitle: "AI Report Writer",
    description: "End-to-end clinical AI system automating neuropsych evaluation reports, reducing 3-hour work to 30 min.",
    tags: ["LLaMA 3.3-70B", "Whisper", "HIPAA", "Streamlit"],
    color1: "#00f2ff",
    color2: "#0090a0",
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
    link: "https://github.com/komala-b-srinivas?tab=repositories",
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
    link: "https://github.com/komala-b-srinivas?tab=repositories",
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
            <PulseDots color={accentColor} />

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
            href="https://github.com/komala-b-srinivas?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
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
