"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Why Dora', href: '#why-choose' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '72px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 4px 20px -5px rgba(0,0,0,0.05)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>D</span>
          </div>
          <span style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 700, 
            fontSize: '1.25rem', 
            color: '#1a1a1a', 
            letterSpacing: '-0.02em' 
          }}>
            Dorascribe
          </span>
        </Link>
        
        {/* Desktop Menu with Sliding Pill */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          position: 'relative'
        }} className="desktop-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                position: 'relative',
                padding: '10px 18px',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#4a4b4f',
                zIndex: 1,
                transition: 'color 0.2s ease'
              }}
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '12px',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="https://app.dorascribe.ai/login" style={{
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1a1a1a'
          }} className="desktop-only">
            Log in
          </Link>
          
          <Link href="https://app.dorascribe.ai/signUp" className="makro-button">
            <motion.div
              whileHover="hover"
              style={{
                background: '#111',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              Get started
              <motion.div
                variants={{
                  hover: { x: 5 }
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '-4px'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.div>
            </motion.div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none'
            }}
            className="mobile-only"
          >
            <div style={{ width: '24px', height: '2px', background: '#111', marginBottom: '6px' }} />
            <div style={{ width: '24px', height: '2px', background: '#111' }} />
          </button>
        </div>
      </motion.nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </header>
  );
}
