"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section className="hero" style={{ 
      background: 'linear-gradient(135deg, #00A399 0%, #006167 100%)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      <motion.div 
        className="container hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.p 
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '24px',
            opacity: 0.9,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.1)',
            padding: '8px 24px',
            borderRadius: '100px'
          }}
        >
          Designed by Healthcare Professionals
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
            fontWeight: 500, 
            color: '#fff', 
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '32px',
            maxWidth: '1000px'
          }}
        >
          The AI Clinical <br /> Notes Assistant
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.25rem',
            color: '#fff',
            maxWidth: '650px',
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: '48px'
          }}
        >
          DoraScribe instantly captures your patient encounters and generates perfect, structured clinical notes in seconds. HIPAA-compliant and enterprise-ready.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="hero-actions"
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="https://dorascribe.ai/book-demo/" className="btn-primary" style={{
            background: 'var(--accent)',
            color: 'var(--text-main)',
            fontWeight: 750,
            padding: '20px 48px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}
          >
            GET DEMO
          </a>
          
          <a href="https://app.dorascribe.ai/signUp" style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontWeight: 600,
            padding: '20px 48px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            Start Free Trial
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
