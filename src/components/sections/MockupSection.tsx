"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MakroButton from '@/components/ui/MakroButton';

export default function MockupSection() {
  return (
    <section
      style={{
        padding: '100px 24px',
        background: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '64px',
        flexWrap: 'wrap-reverse' 
      }}>
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ flex: 1, minWidth: '320px', textAlign: 'left' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
              fontWeight: 400,
              color: 'var(--text-main)',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Experience clinical freedom.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              maxWidth: '500px',
              margin: '0 0 40px 0',
              lineHeight: 1.5,
            }}
          >
            Dorascribe runs seamlessly on iPad and iPhone, capturing every nuance of your patient encounters.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <MakroButton href="https://app.dorascribe.ai/signUp" text="Start a free trial" />
          </div>

          <div
            style={{
              marginTop: '32px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-main)',
              opacity: 0.85,
            }}
          >
            Trusted by healthcare professionals
          </div>
        </motion.div>

        {/* Right Side Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: 1.3,
            minWidth: '400px',
            background: 'rgba(128, 128, 128, 0.1)',
            border: '1px solid rgba(128, 128, 128, 0.15)',
            borderRadius: '16px',
            padding: '12px',
          }}
        >
          <div style={{
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.96)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
          }}>
            <Image
              src="/assets/Dora_scribe_landing_page.png"
              alt="DoraScribe dashboard mockup"
              width={1470}
              height={827}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'left center', display: 'block' }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

