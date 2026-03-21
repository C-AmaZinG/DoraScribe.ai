"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Dr. Marc E.",
    role: "General Practice",
    initials: "ME",
    color: "#D7EFDA",
    text: "Dorascribe has completely transformed how I manage my clinical notes. The accuracy is astounding, and the time saved is substantial.",
  },
  {
    name: "Dr. Sarah L.",
    role: "Pediatrician",
    initials: "SL",
    color: "#E5E7EB",
    text: "Being able to focus on my little patients instead of my screen has been a game changer. The notes are perfect every time.",
  },
  {
    name: "Dr. James K.",
    role: "Cardiologist",
    initials: "JK",
    color: "#FDE68A",
    text: "I was skeptical about AI in cardiology, but Dorascribe handles complex medical terms with ease. Very impressed.",
  },
  {
    name: "Dr. Elena R.",
    role: "Mental Health",
    initials: "ER",
    color: "#FECACA",
    text: "The 'Ask Dora' feature helps me cross-reference research instantly. It's like having a brilliant assistant in the room.",
  },
  {
    name: "Dr. David M.",
    role: "Dermatologist",
    initials: "DM",
    color: "#C7D2FE",
    text: "Integrates perfectly with our EHR. Setting it up took minutes, and I haven't looked back since.",
  },
  {
    name: "Dr. Chloe S.",
    role: "Family Nurse Practitioner",
    initials: "CS",
    color: "#FBCFE8",
    text: "Finally, a tool that understands the nuances of primary care. It's intuitive and efficient. Highly recommend.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-light)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '16px',
            display: 'block'
          }}>Testimonials</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            lineHeight: 1.1,
          }}>
            Trusted by the doctors<br />behind the world's best care
          </h2>
        </div>

        {/* Grid */}
        <div className="testimonials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                padding: '40px',
                borderRadius: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
                position: 'relative',
                boxShadow: i === activeIndex ? '0 20px 50px -10px rgba(0,0,0,0.12)' : 'none',
                scale: i === activeIndex ? 1.02 : 1,
                opacity: i === activeIndex ? 1 : 0.8,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                   <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                   </svg>
                ))}
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.050rem',
                color: 'var(--text-main)',
                lineHeight: 1.7,
                marginBottom: '32px',
                fontStyle: 'italic',
                opacity: 0.95
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: t.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {t.initials}
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '2px'
                  }}>
                    {t.name}
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
