"use client";

import { useRef, useEffect } from "react";

// ── Virtual canvas space ────────────────────────────────────────────────────
const VW = 760;
const VH = 460;
const NW  = 114; // node width
const NH  = 38;  // node height
const PAD = 38;  // horizontal padding

type Pipeline = {
  label: string;
  color: string;
  nodes: string[];
  rowY: number;
};

const PIPELINES: Pipeline[] = [
  {
    label: "CLINICAL AI  ·  RIMON HEALTH",
    color: "#00f2ff",
    nodes: ["Audio Input", "Whisper ASR", "LLaMA Vision", "LLaMA 3.3-70B", "Eval Report"],
    rowY: 100,
  },
  {
    label: "PAIN DETECTION  ·  EMPATH",
    color: "#bc13fe",
    nodes: ["Biosignals", "Random Forest", "MAML", "Pain Score"],
    rowY: 248,
  },
  {
    label: "ER TRIAGE AI  ·  CLINICAL DECISION SUPPORT",
    color: "#f59e0b",
    nodes: ["MIMIC-III", "XGBoost", "Safety Check", "ESI Triage"],
    rowY: 396,
  },
];

// x-center of node i in a given nodes array
function cx(nodes: string[], i: number): number {
  const available = VW - 2 * PAD;
  const gap = (available - nodes.length * NW) / (nodes.length - 1);
  return PAD + i * (NW + gap) + NW / 2;
}

// manual roundRect (ctx.roundRect not in all browsers)
function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

type Dot = { pi: number; ei: number; t: number; speed: number };

export default function HeroPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const fpsRef    = useRef(0);
  const dots      = useRef<Dot[]>([]);

  // seed particles once
  useEffect(() => {
    const d: Dot[] = [];
    PIPELINES.forEach((pl, pi) => {
      for (let ei = 0; ei < pl.nodes.length - 1; ei++) {
        for (let k = 0; k < 3; k++) {
          d.push({ pi, ei, t: k / 3, speed: 0.007 + Math.random() * 0.004 });
        }
      }
    });
    dots.current = d;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width  = rect.width  * dpr;
      canvas!.height = rect.height * dpr;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function draw(ts: number) {
      if (ts - fpsRef.current < 33) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      fpsRef.current = ts;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const CW  = canvas!.width  / dpr;
      const CH  = canvas!.height / dpr;
      const sx  = CW / VW;
      const sy  = CH / VH;

      ctx.setTransform(sx * dpr, 0, 0, sy * dpr, 0, 0);

      // ── Background ─────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(3,3,10,1)";
      ctx.fillRect(0, 0, VW, VH);

      // subtle dot grid
      ctx.save();
      for (let gx = 0; gx <= VW; gx += 38) {
        for (let gy = 0; gy <= VH; gy += 38) {
          ctx.fillStyle = "rgba(0,242,255,0.06)";
          ctx.beginPath();
          ctx.arc(gx, gy, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ── Pipelines ──────────────────────────────────────────────────────────
      PIPELINES.forEach((pl) => {
        const { label, color, nodes, rowY } = pl;

        // row label
        ctx.save();
        ctx.font      = "600 8.5px -apple-system, system-ui, sans-serif";
        ctx.fillStyle = `${color}60`;
        ctx.fillText(label, PAD, rowY - NH / 2 - 11);
        ctx.restore();

        // edges + arrows
        for (let i = 0; i < nodes.length - 1; i++) {
          const x1 = cx(nodes, i)     + NW / 2;
          const x2 = cx(nodes, i + 1) - NW / 2;
          const y  = rowY;

          ctx.save();
          ctx.strokeStyle = `${color}20`;
          ctx.lineWidth   = 1.5;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2 - 9, y);
          ctx.stroke();
          // arrowhead
          ctx.setLineDash([]);
          ctx.fillStyle = `${color}50`;
          ctx.beginPath();
          ctx.moveTo(x2,     y);
          ctx.lineTo(x2 - 9, y - 4);
          ctx.lineTo(x2 - 9, y + 4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // nodes
        nodes.forEach((name, i) => {
          const ncx  = cx(nodes, i);
          const nx   = ncx - NW / 2;
          const ny   = rowY - NH / 2;
          const isIn  = i === 0;
          const isOut = i === nodes.length - 1;

          ctx.save();

          // glow behind output node
          if (isOut) {
            const g = ctx.createRadialGradient(ncx, rowY, 0, ncx, rowY, 56);
            g.addColorStop(0, `${color}22`);
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(ncx, rowY, 56, 0, Math.PI * 2);
            ctx.fill();
          }

          // fill
          rr(ctx, nx, ny, NW, NH, 7);
          if (isOut) {
            const g = ctx.createLinearGradient(nx, ny, nx + NW, ny);
            g.addColorStop(0, `${color}30`);
            g.addColorStop(1, `${color}12`);
            ctx.fillStyle = g;
          } else {
            ctx.fillStyle = isIn
              ? "rgba(16,16,38,0.95)"
              : "rgba(10,10,26,0.95)";
          }
          ctx.fill();

          // border
          rr(ctx, nx, ny, NW, NH, 7);
          ctx.strokeStyle = isOut
            ? color
            : `${color}${isIn ? "55" : "28"}`;
          ctx.lineWidth = isOut ? 1.5 : 0.9;
          ctx.stroke();

          // text
          ctx.font      = `${isOut ? "700" : "500"} 10px -apple-system, system-ui, sans-serif`;
          ctx.fillStyle = isOut
            ? color
            : isIn
            ? "rgba(255,255,255,0.80)"
            : "rgba(255,255,255,0.50)";
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(name, ncx, rowY);

          ctx.restore();
        });
      });

      // ── Particles ──────────────────────────────────────────────────────────
      dots.current.forEach(d => {
        const pl    = PIPELINES[d.pi];
        const { nodes, rowY, color } = pl;
        const x1    = cx(nodes, d.ei)     + NW / 2;
        const x2    = cx(nodes, d.ei + 1) - NW / 2 - 9;
        const px    = x1 + (x2 - x1) * d.t;

        ctx.save();
        // halo
        ctx.globalAlpha = 0.22;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(px, rowY, 5.5, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.globalAlpha = 1;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(px, rowY, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        d.t += d.speed;
        if (d.t > 1) d.t = 0;
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        borderRadius: "16px",
        border: "1px solid rgba(0,242,255,0.08)",
      }}
    />
  );
}
