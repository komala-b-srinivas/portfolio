"use client";
import { useRef, useEffect } from "react";

const VW = 760, VH = 480;
const TEAL = "#00f2ff", PURPLE = "#bc13fe";

// Fingertip positions
const AI_TIP  = { x: 328, y: 245 };
const HU_TIP  = { x: 432, y: 245 };
const GLOW_C  = { x: 380, y: 245 };

// Badges floating around the AI hand (above + below the finger)
const BADGES = [
  { label: "LLaMA 3.3-70B",  bx:  68, by:  85, phase: 0.0 },
  { label: "Whisper ASR",     bx: 185, by:  60, phase: 0.5 },
  { label: "Clinical NLP",    bx:  55, by: 155, phase: 1.0 },
  { label: "HIPAA Compliant", bx: 255, by:  82, phase: 1.5 },
  { label: "BASC-3",          bx: 130, by: 145, phase: 2.0 },
  { label: "PyTorch / MAML",  bx:  45, by: 335, phase: 2.5 },
  { label: "SHAP / XAI",     bx: 190, by: 400, phase: 3.0 },
  { label: "Random Forest",   bx:  95, by: 390, phase: 3.5 },
  { label: "XGBoost",         bx: 290, by: 375, phase: 4.0 },
  { label: "German Patent",   bx: 230, by: 150, phase: 4.5 },
  { label: "80% Reduction",   bx: 305, by: 310, phase: 5.0 },
  { label: "38 Reports/wk",   bx:  50, by: 270, phase: 5.5 },
];

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; fromAI: boolean;
};

function pill(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(cx - w / 2 + r, cy - h / 2);
  ctx.lineTo(cx + w / 2 - r, cy - h / 2);
  ctx.arcTo(cx + w / 2, cy - h / 2, cx + w / 2, cy - h / 2 + r, r);
  ctx.lineTo(cx + w / 2, cy + h / 2 - r);
  ctx.arcTo(cx + w / 2, cy + h / 2, cx + w / 2 - r, cy + h / 2, r);
  ctx.lineTo(cx - w / 2 + r, cy + h / 2);
  ctx.arcTo(cx - w / 2, cy + h / 2, cx - w / 2, cy + h / 2 - r, r);
  ctx.lineTo(cx - w / 2, cy - h / 2 + r);
  ctx.arcTo(cx - w / 2, cy - h / 2, cx - w / 2 + r, cy - h / 2, r);
  ctx.closePath();
}

export default function HeroHands() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const fpsRef    = useRef(0);
  const pts       = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let dpr = 1, scale = 1;

    function resize() {
      dpr   = Math.min(devicePixelRatio || 1, 2);
      const parent = canvas.parentElement!;
      scale = Math.min(parent.clientWidth / VW, parent.clientHeight / VH);
      canvas.style.width  = VW * scale + "px";
      canvas.style.height = VH * scale + "px";
      canvas.width  = VW * scale * dpr;
      canvas.height = VH * scale * dpr;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Spawn particles from each fingertip toward glow center ─────────────
    function spawn(fromAI: boolean) {
      const src = fromAI ? AI_TIP : HU_TIP;
      const angle = Math.atan2(GLOW_C.y - src.y, GLOW_C.x - src.x);
      const a = angle + (Math.random() - 0.5) * 0.25;
      const speed = 0.6 + Math.random() * 1.0;
      pts.current.push({
        x: src.x + (Math.random() - 0.5) * 5,
        y: src.y + (Math.random() - 0.5) * 5,
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        life: 0, maxLife: 55 + Math.random() * 35, fromAI,
      });
    }

    // ── AI (robot) finger — left side pointing right ───────────────────────
    function drawAIFinger(T: number) {
      const tip = AI_TIP;
      const BX = 20, BY = 245;
      const pulse = 0.5 + 0.5 * Math.sin(T * 2.2);
      ctx.save();

      // Background glow along finger
      const g = ctx.createLinearGradient(BX, 0, tip.x + 20, 0);
      g.addColorStop(0, "transparent");
      g.addColorStop(1, TEAL + "16");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(BX, BY - 32);
      ctx.lineTo(tip.x - 6, tip.y - 6);
      ctx.lineTo(tip.x, tip.y);
      ctx.lineTo(tip.x - 6, tip.y + 6);
      ctx.lineTo(BX, BY + 32);
      ctx.closePath();
      ctx.fill();

      // Three robotic segments with visible joint gaps
      const segs = [
        { x1: BX,                            x2: BX + (tip.x - BX) * 0.32, h1: 26, h2: 20 },
        { x1: BX + (tip.x - BX) * 0.35,     x2: BX + (tip.x - BX) * 0.63, h1: 19, h2: 14 },
        { x1: BX + (tip.x - BX) * 0.66,     x2: tip.x - 3,                 h1: 13, h2: 6  },
      ];

      segs.forEach((s, i) => {
        // Segment fill
        ctx.beginPath();
        ctx.moveTo(s.x1, BY - s.h1 / 2);
        ctx.lineTo(s.x2, BY - s.h2 / 2);
        ctx.lineTo(s.x2, BY + s.h2 / 2);
        ctx.lineTo(s.x1, BY + s.h1 / 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(0,242,255,${0.04 + i * 0.025})`;
        ctx.fill();
        ctx.strokeStyle = TEAL + Math.round((0.38 + pulse * 0.22) * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Horizontal panel line across middle of each segment
        const mx = (s.x1 + s.x2) / 2;
        const mh = (s.h1 + s.h2) / 4;
        ctx.beginPath();
        ctx.moveTo(s.x1 + 6, BY - mh);
        ctx.lineTo(s.x2 - 6, BY - mh);
        ctx.strokeStyle = TEAL + "22";
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Joint dot at end of each segment
        if (i < 2) {
          ctx.save();
          ctx.beginPath(); ctx.arc(s.x2 + 2, BY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = TEAL;
          ctx.shadowColor = TEAL; ctx.shadowBlur = 8;
          ctx.fill(); ctx.restore();
        }
      });

      // Circuit whiskers off first segment
      const cPoints = [
        { cx: BX + 55, topY: BY - 13, dx: -18 },
        { cx: BX + 90, topY: BY - 13, dx:  14 },
        { cx: BX + 55, topY: BY + 13, dx:  16 },
        { cx: BX + 90, topY: BY + 13, dx: -12 },
      ];
      cPoints.forEach(({ cx, topY, dx }) => {
        ctx.save();
        ctx.strokeStyle = TEAL + "30";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, topY);
        ctx.lineTo(cx, topY + (topY < BY ? -16 : 16));
        ctx.lineTo(cx + dx, topY + (topY < BY ? -16 : 16));
        ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + dx, topY + (topY < BY ? -16 : 16), 1.5, 0, Math.PI * 2);
        ctx.fillStyle = TEAL + "60"; ctx.fill();
        ctx.restore();
      });

      // Fingertip glow
      const fg = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 22);
      fg.addColorStop(0, TEAL + Math.round((0.35 + pulse * 0.2) * 255).toString(16).padStart(2, "0"));
      fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg;
      ctx.beginPath(); ctx.arc(tip.x, tip.y, 22, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    }

    // ── Human hand — right side pointing left ──────────────────────────────
    function drawHumanFinger(T: number) {
      const tip = HU_TIP;
      const BX = VW - 20, BY = 245;
      const pulse = 0.5 + 0.5 * Math.sin(T * 2.2 + 1.1);
      ctx.save();

      // Soft background glow
      const g = ctx.createLinearGradient(tip.x - 20, 0, BX, 0);
      g.addColorStop(0, `rgba(255,255,255,${0.07 + pulse * 0.03})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(tip.x + 6, tip.y - 6);
      ctx.lineTo(BX, BY - 28);
      ctx.lineTo(BX, BY + 28);
      ctx.lineTo(tip.x + 6, tip.y + 6);
      ctx.closePath();
      ctx.fill();

      // Smooth organic finger outline
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.bezierCurveTo(tip.x + 35, tip.y - 5, BX - 120, BY - 18, BX, BY - 22);
      ctx.lineTo(BX, BY + 22);
      ctx.bezierCurveTo(BX - 120, BY + 18, tip.x + 35, tip.y + 5, tip.x, tip.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.38 + pulse * 0.18})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Subtle knuckle lines
      [0.35, 0.62].forEach(frac => {
        const kx = tip.x + (BX - tip.x) * frac;
        const kh = 6 + frac * 4;
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(kx, BY - kh); ctx.lineTo(kx, BY + kh); ctx.stroke();
        ctx.restore();
      });

      // Fingertip soft glow
      const fg = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 24);
      fg.addColorStop(0, `rgba(255,255,255,${0.28 + pulse * 0.18})`);
      fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(tip.x, tip.y, 24, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    }

    // ── Central connection glow ────────────────────────────────────────────
    function drawGlow(T: number) {
      const { x, y } = GLOW_C;
      const pulse = 0.5 + 0.5 * Math.sin(T * 2.8);

      // Expanding rings
      for (let i = 0; i < 4; i++) {
        const phase = ((T * 0.45 + i * 0.25) % 1);
        const r = 8 + phase * 70;
        const a = (1 - phase) * 0.28;
        ctx.save();
        ctx.strokeStyle = TEAL + Math.round(a * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      // Wide ambient glow
      const ag = ctx.createRadialGradient(x, y, 0, x, y, 80);
      ag.addColorStop(0, TEAL + "28"); ag.addColorStop(1, "transparent");
      ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(x, y, 80, 0, Math.PI * 2); ctx.fill();

      // Core
      const cg = ctx.createRadialGradient(x, y, 0, x, y, 28);
      cg.addColorStop(0, `rgba(255,255,255,${0.85 + pulse * 0.15})`);
      cg.addColorStop(0.25, TEAL + Math.round((0.7 + pulse * 0.2) * 255).toString(16).padStart(2, "0"));
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2); ctx.fill();

      // Bright dot
      ctx.save();
      ctx.shadowColor = "white"; ctx.shadowBlur = 18;
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(x, y, 2.5 + pulse * 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // ── Floating badge ─────────────────────────────────────────────────────
    function drawBadge(
      label: string, x: number, y: number, T: number, i: number
    ) {
      ctx.save();
      ctx.font = "500 9px -apple-system,system-ui,sans-serif";
      const tw = ctx.measureText(label).width;
      const pw = tw + 18, ph = 18;
      const alpha = 0.65 + 0.35 * Math.sin(T * 0.9 + i * 0.7);

      pill(ctx, x, y, pw, ph, 9);
      ctx.fillStyle = "rgba(3,3,10,0.88)"; ctx.fill();
      ctx.strokeStyle = TEAL + Math.round(alpha * 0.55 * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 0.8; ctx.stroke();

      // Small dot
      ctx.beginPath(); ctx.arc(x - tw / 2 - 2, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = TEAL + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.fill();

      ctx.fillStyle = TEAL + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(label, x + 4, y);
      ctx.restore();
    }

    // ── Main loop ──────────────────────────────────────────────────────────
    function draw(ts: number) {
      if (ts - fpsRef.current < 33) { rafRef.current = requestAnimationFrame(draw); return; }
      fpsRef.current = ts;
      const T = ts / 1000;

      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, VW, VH);

      // Dot grid
      for (let gx = 0; gx <= VW; gx += 40)
        for (let gy = 0; gy <= VH; gy += 40) {
          ctx.fillStyle = "rgba(0,242,255,0.04)";
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, Math.PI * 2); ctx.fill();
        }

      // Spawn particles from both tips
      if (Math.random() < 0.5) spawn(true);
      if (Math.random() < 0.4) spawn(false);

      // Draw + advance particles (behind hands)
      const alive: Particle[] = [];
      pts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++;
        const a = 1 - p.life / p.maxLife;
        if (a > 0) {
          ctx.save();
          ctx.globalAlpha = a * 0.65;
          ctx.fillStyle = p.fromAI ? TEAL : "rgba(255,255,255,0.9)";
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
          alive.push(p);
        }
      });
      pts.current = alive;

      // Hands + glow
      drawAIFinger(T);
      drawHumanFinger(T);
      drawGlow(T);

      // Floating badges around AI hand
      BADGES.forEach((b, i) => {
        const floatY = b.by + Math.sin(T * 0.75 + b.phase) * 4.5;
        drawBadge(b.label, b.bx, floatY, T, i);
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
      style={{ display: "block", borderRadius: "12px" }}
    />
  );
}
