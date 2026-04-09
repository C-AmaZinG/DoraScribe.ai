"use client"

import React, { useRef } from "react"
import { useIsMobile } from "@/lib/hooks"
import MakroButton from "@/components/ui/MakroButton"

const steps = [
  {
    title: "Record Your Patient Encounter",
    desc: "Simply start a recording during your patient visit. Dorascribe captures the conversation naturally, so you can focus entirely on your patient with no typing and no distractions.",
  },
  {
    title: "AI Generates Clinical Notes",
    desc: "Dorascribe's advanced AI instantly transcribes the encounter and produces structured, accurate clinical notes in your preferred format, including SOAP, DAP, or custom templates.",
  },
  {
    title: "Review, Edit & Export",
    desc: "Review the generated notes, make any adjustments, and export directly into your EMR. Your documentation is complete in seconds, not hours.",
  },
]

/* ── Dashboard GIF ── */
function DashboardGif() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/New-UI-home-page-walkthrough.gif"
      alt="Dorascribe dashboard walkthrough"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  )
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        width: "100%",
        padding: isMobile ? "80px 0" : "120px 0",
        background: "#0B1D33",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 24px",
        width: "100%",
        maxWidth: "900px",
        marginBottom: isMobile ? "48px" : "80px",
      }}>
        <div style={{
          background: "#ffffff",
          padding: "8px 20px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#1c1c1c",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#26A69A" }} />
          How it works
        </div>

        <div
          role="heading"
          aria-level={2}
          style={{
            fontSize: isMobile ? "32px" : "56px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "#ffffff",
            marginBottom: "24px",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Dorascribe simplifies clinical documentation at the point of care.
        </div>

        <p style={{
          fontSize: isMobile ? "16px" : "19px",
          color: "#A1A1A5",
          fontWeight: 400,
          maxWidth: "600px",
          lineHeight: 1.6,
        }}>
          All in seconds. Real time transcription. No interruptions.
        </p>
      </div>

      {/* Giant Center Tablet (Intro Mockup) */}
      <div style={{
        width: "100%",
        maxWidth: "1000px",
        padding: isMobile ? "0 24px" : "0 48px",
        marginBottom: isMobile ? "64px" : "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "100%",
          background: "#E5E5EA",
          padding: isMobile ? "8px" : "14px",
          borderRadius: isMobile ? "20px" : "40px",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}>
          <div style={{
            width: "100%",
            background: "#ffffff",
            borderRadius: isMobile ? "14px" : "28px",
            overflow: "hidden",
            display: "flex",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            aspectRatio: isMobile ? "4 / 3" : "16 / 10",
            position: "relative",
          }}>
            <DashboardGif />
          </div>
        </div>
      </div>

      {/* Cards Layout for Steps */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "0 24px" : "0 48px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "24px" : "32px",
          width: "100%",
          marginBottom: isMobile ? "48px" : "64px",
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ color: "#26A69A", fontWeight: 700, fontSize: "14px", letterSpacing: "0.1em" }}>
                STEP 0{idx + 1}
              </div>
              <h3 style={{ fontSize: "24px", lineHeight: 1.2, fontWeight: 500, color: "#ffffff", letterSpacing: "-0.01em", margin: 0 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "15px", color: "#A1A1A5", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ width: isMobile ? "100%" : "auto", maxWidth: isMobile ? "300px" : "none" }}>
          <MakroButton
            href="https://app.dorascribe.ai/signUp"
            text="Start a free trial"
            className="how-it-works-cta"
          />
        </div>
      </div>

      <style jsx>{`
        .how-it-works-cta {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </section>
  )
}

