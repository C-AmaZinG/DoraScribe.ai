"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  color?: string;
  showText?: boolean;
}

const Logo = ({ color = "#000000", showText = true }: LogoProps) => {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
      <img
        src="/assets/Dorascribe_logo_dark.png"
        alt="Dorascribe"
        style={{
          height: "22px",
          width: "auto",
          objectFit: "contain",
        }}
      />
    </Link>
  );
};

export default Logo;
