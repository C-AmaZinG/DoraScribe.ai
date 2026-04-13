"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WhyChoose() {
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
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              color: "#000000",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Why Choose Dorascribe?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "18px",
              fontFamily: "'Inter', sans-serif",
              color: "var(--feature-section-subtitle, #555555)",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            Streamline your workflow and enhance patient interactions with these benefits
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
                fontFamily: "'Playfair Display', serif",
                color: "#FFFFFF",
                marginBottom: "24px",
                lineHeight: 1.1,
                maxWidth: "500px",
              }}
            >
              Smart Ambient Clinical Platform
            </h3>
            <p
              className="smart-ambient-description"
              style={{
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              More than an AI scribe.<br />
              From real-time documentation to clinical decision support, prescriptions, and smart form completion.<br /><br />
              Built to streamline every step of care
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
              src="/assets/Smart Ambient AI Medical Tool.png"
              alt="Medical AI Visual"
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
                src="/assets/Privacy Compliance icon.svg" 
                alt="Privacy" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'Playfair Display', serif",
                color: "#000000",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              Privacy Compliance
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                color: "#666666",
                lineHeight: 1.6,
              }}
            >
              HIPAA, POPIA, PIPEDA, GDPR, and SOC2 compliance help ensure your data and your patients' information remain protected.
            </p>
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
                src="/assets/Work Across All Devices icon.svg" 
                alt="Cross Platform" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'Playfair Display', serif",
                color: "#FFFFFF",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              Work Across All Devices
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.6,
              }}
            >
              Access Dorascribe anytime, anywhere, on desktop, tablet, or mobile. Available on the App Store and Google Play.
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
                src="/assets/Integrate with your EMR icon.svg" 
                alt="EMR" 
                width={32} 
                height={32} 
              />
            </div>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "'Playfair Display', serif",
                color: "#000000",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              Integrate with your EMR
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                color: "#666666",
                lineHeight: 1.6,
              }}
            >
              Connect Dorascribe to your existing workflow so completed notes are ready to move into your EMR quickly and with less manual work.
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
