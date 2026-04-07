"use client";

import { useEffect, useRef } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

interface Props {
  scrollYProgress: MotionValue<number>;
}

const NODE_COUNT = 55;
const MAX_DISTANCE = 160;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function NeuralCanvas({ scrollYProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const timeRef = useRef(0);

  // Keep a live ref to scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      initNodes(w, h);
    };

    const initNodes = (w: number, h: number) => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1.5,
        };
      });
      pulsesRef.current = [];
    };

    resize();
    window.addEventListener("resize", resize);

    let lastPulseTime = 0;

    const draw = (timestamp: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const progress = progressRef.current;
      timeRef.current = timestamp * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Background gradient that shifts with scroll
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.8);
      const bgAlpha = lerp(0.03, 0.12, progress);
      bgGrad.addColorStop(0, `rgba(0, 212, 255, ${bgAlpha})`);
      bgGrad.addColorStop(1, "rgba(5, 5, 15, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Connection threshold grows with scroll
      const connectionThreshold = lerp(0, MAX_DISTANCE, Math.min(progress * 3, 1));

      // Update node positions (gentle float)
      for (const node of nodes) {
        node.baseX += node.vx;
        node.baseY += node.vy;

        if (node.baseX < 0 || node.baseX > w) node.vx *= -1;
        if (node.baseY < 0 || node.baseY > h) node.vy *= -1;

        // Oscillate around base
        node.x = node.baseX + Math.sin(timeRef.current * 0.8 + node.baseX * 0.01) * 4;
        node.y = node.baseY + Math.cos(timeRef.current * 0.6 + node.baseY * 0.01) * 4;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionThreshold && dist > 0) {
            const edgeAlpha = (1 - dist / connectionThreshold) * lerp(0, 0.35, Math.min(progress * 2, 1));
            if (edgeAlpha < 0.01) continue;

            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(0, 212, 255, ${edgeAlpha})`);
            grad.addColorStop(1, `rgba(124, 58, 237, ${edgeAlpha})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Spawn pulses when network is forming (progress > 0.3)
      if (progress > 0.3 && timestamp - lastPulseTime > 400) {
        lastPulseTime = timestamp;
        const from = Math.floor(Math.random() * nodes.length);
        const to = Math.floor(Math.random() * nodes.length);
        if (from !== to) {
          pulsesRef.current.push({
            fromNode: from,
            toNode: to,
            progress: 0,
            speed: 0.015 + Math.random() * 0.012,
          });
        }
      }

      // Draw and update pulses
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > connectionThreshold * 1.5) return false;

        const px = from.x + dx * pulse.progress;
        const py = from.y + dy * pulse.progress;
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * lerp(0, 0.9, progress);

        const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pulseGrad.addColorStop(0, `rgba(0, 212, 255, ${pulseAlpha})`);
        pulseGrad.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = pulseGrad;
        ctx.fill();

        return true;
      });

      // Draw nodes
      for (const node of nodes) {
        const nodeAlpha = lerp(0.2, 0.9, progress);
        const glowRadius = node.radius * lerp(1, 3, progress);

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius * 4);
        glow.addColorStop(0, `rgba(0, 212, 255, ${nodeAlpha * 0.5})`);
        glow.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${nodeAlpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
