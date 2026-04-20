import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/dorascribe-logo-dark.png";

interface LogoProps {
  color?: string;
  showText?: boolean;
}

const Logo = ({ color = "#000000", showText = true }: LogoProps) => {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
      <Image
        src={logoImg}
        alt="Dorascribe – AI Medical Scribe logo"
        priority
        style={{
          height: "24px",
          width: "auto",
          objectFit: "contain",
        }}
      />
    </Link>
  );
};

export default Logo;


