"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "@/lib/translations/translations-context"

export default function WhyChoose() {
  const t = useTranslations();
  return (
    <section
      id="why-choose"
      style={{
        background: "var(--feature-section-bg, #FFFFFF)",
        paddingTop: "120px",
        paddingBottom: "120px",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "100%",
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: "64px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              color: "#000000",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {t("Why Choose Dorascribe?")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "18px",
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--feature-section-subtitle, #555555)",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            {t("Streamline your workflow and enhance patient interactions with these benefits")}
          </motion.p>
        </div>

        {/* Featured Card (Large) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "#0B1D33",
            borderRadius: "48px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            minHeight: "440px",
            marginBottom: "32px",
            position: "relative",
          }}
          className="main-feature-card"
        >
          {/* Content side */}
          <div
            className="smart-ambient-content"
            style={{
              flex: 1,
              padding: "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <h3
              className="smart-ambient-title"
              style={{
                fontSize: "28px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#FFFFFF",
                marginBottom: "24px",
                lineHeight: 1.1,
                maxWidth: "500px",
              }}
            >
              {t("Smart Ambient Clinical Platform")}
            </h3>
            <p
              className="smart-ambient-description"
              style={{
                fontSize: "16px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              {t("More than an AI scribe.")}<br />
              {t("From real-time documentation to clinical decision support, prescriptions, and smart form completion.")}<br /><br />
              {t("Built to streamline every step of care")}
            </p>
          </div>

          {/* Image/Visual side — desktop only */}
          <div
            className="smart-ambient-image"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "60%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <Image
              src="/assets/dorascribe-smart-ambient-ai-hero.png"
              alt="Dorascribe Smart Ambient AI Clinical Platform – AI-powered real-time medical documentation"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                mixBlendMode: "color-dodge",
              }}
              priority
            />
          </div>
        </motion.div>

        {/* Grid Cards (Bottom) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="feature-grid"
        >
          {/* Privacy Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "#F8F7F5",
              borderRadius: "40px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "360px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "40px", right: "40px" }}>
              <Image 
                src="/assets/dorascribe-privacy-compliance-icon.svg" 
                alt="HIPAA, GDPR, and SOC2 privacy compliance badge" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#000000",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {t("Privacy Compliance")}
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#666666",
                lineHeight: 1.6,
              }}
            >
              {t("HIPAA, POPIA, PIPEDA, GDPR, and SOC2 compliance help ensure your data and your patients' information remain protected.")}
            </p>
            <a 
              href="https://app.vanta.com/dorascribe.ai/trust/8445rz2ypjuu77ka2jqdb8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: "#3d8183",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px"
              }}
            >
              Visit Trust Center
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>

          {/* Work Across All Devices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: "#0B1D33",
              borderRadius: "40px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "360px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "40px", right: "40px" }}>
              <Image 
                src="/assets/dorascribe-cross-platform-icon.svg" 
                alt="Dorascribe works across desktop, tablet, and mobile devices" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#FFFFFF",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {t("Work Across All Devices")}
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.6,
              }}
            >
              {t("Access Dorascribe anytime, anywhere, on desktop, tablet, or mobile. Available on the App Store and Google Play.")}
            </p>
          </motion.div>

          {/* Integrate with your EMR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: "#F8F7F5",
              borderRadius: "40px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "360px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "40px", right: "40px" }}>
              <Image 
                src="/assets/dorascribe-emr-integration-icon.svg" 
                alt="Dorascribe EMR and EHR integration icon" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#000000",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {t("Integrate with your EMR")}
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#666666",
                lineHeight: 1.6,
              }}
            >
              {t("Connect Dorascribe to your existing workflow so completed notes are ready to move into your EMR quickly and with less manual work.")}
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .main-feature-card {
            flex-direction: column !important;
            min-height: 360px !important;
            border-radius: 40px !important;
          }
          .smart-ambient-content {
            padding: 48px 40px !important;
            justify-content: flex-end !important;
          }
          .smart-ambient-image {
            display: none !important;
          }
          .feature-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .smart-ambient-title {
          font-size: 28px !important;
        }

        @media (max-width: 768px) {
          .smart-ambient-description {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
