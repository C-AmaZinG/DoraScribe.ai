"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Sparkles, Monitor, CheckCircle, ClipboardSignature, PenTool, Send, Pill, FileEdit, Library, FileCheck2, Languages, ChevronRight } from "lucide-react";
import { useTranslations } from "@/lib/translations/translations-context";

const features = [
  {
    title: "Easy to Use",
    description: "Designed for a seamless experience with minimal learning curve",
    icon: <Sparkles size={24} color="var(--brand-primary)" />,    iconBg: "var(--brand-primary)",
    type: "text"
  },
  {
    title: "Clean Interface",
    description: "Simple, uncluttered layout that keeps the focus on your workflow",
    icon: <Monitor size={24} color="#4B6B7A" />,
    iconBg: "#4B6B7A",
    type: "text"
  },
  {
    title: "Accurate notes",
    description: "Capture every clinical detail with clarity and precision",
    icon: <CheckCircle size={24} color="#6E5B87" />,
    iconBg: "#6E5B87",
    type: "text"
  },
  {
    title: "Supports Multiple Languages",
    description: "Transcribe patient conversations across multiple languages with confidence.",
    icon: <Languages size={24} color="#2F6F8F" />,
    iconBg: "#2F6F8F",
    type: "text"
  },
  {
    title: "Patient Handouts",
    description: "Generate clear, professional handouts directly from your notes",
    icon: <ClipboardSignature size={24} color="#3D8268" />,
    iconBg: "#3D8268",
    type: "text"
  },
  {
    title: "Smart Editing",
    description: "Multiple ways to add more information to your note after creating it.",
    icon: <PenTool size={24} color="#C05A5A" />,
    iconBg: "#C05A5A",
    type: "text"
  },
  {
    title: "Referral Letter",
    description: "Let Dorascribe draft your referral letters for you",
    icon: <Send size={24} color="#2A6E91" />,
    iconBg: "#2A6E91",
    type: "text"
  },
  {
    title: "Smart Prescription generation",
    description: "Create prescriptions seamlessly from your documentation, saving time while ensuring accuracy.",
    icon: <Pill size={24} color="#7B8E42" />,
    iconBg: "#7B8E42",
    type: "text"
  },
  {
    title: "Custom Templates",
    description: "Access your custom templates and have the ability to create your preferred note template",
    icon: <FileEdit size={24} color="#8F674A" />,
    iconBg: "#8F674A",
    type: "text"
  },
  {
    title: "Dora Evidence",
    description: "Built-in clinical decision support tool designed to deliver evidence answers in seconds.",
    icon: <Library size={24} color="#114B69" />,
    iconBg: "#114B69",
    type: "text"
  },
  {
    title: "Smart Form Completion",
    description: "Dorascribe can help automatically complete your medical forms.",
    icon: <FileCheck2 size={24} color="#50304C" />,
    iconBg: "#50304C",
    type: "text"
  }
];

const withTerminalPunctuation = (text: string) => {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

export default function FeatureCards() {
  const t = useTranslations();

  // Catalog so the build-time scanner picks up the feature titles and descriptions
  void [
    t("Easy to Use"),
    t("Designed for a seamless experience with minimal learning curve"),
    t("Clean Interface"),
    t("Simple, uncluttered layout that keeps the focus on your workflow"),
    t("Accurate notes"),
    t("Capture every clinical detail with clarity and precision"),
    t("Privacy compliant"),
    t("HIPAA, PIPEDA, GDPR, POPIA"),
    t("SOC2"),
    t("Enterprise-grade security and audit-ready controls"),
    t("Patient Handouts"),
    t("Generate clear, professional handouts directly from your notes"),
    t("Supports Multiple Languages"),
    t("Transcribe patient conversations across multiple languages with confidence"),
    t("Smart Editing"),
    t("Multiple ways to add more information to your note after creating it"),
    t("Referral Letter"),
    t("Let Dorascribe draft your referral letters for you"),
    t("Smart Prescription generation"),
    t("Create prescriptions seamlessly from your documentation, saving time while ensuring accuracy"),
    t("Custom Templates"),
    t("Access your custom templates and have the ability to create your preferred note template"),
    t("Dora Evidence"),
    t("Built-in clinical decision support tool designed to deliver evidence answers in seconds"),
    t("Smart Form Completion"),
    t("Dorascribe can help automatically complete your medical forms"),
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Base scrolling speed (pixels per frame at 60fps)
  const speed = 1.0; 

  useAnimationFrame((time, delta) => {
    if (isDragging || isPaused) return;

    let currentX = x.get() - (speed * (delta / 16.67));

    // Seamless loop logic
    if (trackRef.current) {
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (currentX <= -halfWidth) {
        currentX += halfWidth;
      } else if (currentX > 0) {
        currentX -= halfWidth;
      }
    }

    x.set(currentX);
  });

  const handleDrag = () => {
    if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        let currentX = x.get();
        if (currentX <= -halfWidth) {
          x.set(currentX + halfWidth);
        } else if (currentX > 0) {
          x.set(currentX - halfWidth);
        }
    }
  };

  return (
    <section className="feature-cards-section">
      <div className="fc-container">
        <div 
          className="fc-marquee"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            ref={trackRef}
            className="fc-track"
            style={{ 
              x,
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              padding: "0 10px",
              minWidth: "max-content",
            }}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={handleDrag}
            whileTap={{ cursor: "grabbing" }}
          >
            {[...features, ...features].map((feature, idx) => (
              <div 
                key={idx} 
                className="fc-card"
                draggable={false}
                style={{ flexShrink: 0 }}
              >
                <div className="fc-icon-only">
                  {feature.icon}
                </div>
                <h3 className="fc-title">{t(feature.title)}</h3>
                
                {feature.type === "text" ? (
                  <p className="fc-text">{withTerminalPunctuation(t(feature.description))}</p>
                ) : (
                  <div className="fc-search-bar">
                    <span>{t(feature.description)}</span>
                    <ChevronRight size={14} className="fc-chevron" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .feature-cards-section {
          padding: 100px 24px 176px;
          background-color: var(--feature-section-bg, #FFFFFF);
          position: relative;
        }

        .fc-container {
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
          overflow: hidden;
          padding: 20px 0;
          position: relative;
        }

        .fc-container::before,
        .fc-container::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          max-width: 300px;
          min-width: 100px;
          z-index: 2;
          pointer-events: none;
        }

        .fc-container::before {
          left: 0;
          background: linear-gradient(to right, var(--feature-section-bg, #FFFFFF) 0%, transparent 100%);
        }

        .fc-container::after {
          right: 0;
          background: linear-gradient(to left, var(--feature-section-bg, #FFFFFF) 0%, transparent 100%);
        }

        .fc-marquee {
          display: flex;
          width: 100%;
          cursor: grab;
        }

        .fc-card {
          background: var(--fc-card-bg, #F8F7F6);
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          height: 260px;
          width: 300px;
          transition: background 0.3s ease;
          user-select: none;
        }

        .fc-card:hover {
          background: var(--fc-card-hover-bg, #F0F0F0);
        }

        .fc-card:hover .fc-title {
          color: var(--fc-card-hover-title, #000000);
        }

        .fc-card:hover .fc-text {
          color: var(--fc-card-hover-text, #555555);
        }

        .fc-card:hover .fc-icon-only :global(svg) {
          color: var(--fc-card-hover-icon, inherit) !important;
        }


        .fc-icon-only {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          transition: transform 0.3s ease;
        }

        .fc-icon-only :global(svg) {
          color: var(--fc-card-icon, currentColor) !important;
          stroke: var(--fc-card-icon, currentColor) !important;
        }

        .fc-card:hover .fc-icon-only {
          transform: translateY(-2px);
        }

        .fc-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: var(--fc-card-title, #000000);
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }

        .fc-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: var(--fc-card-text, #555555);
          margin: 0;
        }

        .fc-search-bar {
          margin-top: auto;
          background: #F8F8F8;
          border-radius: 4px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #666666;
          font-family: 'Monument Grotesk', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .fc-search-bar:hover {
          background: #F0F0F0;
        }

        .fc-chevron {
          color: #888888;
        }

        @media (max-width: 768px) {
          .fc-card {
            width: 260px;
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
