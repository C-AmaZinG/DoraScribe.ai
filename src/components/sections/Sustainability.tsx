"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Sustainability() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } as any
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section style={{ padding: '120px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Heading */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '16px',
          }}>
            Platform
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            lineHeight: 1.1,
          }}>
            The most widely adopted<br />clinical AI platform
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Row 1 - 2 cards */}
          <div className="bento-row-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {/* Card 1 - Ask Dora */}
            <motion.div variants={cardVariants} style={{
              background: '#F8FAFC', borderRadius: '32px', padding: '48px', minHeight: '400px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)',
            }} className="hover-lift">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '14px' }}>
                  Dora Evidence: AI-Powered Clinical Decision Support
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '440px' }}>
                  Chat with Dora to get instant answers to medical research questions. Every response is backed by verified, peer-reviewed sources.
                </p>
              </div>
              <div style={{
                marginTop: '32px', background: 'linear-gradient(135deg, #D7EFDA 0%, #b8d9bc 100%)',
                borderRadius: '20px', padding: '24px', display: 'flex', gap: '12px', alignItems: 'center',
              }}>
                <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Ask Dora</span>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: "'Inter', sans-serif" }}>analyzing sources...</span>
                <div style={{ flex: 1, height: '10px', background: '#ffffff70', borderRadius: '5px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      style={{ height: '100%', background: 'var(--primary)', borderRadius: '5px' }}
                    />
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Specialties */}
            <motion.div variants={cardVariants} style={{
              background: 'linear-gradient(180deg, var(--secondary) 0%, #003538 100%)',
              borderRadius: '32px', padding: '48px', minHeight: '400px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }} className="hover-lift">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 600, color: '#ffffff', marginBottom: '14px' }}>
                  Specialty Mastery
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Tailored templates for 20+ medical specialties.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                {['General', 'Cardiology', 'Pediatrics', 'Mental Health'].map((pill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
                    style={{
                      padding: '8px 16px', background: 'rgba(255,255,255,0.08)',
                      borderRadius: '10px', color: '#fff', fontSize: '0.8rem', fontWeight: 500, fontFamily: "'Inter', sans-serif",
                      position: "relative",
                      zIndex: 1,
                      transform: "translateY(1px)"
                    }}>
                    {pill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2 - 3 cards */}
          <div className="bento-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
            {/* EHR Integration */}
            <motion.div variants={cardVariants} style={{
              background: '#D7EFDA', borderRadius: '32px', padding: '40px', minHeight: '380px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }} className="hover-lift">
               <div>
                 <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>
                    Seamless EHR
                 </h3>
                 <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Direct sync with Epic, Cerner, and Athena.
                 </p>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ width: '100%', height: '40px', background: 'white', borderRadius: '8px', opacity: 0.5 }} />
                  <div style={{ width: '80%', height: '40px', background: 'white', borderRadius: '8px', opacity: 0.3 }} />
               </div>
            </motion.div>

            {/* Accuracy card */}
            <motion.div variants={cardVariants} style={{
              background: '#FEF9EF', borderRadius: '32px', padding: '40px', minHeight: '380px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }} className="hover-lift">
                 <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600, color: '#92400E', marginBottom: '10px' }}>
                        98% Precision
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        Clinical-grade accuracy in seconds.
                    </p>
                 </div>
                 <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--primary)', fontFamily: "'Inter', sans-serif" }}>
                    65%
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Time Saved</span>
                 </div>
            </motion.div>

            {/* Mobile app */}
            <motion.div variants={cardVariants} style={{
              background: '#1a1a2e', borderRadius: '32px', padding: '40px', minHeight: '380px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff'
            }} className="hover-lift">
                <div>
                   <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '10px' }}>
                       On The Go
                   </h3>
                   <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                       Sync across iOS & Android devices.
                   </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '0.7rem' }}>iOS App</div>
                   <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '0.7rem' }}>Android App</div>
                </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

