"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MakroButton from "@/components/ui/MakroButton";
import Logo from "@/components/ui/Logo";
import { useLocale } from "@/lib/locale-context";
import { useTranslations } from "@/lib/translations/translations-context";
import { locales, localePath, stripLocaleFromPath, localeMap } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const navLinks = [
  { name: "How to Use", href: "/#how-it-works" },
  { name: "Why Dora", href: "/#why-choose" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
  {
    name: "Resources",
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Tutorials", href: "/tutorials" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const MOBILE_BREAKPOINT = 1080;

const DropdownLink = ({ name, href }: { name: string; href: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();
  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: isHovered ? "#00aaaa" : "#2c1810",
        padding: "10px 12px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isHovered ? "rgba(61, 129, 131, 0.08)" : "transparent",
        transition: "all 0.2s ease",
        boxShadow: isHovered ? "0 8px 18px rgba(61, 129, 131, 0.08)" : "none"
      }}
    >
      {t(name)}
    </Link>
  );
};

const MobileNavLink = ({ name, href, onClick }: { name: string; href: string; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? "#00aaaa" : "#FFFFFF",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: 700,
        display: "block",
        padding: "8px 0",
        transition: "color 0.2s ease",
        textAlign: "left"
      }}
    >
      {t(name)}
    </Link>
  );
};

export default function Header() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT);
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown")) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileResourcesOpen(false);
  };

  const switchLocale = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${365 * 24 * 60 * 60}`;
    window.location.href = localePath(stripLocaleFromPath(pathname), locale);
    setIsLanguageOpen(false);
  };

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
          width: isMobileViewport ? "calc(100% - 20px)" : "calc(100% - 32px)",
          maxWidth: "none",
          height: "64px",
          background: "#FEFEFE",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "0",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          marginTop: "10px",
          marginLeft: isMobileViewport ? "10px" : "16px",
          marginRight: isMobileViewport ? "10px" : "16px",
          boxShadow: isScrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.08)"
            : "0 4px 20px -5px rgba(0,0,0,0.03)",
          padding: "0",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="header-inner"
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            position: "relative",
            height: "100%",
          }}
        >
          <Logo />

          <div
            className="desktop-only desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              minWidth: 0,
            }}
          >
            {navLinks.map((link) =>
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
                      fontSize: "14px",
                      color: hoveredLink === link.name ? "#3d8183" : "#000000",
                      borderBottom:
                        hoveredLink === link.name
                          ? "2px solid #3d8183"
                          : "2px solid transparent",
                    }}
                  >
                    {t(link.name)}
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
                      <DropdownLink key={child.name} name={child.name} href={child.href} />
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
                    fontSize: "14px",
                    fontWeight: hoveredLink === link.name ? 500 : 400,
                    color: hoveredLink === link.name ? "#3d8183" : "#000000",
                    borderBottom:
                      hoveredLink === link.name
                        ? "2px solid #3d8183"
                        : "2px solid transparent",
                  }}
                >
                  {t(link.name)}
                </Link>
              )
            )}
          </div>

<div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "12px", justifySelf: "end" }}>
            <div
              className="desktop-only language-dropdown"
              data-no-translate="true"
              onMouseEnter={() => setIsLanguageOpen(true)}
              onMouseLeave={() => setIsLanguageOpen(false)}
            >
              <button
                type="button"
                className={`language-trigger ${isLanguageOpen ? "is-open" : ""}`}
                aria-haspopup="menu"
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen(true)}
              >
                                <span
                  className="language-flag-mini"
                  style={{
                    backgroundImage: `url(https://flagcdn.com/w40/${localeMap[currentLocale].flag}.png)`,
                  }}
                />
                <span>{localeMap[currentLocale].label}</span>
                                <span className="language-trigger-caret">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <div className="language-menu" role="menu">
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="language-menu-inner"
                    >
                      <p className="language-menu-title">{t("Select Language")}</p>
                      {locales.map((locale) => (
                        <button
                          key={locale}
                          type="button"
                          className={`language-option ${currentLocale === locale ? "is-active" : ""}`}
                          onClick={() => switchLocale(locale)}
                        >
                          <span
                            className="language-flag"
                            aria-hidden="true"
                            style={{
                              backgroundImage: `url(https://flagcdn.com/w40/${localeMap[locale].flag}.png)`,
                            }}
                          />
                          <span className="language-option-label">{localeMap[locale].name}</span>
                          {currentLocale === locale && (
                            <span className="active-check">&#10003;</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop-only Login */}
            {/* Swapped order: Get started first, then Login */}
            <div className="desktop-only">
              <MakroButton
                text={t("Get started")}
                href="https://app.dorascribe.ai/signUp"
                size="sm"
              />
            </div>

            <div className="desktop-only">
              <Link
                href="https://app.dorascribe.ai/login"
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#000000",
                  padding: "8px 20px",
                  borderRadius: "10px",
                  background: isLoginHovered ? "#d8f2f2" : "#EBF8F8",
                  transition: "background 0.2s ease, transform 0.2s ease, color 0.2s ease",
                  transform: isLoginHovered ? "scale(1.02)" : "scale(1)",
                }}
                className="login-link"
              >
                {t("Log in")}
              </Link>
            </div>

            {isMobileViewport && (
              <motion.button
                type="button"
                className="mobile-menu-button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#EBF8F8",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                  position: "relative",
                  zIndex: 1010,
                  boxShadow: "0 4px 12px rgba(61, 129, 131, 0.08)",
                  transition: "background-color 0.3s ease",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                >
                  <motion.path
                    animate={isMobileMenuOpen ? { d: "M6 18L18 6" } : { d: "M5 7H19" }}
                    transition={{ duration: 0.3 }}
                    stroke="var(--hamburger-icon-color, var(--brand-primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    d="M5 12H19"
                    stroke="var(--hamburger-icon-color, var(--brand-primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    animate={isMobileMenuOpen ? { d: "M6 6L18 18" } : { d: "M5 17H19" }}
                    transition={{ duration: 0.3 }}
                    stroke="var(--hamburger-icon-color, var(--brand-primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "auto",
              maxHeight: "85vh",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              backgroundColor: "#0b1121",
              zIndex: 15000,
              display: "flex",
              flexDirection: "column",
              padding: "20px 24px 30px",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
            className="mobile-nav-overlay-v2"
          >
            {/* Design Version: 2.1 */}
            {/* 1. Header with Close Button */}
            <div className="mobile-nav-top">
              <Logo />
              <button 
                onClick={closeMobileMenu} 
                className="close-nav-btn"
                aria-label="Close menu"
                style={{
                  display: "flex",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#EBF8F8",
                  border: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                  boxShadow: "0 4px 12px rgba(61, 129, 131, 0.08)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--hamburger-icon-color, var(--brand-primary))" strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 2. Primary Action Area (Login & CTA) */}
            <div className="mobile-nav-center">
              <div className="mobile-nav-scroll-area">
                <div className="mobile-nav-list">                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ 
                      display: "flex", 
                      flexDirection: "row", 
                      alignItems: "center", 
                      gap: "16px",
                      width: "100%",
                      marginBottom: "20px"
                    }}
                  >
                    {/* Swapped mobile order */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ flex: 1 }}
                    >
                      <Link 
                        href="https://app.dorascribe.ai/signUp" 
                        onClick={closeMobileMenu} 
                        className="mobile-link-hover-teal"
                        style={{ 
                          backgroundColor: "var(--brand-primary)", 
                          color: "var(--brand-primary-text)", 
                          textDecoration: "none", 
                          height: "52px", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          borderRadius: "12px",
                          fontSize: "13px",
                          fontWeight: 700,
                          transition: "background-color 0.2s ease"
                        }}
                      >
                        Get Started
                      </Link>
                    </motion.div>

                     <motion.div
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       style={{ flex: 1, transition: "transform 0.2s ease" }}
                     >
                       <Link 
                         href="https://app.dorascribe.ai/login" 
                         onClick={closeMobileMenu} 
                         style={{ 
                           textDecoration: "none", 
                           fontSize: "13px", 
                           fontWeight: 700, 
                           textAlign: "center",
                           height: "52px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           background: "#EBF8F8",
                           color: "#000000", 
                           borderRadius: "12px",
                           border: "1px solid rgba(61, 129, 131, 0.2)",
                           transition: "background-color 0.2s ease"
                         }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8f2f2"}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#EBF8F8"}
                       >
                         Login
                       </Link>
                     </motion.div>
                  </motion.div>

                  <div className="nav-divider-slim" />

                  {/* 3. Main Links Group */}
                  {["How to Use", "Why Dora", "Pricing", "Resources", "FAQ", "Contact"].map((name, i) => {
                    const linkObj = navLinks.find(l => l.name === name);
                    if (!linkObj) return null;

                    const hasChildren = !!linkObj.children;

                    if (hasChildren) {
                      return (
                        <motion.div
                          key={name}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + (i * 0.05) }}
                          className="nav-item-wrap"
                        >
                          <button
                            onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#FFFFFF",
                              fontSize: "13px",
                              fontWeight: 700,
                              width: "100%",
                              textAlign: "left",
                              padding: "12px 0",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{t(name)}</span>
                            <span
                              className="nav-caret"
                              style={{ 
                                fontSize: "12px", 
                                transform: isMobileResourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                color: "var(--brand-primary)"
                              }}
                            >
                              ▾
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {isMobileResourcesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: "hidden", paddingLeft: "16px" }}
                              >
                                {linkObj.children?.map((child) => (
                                  <MobileNavLink 
                                    key={child.name} 
                                    name={child.name} 
                                    href={child.href} 
                                    onClick={closeMobileMenu} 
                                  />
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={name}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + (i * 0.05) }}
                        className="nav-item-wrap"
                      >
                        <MobileNavLink 
                          name={name} 
                          href={linkObj.href || "#"} 
                          onClick={closeMobileMenu} 
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Footer with Socials */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mobile-nav-footer"
            >
              <div className="social-tray" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <a href="https://www.linkedin.com/company/dorascribe-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="tray-icon" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.facebook.com/dorascribemedicalai" target="_blank" rel="noopener noreferrer" className="tray-icon" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://x.com/DorascribeInc" target="_blank" rel="noopener noreferrer" className="tray-icon" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.youtube.com/@DorascribeTeam" target="_blank" rel="noopener noreferrer" className="tray-icon" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                </a>
              </div>
              <p className="footer-copyright">© 2026 Dorascribe AI. All rights reserved.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          position: relative;
          padding: 8px 16px;
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
          font-size: 14px !important;
          white-space: nowrap;
          line-height: 1.1;
          transition: color 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease;
        }

        .nav-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          line-height: 1.1;
          flex-shrink: 0;
        }

        .nav-dropdown {
          position: relative;
          flex-shrink: 0;
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

        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-link {
          position: relative;
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
          font-size: 14px !important;
          font-weight: 500;
          color: #2c1810;
          padding: 10px 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid transparent;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
            transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dropdown-link::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 6px;
          height: 2px;
          border-radius: 999px;
          background: #EBF8F8;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }

        .dropdown-link:hover,
        .dropdown-link:focus-visible {
          background: rgba(61, 129, 131, 0.08);
          border-color: rgba(61, 129, 131, 0.2);
          color: #EBF8F8;
          box-shadow: 0 8px 18px rgba(61, 129, 131, 0.08);
        }

        .dropdown-link:hover::after,
        .dropdown-link:focus-visible::after {
          transform: scaleX(1);
        }

        .login-link:hover {
          background: #2d6163 !important;
          color: #ffffff !important;
          transform: scale(0.98);
        }

        .language-dropdown {
          position: relative;
        }

        .language-trigger {
          min-width: 84px;
          min-height: 40px;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid #dbe7eb;
          background: #ffffff;
          color: #1f2937;
          font-family: "DM Sans", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .language-trigger:hover,
        .language-trigger.is-open {
          border-color: var(--brand-primary);
          background: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(61, 129, 131, 0.12);
        }

        .language-flag-mini {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
          flex-shrink: 0;
        }

        .language-trigger-caret {
          font-size: 0.7rem;
          opacity: 0.5;
          transition: transform 0.3s ease;
        }

        .language-trigger.is-open .language-trigger-caret {
          transform: rotate(180deg);
        }

        .language-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          margin-left: -120px;
          width: 240px;
          z-index: 1000;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 48px -10px rgba(15, 23, 42, 0.18),
            0 10px 20px -5px rgba(15, 23, 42, 0.08);
        }

        .language-menu-inner {
          background: #ffffff;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 8px;
          box-shadow: 
            0 20px 48px -10px rgba(15, 23, 42, 0.18),
            0 10px 20px -5px rgba(15, 23, 42, 0.08);
        }

        .language-menu-title {
          padding: 10px 14px 6px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
        }

        .language-option {
          width: 100%;
          border: 0;
          background: transparent;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          cursor: pointer;
          color: #475569;
          font-family: "DM Sans", sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .language-option:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .language-option.is-active {
          background: rgba(61, 129, 131, 0.06);
          color: #3d8183 !important;
          font-weight: 600;
        }

        .active-check {
          margin-left: auto;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .language-flag {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
          flex-shrink: 0;
        }

        /* Mobile Language Styles */
        .mobile-language-wrap {
          margin-top: 24px;
          padding-bottom: 20px;
        }

        .mobile-nav-kicker {
          font-family: "DM Sans", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
        }

        .mobile-language-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .mobile-lang-btn {
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-lang-btn.is-active {
          background: #3d8183 !important;
          border-color: #3d8183 !important;
          box-shadow: 0 4px 12px rgba(61, 129, 131, 0.3);
        }

        .mobile-menu-button {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #EBF8F8;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          position: relative;
          z-index: 102;
          box-shadow: 0 2px 8px rgba(61, 129, 131, 0.08);
          transition: all 0.2s ease;
        }

        .mobile-menu-button:active {
          transform: scale(0.95);
          background: #f0fdfd;
        }

        .mobile-menu-line {
          width: 20px;
          height: 2px;
          border-radius: 999px;
          background: #EBF8F8 !important;
          transform-origin: center;
        }

        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0b1121;
          background-image: radial-gradient(circle at top right, rgba(61, 129, 131, 0.2), transparent 500px);
          z-index: 15000;
          display: flex;
          flex-direction: column;
          padding: 40px 24px;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .mobile-nav-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          margin-bottom: 24px;
        }

        /* Ensure logo is white on dark */
        .mobile-nav-top :global(.logo-img),
        .mobile-nav-top :global(img) {
          filter: brightness(0) invert(1);
        }

        .close-nav-btn {
          background: #ffffff;
          border: 1px solid #EBF8F8;
          color: #EBF8F8;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(61, 129, 131, 0.1);
        }

        .close-nav-btn:hover {
          background: #f0fdfd;
          transform: scale(0.95);
        }

        .mobile-nav-center {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 40px;
        }

        .nav-item-wrap {
          width: 100%;
        }

        .mobile-link-hero {
          font-family: 'DM Sans', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
          padding: 8px 0;
          display: block;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .mobile-link-hero.secondary {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.7);
        }

        .mobile-link-hero:hover {
          color: #EBF8F8;
          transform: translateX(10px);
        }

        .mobile-cta-btn-main {
          margin-top: 20px;
          background: #EBF8F8;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(61, 129, 131, 0.3);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .mobile-cta-btn-main:active {
          transform: scale(0.98);
        }

        .nav-divider-slim {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 32px 0;
          width: 60px;
        }

        .mobile-nav-footer {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: auto;
        }

        .social-tray {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .tray-icon {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s ease;
        }

        .tray-icon:hover {
          color: #EBF8F8;
        }

        .footer-copyright {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .desktop-nav {
          flex-wrap: nowrap;
          gap: clamp(8px, 1.2vw, 20px) !important;
          min-width: 0;
        }

        @media (max-width: 1280px) {
          .header-inner {
            padding: 0 16px !important;
          }

          .nav-link {
            padding: 8px 10px;
            font-size: 14px !important;
          }
        }

        @media (max-width: 1160px) {
          .desktop-nav {
            gap: 12px !important;
          }

          .header-actions {
            gap: 8px !important;
          }
        }

        @media (max-width: 1080px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-menu-button {
            display: inline-flex;
          }
        }
        .mobile-link-hover-teal:hover {
          color: #EBF8F8 !important;
        }

        .mobile-cta-btn-main:hover {
          background-color: var(--brand-primary-hover) !important;
        }

        .mobile-nav-list a,
        .mobile-nav-list button {
          font-size: 13px !important;
        }
      `}</style>
    </header>
  );
}

