"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import Image from "next/image"

const whyChooseSteps = [
  {
    index: "01",
    badge: "Patient engagement",
    title: "Engage Your Patients",
    description:
      "Eliminate note-taking distractions, allowing you to focus on your patients and foster meaningful connections.",
    benefit: "More face time, stronger patient relationships",
    visual: "/assets/discover-4.webp",
  },
  {
    index: "02",
    badge: "Clinical efficiency",
    title: "Maximize Your Efficiency",
    description:
      "Instantly capture live conversations with your patient or dictate a summary of the interaction.",
    benefit: "Save hours of documentation time every day",
    visual: "/assets/discover-2.webp",
  },
  {
    index: "03",
    badge: "Accurate documentation",
    title: "Enhance Your Precision",
    description:
      "AI-powered transcription ensures every detail is captured accurately, reducing errors and improving note quality.",
    benefit: "Clinically accurate notes, every time",
    visual: "/assets/discover-3.webp",
  },
  {
    index: "04",
    badge: "Custom workflows",
    title: "Adapt to Your Needs",
    description:
      "Customize templates and workflows to suit your specific practice, making documentation tailored and efficient.",
    benefit: "Fits your practice, not the other way around",
    visual: "/assets/discover-1.webp",
  },
]

/* ── Badge icon (small square with rounded corners) ── */
function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(28,28,28,0.4)" }}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  )
}

/* ── Checkmark icon ── */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(28,28,28,0.3)", flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

/* ── iPhone Mockup ── */
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: "relative",
      margin: "0 auto",
      width: "260px",
      height: "540px",
      background: "#1a1a1a",
      borderRadius: "3rem",
      padding: "12px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      border: "1px solid rgba(224,224,224,0.2)",
      overflow: "visible"
    }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "3rem", border: "4px solid #2a2a2a", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "112px", height: "28px", background: "#1a1a1a", borderRadius: "0 0 16px 16px", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "6px", background: "#2a2a2a", borderRadius: "999px", marginRight: "12px" }} />
        <div style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#2a2a2a" }} />
      </div>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "2.2rem", overflow: "hidden", background: "#000", zIndex: 30 }}>
        {children}
      </div>
      <div style={{ position: "absolute", left: "-2px", top: "96px", width: "3px", height: "32px", background: "#2a2a2a", borderRadius: "0 4px 4px 0", zIndex: 20 }} />
      <div style={{ position: "absolute", left: "-2px", top: "144px", width: "3px", height: "56px", background: "#2a2a2a", borderRadius: "0 4px 4px 0", zIndex: 20 }} />
      <div style={{ position: "absolute", left: "-2px", top: "224px", width: "3px", height: "56px", background: "#2a2a2a", borderRadius: "0 4px 4px 0", zIndex: 20 }} />
      <div style={{ position: "absolute", right: "-2px", top: "176px", width: "3px", height: "80px", background: "#2a2a2a", borderRadius: "4px 0 0 4px", zIndex: 20 }} />
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", width: "112px", height: "6px", background: "rgba(255,255,255,0.2)", borderRadius: "999px", zIndex: 50, pointerEvents: "none" }} />
    </div>
  )
}

/* ── Tablet Mockup ── */
function TabletMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
      background: "#e4e4e6",
      padding: "10px",
      borderRadius: "28px",
      border: "1px solid rgba(0,0,0,0.05)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        background: "#f4f5f7",
        borderRadius: "22px",
        overflow: "hidden",
        display: "flex",
        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.1)",
        aspectRatio: "16 / 10",
        position: "relative"
      }}>
        {children}
      </div>
    </div>
  )
}

/* ── FeatureCard with 3D Stack Effect ── */
function FeatureCard({ step, index }: { step: typeof whyChooseSteps[number], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "16px" : `${100 + index * 30}px`,
        zIndex: index + 1,
        width: "100%",
        maxWidth: "1320px",
        margin: "0 auto",
        marginBottom: isMobile ? "24px" : "64px",
      }}
    >
      <motion.div
        style={{
          scale: isMobile ? 1 : cardScale,
          opacity: 1,
          transformOrigin: "top center",
          background: "#F9F4F1",
          boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
          width: "100%",
          height: "100%",
          padding: isMobile ? "10px" : "12px",
          borderRadius: isMobile ? "36px" : "44px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Left: Text Content ── */}
        <div
          style={{
            width: isMobile ? "100%" : "48%",
            background: "#ffffff",
            borderRadius: isMobile ? "32px" : "40px",
            padding: isMobile ? "40px" : "72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexShrink: 0,
            zIndex: 10,
            boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            border: "1px solid rgba(255,255,255,0.5)",
            minHeight: isMobile ? "400px" : "560px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
            {/* Top: Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f4f5f7",
                border: "1px solid rgba(0,0,0,0.04)",
                borderRadius: "999px",
                padding: "6px 12px",
                width: "fit-content",
              }}
            >
              <BadgeIcon />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1c1c1c",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {step.badge}
              </span>
            </div>

            {/* Middle: Title + Description */}
            <div
              role="heading"
              aria-level={3}
              style={{
                marginTop: isMobile ? "48px" : "80px",
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: 500,
                lineHeight: 1.05,
                color: "#1c1c1c",
                letterSpacing: "-0.04em",
                maxWidth: "420px",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {step.title}
            </div>
            <p
              style={{
                marginTop: "24px",
                fontSize: isMobile ? "16px" : "18px",
                color: "rgba(28,28,28,0.5)",
                lineHeight: 1.6,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                maxWidth: "360px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Bottom: Benefit line with checkmark */}
          {step.benefit && (
            <div
              style={{
                marginTop: isMobile ? "64px" : "auto",
                paddingTop: "40px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(28,28,28,0.5)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <CheckIcon />
              {step.benefit}
            </div>
          )}
        </div>

        {/* ── Right: Visual ── */}
        <div
          style={{
            width: isMobile ? "100%" : "52%",
            background: "#F9F4F1",
            minHeight: isMobile ? "400px" : "auto",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: isMobile ? "32px" : "40px",
            marginTop: isMobile ? "10px" : "0",
            marginLeft: isMobile ? "0" : "10px",
            zIndex: 0,
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "32px" : "56px" }}>
            {step.index === "01" || step.index === "02" ? (
              <IPhoneMockup>
                <Image
                  src={step.visual}
                  alt={step.title}
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </IPhoneMockup>
            ) : step.index === "03" ? (
              <TabletMockup>
                <Image
                  src={step.visual}
                  alt={step.title}
                  fill
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
              </TabletMockup>
            ) : (
              <Image
                src={step.visual}
                alt={step.title}
                width={600}
                height={600}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Section ── */
export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      style={{
        background: "#FDFCFA",
        paddingTop: "176px",
        paddingBottom: "160px",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
            maxWidth: "768px",
            margin: "0 auto 112px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#ED2224",
              padding: "8px 24px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "fit-content",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Why Dorascribe
          </motion.div>
          <motion.div
            role="heading"
            aria-level={2}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#1c1c1c",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Why Choose Dorascribe?
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(17px, 2vw, 20px)",
              color: "rgba(28,28,28,0.5)",
              lineHeight: 1.6,
              fontWeight: 300,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Streamline your workflow and enhance patient interactions with these benefits
          </motion.p>
        </div>

        {/* Stacking Cards */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {whyChooseSteps.map((step, idx) => (
            <FeatureCard key={idx} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
