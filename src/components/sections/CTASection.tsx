"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MakroButton from "@/components/ui/MakroButton";

export default function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section style={{ padding: '80px 24px 120px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           style={{
            background: '#0B1D33',
             border: '1px solid rgba(11, 29, 51, 0.12)',
             borderRadius: '48px',
             padding: '80px 40px',
             color: '#ffffff',
             textAlign: 'center',
             position: 'relative',
             overflow: 'hidden'
           }}
        >
          {/* Decorative blurred accents */}
          <div style={{ 
            position: 'absolute', top: '-100px', right: '-100px', 
            width: '400px', height: '400px', background: 'var(--primary)', 
            borderRadius: '50%', opacity: 0.15, filter: 'blur(80px)' 
          }} />
          <div style={{ 
            position: 'absolute', bottom: '-80px', left: '-80px', 
            width: '300px', height: '300px', background: 'var(--accent)', 
            borderRadius: '50%', opacity: 0.1, filter: 'blur(60px)' 
          }} />

          {/* Social Proof Avatars */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: '32px',
            gap: '-12px'
          }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid #111',
                background: `hsl(${i * 60}, 60%, 80%)`,
                marginLeft: i > 1 ? '-16px' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111',
                fontFamily: "'Inter', sans-serif"
              }}>
                {['DR', 'SM', 'KA', 'LJ'][i-1]}
              </div>
            ))}
            <div style={{
              marginLeft: '12px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              color: '#94a3b8',
              fontWeight: 500
            }}>
              Join 1,000+ clinicians
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              fontWeight: 400, 
              marginBottom: '24px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em'
            }}>
              Do less Admin,<br />Provide More Care.
            </h2>
            <p style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: '1.25rem', 
              color: '#94a3b8', 
              maxWidth: '600px', 
              margin: '0 auto 48px',
              lineHeight: 1.6
            }}>
              Experience the power of clinical AI. Start your 14-day free trial today and save up to 2 hours of documentation every day.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MakroButton text="Start Free Trial" href="https://app.dorascribe.ai/signUp" variant="accent" />
              <MakroButton text="Book a Demo" href="https://dorascribe.ai/book-demo/" variant="outline" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


