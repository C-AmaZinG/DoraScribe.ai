"use client";

import React from "react";
import { motion } from "framer-motion";

type AnimatedBackgroundProps = {
  orbColors?: string[];
};

const defaultColors = [
  "rgba(251, 26, 14, 0.25)",
  "rgba(255, 255, 255, 0.08)",
  "rgba(41, 105, 183, 0.12)",
  "rgba(255, 141, 91, 0.18)",
];

export default function AnimatedBackground({
  orbColors = defaultColors,
}: AnimatedBackgroundProps) {
  const positions = [
    { top: "4%", left: "-8%", size: 240, duration: 15 },
    { top: "12%", right: "-10%", size: 280, duration: 18 },
    { bottom: "16%", left: "8%", size: 180, duration: 14 },
    { bottom: "-8%", right: "12%", size: 260, duration: 20 },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {positions.map((position, index) => (
        <motion.div
          key={`${position.size}-${index}`}
          animate={{
            x: [0, index % 2 === 0 ? 24 : -24, 0],
            y: [0, index % 2 === 0 ? -28 : 18, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: position.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: position.size,
            height: position.size,
            borderRadius: "999px",
            filter: "blur(24px)",
            opacity: 0.9,
            background: orbColors[index % orbColors.length],
            top: position.top,
            left: position.left,
            right: position.right,
            bottom: position.bottom,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.24,
        }}
      />
    </div>
  );
}
