"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface MakroButtonProps {
  text: string;
  href: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "accent";
  tone?: "default" | "gray";
  size?: "sm" | "md";
  iconPosition?: "left" | "right";
}

const MakroButton = ({
  text,
  href,
  className,
  variant = "primary",
  tone = "default",
  size = "md",
}: MakroButtonProps) => {
  const router = useRouter();
  const isSm = size === "sm";
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");
  const palette =
    variant === "outline"
      ? {
          background: "transparent",
          border: "#F2EC7D",
          text: "#F2EC7D",
          hoverBackground: "rgba(242, 236, 125, 0.12)",
          hoverBorder: "#F2EC7D",
        }
      : tone === "gray"
        ? {
            background: "#F2EC7D",
            border: "#F2EC7D",
            text: "#000000",
            hoverBackground: "#E6DE69",
            hoverBorder: "#E6DE69",
          }
        : {
            background: "#F2EC7D",
            border: "#F2EC7D",
            text: "#000000",
            hoverBackground: "#E6DE69",
            hoverBorder: "#E6DE69",
          };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInternalRoute) {
      event.preventDefault();
      router.push(href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={className}
      initial={false}
      whileTap={{ scale: 0.98 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        minHeight: 0,
        padding: isSm ? "9px 16px" : "10px 20px",
        borderRadius: "10px",
        fontFamily: "'Inter', sans-serif",
        fontSize: isSm ? "0.85rem" : "0.9rem",
        fontWeight: 600,
        lineHeight: 1.2,
        color: palette.text,
        background: palette.background,
        border: `1px solid ${palette.border}`,
        boxShadow: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = palette.hoverBackground;
        e.currentTarget.style.borderColor = palette.hoverBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = palette.background;
        e.currentTarget.style.borderColor = palette.border;
      }}
    >
      <span>{text}</span>
    </motion.a>
  );
};

export default MakroButton;
