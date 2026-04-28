"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ── Premium isometric cube canvas for project cards ───────────────────────────
function MiniCubeCanvas({ color1, color2 }: { color1: string; color2: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H * 0.54;
    // Tile size — bigger for more visible cubes
    const TW = W * 0.155; // horizontal half-width
    const TH = TW * 0.5;  // vertical half-height (2:1 iso ratio)
    const TZ = TW * 0.92; // vertical step per z-level

    // Isometric projection: grid (gx, gy) → screen (x, y) at elevation gz
    function g2s(gx: number, gy: number, gz: number): [number, number] {
      return [
        cx + (gx - gy) * TW,
        cy + (gx + gy) * TH - gz * TZ,
      ];
    }

    // Draw a filled polygon face
    function poly(pts: [number,number][], fill: string, stroke: string, sw: number, ga: number) {
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
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    // Draw a single isometric cube at (gx, gy, gz)
    function drawCube(gx: number, gy: number, gz: number, accent: string, bright: boolean) {
      // 8 corners: (x, y) combinations for top and bottom faces
      const [TLt, TRt, BRt, BLt] = [
        g2s(gx,   gy,   gz+1),
        g2s(gx+1, gy,   gz+1),
        g2s(gx+1, gy+1, gz+1),
        g2s(gx,   gy+1, gz+1),
      ];
      const [TRb, BRb, BLb] = [
        g2s(gx+1, gy,   gz),
        g2s(gx+1, gy+1, gz),
        g2s(gx,   gy+1, gz),
      ];

      const opacity = bright ? 0.8 : 0.55;
      const edgeOpacity = bright ? 1.0 : 0.55;
      const edgeWidth = bright ? 1.2 : 0.8;

      // Top face — brightest
      poly([TLt,TRt,BRt,BLt], "rgba(10,10,30,0.92)", accent, edgeWidth, opacity);
      // Right face — medium
      poly([TRt,BRt,BRb,TRb], "rgba(6,6,18,0.95)", accent, edgeWidth * 0.7, edgeOpacity * 0.7);
      // Left face — darkest
      poly([BRt,BLt,BLb,BRb], "rgba(4,4,14,0.97)", accent, edgeWidth * 0.5, edgeOpacity * 0.45);
    }

    // Cube layout: (gx, gy, gz, isBright)
    const cubes: [number, number, number, boolean][] = [
      // Base layer
      [-1, 0, 0, false], [0, 0, 0, false], [1, 0, 0, false],
      [-1, 1, 0, false], [0, 1, 0, false], [1, 1, 0, false],
      [-1, 2, 0, false], [0, 2, 0, false],
      // Second layer
      [-1, 0, 1, false], [0, 0, 1, false],
      [-1, 1, 1, true],  [0, 1, 1, false],
      // Third layer
      [-1, 0, 2, false],
      [-1, 1, 2, true],
      // Top lone cube
      [-1, 0, 3, true],
    ];

    // Neural nodes — positioned in image space
    const nodeCount = 28;
    const nodes: { x: number; y: number; phase: number; big: boolean }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: W * 0.06 + Math.random() * W * 0.88,
        y: H * 0.06 + Math.random() * H * 0.88,
        phase: Math.random() * Math.PI * 2,
        big: i < 6,
      });
    }

    // Draw a glowing node (fake bloom: 3 layers)
    function drawNode(x: number, y: number, r: number, col: string, alpha: number) {
      ctx.save();
      // Outer bloom
      ctx.globalAlpha = alpha * 0.12;
      ctx.shadowColor = col; ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(x, y, r * 5, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      // Mid bloom
      ctx.globalAlpha = alpha * 0.28;
      ctx.beginPath(); ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      // Core
      ctx.globalAlpha = alpha;
      ctx.shadowColor = col; ctx.shadowBlur = r * 8;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      ctx.restore();
    }

    let frame: number;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // === Background ===
      const bg = ctx.createRadialGradient(cx, cy * 0.8, 0, cx, H * 0.5, H);
      bg.addColorStop(0, "rgba(8,8,24,1)");
      bg.addColorStop(0.5, "rgba(5,5,16,1)");
      bg.addColorStop(1, "rgba(3,3,10,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // === Base platform glow ===
      const platY = cy + TH * 3;
      const platGrad = ctx.createRadialGradient(cx, platY, 0, cx, platY, W * 0.55);
      platGrad.addColorStop(0, `${color1}30`);
      platGrad.addColorStop(0.5, `${color1}10`);
      platGrad.addColorStop(1, "transparent");
      ctx.fillStyle = platGrad;
      ctx.fillRect(0, 0, W, H);

      // === Cubes (back to front — painter's algorithm) ===
      // Sort by gx+gy (front cubes drawn last)
      const sorted = [...cubes].sort((a, b) => (a[0]+a[1]) - (b[0]+b[1]));
      for (const [gx, gy, gz, bright] of sorted) {
        drawCube(gx, gy, gz, bright ? color1 : color2, bright);
      }

      // === Neural edges ===
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          const maxDist = W * 0.42;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const pulse = 0.7 + 0.3 * Math.sin(t * 0.8 + nodes[i].phase);
            ctx.globalAlpha = alpha * pulse;
            ctx.strokeStyle = color1;
            ctx.lineWidth = 0.7;
            ctx.shadowColor = color1;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // === Neural nodes with fake bloom ===
      for (const node of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.8 + node.phase);
        const r = node.big ? 2.5 + pulse * 1.5 : 1.5 + pulse * 1.0;
        const alpha = 0.55 + pulse * 0.45;
        const col = node.big ? color1 : (Math.random() > 0.7 ? color2 : color1);
        drawNode(node.x, node.y, r, col, alpha);
      }

      t += 0.018;
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
