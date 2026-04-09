"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "@/lib/hooks"

const whyChooseSteps = [
  {
    index: "01",
    badge: "Ambient AI",
    title: "Smart Ambient AI Medical Tool",
    description:
      "This is more than just a scribe. Enjoy easy EMR integration and experience clinical freedom.",
    benefit: "AI that works with you, not against you",
    image: "/assets/img_ambient_ai_people.png",
  },
  {
    index: "02",
    badge: "Privacy compliance",
    title: "Privacy Compliance",
    description:
      "HIPAA, POPIA, PIPEDA, GDPR, and SOC2 compliance help ensure your data and your patients' information remain protected.",
    benefit: "Your data is safe, always",
    image: "/assets/layer_1.png",
  },
  {
    index: "03",
    badge: "Cross-platform",
    title: "Work Across All Devices",
    description:
      "Access Dorascribe anytime, anywhere, on desktop, tablet, or mobile. Available on the App Store and Google Play.",
    benefit: "Seamless experience on every device",
    image: "/assets/img_cross_platform_people.png",
  },
  {
    index: "04",
    badge: "EMR integration",
    title: "Integrate with your EMR",
    description:
      "Connect Dorascribe to your existing workflow so completed notes are ready to move into your EMR quickly and with less manual work.",
    benefit: "Fits smoothly into your current workflow",
    image: "/assets/img_emr_integration.png",
  },
]

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(28,28,28,0.4)" }}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(28,28,28,0.3)", flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

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
          boxShadow: "0 40px 100px rgba(0,0,0,0.06)",
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
                hyphens: "none",
                wordBreak: "keep-all",
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

            {step.title === "Work Across All Devices" && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "24px",
                }}
              >
                <a
                  href="https://apps.apple.com/"
                  aria-label="Download on the App Store"
                  style={{ display: "inline-flex" }}
                >
                  <Image
                    src="/assets/app-store.svg"
                    alt="Download on the App Store"
                    width={145}
                    height={44}
                    style={{ height: "44px", width: "auto" }}
                  />
                </a>
                <a
                  href="https://play.google.com/store"
                  aria-label="Get it on Google Play"
                  style={{ display: "inline-flex" }}
                >
                  <Image
                    src="/assets/google-play.svg"
                    alt="Get it on Google Play"
                    width={145}
                    height={44}
                    style={{ height: "44px", width: "auto" }}
                  />
                </a>
              </div>
            )}
          </div>

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

        <div
          style={{
            width: isMobile ? "100%" : "52%",
            background: "#C7C3C1",
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
            padding: 0,
          }}
        >
          {step.badge === "Privacy compliance" ? (
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "640px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: isMobile ? "24px" : "32px",
            }}>
              <Image
                src={step.image}
                alt={step.title}
                width={1000}
                height={800}
                style={{
                  width: "70%",
                  maxWidth: "450px",
                  height: "auto",
                  objectFit: "contain",
                  filter: "brightness(0)",
                }}
                priority
              />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                style={{
                  objectFit: "cover",
                }}
                priority
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

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

        <div style={{ display: "flex", flexDirection: "column" }}>
          {whyChooseSteps.map((step, idx) => (
            <FeatureCard key={idx} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
