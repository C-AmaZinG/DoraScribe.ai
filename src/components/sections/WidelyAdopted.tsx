"use client";

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 } as any
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export default function WidelyAdopted() {
  return (
    <section style={{ padding: '100px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 400,
            color: '#0B1D33',
            textAlign: 'center',
            marginBottom: '56px',
            lineHeight: 1.2
          }}
        >
          The world&apos;s most widely adopted<br />clinical AI platform
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Row 1: 2 Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px', marginBottom: '16px' }} className="wa-row-1">
            {/* Card 1 - Your Clinical Team Just Got 5x Bigger */}
            <motion.div variants={cardVariants} style={{
              background: '#0B1D33',
              borderRadius: '24px',
              padding: '40px',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }} className="hover-lift">
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>Your Documentation Team Just Got 5x Bigger</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                  maxWidth: '380px'
                }}>
                  DoraScribe provides a new layer of intelligence, designed to accelerate and simplify your entire clinical workflow.
                </p>
              </div>
              {/* Mock UI */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                marginTop: '32px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    background: '#FF6F00',
                    color: '#0B1D33',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}>DoraScribe</div>
                  <div style={{
                    background: '#22c55e',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}>EcoPilot</div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.4)'
                  }}>checking data...</span>
                </div>
                {/* Progress bars */}
                {[
                  { label: 'Patient Encounters', width: '85%' },
                  { label: 'Documentation Speed', width: '92%' },
                  { label: 'Accuracy Rate', width: '98%' },
                ].map((bar, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", width: '120px', flexShrink: 0 }}>{bar.label}</span>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: bar.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #FF6F00, #22c55e)', borderRadius: '2px' }}
                      />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", width: '30px' }}>{bar.width}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 2 - Tailored for Every Specialty */}
            <motion.div variants={cardVariants} style={{
              background: '#F8FAFC',
              borderRadius: '24px',
              padding: '40px',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.04)'
            }} className="hover-lift">
              <div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#0B1D33',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                  textAlign: 'center'
                }}>Tailored Clinical Expertise for Every Specialty</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  Master your documentation strategy, no matter your sector.
                </p>
              </div>
              {/* Specialty pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                {[
                  { name: 'for General Practice', color: '#0B1D33' },
                  { name: 'for Cardiology', color: '#16a34a' },
                  { name: 'for Pediatrics', color: '#ea580c' },
                  { name: 'for Mental Health', color: '#7c3aed' },
                  { name: 'for Dermatology', color: '#0284c7' },
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      background: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#0B1D33'
                    }}>DoraScribe</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: spec.color
                    }}>{spec.name}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={spec.color} strokeWidth="2.5" style={{ marginLeft: 'auto' }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                ))}
              </div>
              <a href="#" style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0B1D33',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                marginTop: '16px',
                textAlign: 'center'
              }}>Learn more about DoraScribe â†’</a>
            </motion.div>
          </div>

          {/* Row 2: 3 Equal Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }} className="wa-row-2">
            {/* Streamlined Data Management */}
            <motion.div variants={cardVariants} style={{
              background: '#F0FDF4',
              borderRadius: '24px',
              padding: '36px',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.04)'
            }} className="hover-lift">
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#0B1D33',
                marginBottom: '10px'
              }}>Streamlined Data Management</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Benefit from intelligent note structuring, EHR synchronization, and ready-to-use clinical templates.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                {['Quantitative data', 'Value Chain data', 'Narrative data'].map((tag, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontFamily: "'Inter', sans-serif",
                    color: '#0B1D33',
                    fontWeight: 500,
                    border: '1px solid rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Every Detail Matters */}
            <motion.div variants={cardVariants} style={{
              background: '#F8FAFC',
              borderRadius: '24px',
              padding: '36px',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.04)'
            }} className="hover-lift">
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#0B1D33',
                marginBottom: '10px'
              }}>Every Clinical Detail Matters</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Capture 300,000+ medical terms, including specialty terminology and medication-specific details.
              </p>
              {/* Mini table */}
              <div style={{
                marginTop: 'auto',
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 60px',
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  fontSize: '0.7rem',
                  fontFamily: "'Inter', sans-serif",
                  color: '#94a3b8',
                  fontWeight: 500
                }}>
                  <span>Term</span><span>Accuracy</span><span>Year</span>
                </div>
                {[
                  { term: 'Cardiology', acc: '0.9', year: '2025' },
                  { term: 'Radiology', acc: '0.7', year: '2025' },
                  { term: 'Pharmacology', acc: '0.8', year: '2023' },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 60px',
                    padding: '10px 16px',
                    borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    fontSize: '0.75rem',
                    fontFamily: "'Inter', sans-serif",
                    color: '#0B1D33'
                  }}>
                    <span>{row.term}</span><span>{row.acc}</span><span>{row.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Unmatched Accuracy */}
            <motion.div variants={cardVariants} style={{
              background: '#0f172a',
              borderRadius: '24px',
              padding: '36px',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }} className="hover-lift">
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '10px'
              }}>Unmatched Clinical Accuracy</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Powered by our proprietary medical NLP engine and advanced deep learning models.
              </p>
              {/* Gauge visualization */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 220deg, #ef4444 0%, #f59e0b 30%, #22c55e 70%, #22c55e 84%, transparent 84%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>98<span style={{ fontSize: '1rem', color: '#22c55e' }}>%</span></span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Row 3: 2 Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px' }} className="wa-row-3">
            {/* Your expert. By your side. */}
            <motion.div variants={cardVariants} style={{
              background: '#FEF9EF',
              borderRadius: '24px',
              padding: '36px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden'
            }} className="hover-lift">
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#0B1D33',
                  marginBottom: '12px'
                }}>Your expert. By your side.</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  maxWidth: '280px'
                }}>
                  A dedicated support team who understands your practice, masters your challenges, and supports you every step of the way.
                </p>
              </div>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: 'auto',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0B1D33',
                textDecoration: 'none',
                position: 'relative',
                zIndex: 2,
                padding: '10px 20px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                width: 'fit-content'
              }}>Meet our experts</a>
              {/* Decorative image */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '160px',
                height: '180px',
                borderTopLeftRadius: '20px',
                overflow: 'hidden',
                opacity: 0.9
              }}>
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                  alt="Expert"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>

            {/* Solutions for Everyone */}
            <motion.div variants={cardVariants} style={{
              background: '#F8FAFC',
              borderRadius: '24px',
              padding: '36px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.04)'
            }} className="hover-lift">
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#0B1D33',
                marginBottom: '10px'
              }}>Solutions for every practice: Solo to Enterprise</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Serving over 3,500 clinicians with specialized solutions tailored to practices of every size.
              </p>
              {/* Logos row */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                {['Mayo Clinic', 'Cleveland Clinic', 'Kaiser', 'Johns Hopkins'].map((name, i) => (
                  <span key={i} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    letterSpacing: '-0.02em'
                  }}>{name}</span>
                ))}
              </div>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '20px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0B1D33',
                textDecoration: 'underline',
                textUnderlineOffset: '3px'
              }}>Read our success stories â†’</a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .wa-row-1, .wa-row-2, .wa-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}


