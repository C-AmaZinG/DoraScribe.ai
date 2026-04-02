'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import MakroButton from '@/components/ui/MakroButton';

const features = [
  {
    id: 'scribe',
    title: 'Scribe',
    heading: 'Instant Clinical Documentation',
    description: 'DoraScribe listens to your patient encounters and generates perfect, structured clinical notes in seconds. Spend more time with patients and less time charting.',
    icon: <Sparkles className="w-4 h-4" />,
    image: '/notes.png',
    bgColor: 'rgba(0, 170, 170, 0.03)',
    cta: 'Explore Scribe',
  },
  {
    id: 'evidence',
    title: 'Evidence',
    heading: 'Get Answers, Keep Moving',
    description: 'Ask real clinical questions and get clear, evidence-based answers instantly. Dora Evidence brings trusted guidelines and peer-reviewed research directly into your workflow.',
    icon: <Brain className="w-4 h-4" />,
    image: '/dashboard.png',
    bgColor: 'rgba(212, 255, 89, 0.08)',
    cta: 'Explore Evidence',
  },
  {
    id: 'comms',
    title: 'Comms',
    heading: 'Seamless Patient Communication',
    description: 'Automate follow-up messages, referrals, and patient education. Keep your patients informed and engaged without adding to your administrative burden.',
    icon: <MessageSquare className="w-4 h-4" />,
    image: '/mobile.png',
    bgColor: 'rgba(0, 170, 170, 0.03)',
    cta: 'Explore Comms',
  },
];

export default function FeatureCarousel() {
  const [activeTab, setActiveTab] = useState(features[0]);

  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: '#FDFCFA', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            color: '#000000', 
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            Advanced medical <br /> intelligence.
          </h2>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          {/* Main Visual Card */}
          <div style={{ 
            position: 'relative', 
            borderRadius: '48px', 
            overflow: 'hidden', 
            background: '#ffffff', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)', 
            border: '1px solid rgba(0,0,0,0.04)',
            aspectRatio: '16/9',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id + '-bg'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: activeTab.bgColor,
                  zIndex: 0 
                }}
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
                style={{ 
                  position: 'absolute', 
                  inset: '5%', 
                  zIndex: 10,
                  borderRadius: '32px',
                  overflow: 'hidden',
                  background: '#f8fafc',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.06)'
                }}
              >
                <Image
                  src={activeTab.image}
                  alt={activeTab.title}
                  fill
                  sizes="1000px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Description */}
          <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Nav Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              padding: '6px', 
              background: 'rgba(255,255,255,0.6)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '100px',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '48px'
            }}>
              {features.map((feature) => {
                const isActive = activeTab.id === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature)}
                    style={{
                      padding: '12px 28px',
                      borderRadius: '100px',
                      border: 'none',
                      background: isActive ? '#000000' : 'transparent',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {isActive && <span style={{ color: '#FF6F00' }}>{feature.icon}</span>}
                    {feature.title}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id + '-desc'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', maxWidth: '650px' }}
              >
                <p style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '1.2rem', 
                  color: '#64748b', 
                  lineHeight: 1.6,
                  marginBottom: '40px' 
                }}>
                  {activeTab.description}
                </p>
                <MakroButton text={activeTab.cta} href="#" variant="primary" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}



