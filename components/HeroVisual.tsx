"use client";

import { useEffect, useRef } from "react";

const COUNT = 520;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; hue: number;
}

function spawn(W: number, H: number): Particle {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: 0, vy: 0,
    life: 0,
    maxLife: 140 + Math.random() * 200,
    size: 0.7 + Math.random() * 1.3,
    hue: 220 + Math.random() * 80,
  };
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let particles: Particle[] = [];
    let W = 0, H = 0;
    let t = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx.scale(dpr, dpr);
      particles = Array.from({ length: COUNT }, () => {
        const p = spawn(W, H);
        p.life = Math.random() * p.maxLife;
        return p;
      });
    }

    function flowAngle(x: number, y: number): number {
      const nx = x / W, ny = y / H;
      return (
        Math.sin(nx * 3.5 + t * 0.38) * Math.cos(ny * 2.8 + t * 0.29) * Math.PI * 2 +
        Math.cos(nx * 2.2 - t * 0.21) * Math.sin(ny * 3.1 + t * 0.33) * Math.PI
      );
    }

    function tick() {
      t += 0.007;

      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.life++;
        if (p.life > p.maxLife) {
          Object.assign(p, spawn(W, H));
          continue;
        }

        const a   = flowAngle(p.x, p.y);
        const spd = 1.0 + Math.sin(p.life * 0.04) * 0.3;
        p.vx = p.vx * 0.88 + Math.cos(a) * spd * 0.12;
        p.vy = p.vy * 0.88 + Math.sin(a) * spd * 0.12;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -2)  p.x = W + 2;
        if (p.x > W+2) p.x = -2;
        if (p.y < -2)  p.y = H + 2;
        if (p.y > H+2) p.y = -2;

        const pct  = p.life / p.maxLife;
        const fade = pct < 0.12 ? pct / 0.12 : pct > 0.78 ? 1 - (pct - 0.78) / 0.22 : 1;

        ctx.save();
        ctx.globalAlpha = fade * 0.65;
        ctx.fillStyle   = `hsl(${p.hue},78%,72%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
