"use client";

import React from 'react';
import { motion } from 'framer-motion';

const topSpecialties = [
  "Endocrinology", "Nephrology", "Urology", "Optometry",
  "Infectious Diseases", "Rheumatology", "Public Health", "Occupational Medicine",
];

const bottomSpecialties = [
  "Palliative Care", "Preventive Medicine", "Sports Medicine", "Pain Management",
  "Physiotherapy", "Dentistry", "Respiratory Therapy", "Clinical Psychology",
];

export default function Specialties() {
  const [isPaused, setIsPaused] = React.useState(false);
  // Triple the items so the loop is seamless even on wide / narrow screens
  const loopingTop = [...topSpecialties, ...topSpecialties, ...topSpecialties];
  const loopingBottom = [...bottomSpecialties, ...bottomSpecialties, ...bottomSpecialties];

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
          padding: "180px 80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="specialties-container"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{ maxWidth: "760px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              color: "#000000",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            One Platform, Every Specialty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              color: "#666666",
              lineHeight: 1.5,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Dorascribe offers specialty-specific templates with the ability to
            generate custom clinical documentation across every specialty.
          </motion.p>
        </div>

        <div className="specialties-scroll-shell specialties-scroll-shell--top" aria-hidden="true">
          <div className={`specialties-scroll-track specialties-scroll-track--left ${isPaused ? 'is-paused' : ''}`}>
            {loopingTop.map((prof, i) => (
              <div key={`${prof}-${i}-top`} className="specialty-pill">
                {prof}
              </div>
            ))}
          </div>
        </div>

        <div className="specialties-scroll-shell specialties-scroll-shell--bottom" aria-hidden="true">
          <div className={`specialties-scroll-track specialties-scroll-track--right ${isPaused ? 'is-paused' : ''}`}>
            {loopingBottom.map((prof, i) => (
              <div key={`${prof}-${i}-bottom`} className="specialty-pill">
                {prof}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .specialties-container {
            padding: 120px 32px !important;
            text-align: center;
          }
        }
        @media (max-width: 640px) {
          .specialties-container {
            padding: 110px 16px !important;
          }
          .specialty-pill {
            padding: 10px 16px !important;
            font-size: 13px !important;
          }
          .specialties-scroll-shell--top {
            top: 16px !important;
          }
          .specialties-scroll-shell--bottom {
            bottom: 16px !important;
          }
          .specialties-scroll-track {
            gap: 8px !important;
          }
        }

        .specialties-scroll-shell {
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .specialties-scroll-shell--top {
          top: 22px;
        }

        .specialties-scroll-shell--bottom {
          bottom: 22px;
        }

        .specialties-scroll-track {
          display: flex;
          flex-direction: row;
          gap: 12px;
          width: max-content;
          animation: specialties-scroll-left 34s linear infinite;
          will-change: transform;
        }

        .specialties-scroll-track--right {
          animation-name: specialties-scroll-right;
        }

        .specialties-container:hover .specialties-scroll-track,
        .specialties-scroll-track.is-paused {
          animation-play-state: paused;
        }

        .specialty-pill {
          padding: 16px 28px;
          border-radius: 16px;
          border: 1px solid rgba(0,170,170,0.12);
          background: rgba(255,255,255,0.6);
          color: #000000;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          white-space: nowrap;
          opacity: 0.66;
        }

        .specialty-pill:hover {
          opacity: 1;
          background: rgba(255,255,255,0.9);
          border-color: rgba(0,170,170,0.25);
        }

        @keyframes specialties-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        @keyframes specialties-scroll-right {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
