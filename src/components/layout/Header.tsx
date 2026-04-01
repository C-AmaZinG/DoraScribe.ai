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
        padding: "0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: "100%",
          maxWidth: "none",
          height: "64px",
          background: "#FEFEFE",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "0",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: isScrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.08)"
            : "0 4px 20px -5px rgba(0,0,0,0.03)",
          padding: "0",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            height: "100%",
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
                  fontWeight: hoveredLink === link.name ? 500 : 400,
                  color: hoveredLink === link.name ? "#2969B7" : "#0F172A",
                  borderBottom:
                    hoveredLink === link.name
                      ? "2px solid #2969B7"
                      : "2px solid transparent",
                  transition: "color 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease",
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
                fontWeight: 500,
                color: "#2C1810",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "#F0EBE4",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              className="desktop-only login-link"
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
        </div>
      </motion.nav>

      <style jsx>{`
        .login-link:hover {
          background: #E6DFD6 !important;
        }

        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
