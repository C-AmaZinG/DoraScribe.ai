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
  {
    name: "Resources",
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Tutorials", href: "/tutorials" },
    ],
  },
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
              gap: "32px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="desktop-only"
          >
            {navLinks.map((link) => (
              link.children ? (
                <div
                  key={link.name}
                  className="nav-dropdown"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <button
                    type="button"
                    className="nav-link nav-button"
                    style={{
                      fontWeight: hoveredLink === link.name ? 500 : 400,
                      color: hoveredLink === link.name ? "#2969B7" : "#000000",
                      borderBottom:
                        hoveredLink === link.name
                          ? "2px solid #2969B7"
                          : "2px solid transparent",
                    }}
                  >
                    {link.name}
                    <span
                      className="nav-caret"
                      style={{
                        transform:
                          hoveredLink === link.name ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  <div className="dropdown-menu">
                    {link.children.map((child) => (
                      <Link key={child.name} href={child.href} className="dropdown-link">
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="nav-link"
                  style={{
                    fontWeight: hoveredLink === link.name ? 500 : 400,
                    color: hoveredLink === link.name ? "#2969B7" : "#000000",
                    borderBottom:
                      hoveredLink === link.name
                        ? "2px solid #2969B7"
                        : "2px solid transparent",
                  }}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="https://app.dorascribe.ai/login"
              style={{
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#2C1810",
                padding: "8px 20px",
                borderRadius: "10px",
                background: "#F0EBE4",
                transition: "background 0.2s ease, color 0.2s ease, transform 0.2s ease",
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
        .nav-link {
          position: relative;
          padding: 8px 16px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          border-radius: 999px;
          transition: color 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease;
        }

        .nav-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          background: rgba(41, 105, 183, 0.08);
        }

        .nav-dropdown:hover .nav-button {
          background: rgba(41, 105, 183, 0.08);
        }

        .nav-dropdown {
          position: relative;
        }

        .nav-caret {
          font-size: 0.72rem;
          transition: transform 0.2s ease;
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 160px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }

        .dropdown-menu::before {
          content: "";
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
        }

        .dropdown-menu::before {
          content: "";
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
        }

        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-link {
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #2C1810;
          padding: 10px 12px;
          border-radius: 10px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dropdown-link:hover {
          background: #F6F1EA;
          color: #2969B7;
        }

        .login-link:hover {
          background: #E6DFD6 !important;
          transform: scale(0.98);
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
