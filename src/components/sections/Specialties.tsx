"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Baby, Brain, Microscope, Building2, Activity, FileText, BrainCircuit, Settings } from 'lucide-react';

const professionals = [
  "Internal Medicine",
  "Family Medicine",
  "Emergency Medicine",
  "Pediatrics",
  "General Surgery",
  "Obstetrics & Gynecology",
  "Cardiology",
  "Psychiatry",
  "Neurology",
  "Orthopedics",
  "Dermatology",
  "Radiology",
  "Anesthesiology",
  "Oncology",
  "Gastroenterology",
  "Pulmonology",
  "Endocrinology",
  "Nephrology",
  "Urology",
  "Ophthalmology",
  "Optometry",
  "ENT",
  "Infectious Diseases",
  "Hematology",
  "Rheumatology",
  "Allergy & Immunology",
  "Public Health",
  "Preventive Medicine",
  "Occupational Medicine",
  "Sports Medicine",
  "Palliative Care",
  "Pain Management",
  "Rehabilitation Medicine",
  "Physiotherapy",
  "Pathology",
  "Dentistry",
  "Nursing",
  "Respiratory Therapy",
  "Dietitians",
  "Clinical Psychology",
  "Social Work",
  "Chiropractic",
];

const icons = [Stethoscope, Baby, Brain, Microscope, Building2, Activity];
const templateFeatures = [
  {
    icon: FileText,
    title: "Custom templates in seconds",
    description:
      "Paste or upload any document and Scope will create a matching template instantly.",
  },
  {
    icon: BrainCircuit,
    title: "Learns your style",
    description:
      "Scope adapts to your edits and feedback, getting better with every note.",
  },
  {
    icon: Settings,
    title: "Template editor",
    description:
      "Complete control over formatting, style, and verbosity.",
  },
];
const leftProfessionals = professionals.filter((_, index) => index % 2 === 0);
const rightProfessionals = professionals.filter((_, index) => index % 2 !== 0);
const loopingLeftProfessionals = [...leftProfessionals, ...leftProfessionals];
const loopingRightProfessionals = [...rightProfessionals, ...rightProfessionals];

export default function Specialties() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#FDFCFA",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="specialty-stack">
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            background: "#F9F4F1",
            borderRadius: "32px",
            padding: "80px 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "40px",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left Side Content */}
          <div style={{ flex: 1, minWidth: "320px", position: "relative", zIndex: 1 }}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                fontWeight: 700,
                color: "#000000",
                lineHeight: 1.1,
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Tailored Clinical
              <br />
              Expertise for Every
              <br />
              Specialty
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.25rem",
                color: "#8E8E8E",
                lineHeight: 1.5,
                marginBottom: "60px",
                maxWidth: "420px",
              }}
            >
              Master your clinical documentation and practice workflows, no matter your
              medical field.
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
                      <div
                        className={`specialty-pill__icon ${
                          highlight ? "is-highlight" : ""
                        }`}
                      >
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
                      <div
                        className={`specialty-pill__icon ${
                          highlight ? "is-highlight" : ""
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="specialty-notes-grid">
          {templateFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="specialty-note">
                <div className="feature-icon-box">
                  <Icon size={18} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .specialty-stack {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .specialty-notes-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding: 0;
        }

        .specialty-note {
          background: #F9F4F1;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
        }

        .specialty-note h3 {
          margin: 0;
          font-family: "Monument Grotesk", sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.15;
          color: #000000;
        }

        .specialty-note p {
          margin: 12px 0 0;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.7);
          max-width: 100%;
        }

        .feature-icon-box {
          margin-bottom: 24px;
          color: #000000;
        }

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
          border: 1px solid rgba(0,170,170,0.12);
          background: rgba(255,255,255,0.6);
          color: #000000;
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
          background: rgba(255,255,255,0.9);
          border-color: rgba(0,170,170,0.25);
        }

        .specialty-pill__label {
          display: block;
          padding-right: 16px;
          line-height: 1.3;
        }

        .specialty-pill__icon {
          color: rgba(0,170,170,0.6);
          flex-shrink: 0;
        }

        .specialty-pill__icon.is-highlight {
          color: #000000;
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
          .specialty-notes-grid {
            gap: 20px;
            padding: 0;
          }

          .specialty-scroll-grid {
            gap: 10px;
          }

          .specialty-scroll-shell {
            height: 420px;
          }
        }

        @media (max-width: 700px) {
          .specialty-notes-grid {
            grid-template-columns: 1fr;
          }

          .specialty-note h3 {
            font-size: 20px;
          }

          .specialty-note p {
            font-size: 1rem;
          }

          .specialty-scroll-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

