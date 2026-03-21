"use client";

import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Engage Your Patients",
    description:
      "Eliminate note-taking distractions, allowing you to focus on your patients and foster meaningful connections.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Maximize Your Efficiency",
    description:
      "Instantly capture live conversations with your patient or dictate a summary of the interaction.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: "Enhance Your Precision",
    description:
      "Reduce errors and enhance data accuracy with our AI medical scribe, ensuring your notes are detailed and compliant.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: "Adapt to Your Needs",
    description:
      "Customize templates and workflows to suit your specific practice, making documentation tailored and efficient.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function WhyChoose() {
  return (
    <section style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "12px",
            }}
          >
            Why Dorascribe
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--text-main)",
              marginBottom: "12px",
            }}
          >
            Why Choose Dorascribe?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.050rem",
              color: "var(--text-muted)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Streamline your workflow and enhance patient interactions with these
            benefits.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="whychoose-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hover-lift"
              style={{
                background: i % 2 === 0 ? "#f0faf8" : "#ffffff",
                border: "1px solid rgba(0,0,0,0.04)",
                borderRadius: "32px",
                padding: "48px 40px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "var(--primary)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "28px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.06)"
                }}
              >
                {benefit.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "var(--text-main)",
                  marginBottom: "14px",
                }}
              >
                {benefit.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
