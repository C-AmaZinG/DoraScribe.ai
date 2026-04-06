"use client";

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import MakroButton from '@/components/ui/MakroButton';

export default function Footer() {
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
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '80px',
          marginBottom: '100px'
        }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                fontWeight: 400, 
                color: '#000000',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Advancing clinical documentation with AI.
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.2rem',
                color: '#64748b'
              }}>Advance your clinical workflow with Dorascribe.</p>
            </div>
            
            <MakroButton text="Book a Demo" href="https://dorascribe.ai/book-demo/" />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '60px',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Logo />
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '240px', fontFamily: "'Inter', sans-serif" }}>
                Designed and developed by clinical professionals.<br />
                <a href="mailto:help@dorascribe.com" style={{ color: '#000000', textDecoration: 'none', fontWeight: 600 }}>help@dorascribe.com</a>
              </p>
            </div>

            {[
              { title: 'Resources', links: [{l:'Pricing Plans', h:'/#pricing'}, {l:'Tutorials', h:'#'}] },
              { title: 'Quick Links', links: [{l:'Support', h:'/contact'}, {l:'Dashboard', h:'https://app.dorascribe.ai/login'}] },
              { title: 'Useful Links', links: [{l:'Blog & News', h:'/blog'}, {l:'Trust Center', h:'#'}] }
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: '0.85rem', 
                  fontWeight: 400, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  color: '#000000',
                  marginBottom: '24px'
                }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {col.links.map((link) => {
                    const isInternal = link.h.startsWith('/');

                    if (isInternal) {
                      return (
                        <li key={link.l}>
                          <Link
                            href={link.h}
                            style={{ 
                              textDecoration: 'none', 
                              color: '#64748b', 
                              fontSize: '0.95rem',
                              fontFamily: "'Inter', sans-serif",
                              transition: 'color 0.3s ease'
                            }}
                            className="footer-link-hover"
                          >
                            {link.l}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={link.l}>
                        <a
                          href={link.h}
                          style={{ 
                            textDecoration: 'none', 
                            color: '#64748b', 
                            fontSize: '0.95rem',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'color 0.3s ease'
                          }}
                          className="footer-link-hover"
                        >
                          {link.l}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: '60px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          width: '100%',
          paddingInline: '8px'
        }}>
           <h1 style={{
             fontFamily: "'Playfair Display', serif",
             fontSize: 'clamp(3rem, 11.2vw, 12.2rem)',
             fontWeight: 400,
             color: '#000000',
             textAlign: 'center',
             margin: '0',
             opacity: 0.05,
             letterSpacing: '-0.015em',
             lineHeight: 0.86,
             userSelect: 'none',
             whiteSpace: 'nowrap'
           }}>
             Dorascribe
           </h1>
        </div>

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
             color: '#64748b'
          }}>
            © 2026 Dorascribe. All Rights Reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy Policy</a>
              <span style={{ color: '#64748b', opacity: 0.3 }}>|</span>
              <a href="#" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Terms & Conditions</a>
            </div>
            <button 
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#000000',
                textDecoration: 'underline'
              }}
            >
              Scroll to top
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-link-hover:hover {
          color: #FF6F00 !important;
        }
      `}</style>
    </footer>
  );
}

