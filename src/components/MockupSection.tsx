"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function MockupSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Rotation from top to bottom (reveals as it rotates forward)
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={containerRef} style={{ 
      padding: '120px 24px', 
      background: '#ffffff', 
      overflow: 'hidden',
      perspective: '2000px' // Required for 3D rotation
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Heading & Subtext */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px' }}
        >
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 500, 
            color: 'var(--text-main)',
            marginBottom: '20px'
          }}>
            Experience clinical freedom.
          </h2>
          <p style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: '1.2rem', 
            color: 'var(--text-muted)', 
            maxWidth: '600px', 
            margin: '0 auto 40px' 
          }}>
            Dorascribe runs seamlessly on iPad and iPhone, capturing every nuance of your patient encounters.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="https://apps.apple.com/ca/app/dorascribe/id6751861797" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/app-store.svg" alt="App Store" width={140} height={42} priority style={{ height: '42px', width: 'auto' }} />
            </a>
            <a href="https://play.google.com/store/apps/details?id=app.dorascribe.ai" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/google-play.svg" alt="Google Play" width={140} height={42} priority style={{ height: '42px', width: 'auto' }} />
            </a>
          </div>
        </motion.div>

        {/* iPad Mockup Container */}
        <motion.div
           style={{
             position: 'relative',
             width: '100%',
             maxWidth: '1000px',
             margin: '0 auto',
             rotateX,
             y,
             scale,
             opacity,
             transformStyle: 'preserve-3d'
           }}
        >
          {/* iPad Bezel (CSS based for premium look) */}
          <div style={{
            background: '#111',
            borderRadius: '40px',
            padding: '20px',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(0,0,0,0.3)',
            border: '8px solid #222',
            position: 'relative'
          }}>
             {/* iPad Screen Area */}
             <div style={{
               background: '#fff',
               borderRadius: '16px',
               overflow: 'hidden',
               aspectRatio: '4/3',
               position: 'relative'
             }}>
               <Image
                 src="/assets/New-UI-home-page-walkthrough.gif"
                 alt="DoraScribe App Mockup"
                 fill
                 unoptimized={true}
                 style={{ objectFit: 'cover' }}
               />
             </div>
             
             {/* iPad Camera Dot */}
             <div style={{
               position: 'absolute',
               top: '10px',
               left: '50%',
               transform: 'translateX(-50%)',
               width: '6px',
               height: '6px',
               background: '#333',
               borderRadius: '50%'
             }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
