"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MakroButton from "@/components/ui/MakroButton";

const features = [
  {
    label: "Transcribe",
    title: "Real-time clinical transcription",
    description:
      "AI listens to every patient encounter and converts natural conversation into structured, specialist-grade clinical notes â€” instantly.",
    highlight: "No more typing during appointments.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: "Adapt",
    title: "AI that adapts to your specialty",
    description:
      "Whether you're in cardiology, psychiatry, or general practice â€” Dorascribe learns your terminology and structures notes to match your workflow.",
    highlight: "Customizable templates for every specialty.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    label: "Integrate",
    title: "Seamless EMR integration",
    description:
      "One-click export to Epic, Cerner, AthenaHealth, and more. Your notes appear in the right place, formatted correctly â€” every time.",
    highlight: "Zero friction between capture and record.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="why-choose" style={{ padding: "120px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Split Layout â€” Makro "Financial insight" Clone */}
        <div className="ai-adapts-layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}>

          {/* Left Column â€” Text + Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "16px",
            }}>Built for Clinicians</p>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "#0B1D33",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}>
              AI that adapts<br />to your practice.
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "#64748b",
              lineHeight: 1.6,
              marginBottom: "48px",
              maxWidth: "440px",
            }}>
              Connect once and let Dorascribe handle the rest. No manual notes, no exports, no waiting.
            </p>

            {/* Feature Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {features.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: activeIndex === i ? "#f8fafc" : "transparent",
                    border: activeIndex === i ? "1.5px solid rgba(0,0,0,0.06)" : "1.5px solid transparent",
                    borderRadius: "20px",
                    padding: "24px 28px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Feature Label */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: activeIndex === i ? "12px" : "0",
                  }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: activeIndex === i ? "var(--makro-accent, #FF6F00)" : "#f1f5f9",
                      color: "#0B1D33",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}>
                      {feature.icon}
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: activeIndex === i ? "#0B1D33" : "#94a3b8",
                      transition: "color 0.3s ease",
                    }}>{feature.label}</span>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.3rem",
                          fontWeight: 400,
                          color: "#0B1D33",
                          marginBottom: "8px",
                          paddingLeft: "48px",
                        }}>{feature.title}</h3>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.9rem",
                          color: "#64748b",
                          lineHeight: 1.6,
                          paddingLeft: "48px",
                          marginBottom: "8px",
                        }}>{feature.description}</p>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "#84CC16",
                          paddingLeft: "48px",
                        }}>{feature.highlight}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA Button â€” Makro Style */}
            <MakroButton text="Get started" href="https://app.dorascribe.ai/signUp" />
          </motion.div>

          {/* Right Column â€” Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div style={{
              background: "#f8fafc",
              borderRadius: "32px",
              padding: "48px 40px 10px", // Reduced bottom padding
              border: "1.5px solid rgba(0,0,0,0.04)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Active Feature Visual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Mock UI Header */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "32px",
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "var(--makro-accent, #FF6F00)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {features[activeIndex].icon}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 400,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}>{features[activeIndex].label}</p>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: "#0B1D33",
                      }}>{features[activeIndex].title}</p>
                    </div>
                  </div>

                  {/* Mock UI â€” Different for each feature */}
                  {activeIndex === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Waveform animation */}
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite" }} />
                          <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: "0.8rem", color: "#EF4444" }}>Recording...</span>
                          <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: "0.75rem", color: "#94a3b8", marginLeft: "auto" }}>02:34</span>
                        </div>
                        <div style={{ display: "flex", gap: "3px", alignItems: "end", height: "40px" }}>
                          {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} style={{
                              width: "4px",
                              background: i > 24 ? "#FF6F00" : "#e2e8f0",
                              borderRadius: "2px",
                              height: `${Math.random() * 100}%`,
                              minHeight: "4px",
                              transition: "height 0.3s ease",
                            }} />
                          ))}
                        </div>
                      </div>
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "20px 24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}>
                        <p style={{ fontFamily: "'Fragment Mono', monospace", fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>
                          <span style={{ color: "#84CC16" }}>Dr.:</span> Patient presents with intermittent chest pain, worse with exertion...
                        </p>
                      </div>
                    </div>
                  )}

                  {activeIndex === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Specialty selector */}
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Active specialty</p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {["Cardiology", "Psychiatry", "General", "Pediatrics"].map((s, i) => (
                            <div key={s} style={{
                              padding: "8px 16px",
                              borderRadius: "100px",
                              background: i === 0 ? "#0B1D33" : "#f1f5f9",
                              color: i === 0 ? "#FF6F00" : "#64748b",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: 400,
                            }}>{s}</div>
                          ))}
                        </div>
                      </div>
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "20px 24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "8px" }}>Template adapted for</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#0B1D33", fontWeight: 400 }}>Cardiology Consultation Note</p>
                        <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
                          <div style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(212,255,89,0.2)", fontSize: "0.7rem", color: "#4d7c0f" }}>SOAP</div>
                          <div style={{ padding: "4px 10px", borderRadius: "6px", background: "#f1f5f9", fontSize: "0.7rem", color: "#64748b" }}>ECG Review</div>
                          <div style={{ padding: "4px 10px", borderRadius: "6px", background: "#f1f5f9", fontSize: "0.7rem", color: "#64748b" }}>Stress Test</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeIndex === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* EMR integration card */}
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Connected systems</p>
                        {[
                          { name: "Epic", status: "Connected", color: "#84CC16" },
                          { name: "Cerner", status: "Connected", color: "#84CC16" },
                          { name: "AthenaHealth", status: "Pending", color: "#f59e0b" },
                        ].map((emr) => (
                          <div key={emr.name} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 0",
                            borderBottom: "1px solid #f1f5f9",
                          }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#0B1D33" }}>{emr.name}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: emr.color }} />
                              <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: "0.75rem", color: emr.color }}>{emr.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "20px 24px",
                        border: "1px solid rgba(0,0,0,0.04)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#0B1D33" }}>Last synced 2 min ago</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "32px" }}>
                {features.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: activeIndex === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "100px",
                      background: activeIndex === i ? "var(--makro-accent, #FF6F00)" : "#e2e8f0",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 1024px) {
          .ai-adapts-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}


