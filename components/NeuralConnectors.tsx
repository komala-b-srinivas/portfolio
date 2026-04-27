"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function NeuralConnectors() {
  const { scrollYProgress } = useScroll();
  
  // Create multiple paths representing data flow
  const pathLength1 = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const pathLength3 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.15 }}
      >
        {/* Connector 1: Hero to Projects */}
        <motion.path
          d="M 50 10 Q 80 30 50 50"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="0.1"
          style={{ pathLength: pathLength1 }}
          className="neural-line"
        />
        
        {/* Connector 2: Projects to Skills */}
        <motion.path
          d="M 50 40 Q 20 60 50 80"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="0.1"
          style={{ pathLength: pathLength2 }}
          className="neural-line"
        />

        {/* Connector 3: Skills to Experience */}
        <motion.path
          d="M 50 70 Q 90 85 50 95"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="0.1"
          style={{ pathLength: pathLength3 }}
          className="neural-line"
        />
      </svg>
    </div>
  );
}
