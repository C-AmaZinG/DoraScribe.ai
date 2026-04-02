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
          border: "#FBF582",
          text: "#FBF582",
          hoverBackground: "rgba(251, 245, 130, 0.12)",
          hoverBorder: "#FBF582",
        }
      : tone === "gray"
        ? {
            background: "#FBF582",
            border: "#FBF582",
            text: "#000000",
            hoverBackground: "#EBE570",
            hoverBorder: "#EBE570",
          }
        : {
            background: "#FBF582",
            border: "#FBF582",
            text: "#000000",
            hoverBackground: "#EBE570",
            hoverBorder: "#EBE570",
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
