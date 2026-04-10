"use client";

import React from 'react';
import { motion } from 'framer-motion';

const professionals = [
  "Endocrinology", "Nephrology", "Urology", "Optometry", "Infectious Diseases", 
  "Rheumatology", "Public Health", "Occupational Medicine", "Palliative Care",
  "Preventive Medicine", "Sports Medicine", "Pain Management", "Physiotherapy",
  "Dentistry", "Respiratory Therapy", "Clinical Psychology"
];

export default function Specialties() {
  const leftProfessionals = professionals.slice(0, 8);
  const rightProfessionals = professionals.slice(8);
  const loopingLeftProfessionals = [...leftProfessionals, ...leftProfessionals];
  const loopingRightProfessionals = [...rightProfessionals, ...rightProfessionals];

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          background: "#F8F7F5",
          borderRadius: "48px",
          padding: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "60px",
          position: "relative",
          overflow: "hidden",
        }}
        className="specialties-container"
      >
        {/* Left Side Content */}
        <div style={{ flex: "0 0 40%", position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              color: "#000000",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Tailored Clinical Expertise for Every Specialty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "#666666",
              lineHeight: 1.5,
              maxWidth: "320px",
            }}
          >
            create custom templates in seconds
          </motion.p>
        </div>

        {/* Right Side - Staggered Lists */}
        <div
          style={{
            flex: "1",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            alignItems: "start"
          }}
          className="specialties-grid"
        >
          <div className="specialties-scroll-shell">
            <div className="specialties-scroll-track specialties-scroll-track--up">
              {loopingLeftProfessionals.map((prof, i) => (
                <div key={`${prof}-${i}-left`} className="specialty-pill">
                  {prof}
                </div>
              ))}
            </div>
          </div>

          <div className="specialties-scroll-shell">
            <div className="specialties-scroll-track specialties-scroll-track--down">
              {loopingRightProfessionals.map((prof, i) => (
                <div key={`${prof}-${i}-right`} className="specialty-pill">
                  {prof}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .specialties-container {
            flex-direction: column !important;
            padding: 60px 40px !important;
            text-align: center;
          }
          .specialties-container > div:first-child {
            flex: none !important;
            width: 100% !important;
          }
          .specialties-container p {
            margin: 0 auto 40px !important;
          }
          .specialties-grid {
            width: 100% !important;
            grid-template-columns: 1fr 1fr !important;
            justify-items: stretch;
          }
          .specialties-grid > div {
            align-items: stretch !important;
            margin-top: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .specialties-grid {
            grid-template-columns: 1fr !important;
          }
          .specialties-scroll-shell:nth-child(2) {
            display: none;
          }
        }

        .specialties-scroll-shell {
          height: 460px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        .specialties-scroll-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: specialties-scroll-up 32s linear infinite;
          will-change: transform;
        }

        .specialties-scroll-track--down {
          animation-name: specialties-scroll-down;
        }

        .specialties-grid:hover .specialties-scroll-track {
          animation-play-state: paused;
        }

        .specialty-pill {
          padding: 16px 28px;
          border-radius: 16px;
          border: 1px solid rgba(0,170,170,0.12);
          background: rgba(255,255,255,0.6);
          color: #000000;
          font-family: 'Playfair Display', serif;
          font-size: 16px;
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
          background: rgba(255,255,255,0.9);
          border-color: rgba(0,170,170,0.25);
        }

        @keyframes specialties-scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        @keyframes specialties-scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
