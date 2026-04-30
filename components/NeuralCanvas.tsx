"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number; y: number;
  bx: number; by: number;   // base position
  vx: number; vy: number;
  r: number;
  phase: number;
  speed: number;
};

export default function NeuralCanvas({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let nodes: Node[] = [];

    const init = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = Array.from({ length: 52 }, () => {
        const x = Math.random() * W;
        const y = Math.random() * H;
        return {
          x, y, bx: x, by: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r:  Math.random() * 1.8 + 0.8,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.016 + 0.007,
        };
      });
    };

    init();

    let t = 0;
    const MAX_DIST = () => Math.min(W, H) * 0.44;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      const md = MAX_DIST();

      /* ── Move nodes ── */
      for (const n of nodes) {
        n.bx += n.vx;
        n.by += n.vy;
        if (n.bx < 0 || n.bx > W) n.vx *= -1;
        if (n.by < 0 || n.by > H) n.vy *= -1;
        /* gentle oscillation on top of drift */
        n.x = n.bx + Math.sin(t * 0.7 + n.phase) * 3.5;
        n.y = n.by + Math.cos(t * 0.5 + n.phase) * 3.5;
        n.phase += n.speed;
      }

      /* ── Connections ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < md) {
            const strength = 1 - d / md;
            ctx.globalAlpha = strength * 0.28;
            const grad = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            grad.addColorStop(0, "#c4b5fd");
            grad.addColorStop(1, "#8b5cf6");
            ctx.strokeStyle = grad;
            ctx.lineWidth   = strength * 0.9;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      /* ── Nodes ── */
      for (const n of nodes) {
        const pulse = (Math.sin(n.phase * 1.4) + 1) / 2;
        const gR    = n.r * (5 + pulse * 8);

        /* outer halo */
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gR);
        g.addColorStop(0,   `rgba(167,139,250,${0.3 + pulse * 0.25})`);
        g.addColorStop(0.5, `rgba(139,92,246,${0.1  + pulse * 0.08})`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, gR, 0, Math.PI * 2);
        ctx.fill();

        /* core dot */
        ctx.globalAlpha = 0.75 + pulse * 0.25;
        ctx.fillStyle   = pulse > 0.55 ? "#ede9fe" : "#c4b5fd";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}
