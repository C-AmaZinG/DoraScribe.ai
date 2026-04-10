"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Monitor, CheckCircle, ClipboardSignature, PenTool, Send, Pill, FileEdit, Library, FileCheck2, Languages, ChevronRight } from "lucide-react";

const features = [
  {
    title: "Easy to Use",
    description: "Designed for a seamless experience with minimal learning curve",
    icon: <Sparkles size={24} color="#FF7429" />,
    iconBg: "#FF7429",
    type: "text"
  },
  {
    title: "Clean Interface",
    description: "Simple, uncluttered layout that keeps the focus on your workflow",
    icon: <Monitor size={24} color="#4B6B7A" />,
    iconBg: "#4B6B7A", // Slate blue
    type: "text"
  },
  {
    title: "Accurate notes",
    description: "Capture every clinical detail with clarity and precision",
    icon: <CheckCircle size={24} color="#6E5B87" />,
    iconBg: "#6E5B87", // Soft purple
    type: "text"
  },
  {
    title: "Supports Multiple Languages",
    description: "Transcribe patient conversations across multiple languages with confidence.",
    icon: <Languages size={24} color="#2F6F8F" />,
    iconBg: "#2F6F8F", // Deep blue
    type: "text"
  },
  {
    title: "Patient Handouts",
    description: "Generate clear, professional handouts directly from your notes",
    icon: <ClipboardSignature size={24} color="#3D8268" />,
    iconBg: "#3D8268", // Teal/Green
    type: "text"
  },
  {
    title: "Smart Editing",
    description: "Multiple ways to add more information to your note after creating it.",
    icon: <PenTool size={24} color="#C05A5A" />,
    iconBg: "#C05A5A", // Soft red
    type: "text"
  },
  {
    title: "Referral Letter",
    description: "Let Dorascribe draft your referral letters for you",
    icon: <Send size={24} color="#2A6E91" />,
    iconBg: "#2A6E91", // Cerulean
    type: "text"
  },
  {
    title: "Smart Prescription generation",
    description: "Create prescriptions seamlessly from your documentation, saving time while ensuring accuracy.",
    icon: <Pill size={24} color="#7B8E42" />,
    iconBg: "#7B8E42", // Olive green
    type: "text"
  },
  {
    title: "Custom Templates",
    description: "Access your custom templates and have the ability to create your preferred note template",
    icon: <FileEdit size={24} color="#8F674A" />,
    iconBg: "#8F674A", // Earthy brown
    type: "text"
  },
  {
    title: "Dora Evidence",
    description: "Built-in clinical decision support tool designed to deliver evidence answers in seconds.",
    icon: <Library size={24} color="#114B69" />,
    iconBg: "#114B69", // Dark blue
    type: "text"
  },
  {
    title: "Smart Form Completion",
    description: "Dorascribe can help automatically complete your medical forms.",
    icon: <FileCheck2 size={24} color="#50304C" />,
    iconBg: "#50304C", // Deep magenta
    type: "text"
  }
];

export default function FeatureCards() {
  return (
    <section className="feature-cards-section">
      <div className="fc-container">
        <div className="fc-marquee">
          <div className="fc-track">
            {[...features, ...features].map((feature, idx) => (
              <div key={idx} className="fc-card">
                <div className="fc-icon-only">
                  {feature.icon}
                </div>
                <h3 className="fc-title">{feature.title}</h3>
                
                {feature.type === "text" ? (
                  <p className="fc-text">{feature.description}</p>
                ) : (
                  <div className="fc-search-bar">
                    <span>{feature.description}</span>
                    <ChevronRight size={14} className="fc-chevron" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-cards-section {
          padding: 100px 24px 176px;
          background-color: #FFFFFF;
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
          background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
        }

        .fc-container::after {
          right: 0;
          background: linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
        }

        .fc-marquee {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .fc-track {
          display: flex;
          gap: 20px;
          padding: 0 10px;
          min-width: max-content;
          animation: fc-scroll 50s linear infinite; /* Optimized speed for a more dynamic feel */
        }

        .fc-track:hover {
          animation-play-state: paused;
        }

        @keyframes fc-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        .fc-card {
          background: #F8F7F6;
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          height: 260px;
          width: 300px;
          flex-shrink: 0;
        }


        .fc-icon-only {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          transition: transform 0.3s ease;
        }

        .fc-card:hover .fc-icon-only {
          transform: translateY(-2px);
        }

        .fc-title {
          font-family: 'Monument Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #000000;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }

        .fc-text {
          font-family: 'Monument Grotesk', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #555555;
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
