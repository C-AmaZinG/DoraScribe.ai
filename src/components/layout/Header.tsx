"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MakroButton from "@/components/ui/MakroButton";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Why Dora", href: "#why-choose" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "24px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "64px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "100px",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: isScrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.08)"
            : "0 4px 20px -5px rgba(0,0,0,0.03)",
          padding: "0 8px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Logo />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="desktop-only"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                position: "relative",
                padding: "8px 16px",
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: hoveredLink === link.name ? "#0B1D33" : "#64748b",
                transition: "color 0.2s ease",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="https://app.dorascribe.ai/login"
            style={{
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 400,
              color: "#64748b",
              marginRight: "8px",
            }}
            className="desktop-only"
          >
            Log in
          </Link>

          <MakroButton
            text="Get started"
            href="https://app.dorascribe.ai/signUp"
            size="sm"
            variant="secondary"
          />
        </div>
      </motion.nav>

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

