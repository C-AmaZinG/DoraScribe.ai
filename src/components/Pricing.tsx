"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

function Counter({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration: 1,
      onUpdate(v) {
        setDisplayValue(Math.floor(v));
      },
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <span>{prefix}{displayValue}</span>;
}

interface PricingTier {
  name: string;
  price: Record<string, number>;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  sublabel: string;
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const tiers: PricingTier[] = [
    {
      name: "Free Trial",
      price: { monthly: 0, yearly: 0 },
      sublabel: "No credit card needed",
      description: "Perfect for testing Dorascribe with real patients",
      features: [
        "20 Transcripts/Month",
        "Standard Email Support",
        "Default Templates",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Essential",
      price: { monthly: 39, yearly: 33 },
      sublabel: "per month",
      description: "Best for solo practitioners",
      features: [
        "150 Transcripts/Month",
        "Custom Note Templates",
        "Unlimited Ask Dora",
        "Prescription Generation",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: { monthly: 59, yearly: 49 },
      sublabel: "per month",
      description: "Great for growing practices",
      features: [
        "Everything in Essential",
        "300 Transcripts/Month",
        "Phone Support",
        "Patient Summaries",
      ],
      cta: "Try 14 days free",
      popular: true,
    },
    {
      name: "Premium",
      price: { monthly: 89, yearly: 74 },
      sublabel: "per month",
      description: "For high-volume clinics",
      features: [
        "Everything in Professional",
        "Unlimited Transcripts",
        "1:1 Onboarding",
        "API Data Access",
      ],
      cta: "Get Started",
      popular: false,
    },
  ];

  const freq = isYearly ? "yearly" : "monthly";

  return (
    <section id="pricing" style={{ padding: "120px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Content */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            lineHeight: 1.1,
            marginBottom: "20px"
          }}>
            Choose the package that<br />fits your practice.
          </h2>
        </div>

        {/* CONNECTED PRICING BLOCK (Makro Style) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Linked Toggle on Top */}
          <div style={{
             display: "flex",
             background: "#F1F5F9",
             borderRadius: "100px",
             padding: "6px",
             width: "280px",
             border: "1px solid #e2e8f0",
             borderBottom: "none",
             borderBottomLeftRadius: "0",
             borderBottomRightRadius: "0",
             position: "relative",
             zIndex: 1,
             transform: "translateY(1px)"
          }}>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                flex: 1,
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: isYearly ? "#ffffff" : "transparent",
                color: isYearly ? "#1a1a1a" : "#64748b",
                boxShadow: isYearly ? "0 4px 10px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.3s ease",
                borderRadius: isYearly ? '100px' : '0' // Adjusted for connection 
              }}
            >
              Yearly
            </button>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                flex: 1,
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: !isYearly ? "#ffffff" : "transparent",
                color: !isYearly ? "#1a1a1a" : "#64748b",
                boxShadow: !isYearly ? "0 4px 10px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.3s ease",
                borderRadius: !isYearly ? '100px' : '0'
              }}
            >
              Monthly
            </button>
          </div>

          {/* Main Connected Container */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            width: '100%',
            background: "#ffffff",
            borderRadius: "40px",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.06)",
            position: 'relative',
            zIndex: 0
          }} className="connected-pricing-grid">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                style={{
                  padding: "64px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                  borderRight: idx < tiers.length - 1 ? "1px solid #f0f0f0" : "none",
                  background: tier.popular ? "#fafafa" : "#ffffff",
                  position: "relative"
                }}
              >
                {tier.popular && (
                  <div style={{
                     position: 'absolute',
                     top: '12px',
                     left: '40px',
                     background: 'var(--primary)',
                     color: '#fff',
                     padding: '4px 10px',
                     borderRadius: '8px',
                     fontSize: '0.7rem',
                     fontWeight: 700,
                     textTransform: 'uppercase',
                     letterSpacing: '0.05em'
                  }}>
                    Featured
                  </div>
                )}

                <div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "8px"
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#64748b",
                    lineHeight: 1.5,
                    minHeight: "45px"
                  }}>
                    {tier.description}
                  </p>
                </div>

                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    letterSpacing: "-0.03em"
                  }}>
                    <Counter value={tier.price[freq]} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      color: "#64748b",
                      marginLeft: "4px",
                      fontWeight: 500
                    }}>
                      /mo
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    marginTop: "8px"
                  }}>
                    {tier.sublabel}
                  </p>
                </div>

                <a
                  href="https://app.dorascribe.ai/signUp"
                  style={{
                    display: "block",
                    padding: "16px",
                    borderRadius: "16px",
                    textAlign: "center",
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    background: tier.popular ? "#111" : "#f1f5f9",
                    color: tier.popular ? "#ffffff" : "#1a1a1a",
                    transition: "all 0.3s ease"
                  }}
                >
                  {tier.cta}
                </a>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "8px"
                }}>
                  {tier.features.map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ flexShrink: 0, marginTop: "2px" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        color: "#4a5568",
                        lineHeight: 1.4
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1024px) {
          .connected-pricing-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .connected-pricing-grid div:nth-child(2) {
            border-right: none !important;
            border-bottom: 1px solid #f0f0f0;
          }
          .connected-pricing-grid div:nth-child(1) {
            border-bottom: 1px solid #f0f0f0;
          }
        }
        @media (max-width: 640px) {
          .connected-pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .connected-pricing-grid div {
            border-right: none !important;
            border-bottom: 1px solid #f0f0f0;
          }
        }
      `}</style>
    </section>
  );
}
