"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What is DoraScribe?",
        a: "DoraScribe is an AI-powered medical scribe that records patient consultations and generates structured clinical notes in real-time. It uses state-of-the-art speech recognition and medical LLMs to ensure accuracy and clinical relevance."
      },
      {
        q: "How does it help clinicians?",
        a: "It allows clinicians to focus on patient care instead of their screens. Our AI automatically handles the transcription and note-writing process, saving documented hours on paperwork every day."
      },
      {
        q: "Is it HIPAA compliant?",
        a: "Yes, DoraScribe is fully HIPAA and GDPR compliant. We use enterprise-grade encryption and never store patient identifiers or voice recordings on our servers permanently."
      }
    ]
  },
  {
    category: "Pricing",
    questions: [
      {
        q: "Do you offer a free trial?",
        a: "Yes! Every new user gets a free trial period with 20 transcripts to test the quality and speed of DoraScribe in their own clinical environment. No credit card required."
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Absolutely. Our plans are flexible, and you can cancel or change your subscription level at any time through your clinical dashboard."
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "Which specialties are supported?",
        a: "We support over 20+ medical specialties with tailored templates for General Practice, Cardiology, Pediatrics, Mental Health, Dermatology, and more."
      },
      {
        q: "How long does setup take?",
        a: "You can be up and running in under 5 minutes. Simply create an account, download our iPad or iPhone app, and start your first recording."
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const activeFaqs = faqData.find(cat => cat.category === activeCategory)?.questions || [];

  return (
    <section id="faq" style={{ padding: '120px 24px', background: '#F8F9FA' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Header */}
        <div style={{ marginBottom: '64px', maxWidth: '600px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            Frequently asked questions
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.1rem',
            color: '#4a4b4f',
            lineHeight: 1.6
          }}>
            Can't find the answer you're looking for? Reach out to our customer support team for 1-on-1 assistance.
          </p>
        </div>

        {/* CONNECTED FAQ BLOCK (Makro Style) */}
        <div className="connected-faq-container" style={{ 
          display: 'grid', 
          gridTemplateColumns: '300px 1fr', 
          background: '#ffffff',
          borderRadius: '32px',
          border: '1px solid #f0f0f0',
          overflow: 'hidden',
          boxShadow: '0 20px 60px -10px rgba(0,0,0,0.04)'
        }}>
          
          {/* Categories Sidebar INSIDE the box */}
          <div style={{ 
            background: '#fafafa', 
            borderRight: '1px solid #f0f0f0',
            padding: '40px 16px'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {faqData.map((cat) => (
                <li key={cat.category}>
                  <button 
                    onClick={() => { setActiveCategory(cat.category); setOpenIndex(0); }}
                    style={{
                       width: '100%',
                       textAlign: 'left',
                       background: activeCategory === cat.category ? '#111' : 'transparent',
                       border: 'none',
                       fontFamily: "'Inter', sans-serif",
                       fontSize: '0.9rem',
                       fontWeight: activeCategory === cat.category ? 600 : 500,
                       color: activeCategory === cat.category ? '#fff' : '#666666',
                       cursor: 'pointer',
                       padding: '12px 24px',
                       borderRadius: '12px',
                       transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion Column INSIDE the box */}
          <div style={{ padding: '20px 0' }}>
            <motion.div 
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {activeFaqs.map((faq, i) => (
                <motion.div 
                  variants={itemVariants}
                  key={i} 
                  style={{ 
                    borderBottom: i < activeFaqs.length - 1 ? '1px solid #f2f2f2' : 'none',
                    background: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '32px 48px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '24px'
                    }}
                  >
                    <span style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: '1.2rem', 
                      fontWeight: 600, 
                      color: '#1a1a1a',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.4
                    }}>
                      {faq.q}
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1.5px solid #eaeaea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      background: openIndex === i ? '#111' : 'transparent',
                      color: openIndex === i ? '#fff' : '#111'
                    }}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                       </svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                      >
                        <div style={{ padding: '0 48px 40px', maxWidth: '800px' }}>
                          <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '1.05rem',
                            color: '#4a4b4f',
                            lineHeight: 1.7
                          }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 800px) {
          .connected-faq-container {
            grid-template-columns: 1fr !important;
          }
          .connected-faq-container > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #f0f0f0;
            padding: 20px !important;
          }
          .connected-faq-container ul {
            flex-direction: row !important;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
