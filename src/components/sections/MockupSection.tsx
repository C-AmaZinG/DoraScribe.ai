"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MockupSection() {
  return (
    <section
      style={{
        padding: '120px 24px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '0' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--text-main)',
              marginBottom: '20px',
            }}
          >
            Experience clinical freedom.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto 40px',
            }}
          >
            Dorascribe runs seamlessly on iPad and iPhone, capturing every nuance of your patient encounters.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://apps.apple.com/ca/app/dorascribe/id6751861797" target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/app-store.svg"
                alt="App Store"
                width={140}
                height={42}
                priority
                style={{ height: '42px', width: 'auto' }}
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=app.dorascribe.ai" target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/google-play.svg"
                alt="Google Play"
                width={140}
                height={42}
                priority
                style={{ height: '42px', width: 'auto' }}
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
