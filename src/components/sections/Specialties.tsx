"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Baby, Brain, Microscope, Building2, Activity } from 'lucide-react';

const professionals = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Gastroenterology",
  "Endocrinology",
  "Rheumatology",
  "Pulmonology",
  "Nephrology",
  "Psychiatry",
  "Obstetrics and Gynecology",
  "Orthopedic Surgery",
  "General Surgery",
  "Urology",
  "Otolaryngology",
  "Emergency Medicine",
  "Hospital Medicine",
  "Critical Medicine",
  "Infectious Disease",
  "Dentistry",
  "Physiotherapy",
  "Chiropractic",
  "Podiatry",
  "Pain Management",
];

const icons = [Stethoscope, Baby, Brain, Microscope, Building2, Activity];
const leftProfessionals = professionals.filter((_, index) => index % 2 === 0);
const rightProfessionals = professionals.filter((_, index) => index % 2 !== 0);
const loopingLeftProfessionals = [...leftProfessionals, ...leftProfessionals];
const loopingRightProfessionals = [...rightProfessionals, ...rightProfessionals];

export default function Specialties() {
  return (
    <section style={{ 
      padding: '80px 24px', 
      background: '#ffffff',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        background: 'linear-gradient(135deg, #0B1D33 0%, #1a334d 100%)',
        borderRadius: '32px',
        padding: '80px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract Background Shapes */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,111,0,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }} />
        
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(53,185,166,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }} />

        {/* Left Side Content */}
        <div style={{ flex: 1, minWidth: '320px', position: 'relative', zIndex: 1 }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2.5rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}
          >
            Tailored Clinical<br />Expertise for Every<br />Specialty
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              marginBottom: '60px',
              maxWidth: '420px'
            }}
          >
            Master your clinical documentation and practice workflows, no matter your medical field.
          </motion.p>

        </div>

        {/* Right Side Dual Infinite Tickers */}
        <div className="specialty-scroll-grid">
          <div className="specialty-scroll-shell">
            <div className="specialty-scroll-track specialty-scroll-track--up">
              {loopingLeftProfessionals.map((professional, i) => {
                const Icon = icons[i % icons.length];
                const highlight = i % leftProfessionals.length === 0;

                return (
                  <div key={`left-${professional}-${i}`} className="specialty-pill">
                    <span className="specialty-pill__label">{professional}</span>
                    <div className={`specialty-pill__icon ${highlight ? 'is-highlight' : ''}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="specialty-scroll-shell">
            <div className="specialty-scroll-track specialty-scroll-track--down">
              {loopingRightProfessionals.map((professional, i) => {
                const Icon = icons[(i + 2) % icons.length];
                const highlight = i % rightProfessionals.length === 0;

                return (
                  <div key={`right-${professional}-${i}`} className="specialty-pill">
                    <span className="specialty-pill__label">{professional}</span>
                    <div className={`specialty-pill__icon ${highlight ? 'is-highlight' : ''}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .specialty-scroll-grid {
          flex: 1;
          min-width: 320px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .specialty-scroll-shell {
          height: 500px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        .specialty-scroll-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: specialty-scroll-up 42s linear infinite;
          will-change: transform;
        }

        .specialty-scroll-track--down {
          animation-name: specialty-scroll-down;
        }

        .specialty-scroll-grid:hover .specialty-scroll-track {
          animation-play-state: paused;
        }

        .specialty-pill {
          padding: 16px 28px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: #ffffff;
          font-family: "'Inter', sans-serif";
          font-size: 1.1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          width: 100%;
          opacity: 0.66;
        }

        .specialty-pill:hover {
          opacity: 1;
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.5);
        }

        .specialty-pill__label {
          display: block;
          padding-right: 16px;
          line-height: 1.3;
        }

        .specialty-pill__icon {
          color: rgba(255,255,255,0.82);
          flex-shrink: 0;
        }

        .specialty-pill__icon.is-highlight {
          color: #FF6F00;
        }

        @keyframes specialty-scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        @keyframes specialty-scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .specialty-scroll-grid {
            gap: 10px;
          }

          .specialty-scroll-shell {
            height: 420px;
          }
        }

        @media (max-width: 700px) {
          .specialty-scroll-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
