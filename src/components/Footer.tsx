"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      background: '#ffffff', 
      padding: '100px 24px 40px', 
      borderTop: '1px solid rgba(0,0,0,0.06)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Main Footer Content (Integrated Bio Style) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '80px',
          marginBottom: '100px'
        }}>
          
          {/* Top Section: Heading + Large Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 500, 
              color: 'var(--text-main)',
              maxWidth: '700px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              We are advancing clinical documentation with artificial intelligence.
            </h2>
            
            <a href="https://dorascribe.ai/book-demo/" className="cta-btn" style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              background: 'var(--text-main)',
              color: 'white',
              borderRadius: '100px',
              padding: '4px 4px 4px 32px',
              height: '64px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              Book a Demo
              <div className="btn-arrow" style={{
                width: '56px',
                height: '56px',
                background: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '24px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                   <path d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" fill="currentColor" opacity="0.2"/>
                   <line x1="7" y1="17" x2="17" y2="7" />
                   <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </a>
          </div>

          {/* Middle Section: Links Grid + Brand */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '60px',
            alignItems: 'flex-start'
          }}>
            {/* Brand Col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Image
                src="/assets/Dorascribe_logo_dark.png"
                alt="DoraScribe Logo"
                width={160}
                height={36}
                style={{ objectFit: 'contain' }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '240px' }}>
                The AI scribe of choice for the future of healthcare. Designed and developed by clinical professionals.
              </p>
              
              {/* App Stores */}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <a
                  href="https://apps.apple.com/ca/app/dorascribe/id6751861797"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/app-store.svg"
                    alt="App Store"
                    width={140}
                    height={42}
                    style={{ height: "42px", width: "auto", objectFit: "contain" }}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=app.dorascribe.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/google-play.svg"
                    alt="Google Play"
                    width={140}
                    height={42}
                    style={{ height: "42px", width: "auto", objectFit: "contain" }}
                  />
                </a>
              </div>
            </div>

            {/* Menu Cols */}
            {[
              { title: 'Navigate', links: [{l:'Pricing', h:'#pricing'}, {l:'Company', h:'#'}, {l:'Newsroom', h:'#'}, {l:'Contact Us', h:'#contact'}] },
              { title: 'Resources', links: [{l:'Blog', h:'#'}, {l:'Tutorials', h:'#'}, {l:'FAQ', h:'#faq'}, {l:'Support', h:'#'}] },
              { title: 'Connect', links: [{l:'LinkedIn', h:'#'}, {l:'X', h:'#'}, {l:'Podcast', h:'#'}] }
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  color: 'var(--text-main)',
                  marginBottom: '24px'
                }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {col.links.map(link => (
                    <li key={link.l}>
                      <a href={link.h} style={{ 
                        textDecoration: 'none', 
                        color: 'var(--text-muted)', 
                        fontSize: '0.95rem',
                        fontFamily: "'Inter', sans-serif",
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >{link.l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big Watermark (Integrated Bio Style) */}
        <div style={{ 
          marginTop: '60px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(0,0,0,0.06)'
        }}>
           <h1 style={{
             fontFamily: "'Inter', sans-serif",
             fontSize: 'clamp(4rem, 15vw, 15rem)',
             fontWeight: 900,
             color: 'var(--text-main)',
             textAlign: 'center',
             margin: '0',
             opacity: 0.05,
             letterSpacing: '-0.05em',
             lineHeight: 0.8,
             userSelect: 'none'
           }}>
             DORASCRIBE
           </h1>
        </div>

        {/* Footer Bottom */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ 
             fontFamily: "'Inter', sans-serif",
             fontSize: '0.9rem',
             color: 'var(--text-muted)'
          }}>
            © {currentYear} DoraScribe AI. All rights reserved. Built for Clinical Excellence.
          </p>
          
          <button 
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              textDecoration: 'underline',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Scroll to top
          </button>
        </div>
      </div>
    </footer>
  );
}
