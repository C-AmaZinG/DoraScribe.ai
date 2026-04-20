"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/ui/Logo';
import MakroButton from '@/components/ui/MakroButton';
import { useTranslations } from "@/lib/translations/translations-context";

// Static imports for icons
import appStoreIcon from '@/assets/app-store.svg';
import googlePlayIcon from '@/assets/google-play.svg';

export default function Footer() {
  const t = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: t('RESOURCES'),
      links: [
        { l: t('How to Use'), h: '/#how-it-works' },
        { l: t('Pricing Plans'), h: '/#pricing' },
        { l: t('Tutorials'), h: '/tutorials' },
      ],
    },
    {
      title: t('QUICK LINKS'),
      links: [
        { l: t('Support'), h: '/contact' },
        { l: t('Dashboard'), h: 'https://app.dorascribe.ai' },
      ],
    },
    {
      title: t('USEFUL LINKS'),
      links: [
        { l: t('Blog & News'), h: '/blog' },
        { l: t('Trust Center'), h: 'https://app.vanta.com/dorascribe.ai/trust/8445rz2ypjuu77ka2jqdb8' },
      ],
    },
  ];

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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 400,
                color: '#000000',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                {t("Advancing clinical documentation with AI.")}
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.2rem',
                color: '#64748b'
              }}>{t("Advance your clinical workflow with Dorascribe.")}</p>
            </div>

            <MakroButton text={t("Start a free trial")} href="https://app.dorascribe.ai/signUp" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Logo />
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '240px', fontFamily: "'DM Sans', sans-serif" }}>
                {t("Designed and developed by clinical professionals.")}<br />
                <a href="mailto:help@dorascribe.com" style={{ color: '#000000', textDecoration: 'none', fontWeight: 600 }}>help@dorascribe.com</a>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="https://apps.apple.com/" aria-label="Download on the App Store" style={{ display: 'inline-flex' }}>
                  <Image
                    src={appStoreIcon}
                    alt="Download on the App Store"
                    width={145}
                    height={44}
                    style={{ width: 'auto', height: '44px' }}
                  />
                </a>
                <a href="https://play.google.com/store" aria-label="Get it on Google Play" style={{ display: 'inline-flex' }}>
                  <Image
                    src={googlePlayIcon}
                    alt="Get it on Google Play"
                    width={145}
                    height={44}
                    style={{ width: 'auto', height: '44px' }}
                  />
                </a>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '50px 80px',
            }}>
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <h4 className="footer-menu-title" style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
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
                                color: '#000000',
                                fontSize: '14px',
                                fontFamily: "'DM Sans', sans-serif",
                                transition: 'color 0.3s ease'
                              }}
                              className="footer-link-hover footer-menu-link"
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
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: '#000000',
                              fontSize: '14px',
                              fontFamily: "'DM Sans', sans-serif",
                              transition: 'color 0.3s ease'
                            }}
                            className="footer-link-hover footer-menu-link"
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
             fontFamily: "'DM Sans', sans-serif",
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{
               fontFamily: "'DM Sans', sans-serif",
               fontSize: '0.9rem',
               color: '#64748b'
            }}>
              {t("© 2026 Dorascribe. All Rights Reserved.")}
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '4px' }}>
              <a href="https://www.linkedin.com/company/dorascribe-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/dorascribemedicalai" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1877f2'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/DorascribeInc" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#000000'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.youtube.com/@DorascribeTeam" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ff0000'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>{t("Privacy Policy")}</a>
              <span style={{ color: '#64748b', opacity: 0.3 }}>|</span>
              <a href="#" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>{t("Terms & Conditions")}</a>
            </div>
            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#000000',
                textDecoration: 'underline'
              }}
            >
              {t("Scroll to top")}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-menu-title {
          font-size: 14px !important;
        }

        .footer-menu-link {
          font-size: 14px !important;
        }

        :global(.footer-link-hover):hover {
          color: #3d8183 !important;
        }
      `}</style>
    </footer>
  );
}
